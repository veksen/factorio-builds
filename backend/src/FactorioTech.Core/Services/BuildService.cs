using FactorioTech.Core.Data;
using FactorioTech.Core.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FactorioTech.Core.Services
{
    public class BuildService
    {
        public enum SortField
        {
            Title,
            Created,
            Updated,
            Favorites,
        }

        public enum SortDirection
        {
            Asc,
            Desc,
        }

        public record EditRequest(
            string Owner,
            string Slug,
            string? Title,
            string? Description,
            IEnumerable<string>? Tags);

        public record CreateRequest(
            string Owner,
            string Slug,
            string Title,
            string? Description,
            IEnumerable<string> Tags,
            (Hash Hash, string? Name, string? Description, IEnumerable<GameIcon> Icons) Version,
            Guid? ExpectedVersionId);

        public record EditResult
        {
            public sealed record Success(
                    Blueprint Build)
                : EditResult { }

            public sealed record BuildNotFound(
                    string Owner,
                    string Slug)
                : EditResult { }

            public sealed record NotAuthorized(
                    Guid UserId)
                : EditResult { }

            private EditResult() { }
        }

        public record DeleteResult
        {
            public sealed record Success
                : DeleteResult { }

            public sealed record BuildNotFound(
                    string Owner,
                    string Slug)
                : DeleteResult { }

            public sealed record NotAuthorized(
                    Guid UserId)
                : DeleteResult { }

            private DeleteResult() { }
        }

        public record CreateResult
        {
            public sealed record Success(
                    Blueprint Build)
                : CreateResult { }

            public sealed record BuildNotFound(
                    string Owner,
                    string Slug)
                : CreateResult { }
            
            public sealed record NotAuthorized(
                    Guid UserId)
                : CreateResult { }

            public sealed record DuplicateHash(
                Guid VersionId,
                Guid BlueprintId,
                string Slug,
                Guid OwnerId,
                string OwnerSlug)
                : CreateResult { }

            public sealed record DuplicateSlug(
                    string Owner,
                    string Slug)
                : CreateResult { }

            public sealed record UnexpectedParentVersion(
                    Guid BlueprintId, Guid ExpectedLatestVersionId, Guid ActualLatestVersionId)
                : CreateResult { }

            public sealed record PayloadNotFound(
                    Hash Hash)
                : CreateResult { }

            private CreateResult() { }
        }

        private readonly ILogger<BuildService> _logger;
        private readonly AppDbContext _dbContext;

        public BuildService(
            ILogger<BuildService> logger,
            AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task<(IReadOnlyCollection<Blueprint> Blueprints, bool HasMore, int TotalCount)> GetBuilds(
            (int Current, int Size) page,
            (SortField Field, SortDirection Direction) sort,
            IReadOnlyCollection<string> tags,
            string? search,
            string? version,
            string? owner)
        {
            var query = !tags.Any()
                ? _dbContext.Blueprints.AsNoTracking()
                : _dbContext.Tags.AsNoTracking()
                    .Where(t => tags.Contains(t.Value))
                    .Join(_dbContext.Blueprints.AsNoTracking(),
                        t => t.BlueprintId,
                        bp => bp.BlueprintId,
                        (t, bp) => bp)
                    .Distinct();

            if (!string.IsNullOrEmpty(version))
            {
                query = query.Where(x => x.LatestGameVersion.StartsWith(version));
            }

            if (!string.IsNullOrEmpty(owner))
            {
                query = query.Where(x => x.NormalizedOwnerSlug == owner.ToUpperInvariant());
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.SearchVector!.Matches(EF.Functions.WebSearchToTsQuery("english", search)));
            }

            query = sort switch
            {
                (SortField.Favorites, SortDirection.Asc) => query.OrderBy(x => x.FollowerCount).ThenBy(x => x.UpdatedAt),
                (SortField.Favorites, SortDirection.Desc) => query.OrderByDescending(x => x.FollowerCount).ThenBy(x => x.UpdatedAt),
                (SortField.Updated, SortDirection.Asc) => query.OrderBy(x => x.UpdatedAt),
                (SortField.Updated, SortDirection.Desc) => query.OrderByDescending(x => x.UpdatedAt),
                (SortField.Created, SortDirection.Asc) => query.OrderBy(x => x.CreatedAt),
                (SortField.Created, SortDirection.Desc) => query.OrderByDescending(x => x.CreatedAt),
                (SortField.Title, SortDirection.Asc) => query.OrderBy(x => x.Title),
                (SortField.Title, SortDirection.Desc) => query.OrderByDescending(x => x.Title),
                _ => throw new ArgumentOutOfRangeException(nameof(sort)),
            };

            var results = await query
                .Include(bp => bp.Tags)
                .Skip(Math.Max(page.Current - 1, 0) * page.Size).Take(page.Size + 1)
                .ToListAsync();

            var totalCount = await _dbContext.Blueprints.CountAsync();

            return (results, results.Count > page.Size, totalCount);
        }

        public async Task<(Blueprint? Build, bool IsFollower)> GetDetails(string owner, string slug, ClaimsPrincipal principal)
        {
            var build = await _dbContext.Blueprints.AsNoTracking()
                .Where(b => b.NormalizedOwnerSlug == owner.ToUpperInvariant()
                         && b.NormalizedSlug == slug.ToUpperInvariant())
                .Include(bp => bp.Owner)
                .Include(bp => bp.Tags)
                .Include(bp => bp.LatestVersion!).ThenInclude(v => v.Payload)
                .FirstOrDefaultAsync();

            if (build?.LatestVersion?.Payload == null)
                return (null, false);

            var currentUserId = principal.TryGetUserId();
            var currentUserIsFollower = currentUserId != null && await _dbContext.Favorites.AsNoTracking()
                .AnyAsync(f => f.BlueprintId == build.BlueprintId && f.UserId == currentUserId);

            return (build, currentUserIsFollower);
        }

        public async Task<CreateResult> CreateOrAddVersion(CreateRequest request, ITempCoverHandle cover, ClaimsPrincipal principal)
        {
            var dupe = await _dbContext.BlueprintVersions.AsNoTracking()
                .Where(x => x.Hash == request.Version.Hash)
                .Select(x => new
                {
                    x.VersionId,
                    x.BlueprintId,
                    x.Blueprint!.Slug,
                    x.Blueprint!.OwnerId,
                    x.Blueprint!.OwnerSlug,
                })
                .FirstOrDefaultAsync();

            if (dupe != null)
            {
                _logger.LogWarning("Attempted to save duplicate payload with hash {Hash}. The hash already exists in {VersionId} of blueprint {BlueprintId}",
                    request.Version.Hash, dupe.VersionId, dupe.BlueprintId);
                return new CreateResult.DuplicateHash(dupe.VersionId, dupe.BlueprintId, dupe.Slug, dupe.OwnerId, dupe.OwnerSlug);
            }

            var payload = await _dbContext.BlueprintPayloads.FirstOrDefaultAsync(x => x.Hash == request.Version.Hash);
            if (payload == null)
            {
                _logger.LogWarning("Attempted to save blueprint version with unknown payload: {Hash}", request.Version.Hash);
                return new CreateResult.PayloadNotFound(request.Version.Hash);
            }

            await using var tx = await _dbContext.Database.BeginTransactionAsync();

            var existing = await _dbContext.Blueprints
                .Where(b => b.NormalizedOwnerSlug == request.Owner.ToUpperInvariant()
                            && b.NormalizedSlug == request.Slug.ToUpperInvariant())
                .Include(b => b.Tags)
                .FirstOrDefaultAsync();

            var result = request.ExpectedVersionId.HasValue
                ? TryUpdate(request, principal, existing)
                : await TryCreate(request, principal, existing);

            var success = result as CreateResult.Success;
            if (success == null)
                return result;

            var version = new BlueprintVersion(
                Guid.NewGuid(),
                success.Build.BlueprintId,
                success.Build.UpdatedAt,
                payload.Hash,
                payload.Type,
                payload.GameVersion,
                request.Version.Name?.Trim(),
                request.Version.Description?.Trim(),
                request.Version.Icons);

            _dbContext.Add(version);

            await _dbContext.SaveChangesAsync();

            success.Build.UpdateLatestVersion(version);

            await _dbContext.SaveChangesAsync();
            await tx.CommitAsync();

            cover.Assign(success.Build.BlueprintId);

            return result;
        }

        public async Task<EditResult> Edit(EditRequest request, ITempCoverHandle cover, ClaimsPrincipal principal)
        {
            var build = await _dbContext.Blueprints
                .Where(b => b.NormalizedOwnerSlug == request.Owner.ToUpperInvariant()
                         && b.NormalizedSlug == request.Slug.ToUpperInvariant())
                .Include(b => b.Tags)
                .FirstOrDefaultAsync();

            if (build == null)
                return new EditResult.BuildNotFound(request.Owner, request.Slug);

            if (!principal.CanEdit(build))
                return new EditResult.NotAuthorized(principal.GetUserId());

            build.UpdateDetails(
                SystemClock.Instance.GetCurrentInstant(),
                request.Title?.Trim(),
                request.Description?.Trim(),
                request.Tags?.Select(Tag.FromString).ToHashSet());

            await _dbContext.SaveChangesAsync();

            cover.Assign(build.BlueprintId);

            return new EditResult.Success(build);
        }

        public async Task<DeleteResult> Delete(string owner, string slug, ClaimsPrincipal principal)
        {
            var build = await _dbContext.Blueprints
                .Where(b => b.NormalizedOwnerSlug == owner.ToUpperInvariant()
                         && b.NormalizedSlug == slug.ToUpperInvariant())
                .Include(b => b.Tags)
                .FirstOrDefaultAsync();

            if (build == null)
                return new DeleteResult.BuildNotFound(owner, slug);
            
            if (!principal.CanDelete(build))
                return new DeleteResult.NotAuthorized(principal.GetUserId());

            var versions = await _dbContext.BlueprintVersions
                .Where(v => v.BlueprintId == build.BlueprintId)
                .ToListAsync();

            _dbContext.Remove(build);
            _dbContext.RemoveRange(versions);

            await _dbContext.SaveChangesAsync();

            return new DeleteResult.Success();
        }

        public async Task SavePayloadGraph(Hash parentHash, IReadOnlyCollection<BlueprintPayload> payloads)
        {
            var newHashes = payloads.Select(p => p.Hash);
            var existingHashes = await _dbContext.BlueprintPayloads.AsNoTracking()
                .Where(x => newHashes.Contains(x.Hash))
                .Select(x => x.Hash)
                .ToListAsync();

            var newPayloads = payloads.Where(p => !existingHashes.Contains(p.Hash)).Distinct(BlueprintPayload.EqualityComparer).ToList();

            _logger.LogInformation("Persisting the full payload graph for blueprint {Hash}: {Total} total, {Existing} existing, {Added} to be added",
                parentHash, payloads.Count, existingHashes.Count, newPayloads.Count);

            // todo: ideally this would be implemented using INSERT .. ON CONFLICT DO NOTHING, but ef core
            // doesn't seem to support that. the current implementation with SELECT + INSERT is obviously slower;
            // but more importantly there's a race condition that can lead to conflicts.
            // ReSharper disable once MethodHasAsyncOverload
            _dbContext.AddRange(newPayloads);

            await _dbContext.SaveChangesAsync();
        }

        private CreateResult TryUpdate(CreateRequest request, ClaimsPrincipal principal, Blueprint? existing)
        {
            if (existing == null)
            {
                _logger.LogWarning("Attempted to add version to unknown blueprint {Slug}", request.Slug);
                return new CreateResult.BuildNotFound(request.Owner, request.Slug);
            }

            if (!principal.CanAddVersion(existing))
            {
                _logger.LogWarning("Attempted to add version, but user {UserId} is not authorized", principal.GetUserId());
                return new CreateResult.NotAuthorized(principal.GetUserId());
            }

            if (existing.LatestVersionId != request.ExpectedVersionId)
            {
                _logger.LogWarning("Attempted to add version to blueprint {BlueprintId} but expected latest version id {ExpectedVersionId} does not match actual {LatestVersionId}",
                    existing.BlueprintId, request.ExpectedVersionId, existing.LatestVersionId);
                return new CreateResult.UnexpectedParentVersion(
                    existing.BlueprintId,
                    request.ExpectedVersionId.GetValueOrDefault(),
                    existing.LatestVersionId.GetValueOrDefault());
            }

            existing.UpdateDetails(
                SystemClock.Instance.GetCurrentInstant(),
                request.Title.Trim(),
                request.Description?.Trim(),
                request.Tags.Where(Tags.All.Contains).Select(Tag.FromString).ToHashSet());

            return new CreateResult.Success(existing);
        }

        private async Task<CreateResult> TryCreate(CreateRequest request, ClaimsPrincipal principal, Blueprint? existing)
        {
            if (existing != null)
            {
                _logger.LogWarning("Attempted to save blueprint with existing slug {Slug}", request.Slug);
                return new CreateResult.DuplicateSlug(request.Owner, request.Slug);
            }

            var owner = await _dbContext.Users.FindAsync(principal.GetUserId());
            var currentInstant = SystemClock.Instance.GetCurrentInstant();
            var build = new Blueprint(
                Guid.NewGuid(),
                owner,
                currentInstant,
                currentInstant,
                request.Slug,
                request.Tags.Where(Tags.All.Contains).Select(Tag.FromString),
                request.Title.Trim(),
                request.Description?.Trim());

            _dbContext.Add(build);

            return new CreateResult.Success(build);
        }
    }
}