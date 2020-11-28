using NodaTime;
using System;
using System.ComponentModel.DataAnnotations;

namespace FactorioTech.Web.Core.Domain
{
    public class BlueprintVersion
    {
        [Key]
        public Guid VersionId { get; init; }

        [Required]
        public Guid BlueprintId { get; init; }

        [Required]
        public Instant CreatedAt { get; init; }

        [Required]
        [MaxLength(32)]
        [MinLength(32)]
        public Hash Hash { get; init; }

        [MaxLength(100)]
        public string? Name { get; init; }

        public string? Description { get; init; }

        // navigation properties -> will be null if not included explicitly

        public BlueprintPayload? Payload { get; init; }

        public Blueprint? Blueprint { get; init; }

        public BlueprintVersion(Guid versionId, Guid blueprintId, Instant createdAt, Hash hash, string? name, string? description)
        {
            VersionId = versionId;
            BlueprintId = blueprintId;
            CreatedAt = createdAt;
            Hash = hash;
            Name = name;
            Description = description;
        }

#pragma warning disable 8618 // required for EF
        private BlueprintVersion()
        {
        }
#pragma warning restore 8618
    }
}
