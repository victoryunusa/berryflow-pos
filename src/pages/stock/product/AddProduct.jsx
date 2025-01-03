import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Icon from "react-icons/tb";
import {
  addProduct,
  getProducts,
} from "../../../features/products/productSlice";
import { alertActions } from "../../../app/store";
import Selector from "../../../components/common/Selector";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [openTax, setOpenTax] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [categories, setCategories] = useState([]);
  //   const [image, setImage] = useState(null);

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadCategories = async () => {
    const response = await axios.get(
      `${BaseUrl}/categories/loadCategories`,
      config
    );
    setCategories(response.data);
  };

  const dispatch = useDispatch();

  const { units } = useSelector((state) => state.units);

  //const { categories } = useSelector((state) => state.categories);

  console.log(categories);
  useEffect(() => {
    loadCategories();
  }, []);

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

  var newCategories = categories?.map(function (obj) {
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
    purchase_price_excluding_tax: "",
    sale_price_excluding_tax: "",
    sale_price_including_tax: "",
    par_level: "",
    stock_product: "",
    tax_option: "",
    selling_method: "",
    description: "",
    images: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required!"),
    price: Yup.string().required("This field is required!"),
    costing_method: Yup.string().required("This field is required!"),
    category: Yup.string().required("This field is required!"),
  });

  // const uploadHandler = (event) => {
  //   // event.preventDefault();
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   if (file.size > 1024 * 1024) {
  //     dispatch(
  //       alertActions.error({
  //         message: "File size should not exceed 1MB",
  //         showAfterRedirect: true,
  //       })
  //     );
  //     return;
  //   }
  //   file.isUploading = true;
  //   setImage(file);
  // };

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
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <div className="flex flex-row gap-2 items-center">
          <Link
            to="/menu/products"
            className="text-lg font-bold text-gray-500 "
          >
            Products
          </Link>
          {"/"}
          <h3 className="text-lg font-bold text-gray-700">Add</h3>
        </div>
      </div>
      <div className="bg-white p-5 md:p-10 rounded-lg text-sm border">
        <div className="flex flex-row">
          <div className="flex w-1/3"></div>
          <div className="flex flex-col w-2/3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form className="w-full">
                  <div className="">
                    <div className="">
                      <label className="block text-nelsa_primary text-xs font-semibold">
                        Name
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
                    <div className="flex flex-row mt-3 w-full gap-5">
                      <div className="w-1/2">
                        <label className="block text-nelsa_primary text-xs font-semibold">
                          Product Code (SKU){"    "}
                          <span className="ml-2 text-neutral-400 font-regular text-xs">
                            * This will be automatically generated if left blank
                          </span>
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
                      <div className="w-1/2">
                        <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                          Category
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
                    </div>

                    <div className="flex flex-row mt-3 w-full gap-5">
                      <div className="w-1/2">
                        <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                          Tax Option
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
                      <div className="w-1/2">
                        <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                          Discount Code
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
                    </div>

                    {/* <div className="mt-3">
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
                    </div> */}

                    <div className="flex flex-row mt-3 w-full gap-5">
                      <div className="w-1/3">
                        <label className="block text-nelsa_primary text-xs font-semibold">
                          Purchase Price Excluding Tax
                        </label>
                        <Field
                          type="text"
                          placeholder=""
                          name="purchase_price_excluding_tax"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.purchase_price_excluding_tax &&
                            touched.purchase_price_excluding_tax
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="purchase_price_excluding_tax"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="block text-nelsa_primary text-xs font-semibold">
                          Sale Price Excluding Tax
                        </label>
                        <Field
                          type="text"
                          placeholder=""
                          name="sale_price_excluding_tax"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.sale_price_excluding_tax &&
                            touched.sale_price_excluding_tax
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="sale_price_excluding_tax"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="block text-nelsa_primary text-xs font-semibold">
                          Sale Price Including Tax
                        </label>
                        <Field
                          type="text"
                          placeholder=""
                          name="sale_price_including_tax"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.sale_price_including_tax &&
                            touched.sale_price_including_tax
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                          disabled={true}
                        />
                        <ErrorMessage
                          name="sale_price_including_tax"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>

                    {/* <div className="mt-3 flex flex-row space-x-3">
                      <div className="w-1/2">
                        <label className="flex flex-row items-center gap-1 text-nelsa_primary text-xs font-semibold mb-1">
                          Storage unit
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
                    </div> */}
                    <div className="mt-3 flex flex-row space-x-3">
                      <div className="w-1/2">
                        <label className="flex flex-row items-center gap-1 text-nelsa_primary text-xs font-semibold">
                          Quantity
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
                          Low Quantity Alert
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

                    <div className="mt-3">
                      <label className="block text-nelsa_primary text-xs font-semibold">
                        Product Images
                      </label>

                      <input
                        type="file"
                        accept={"image/jpeg,image/png"}
                        name="images"
                        multiple
                        onChange={(event) => {
                          setFieldValue("images", event.currentTarget.files);
                        }}
                        className={`block w-full text-sm px-3 py-2 text-neutral-500 border rounded-md  ${
                          errors.images && touched.images
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
                    <hr className="mt-8" />
                    <div className="flex flex-col mt-2">
                      <div>
                        <p className="text-nelsa_primary/60 font-semibold mb-2">
                          Product Variants
                        </p>
                      </div>
                      <div className=" flex flex-row space-x-3">
                        <div className="w-1/2">
                          <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                            Search and Add Variant Products
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
                      </div>
                    </div>
                    <hr className="mt-8" />
                    <div className="flex flex-col mt-2">
                      <div>
                        <p className="text-nelsa_primary/60 font-semibold mb-2">
                          Choose Add-on Groups
                        </p>
                      </div>
                      <div className=" flex flex-row space-x-3">
                        <div className="w-1/2">
                          <label className="block text-nelsa_primary text-xs font-semibold">
                            Add-on Groups
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
                          />
                          <ErrorMessage
                            name="cost"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-8" />
                    <div className="flex flex-col mt-2">
                      <div>
                        <p className="text-nelsa_primary/60 font-semibold mb-2">
                          Ingredient Information
                        </p>
                      </div>
                      <div className=" flex flex-row space-x-3">
                        <div className="w-1/2">
                          <label className="block text-nelsa_primary text-xs font-semibold">
                            Search and Add Ingredients
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
                          />
                          <ErrorMessage
                            name="cost"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-end mt-3">
                    <div className="flex items-baseline justify-between gap-3">
                      {/* <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-3 text-sm font-semibold bg-neutral-100 text-neutral-500 rounded-md"
                              >
                                cancel
                              </button> */}
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
  );
};

export default AddProduct;
