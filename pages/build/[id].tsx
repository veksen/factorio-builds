import { GetServerSideProps } from "next"
import db from "../../db/models"
import { ECategory, IBuild, EState, IUser, IMetadata } from "../../types"
import Layout from "../../components/Layout"
import BuildPage from "../../components/BuildPage"
import { isEmptyChildren } from "formik"

interface IBuildsPageProps {
  build?: IBuild
  errors?: string
}

const BuildsPage = ({ build, errors }: IBuildsPageProps) => {
  if (errors || !build) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return <BuildPage build={build} />
}

export default BuildsPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id

    // @ts-ignore
    const build = await db.build
      .findByPk(id, {
        // @ts-ignore
        include: [{ model: db.user, as: "owner" }],
      })

      // @ts-ignore
      .catch((error) => {
        console.error(error)
        throw new Error("Cannot find build data")
      })

    if (!build) throw new Error("Build not found")

    return {
      props: { build: JSON.parse(JSON.stringify(build)) },
    }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
