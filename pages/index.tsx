import { useSelector } from "react-redux"
import { GetServerSideProps, NextPage } from "next"
import { IsNull, Not } from "typeorm"
import BuildCardList from "../components/BuildCardList"
import BuildListLookupStats from "../components/BuildListLookupStats"
import Filters from "../components/Filters"
import Layout from "../components/Layout"
import SearchInput from "../components/SearchInput"
import { Build } from "../db/entities/build.entity"
import { BuildRepository } from "../db/repository/build.repository"
import { filteredBuildsSelector } from "../redux/selectors/builds"
import { IStoreState, wrapper } from "../redux/store"
import { decodeBlueprint, isBook } from "../utils/blueprint"

const IndexPage: NextPage = () => {
  const filteredBuilds = useSelector((store: IStoreState) =>
    filteredBuildsSelector(store)
  )

  return (
    <Layout
      sidebar={
        <>
          <SearchInput />
          <Filters />
        </>
      }
    >
      <BuildListLookupStats
        count={filteredBuilds.count}
        totalCount={filteredBuilds.totalCount}
        lookupTime={filteredBuilds.lookupTime}
      />
      <BuildCardList items={filteredBuilds.builds} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx) => {
    const buildRepository = await BuildRepository()
    const builds = await buildRepository
      .find({ image: Not(IsNull()) })
      .catch((error) => {
        console.error(error)
        throw new Error("Cannot find build data")
      })

    const deserializedBuilds: Build[] = JSON.parse(JSON.stringify(builds))

    // temp until part of data structure/metadata
    const tempBuilds = deserializedBuilds.map((build) => {
      const decodedBlueprint = decodeBlueprint(build.blueprint)
      return {
        ...build,
        isBook: isBook(decodedBlueprint),
      }
    })

    ctx.store.dispatch({
      type: "SET_BUILDS",
      payload: tempBuilds,
    })

    return { props: {} }
  }
)

export default IndexPage
