import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { alertActions } from "../../app/store";
import { addTable, getTables } from "../../features/table/tableSlice";
import Selector from "../common/Selector";
import AddArea from "./AddArea";

const AddTable = ({ setOpenAdd }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openArea, setOpenArea] = useState(false);
  // const [text, setText] = useState("0012969332");
  // const copy = async () => {
  //   await navigator.clipboard.writeText(text);
  // };

  const { areas } = useSelector((state) => state.areas);

  var newArray = areas.map(function (obj) {
    return { value: obj.id, label: obj.name };
  });

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    area: "",
    occupants: "",
    table_number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Area name is required!"),
    area: Yup.string().required("This field is required!"),
    occupants: Yup.string().required("This field is required!"),
    table_number: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name, area, occupants, table_number } = formValue;
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addTable({ name, area, occupants, table_number })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Table successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getTables());
      setLoading(false);
      setVisible(!visible);
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
            <div className="relative w-full max-w-xl p-6 md:p-6 mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Create table</h3>
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
                            <label className="block text-nelsa_primary text-xs font-semibold">
                              Name
                            </label>
                            <Field
                              type="text"
                              name="name"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-lg focus:outline-none ${
                                errors.name && touched.name
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_primary text-xs font-semibold">
                              Table Number
                            </label>
                            <Field
                              type="text"
                              name="table_number"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                errors.table_number && touched.table_number
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="table_number"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_primary text-xs font-semibold">
                              Number of occupants
                            </label>
                            <Field
                              type="text"
                              name="occupants"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                errors.occupants && touched.occupants
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="occupants"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-xs font-semibold mb-1">
                              Area
                              <span
                                onClick={() => setOpenArea(true)}
                                className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                              >
                                Add new
                              </span>
                            </label>
                            <Selector
                              options={newArray}
                              value={values.area}
                              setFieldValue={setFieldValue}
                              name="area"
                            />
                            <ErrorMessage
                              name="area"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>

                          <div className="flex flex-row justify-end mt-2">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpenAdd(false)}
                                className="w-full px-3 py-2 mt-4 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-lg"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-3 py-2 mt-4 font-bold bg-[#7893d3] text-[#ffffff] rounded-md flex items-center justify-center"
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
                                  className="w-full px-3 py-2 mt-4 text-xs font-semibold bg-nelsa_primary text-[#ffffff] rounded-lg"
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
        {openArea && <AddArea setOpenAdd={setOpenArea} />}
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddTable;
