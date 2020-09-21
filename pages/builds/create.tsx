import { Form, Formik, Field } from "formik"
import Layout from "../../components/Layout"
import { ECategory, EState } from "../../types"

const BuildsCreatePage: React.FC = () => {
  return (
    <Layout title="Create a build">
      <h2>Create a build</h2>

      <Formik
        initialValues={{
          name: "",
          blueprint: "",
          state: undefined,
          categories: [],
        }}
        onSubmit={(values) => {
          console.log("TODO: handle submit")
          console.log(values)
        }}
      >
        {() => (
          <Form>
            <div>
              <label
                htmlFor="name"
                style={{ display: "block", fontWeight: 700, marginTop: "8px" }}
              >
                Name
              </label>
              <Field id="name" name="name" />
            </div>

            <div>
              <label
                htmlFor="blueprint"
                style={{ display: "block", fontWeight: 700, marginTop: "8px" }}
              >
                Blueprint
              </label>
              <Field as="textarea" id="blueprint" name="blueprint" rows="5" />
            </div>

            <div>
              <label
                htmlFor="state"
                style={{ display: "block", fontWeight: 700, marginTop: "8px" }}
              >
                Game state
              </label>
              <Field as="select" id="state" name="state">
                {Object.keys(EState).map((state) => {
                  return <option value={state}>{state.toLowerCase()}</option>
                })}
              </Field>
            </div>

            <div style={{ fontWeight: 700, marginTop: "8px" }}>Categories</div>
            {Object.keys(ECategory).map((category) => {
              return (
                <div>
                  <label htmlFor={`category-${category}`}>
                    {category.toLowerCase()}
                  </label>
                  <Field
                    type="checkbox"
                    id={`category-${category}`}
                    name="categories"
                    value={category}
                  />
                </div>
              )
            })}

            <div style={{ marginTop: "16px" }}>
              <button>save</button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default BuildsCreatePage
