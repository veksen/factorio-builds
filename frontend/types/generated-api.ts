/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/assets/icon/{size}/{type}/{key}.png": {
    get: {
      parameters: {
        path: {
          /** The desired size. Valid values are `64`, `32`, `16` and `8` */
          size: number
          /** The icon type */
          type: "Item" | "Virtual"
          /** The item's or signal's name */
          key: string
        }
      }
      responses: {
        /** The requested game icon */
        200: {
          content: {
            "text/plain": string
            "application/json": string
            "text/json": string
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "text/plain": components["schemas"]["ProblemDetails"]
            "application/json": components["schemas"]["ProblemDetails"]
            "text/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested icon does not exist */
        404: {
          content: {
            "text/plain": components["schemas"]["ProblemDetails"]
            "application/json": components["schemas"]["ProblemDetails"]
            "text/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
  "/builds": {
    get: {
      parameters: {
        query: {
          /** The desired page */
          page?: number
          /** The desired field to sort the results */
          sort_field?: "Title" | "Created" | "Updated" | "Favorites"
          /** The desired direction to sort the results */
          sort_direction?: "Asc" | "Desc"
          /** An optional search term to filter the results by */
          q?: string | null
          /** An optional comma-separated list of tags to filter the results by */
          tags?: string | null
          /** An optional game version to filter the results by */
          version?: string | null
        }
      }
      responses: {
        /** The paged, filtered and ordered list of matching builds */
        200: {
          content: {
            "application/json": components["schemas"]["BuildsModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
    post: {
      responses: {
        /** Success */
        201: {
          content: {
            "application/json": components["schemas"]["ThinBuildModel"]
          }
        }
        /** Bad Request */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      requestBody: {
        content: {
          "multipart/form-data": {
            /**
             * The slug for the new build. It is used in the build's URL and must be unique per user.
             * It can consist only of latin alphanumeric characters, underscores and hyphens.
             */
            Slug: string
            /**
             * The hash of the payload that should be used to create this build version.
             * The payload must have been previously created.
             */
            Hash: string
            /** The title or display name of the build. */
            Title: string
            /** The build description in Markdown. */
            Description?: string | null
            /** The build's tags. */
            Tags: string[]
            /** The icons of the version to be created. */
            "Version.Icons": components["schemas"]["GameIcon"][]
            /** An optional name for the version to be created. */
            "Version.Name"?: string | null
            /** An optional description for the version to be created. */
            "Version.Description"?: string | null
            /** The horizontal position of the crop rectangle. */
            "Cover.X": number
            /** The vertical position of the crop rectangle. */
            "Cover.Y": number
            /** The width of the crop rectangle. */
            "Cover.Width": number
            /** The height of the crop rectangle. */
            "Cover.Height": number
            /** The uploaded cover image. */
            "Cover.File"?: string | null
            /** The hash of an existing blueprint rendering. */
            "Cover.Hash"?: components["schemas"]["Hash"] | null
          }
        }
      }
    }
  }
  "/builds/{owner}/{slug}": {
    get: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** The details of the requested build */
        200: {
          content: {
            "application/json": components["schemas"]["FullBuildModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
    delete: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** The build was deleted successfully */
        204: never
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
    patch: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** The metadata to update. */
        200: {
          content: {
            "application/json": components["schemas"]["ThinBuildModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
      requestBody: {
        content: {
          "multipart/form-data": {
            /**
             * The title or display name of the build.
             * If unset (`null`), the existing value will not be changed.
             */
            Title: string
            /**
             * The build description in Markdown.
             * If unset (`null`), the existing value will not be changed.
             */
            Description?: string | null
            /**
             * The build's tags.
             * If unset (`null`), the existing value will not be changed.
             */
            Tags: string[]
            /**
             * The build's icons.
             * If unset (`null`), the existing value will not be changed.
             */
            Icons: components["schemas"]["GameIcon"][]
            /** The horizontal position of the crop rectangle. */
            "Cover.X": number
            /** The vertical position of the crop rectangle. */
            "Cover.Y": number
            /** The width of the crop rectangle. */
            "Cover.Width": number
            /** The height of the crop rectangle. */
            "Cover.Height": number
            /** The uploaded cover image. */
            "Cover.File"?: string | null
            /** The hash of an existing blueprint rendering. */
            "Cover.Hash"?: components["schemas"]["Hash"] | null
          }
        }
      }
    }
  }
  "/builds/{owner}/{slug}/followers": {
    get: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** An ordered list of followers */
        200: {
          content: {
            "application/json": components["schemas"]["UsersModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
    put: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** The build was added to the user's favorites */
        204: never
        /** The request is malformed or invalid */
        400: unknown
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
    delete: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** The build was removed from the user's favorites */
        204: never
        /** The request is malformed or invalid */
        400: unknown
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
  "/builds/{owner}/{slug}/versions": {
    get: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** An ordered list of versions */
        200: {
          content: {
            "application/json": components["schemas"]["VersionsModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
    post: {
      parameters: {
        path: {
          /** The username of the desired build's owner */
          owner: string
          /** The slug of the desired build */
          slug: string
        }
      }
      responses: {
        /** An ordered list of versions */
        200: unknown
        /** Success */
        201: {
          content: {
            "application/json": components["schemas"]["FullVersionModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
        /** The requested build does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
      requestBody: {
        content: {
          "multipart/form-data": {
            /** The current (latest) version of the build. It must be specified to avoid concurrency issues. */
            ExpectedPreviousVersionId: string
            /**
             * The hash of the payload that should be used to create this build version.
             * The payload must have been previously created.
             */
            Hash: string
            /** The title or display name of the build. */
            Title: string
            /** The build description in Markdown. */
            Description?: string | null
            /** The build's tags. */
            Tags: string[]
            /** The icons of the version to be created. */
            "Version.Icons": components["schemas"]["GameIcon"][]
            /** An optional name for the version to be created. */
            "Version.Name"?: string | null
            /** An optional description for the version to be created. */
            "Version.Description"?: string | null
            /** The horizontal position of the crop rectangle. */
            "Cover.X": number
            /** The vertical position of the crop rectangle. */
            "Cover.Y": number
            /** The width of the crop rectangle. */
            "Cover.Width": number
            /** The height of the crop rectangle. */
            "Cover.Height": number
            /** The uploaded cover image. */
            "Cover.File"?: string | null
            /** The hash of an existing blueprint rendering. */
            "Cover.Hash"?: components["schemas"]["Hash"] | null
          }
        }
      }
    }
  }
  "/builds/{buildId}/cover": {
    get: {
      parameters: {
        path: {
          /** The id of the desired build */
          buildId: string
        }
      }
      responses: {
        /** The cover image of the requested build */
        200: {
          content: {
            "image/png": string
            "image/jpeg": string
            "image/gif": string
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "image/png": components["schemas"]["ProblemDetails"]
            "image/jpeg": components["schemas"]["ProblemDetails"]
            "image/gif": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested build does not exist */
        404: {
          content: {
            "image/png": components["schemas"]["ProblemDetails"]
            "image/jpeg": components["schemas"]["ProblemDetails"]
            "image/gif": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
  "/payloads/{hash}": {
    get: {
      parameters: {
        path: {
          /** The hash of the desired payload */
          hash: string
        }
        query: {
          /** Specify whether to load the entire graph with all children or only the requested payload */
          include_children?: boolean
        }
      }
      responses: {
        /** The details of the requested payload */
        200: {
          content: {
            "application/json":
              | components["schemas"]["BlueprintPayloadModel"]
              | components["schemas"]["BookPayloadModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested payload does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
  "/payloads/{hash}/raw": {
    get: {
      parameters: {
        path: {
          /** The hash of the desired payload */
          hash: string
        }
      }
      responses: {
        /** The raw encoded blueprint string */
        200: {
          content: {
            "text/plain": string
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "text/plain": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested payload does not exist */
        404: {
          content: {
            "text/plain": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
  "/payloads/{hash}/rendering/{type}": {
    get: {
      parameters: {
        path: {
          /** The hash of the desired payload */
          hash: string
          /** The desired type */
          type: "Full" | "Thumb"
        }
      }
      responses: {
        /** The rendered blueprint image */
        200: {
          content: {
            "image/png": string
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "image/png": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested payload does not exist */
        404: {
          content: {
            "image/png": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
  "/payloads": {
    put: {
      responses: {
        /** Success */
        200: {
          content: {
            "application/json": components["schemas"]["CreatePayloadResult"]
          }
        }
        /** Bad Request */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreatePayloadRequest"]
          "text/json": components["schemas"]["CreatePayloadRequest"]
          "application/*+json": components["schemas"]["CreatePayloadRequest"]
        }
      }
    }
  }
  "/rpc/validate-username": {
    post: {
      responses: {
        /** The validation result */
        200: {
          content: {
            "application/json": components["schemas"]["SlugValidationResult"]
          }
        }
      }
      /** The username to validate */
      requestBody: {
        content: {
          "application/json": string
          "text/json": string
          "application/*+json": string
        }
      }
    }
  }
  "/rpc/validate-slug": {
    post: {
      responses: {
        /** The validation result */
        200: {
          content: {
            "application/json": components["schemas"]["SlugValidationResult"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      /** The slug to validate */
      requestBody: {
        content: {
          "application/json": string
          "text/json": string
          "application/*+json": string
        }
      }
    }
  }
  "/rpc/convert-and-validate-title": {
    post: {
      responses: {
        /** The converted title and validation result */
        200: {
          content: {
            "application/json": components["schemas"]["SlugValidationResult"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      /** The title to convert and validate */
      requestBody: {
        content: {
          "application/json": string
          "text/json": string
          "application/*+json": string
        }
      }
    }
  }
  "/rpc/test-auth": {
    get: {
      responses: {
        /** Success */
        200: {
          content: {
            "application/json": { [key: string]: string }
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/rpc/test-moderator": {
    get: {
      responses: {
        /** Success */
        200: {
          content: {
            "application/json": { [key: string]: string }
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/rpc/test-admin": {
    get: {
      responses: {
        /** Success */
        200: {
          content: {
            "application/json": { [key: string]: string }
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/users/{username}/builds": {
    get: {
      parameters: {
        path: {
          /** The desired user's username */
          username: string
        }
        query: {
          /** The desired page */
          page?: number
          /** The desired field to sort the results */
          sort_field?: "Title" | "Created" | "Updated" | "Favorites"
          /** The desired direction to sort the results */
          sort_direction?: "Asc" | "Desc"
          /** An optional search term to filter the results by */
          q?: string | null
          /** An optional comma-separated list of tags to filter the results by */
          tags?: string | null
          /** An optional game version to filter the results by */
          version?: string | null
        }
      }
      responses: {
        /** The paged, filtered and ordered list of matching builds */
        200: {
          content: {
            "application/json": components["schemas"]["BuildsModel"]
          }
        }
        /** The request is malformed or invalid */
        400: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
        /** The requested user does not exist */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"]
          }
        }
      }
    }
  }
}

export interface components {
  schemas: {
    ProblemDetails: {
      type?: string | null
      title?: string | null
      status?: number | null
      detail?: string | null
      instance?: string | null
    } & { [key: string]: { [key: string]: any } }
    LinkModel: {
      /** The absolute URL of the linked resource. */
      href: string
      /**
       * The HTTP method to request the linked resource.
       * Defaults to `GET` if unset (`null`).
       */
      method?: string | null
    }
    BuildsLinks: {
      /**
       * The absolute URL of the API endpoint to create a new build.
       * Only available if the call has been made with an authenticated user token.
       */
      create_build?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to add a payload.
       * Only available if the call has been made with an authenticated user token.
       */
      create_payload?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the previous page of the results list.
       * Only available if the current page is not the first page.
       */
      prev?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the next page of the results list.
       * Only available if there are more results to be returned.
       */
      next?: components["schemas"]["LinkModel"] | null
    }
    ImageLinkModel: {
      /** The absolute URL of the linked resource. */
      href: string
      /**
       * The HTTP method to request the linked resource.
       * Defaults to `GET` if unset (`null`).
       */
      method?: string | null
      /** The width of the linked image. */
      width: number
      /** The height of the linked image. */
      height: number
    }
    CollectionLinkModel: {
      /** The absolute URL of the linked resource. */
      href: string
      /**
       * The HTTP method to request the linked resource.
       * Defaults to `GET` if unset (`null`).
       */
      method?: string | null
      /** The number of items in the linked collection. */
      count: number
    }
    ThinBuildLinks: {
      /** The absolute URL of this build's full details. */
      self: components["schemas"]["LinkModel"]
      /** The absolute URL of this build's cover image. */
      cover: components["schemas"]["ImageLinkModel"]
      /** The absolute URL of the list of this build's versions. */
      versions: components["schemas"]["LinkModel"]
      /** The absolute URL of the list of this build's followers. */
      followers: components["schemas"]["CollectionLinkModel"]
      /**
       * The absolute URL of the API endpoint to add a version to this build.
       * Only available if the call has been made with an authenticated user token
       * and the authenticated user is the owner of the build.
       */
      add_version?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to edit this build.
       * Only available if the call has been made with an authenticated user token
       * and the authenticated user has the required permissions.
       */
      edit?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to delete this build.
       * Only available if the call has been made with an authenticated user token
       * and the authenticated user has the required permissions.
       */
      delete?: components["schemas"]["LinkModel"] | null
    }
    GameIcon: {
      type: string
      name: string
    }
    ThinUserModel: {
      /**
       * The user's username, also known as **slug**. It can consist only of latin alphanumeric characters, underscores and hyphens.
       * It is used in URLs like the user's profile or build pages.
       */
      username: string
    }
    ThinBuildModel: {
      _links: components["schemas"]["ThinBuildLinks"]
      /**
       * The slug is used in the build's URL and must be unique per user.
       * It can consist only of latin alphanumeric characters, underscores and hyphens.
       */
      slug: string
      /** The timestamp in UTC of when the first version of the build was created. */
      created_at: string
      /** The timestamp in UTC of when the build was last updated. */
      updated_at: string
      /** The build's icons. */
      icons: components["schemas"]["GameIcon"][]
      /** The title or display name of the build. */
      title: string
      /** The build's description in Markdown. */
      description?: string | null
      /** The user who created the build. */
      owner: components["schemas"]["ThinUserModel"]
      /** The game version that was used to create the the most recently added version of this build. */
      latest_game_version: string
      /** The build's latest version's blueprint type. */
      latest_type: "blueprint" | "blueprint-book"
      /** The build's tags. */
      tags: string[]
    }
    BuildsModel: {
      _links: components["schemas"]["BuildsLinks"]
      /** The number of results on the current page. */
      current_count: number
      /**
       * The total count of matching results.
       * TODO: currently this is the absolute total number of builds without any filtering applied.
       */
      total_count: number
      /** The paged, filtered and ordered list of matching builds. */
      builds: components["schemas"]["ThinBuildModel"][]
    }
    Hash: { [key: string]: any }
    FullBuildLinks: {
      /** The absolute URL of this build's full details. */
      self: components["schemas"]["LinkModel"]
      /** The absolute URL of this build's cover image. */
      cover: components["schemas"]["ImageLinkModel"]
      /** The absolute URL of the list of this build's versions. */
      versions: components["schemas"]["LinkModel"]
      /** The absolute URL of the list of this build's followers. */
      followers: components["schemas"]["CollectionLinkModel"]
      /**
       * The absolute URL of the API endpoint to add a version to this build.
       * Only available if the call has been made with an authenticated user token
       * and the authenticated user is the owner of the build.
       */
      add_version?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to edit this build.
       * Only available if the call has been made with an authenticated user token
       * and the authenticated user has the required permissions.
       */
      edit?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to delete this build.
       * Only available if the call has been made with an authenticated user token
       * and the authenticated user has the required permissions.
       */
      delete?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to **add** this build to the authenticated user's favorites.
       * Only available if the call has been made with an authenticated user token
       * and the user currently **does not** follow this build.
       */
      add_favorite?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of the API endpoint to **remove** this build to the authenticated user's favorites.
       * Only available if the call has been made with an authenticated user token
       * and the user currently **does** follow this build.
       */
      remove_favorite?: components["schemas"]["LinkModel"] | null
    }
    FullUserModel: {
      /**
       * The user's username, also known as **slug**. It can consist only of latin alphanumeric characters, underscores and hyphens.
       * It is used in URLs like the user's profile or build pages.
       */
      username: string
      /**
       * The user's display name can **optionally** be set by a user. It is meant to be displayed across the site in place of the `username`.
       * If the value is unset (`null`), the `username` should be displayed instead.
       */
      display_name?: string | null
      /** The user's registration timestamp in UTC. */
      registered_at: string
    }
    VersionLinks: {
      /** The absolute URL of this version's full payload. */
      payload: components["schemas"]["LinkModel"]
    }
    BookPayloadModel: components["schemas"]["PayloadModelBase"] & {
      /**
       * All payloads that are included in this blueprint book.
       * Only set when the `include_children` query parameter is `true`.
       */
      children: (
        | components["schemas"]["BlueprintPayloadModel"]
        | components["schemas"]["BookPayloadModel"]
      )[]
    }
    PayloadLinks: {
      /** The absolute URL of this payload's full details. */
      self: components["schemas"]["LinkModel"]
      /** The absolute URL of this payload's raw encoded blueprint string for import in the game or other tools. */
      raw: components["schemas"]["LinkModel"]
      /**
       * The absolute URL of this payload's full-size rendering.
       * Only available if the payload is of type `blueprint`.
       */
      rendering_full?: components["schemas"]["LinkModel"] | null
      /**
       * The absolute URL of this payload's rendering thumbnail.
       * Only available if the payload is of type `blueprint`.
       */
      rendering_thumb?: components["schemas"]["LinkModel"] | null
    }
    PayloadModelBase: {
      /** The payload's blueprint type. */
      type: "blueprint" | "blueprint-book"
      _links: components["schemas"]["PayloadLinks"]
      /** The `md5` hash of the payload's encoded blueprint string. */
      hash: string
      /** The game version that was used to create the blueprint. */
      game_version: string
      /** The raw encoded blueprint string for import in the game or other tools */
      encoded: string
      /** The ordered list of 1 to 4 icons that is included in the ingame blueprint payload. */
      icons: components["schemas"]["GameIcon"][]
      /** An optional label that is included in the ingame blueprint payload. */
      label?: string | null
      /** An optional description that is included in the ingame blueprint payload. */
      description?: string | null
    }
    BlueprintPayloadModel: components["schemas"]["PayloadModelBase"] & {
      /**
       * A map of item `name` to `count` of all **entities** in this payload's blueprint.
       * Only items with a count greater than 0 are included.
       */
      entities: { [key: string]: number }
      /**
       * A map of item `name` to `count` of all **tiles** in this payload's blueprint.
       * Only items with a count greater than 0 are included.
       */
      tiles: { [key: string]: number }
    }
    FullVersionModel: {
      _links: components["schemas"]["VersionLinks"]
      /** The version's payload hash. */
      hash: string
      /** The version's blueprint type. */
      type: "blueprint" | "blueprint-book"
      /** The timestamp in UTC at which the version was created. */
      created_at: string
      /** An optional name assigned to the version. */
      name?: string | null
      /** An optional description for the version. */
      description?: string | null
      /** The payload attached to the version. */
      payload:
        | components["schemas"]["BlueprintPayloadModel"]
        | components["schemas"]["BookPayloadModel"]
    }
    FullBuildModel: {
      _links: components["schemas"]["FullBuildLinks"]
      /**
       * The slug is used in the build's URL and must be unique per user.
       * It can consist only of latin alphanumeric characters, underscores and hyphens.
       */
      slug: string
      /** The timestamp in UTC of when the first version of the build was created. */
      created_at: string
      /** The timestamp in UTC of when the build was last updated. */
      updated_at: string
      /** The build's icons. */
      icons: components["schemas"]["GameIcon"][]
      /** The title or display name of the build. */
      title: string
      /** The build's description in Markdown. */
      description?: string | null
      /** The user who created the build. */
      owner: components["schemas"]["FullUserModel"]
      /** The game version that was used to create the the most recently added version of this build. */
      latest_game_version: string
      /** The build's latest version's blueprint type. */
      latest_type: "blueprint" | "blueprint-book"
      /** The build's tags. */
      tags: string[]
      /** The build's most recently added version. */
      latest_version: components["schemas"]["FullVersionModel"]
    }
    UsersModel: {
      /** The number of results on the current page. */
      count: number
      /** The paged, filtered and ordered list of matching users. */
      users: components["schemas"]["FullUserModel"][]
    }
    ThinVersionModel: {
      _links: components["schemas"]["VersionLinks"]
      /** The version's payload hash. */
      hash: string
      /** The version's blueprint type. */
      type: "blueprint" | "blueprint-book"
      /** The timestamp in UTC at which the version was created. */
      created_at: string
      /** An optional name assigned to the version. */
      name?: string | null
      /** An optional description for the version. */
      description?: string | null
    }
    VersionsModel: {
      /** The number of results on the current page. */
      count: number
      /** The paged, filtered and ordered list of matching versions. */
      versions: components["schemas"]["ThinVersionModel"][]
    }
    CreatePayloadRequest: {
      /** The encoded blueprint string. */
      encoded: string
    }
    SlugValidationResult: {
      slug: string
      is_valid: boolean
      is_available: boolean
    }
    CreatePayloadResult: {
      /** The hash of the primary (or parent) payload that was created. */
      hash: string
      /** The hashes of all payloads that were created in this operation. */
      all_hashes: string[]
      /** The ordered list of 1 to 4 icons that is included in the primary blueprint. */
      icons: components["schemas"]["GameIcon"][]
      /**
       * The primary blueprint's title (aka label) converted to slug,
       * including fields indicating whether the slug is valid and available for the authenticated user.
       */
      extracted_slug: components["schemas"]["SlugValidationResult"]
      /** The tags that have been extracted for this payload. */
      extracted_tags: string[]
    }
  }
}

export interface operations {}
