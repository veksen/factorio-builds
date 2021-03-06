import React from "react"
import { useSelector } from "react-redux"
import { IStoreState } from "../../../redux/store"
import BuildCardList from "../../ui/BuildCardList"
import FilterList from "../../ui/FilterList"
import LayoutSidebar from "../../ui/LayoutSidebar"
import Links from "../../ui/Links"
import Search from "../../ui/Search"
import Stacker from "../../ui/Stacker"

function BuildListPage(): JSX.Element {
  const { search, sort } = useSelector((store: IStoreState) => ({
    search: store.search,
    sort: store.filters.sort,
  }))

  return (
    <LayoutSidebar
      sidebar={
        <Stacker gutter={32}>
          <Search />
          <FilterList />
          <Links orientation="vertical" />
        </Stacker>
      }
    >
      <BuildCardList
        items={search.builds}
        count={search.current_count}
        totalCount={search.total_count}
        sort={sort}
      />
    </LayoutSidebar>
  )
}

export default BuildListPage
