import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../../app/store";
import { addProductExtra } from "../../../features/products/productSlice";
import { getProduct } from "../../../features/products/singleProductSlice";

const AddExtra = ({ product_slug, setOpen }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    price: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Variant name is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name, price } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addProductExtra({
          name,
          price,
          product_slug: product_slug,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Extra successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getProduct(product_slug));
      setLoading(false);
      setVisible(false);
      setOpen(false);
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
            <div className="relative w-full max-w-xl font-br mx-auto bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between border-b px-6 py-2 ">
                    <h3 className="text-lg font-bold">Add Extra</h3>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form className="w-full">
                          <div className="max-h-[720px] overflow-scroll px-6 md:px-6">
                            <div className="">
                              <label className="block text-tt_rich_black text-xs font-semibold">
                                Name
                              </label>
                              <Field
                                type="text"
                                name="name"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.name && touched.name
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>

                            <div className="mt-3">
                              <label className="block text-tt_rich_black text-xs font-semibold">
                                Addtional price
                              </label>
                              <Field
                                type="text"
                                name="price"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.price && touched.price
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row justify-end mt-10 p-6 border-t">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-3 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-md"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-4 py-3 text-xs font-semibold bg-tt_rich_black/80 text-[#ffffff] rounded-md flex items-center justify-center"
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
                                  className="w-full px-4 py-3 text-xs font-semibold bg-tt_rich_black text-[#ffffff] rounded-md"
                                >
                                  Submit
                                </button>
                              )}
                            </div>
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
export default AddExtra;
