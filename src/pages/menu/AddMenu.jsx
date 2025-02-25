import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { alertActions } from "../../app/store";
import { addMenu, getMenus } from "../../features/menu/menuSlice";

const AddMenu = ({ setOpen }) => {
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Menu name is required"),
  });

  const handleSubmit = async (formValue) => {
    const { name } = formValue;

    dispatch(alertActions.clear());
    try {
      await dispatch(
        addMenu({
          name,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Menu successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getMenus());
      setOpen(false);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-5">
          {/* Make and Model Field with AsyncSelect */}
          <div className="">
            <label className="block text-nelsa_gray_3 text-xs font-semibold">
              Menu name
            </label>
            <Field
              type="text"
              placeholder=""
              name="name"
              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                errors.name && touched.name ? "border-red-500" : ""
              } focus:nelsa_gray_3`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-1/6 px-4 py-3 text-sm font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-500 rounded-lg"
            >
              Cancel
            </button>
            {isSubmitting ? (
              <button
                type="submit"
                className="w-1/6 px-4 py-3 font-bold bg-tt_rich_black/80 text-[#ffffff] rounded-lg flex items-center justify-center"
                disabled={isSubmitting}
              >
                <span
                  className="mr-5 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </span>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="w-1/6 px-4 py-3 text-sm font-semibold bg-tt_rich_black hover:bg-tt_rich_black/80 text-[#ffffff] rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddMenu;
