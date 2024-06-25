import { useEffect, useState } from "react";
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
import AddMeasurementUnit from "./AddMeasurementUnit";
import { getCategories } from "../../features/category/categoriesSlice";
import AddCategory from "./AddCategory";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddIngredient = (props) => {
  const { setOpenIngredient } = props;
  const [loading, setLoading] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const dispatch = useDispatch();

  const { units } = useSelector((state) => state.units);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  var options = [
    { value: "From Transactions", label: "From Transactions" },
    { value: "Fixed", label: "Fixed" },
  ];

  var newArray = units.map(function (obj) {
    return { value: obj.id, label: obj.unit_code + " - " + obj.label };
  });

  var newCategories = categories.map(function (obj) {
    return { value: obj.id, label: obj.label };
  });

  const initialValues = {
    name: "",
    cost: "",
    storage_unit: "",
    ingredient_unit: "",
    storage_to_ingredient: "",
    quantity: "",
    alert_quantity: "",
    category: "",
    ingredient_code: "",
    par_level: "",
    costing_method: "From Transactions",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Item name is required!"),
    ingredient_code: Yup.string().required("This field is required!"),
    ingredient_unit: Yup.string().required("This field is required!"),
    storage_to_ingredient: Yup.string().required("This field is required!"),
    storage_unit: Yup.string().required("This field is required!"),
    alert_quantity: Yup.string().required("This field is required!"),
    costing_method: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const {
      name,
      cost,
      quantity,
      storage_unit,
      ingredient_unit,
      storage_to_ingredient,
      alert_quantity,
      category,
      ingredient_code,
      par_level,
      costing_method,
    } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addIngredient({
          name,
          cost,
          quantity,
          storage_unit,
          ingredient_unit,
          storage_to_ingredient,
          alert_quantity,
          category,
          ingredient_code,
          par_level,
          costing_method,
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
      setOpenIngredient(false);
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
            <div className="relative w-full max-w-xl p-6 md:p-6 mx-auto bg-white rounded-md shadow-lg font-manrope">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Create Item
                    </h3>
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
                            <label className="block text-nelsa_gray_3 text-xs font-semibold">
                              Name
                            </label>
                            <Field
                              type="text"
                              placeholder=""
                              name="name"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                errors.name && touched.name
                                  ? "border-red-500"
                                  : ""
                              } focus:nelsa_gray_3`}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_gray_3 text-xs font-semibold">
                              SKU
                            </label>
                            <Field
                              type="text"
                              placeholder=""
                              name="ingredient_code"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                errors.ingredient_code &&
                                touched.ingredient_code
                                  ? "border-red-500"
                                  : ""
                              } focus:nelsa_gray_3`}
                            />
                            <ErrorMessage
                              name="ingredient_code"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                              Category
                              <span
                                onClick={() => setOpenCategory(true)}
                                className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                              >
                                Add new
                              </span>
                            </label>
                            <Selector
                              options={newCategories}
                              value={values.category}
                              setFieldValue={setFieldValue}
                              name="category"
                            />
                            <ErrorMessage
                              name="category"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>

                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold">
                                Available Quantity
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="quantity"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.quantity && touched.quantity
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="quantity"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold">
                                Low Quantity alert
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="alert_quantity"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.alert_quantity &&
                                  touched.alert_quantity
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="alert_quantity"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold mb-1">
                                Storage Unit
                                <span
                                  onClick={() => setOpenUnit(true)}
                                  className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                                >
                                  Add
                                </span>
                              </label>
                              <Selector
                                options={newArray}
                                value={values.storage_unit}
                                setFieldValue={setFieldValue}
                                name="storage_unit"
                              />

                              <ErrorMessage
                                name="storage_unit"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold mb-1">
                                Ingredient Unit
                                <span
                                  onClick={() => setOpenUnit(true)}
                                  className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                                >
                                  Add
                                </span>
                              </label>
                              <Selector
                                options={newArray}
                                value={values.ingredient_unit}
                                setFieldValue={setFieldValue}
                                name="ingredient_unit"
                              />

                              <ErrorMessage
                                name="ingredient_unit"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold">
                                Storage to Ingredient
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="storage_to_ingredient"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.storage_to_ingredient &&
                                  touched.storage_to_ingredient
                                    ? "border-red-500"
                                    : ""
                                } focus:nelsa_gray_3`}
                              />
                              <ErrorMessage
                                name="storage_to_ingredient"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold">
                                Par Level
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="par_level"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.cost && touched.par_level
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="par_level"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          {/* <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-xs font-semibold">
                              Description
                            </label>

                            <Field
                              name="description"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                errors.description && touched.description
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                              component={CustomInputComponent}
                              placeholder="Description"
                            />
                          </div> */}
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Costing Method
                              </label>
                              <Selector
                                options={options}
                                value={values.costing_method}
                                setFieldValue={setFieldValue}
                                name="costing_method"
                              />
                              <ErrorMessage
                                name="costing_method"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold">
                                Cost
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="cost"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.cost && touched.cost
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                                disabled={
                                  values.costing_method == "From Transactions"
                                    ? true
                                    : false
                                }
                              />
                              <ErrorMessage
                                name="cost"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row justify-end mt-2">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpenIngredient(false)}
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
        {openUnit && <AddMeasurementUnit setOpenUnit={setOpenUnit} />}
        {openCategory && <AddCategory setOpenCategory={setOpenCategory} />}
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddIngredient;
