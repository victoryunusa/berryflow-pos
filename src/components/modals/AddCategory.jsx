import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";

import Selector from "../common/Selector";
import {
  addCategory,
  getCategories,
} from "../../features/category/categoriesSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddCategory = (props) => {
  const { setOpenCategory } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  var options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];

  const initialValues = {
    label: "",
    category_name: "",
    display_on_pos_screen: "",
    display_on_qr_menu: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Category name is required!"),
    display_on_pos_screen: Yup.string().required("This field is required!"),
    display_on_qr_menu: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { label, description, display_on_pos_screen, display_on_qr_menu } =
      formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addCategory({
          label,
          description,
          display_on_pos_screen,
          display_on_qr_menu,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Category successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getCategories());
      setLoading(false);
      setOpenCategory(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div className="relative w-full max-w-xl p-7 md:p-10 mx-auto bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Add Category
                    </h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpenCategory(false)}
                    >
                      X
                    </h4>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form className="w-full">
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Category Name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter Category name"
                              name="label"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.label && touched.label
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="label"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Show on POS Screen
                            </label>
                            <Selector
                              options={options}
                              value={values.display_on_pos_screen}
                              setFieldValue={setFieldValue}
                              name="display_on_pos_screen"
                            />

                            <ErrorMessage
                              name="display_on_pos_screen"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Show on QR Menu
                            </label>
                            <Selector
                              options={options}
                              value={values.display_on_qr_menu}
                              setFieldValue={setFieldValue}
                              name="display_on_qr_menu"
                            />

                            <ErrorMessage
                              name="display_on_qr_menu"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Description
                            </label>

                            <Field
                              name="description"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.description && touched.description
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                              component={CustomInputComponent}
                              placeholder="Description"
                            />

                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="flex items-baseline justify-between">
                            {loading ? (
                              <button
                                type="submit"
                                className="w-full px-4 py-3 mt-4 font-bold bg-[#7893d3] text-[#ffffff] rounded-md flex items-center justify-center"
                                disabled={loading}
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
                                className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary text-[#ffffff] rounded-md"
                              >
                                Submit
                              </button>
                            )}
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddCategory;
