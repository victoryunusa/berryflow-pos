import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Icon from "react-icons/tb";

import { alertActions } from "../../app/store";
import {
  addIngredient,
  getIngredients,
} from "../../features/ingredients/ingredientsSlice";
import Selector from "../common/Selector";
import AddMeasurementUnit from "./AddMeasurementUnit";
import { getCategories } from "../../features/category/categoriesSlice";
import AddCategory from "./AddCategory";
import AddTax from "./AddTax";
import { addProduct, getProducts } from "../../features/products/productSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddProduct = (props) => {
  const { setOpen } = props;
  const [loading, setLoading] = useState(false);
  const [openTax, setOpenTax] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [isShown, setIsShown] = useState(false);
  //   const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const { units } = useSelector((state) => state.units);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  var options1 = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];

  var options2 = [
    { value: "Weight", label: "Weight" },
    { value: "Unit", label: "Unit" },
  ];

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

  const { taxes } = useSelector((state) => state.taxes);
  var newTaxes = taxes.map(function (obj) {
    return {
      value: obj.id,
      label: obj.label + " -" + obj.total_tax_percentage + "%",
    };
  });

  const initialValues = {
    name: "",
    cost: "",
    price: "",
    category: "",
    storage_unit: "",
    ingredient_unit: "",
    product_code: "",
    costing_method: "Fixed",
    storage_to_ingredient: "",
    par_level: "",
    stock_product: "",
    tax_option: "",
    selling_method: "",
    description: "",
    images: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Item name is required!"),
    product_code: Yup.string().required("This field is required!"),
    price: Yup.string().required("This field is required!"),
    costing_method: Yup.string().required("This field is required!"),
    category: Yup.string().required("This field is required!"),
  });

  const uploadHandler = (event) => {
    // event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      dispatch(
        alertActions.error({
          message: "File size should not exceed 1MB",
          showAfterRedirect: true,
        })
      );
      return;
    }
    file.isUploading = true;
    setImage(file);
  };

  const handleSubmit = async (formValue) => {
    const {
      name,
      cost,
      price,
      category,
      product_code,
      costing_method,
      selling_method,
      stock_product,
      storage_unit,
      ingredient_unit,
      storage_to_ingredient,
      par_level,
      tax_option,
      description,
      images,
    } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addProduct({
          name,
          cost,
          price,
          category,
          product_code,
          costing_method,
          selling_method,
          stock_product,
          storage_unit,
          ingredient_unit,
          storage_to_ingredient,
          par_level,
          tax_option,
          images,
          description,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Product successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getProducts());
      setLoading(false);
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
            <div className="relative w-full max-w-xl  mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between border-b px-6 py-2 ">
                    <h3 className="text-md font-bold text-nelsa_primary">
                      Add product
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-col ">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form className="w-full">
                          <div className="max-h-[700px] overflow-scroll px-6 md:px-6">
                            <div className="">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Name
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="name"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
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
                            <div className="mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                SKU
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="product_code"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.product_code && touched.product_code
                                    ? "border-red-500"
                                    : ""
                                } focus:nelsa_gray_3`}
                              />
                              <ErrorMessage
                                name="product_code"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold mb-1">
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
                            <div className="flex flex-col mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                                Tax Option
                                <span
                                  onClick={() => setOpenTax(true)}
                                  className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                                >
                                  Add new
                                </span>
                              </label>
                              <Selector
                                options={newTaxes}
                                value={values.tax_option}
                                setFieldValue={setFieldValue}
                                name="tax_option"
                              />
                              <ErrorMessage
                                name="tax_option"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Stock Product
                              </label>
                              <Selector
                                options={options1}
                                value={values.stock_product}
                                setFieldValue={setFieldValue}
                                name="stock_product"
                              />

                              <ErrorMessage
                                name="stock_product"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>

                            <div className="mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Price
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="price"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.price && touched.price
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            {/* <div className="mt-4">
                              <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                                Selling Method
                              </label>
                              <Selector
                                options={options2}
                                value={values.selling_method}
                                setFieldValue={setFieldValue}
                                name="selling_method"
                              />
                              <ErrorMessage
                                name="selling_method"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div> */}

                            <div className="mt-3 flex flex-row space-x-3">
                              <div className="w-1/2">
                                <label className="flex flex-row items-center gap-1 text-nelsa_primary text-xs font-semibold mb-1">
                                  Storage unit
                                  <span
                                    onMouseEnter={() => setIsShown(true)}
                                    onMouseLeave={() => setIsShown(false)}
                                  >
                                    <Icon.TbInfoCircle
                                      className="text-neutral-500"
                                      size={15}
                                    />
                                  </span>
                                  {isShown && (
                                    <div className="absolute z-[500] left-28 bg-white p-2 shadow-lg rounded-md border">
                                      <p className="text-xs text-neutral-600 font-normal">
                                        How the item is stored, eg. Box or Kg
                                      </p>
                                    </div>
                                  )}
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
                                <label className="flex flex-row items-center gap-1 text-nelsa_primary text-xs font-semibold mb-1">
                                  Usage unit
                                  <span
                                    onMouseEnter={() => setIsShown(true)}
                                    onMouseLeave={() => setIsShown(false)}
                                  >
                                    <Icon.TbInfoCircle
                                      className="text-neutral-500"
                                      size={15}
                                    />
                                  </span>
                                  {isShown && (
                                    <div className="absolute z-[500] left-28 bg-white p-2 shadow-lg rounded-md border">
                                      <p className="text-xs text-neutral-600 font-normal">
                                        How the item is stored, eg. Box or Kg
                                      </p>
                                    </div>
                                  )}
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
                            <div className="mt-3 flex flex-row space-x-3">
                              <div className="w-1/2">
                                <label className="flex flex-row items-center gap-1 text-nelsa_primary text-xs font-semibold">
                                  Storage to usage conversion
                                  <span
                                    onMouseEnter={() => setIsShown(true)}
                                    onMouseLeave={() => setIsShown(false)}
                                  >
                                    <Icon.TbInfoCircle
                                      className="text-neutral-500"
                                      size={15}
                                    />
                                  </span>
                                  {isShown && (
                                    <div className="absolute z-[500] left-28 bg-white p-2 shadow-lg rounded-md border">
                                      <p className="text-xs text-neutral-600 font-normal">
                                        How the item is stored, eg. Box or Kg
                                      </p>
                                    </div>
                                  )}
                                </label>
                                <Field
                                  type="text"
                                  placeholder=""
                                  name="storage_to_ingredient"
                                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
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
                                <label className="block text-nelsa_primary text-xs font-semibold">
                                  Par Level
                                </label>
                                <Field
                                  type="text"
                                  placeholder=""
                                  name="par_level"
                                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
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

                            {values.stock_product != 0 && (
                              <div className="mt-3 flex flex-row space-x-3">
                                <div className="w-1/2">
                                  <label className="block text-nelsa_primary text-xs font-semibold mb-1">
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
                                  <label className="block text-nelsa_primary text-xs font-semibold">
                                    Cost
                                  </label>
                                  <Field
                                    type="text"
                                    placeholder=""
                                    name="cost"
                                    className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                      errors.cost && touched.cost
                                        ? "border-red-500"
                                        : ""
                                    } focus:border-blue-950`}
                                    disabled={
                                      values.costing_method ==
                                      "From Transactions"
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
                            )}

                            <div className="mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Image
                              </label>

                              <input
                                type="file"
                                accept={"image/jpeg,image/png"}
                                name="images"
                                multiple
                                onChange={(event) => {
                                  setFieldValue(
                                    "images",
                                    event.currentTarget.files
                                  );
                                }}
                                className={`block w-full text-sm px-3 py-2 text-neutral-500 border rounded-md  ${
                                  errors.image && touched.image
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />

                              <ErrorMessage
                                name="images"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            <div className="mt-3">
                              <label className="block text-nelsa_primary text-xs font-semibold">
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
                            </div>
                          </div>

                          <div className="flex flex-row justify-end mt-5 p-6 border-t">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-3 text-sm font-semibold bg-neutral-100 text-neutral-500 rounded-md"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-4 py-3 text-sm font-semibold bg-nelsa_primary/80 text-[#ffffff] rounded-md flex items-center justify-center"
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
                                  className="w-full px-4 py-3 text-sm font-semibold bg-nelsa_primary text-[#ffffff] rounded-md"
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
        {openTax && <AddTax setOpenAdd={setOpenTax} />}
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddProduct;
