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
import AddRole from "./AddRole";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddUser = (props) => {
  const { setOpenUser } = props;
  const [loading, setLoading] = useState(false);
  const [openRole, setOpenRole] = useState(false);

  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.roles);

  var newArray = roles.map(function (obj) {
    return { value: obj.slug, label: obj.name };
  });

  const initialValues = {
    name: "",
    cost: "",
    price: "",
    unit: "",
    quantity: "",
    alert_quantity: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Ingredient name is required!"),
    cost: Yup.string().required("This field is required!"),
    price: Yup.string().required("This field is required!"),
    unit: Yup.string().required("This field is required!"),
    quantity: Yup.string().required("This field is required!"),
    alert_quantity: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name, cost, quantity, description, price, unit, alert_quantity } =
      formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addIngredient({
          name,
          cost,
          quantity,
          alert_quantity,
          description,
          price,
          unit,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Ingredient successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getIngredients());
      setLoading(false);
      setOpenUser(false);
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
            <div className="relative w-full max-w-xl p-5 md:p-10 mx-auto bg-white rounded-md shadow-lg font-manrope">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Add User
                    </h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpenUser(false)}
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
                              Ingredient Name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter ingredient name"
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
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Cost
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter ingredient name"
                                name="cost"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.cost && touched.cost
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="cost"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Price
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter ingredient name"
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
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Available Quantity
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter ingredient name"
                                name="quantity"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.quantity && touched.quantity
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="quantity"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Low Quantity alert
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter ingredient name"
                                name="alert_quantity"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.alert_quantity &&
                                  touched.alert_quantity
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="alert_quantity"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold mb-1">
                              Role
                              <span
                                onClick={() => setOpenRole(true)}
                                className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                              >
                                Add new
                              </span>
                            </label>
                            <Selector
                              options={newArray}
                              value={values.unit}
                              setFieldValue={setFieldValue}
                              name="unit"
                            />

                            <ErrorMessage
                              name="unit"
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
        {openRole && <AddRole setOpenRole={setOpenRole} />}
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddUser;
