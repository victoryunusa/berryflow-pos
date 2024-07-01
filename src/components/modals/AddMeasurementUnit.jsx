import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import {
  addIngredient,
  getIngredients,
} from "../../features/ingredients/ingredientsSlice";
import Selector from "../common/Selector";
import {
  addMeasurementUnit,
  getMeasurementUnits,
} from "../../features/units/unitsSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddMeasurementUnit = (props) => {
  const { setOpenUnit } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    label: "",
    unit_code: "",
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Unit name is required!"),
    unit_code: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { label, unit_code } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addMeasurementUnit({
          label,
          unit_code,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Measurement successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getMeasurementUnits());
      setLoading(false);
      setOpenUnit(false);
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
            <div className="relative w-full max-w-xl p-5 md:p-10 mx-auto bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Add Meausrement Unit
                    </h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpenUnit(false)}
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
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Unit Name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter Unit Name"
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
                              Unit Code
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter Unit Code"
                              name="unit_code"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.unit_code && touched.unit_code
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="unit_code"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex items-baseline justify-between mt-5">
                            {loading ? (
                              <button
                                type="submit"
                                className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary/60 text-[#ffffff] rounded-md flex items-center justify-center"
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

export default AddMeasurementUnit;
