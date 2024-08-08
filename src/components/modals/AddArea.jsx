import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import { addArea, getAreas } from "../../features/area/areaSlice";

const AddArea = ({ setOpenAdd, open, children }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("0012969332");
  const copy = async () => {
    await navigator.clipboard.writeText(text);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Area name is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(addArea({ name })).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Area successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getAreas());
      setLoading(false);
      setVisible(false);
      setOpenAdd(false);
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
            <div className="relative w-full max-w-xl p-7 md:p-10 mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Add new area</h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpenAdd(false)}
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
                      {({ errors, touched }) => (
                        <Form className="w-full">
                          <div className="mt-4">
                            <label className="block text-nelsa_primary text-sm font-semibold">
                              Name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter area name"
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

export default AddArea;
