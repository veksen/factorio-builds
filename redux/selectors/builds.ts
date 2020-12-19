import { createSelector } from "reselect"
import { Build } from "../../db/entities/build.entity"
import {
  IStoreCategoryFilters,
  IStoreFiltersState,
  IStoreStateFilters,
} from "../reducers/filters"
import { IStoreState } from "../store"
import {
  filtersCategorySelector,
  filtersQuerySelector,
  filtersStateSelector,
} from "./filters"

const buildsSelector = (state: IStoreState) => state.builds.items

const filteredBuildsByState = (
  builds: Build[],
  stateFilters: IStoreStateFilters
) => {
  const hasStateFilters = Object.keys(stateFilters).some((k) => {
    // @ts-ignore
    return Boolean(stateFilters[k])
  })

  if (!hasStateFilters) {
    return builds
  }

  return builds.filter((build) => {
    if (build.metadata.state) {
      return stateFilters[build.metadata.state[0]]
    }
  })
}

const filteredBuildsByCategory = (
  builds: Build[],
  categoryFilters: IStoreCategoryFilters
) => {
  const hasCategoryFilters = Object.keys(categoryFilters).some((k) => {
    // @ts-ignore
    return Boolean(categoryFilters[k])
  })

  if (!hasCategoryFilters) {
    return builds
  }

  return builds.filter((build) => {
    if (build.metadata.categories.length) {
      return build.metadata.categories.some((category) => {
        return categoryFilters[category]
      })
    }
  })
}

const filteredBuildsByQuery = (
  builds: Build[],
  query: IStoreFiltersState["query"]
) => {
  if (!query.trim()) {
    return builds
  }

  return builds.filter((build) => {
    const queryToLower = query.trim().toLowerCase()
    const nameToLower = build.name.toLowerCase()
    return nameToLower.includes(queryToLower)
  })
}

export const filteredBuildsSelector = createSelector(
  buildsSelector,
  filtersQuerySelector,
  filtersStateSelector,
  filtersCategorySelector,
  (builds, filtersQuery, filtersState, filtersCategory) => {
    let filteredBuilds = builds

    const msStart = new Date().getMilliseconds()

    filteredBuilds = filteredBuildsByQuery(filteredBuilds, filtersQuery)
    filteredBuilds = filteredBuildsByState(filteredBuilds, filtersState)
    filteredBuilds = filteredBuildsByCategory(filteredBuilds, filtersCategory)

    const msEnd = new Date().getMilliseconds()

    return {
      builds: filteredBuilds,
      count: filteredBuilds.length,
      totalCount: builds.length,
      lookupTime: msEnd - msStart,
    }
  }
)
