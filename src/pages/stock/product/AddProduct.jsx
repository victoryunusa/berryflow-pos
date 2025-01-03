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
import OrderSelect from "../../../components/common/OrderSelect";
import {
  addItem,
  getVariantOptions,
  removeVariantItem,
  updateVariantOption,
} from "../../../features/products/productVariantSlice";
import VariantSelector from "../../../components/common/VariantSelector";
import MultipleSelect from "../../../components/common/MultipleSelect";
import SwitchButton from "../../../components/common/SwitchButton";

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
  const [items, setItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  //   const [image, setImage] = useState(null);

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadVariantOptions = async () => {
    const response = await axios.get(`${BaseUrl}/variant_options/load`, config);
    //console.log(response.data.variant_options);
    setVariantOptions(response.data.variant_options);
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
  //const { variant_items } = useSelector((state) => state.variant_items);
  const variantItems = useSelector(getVariantOptions);

  //const { categories } = useSelector((state) => state.categories);

  const loadProducts = async () => {
    const response = await axios.get(
      `${BaseUrl}/products/load_pos_products`,
      config
    );

    setItems(response.data.products);
  };

  const loadIngredients = async () => {
    const response = await axios.get(
      `${BaseUrl}/products/load_products`,
      config
    );

    setIngredients(response.data.products);
  };

  console.log(categories);
  useEffect(() => {
    loadProducts();
    loadCategories();
    loadIngredients();
    loadVariantOptions();
  }, []);

  //Add product to cart
  const handleAddProductVariant = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveVariant = (cartItem) => {
    dispatch(removeVariantItem(cartItem));
  };

  const handleChangeVariantOption = (slug, value) => {
    console.log({ slug, value });
    dispatch(updateVariantOption({ slug, variant_option: value }));
  };

  // var options1 = [
  //   { value: 1, label: "Yes" },
  //   { value: 0, label: "No" },
  // ];

  // var options2 = [
  //   { value: "Weight", label: "Weight" },
  //   { value: "Unit", label: "Unit" },
  // ];

  const optionsMain = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
  ];

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectionChange = (selectSlug, selectedOptions) => {
    console.log("Selected options:", selectedOptions);
    setSelectedValues(selectedOptions);
  };

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
    is_addon_product: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required!"),
    price: Yup.string().required("This field is required!"),
    costing_method: Yup.string().required("This field is required!"),
    category: Yup.string().required("This field is required!"),
  });

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
                  <div className="mb-5">
                    <p className="text-nelsa_primary/60 font-semibold mb-2">
                      Product Identifier Information (Optional)
                    </p>
                    <div>
                      <SwitchButton
                        name="is_addon_product"
                        label="This is an Add-on Product"
                      />
                      <p className="text-neutral-400 text-xs mt-1">
                        If this option is enabled, product will be considered as
                        an add-on product. Add-on products can only be tagged to
                        a billing product via add-on groups
                      </p>
                    </div>
                  </div>
                  <hr className="my-8" />
                  <div className="">
                    <div className="flex flex-row mt-3 w-full gap-5">
                      <div className="w-1/2">
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
                    </div>

                    <div className="flex flex-row mt-3 w-full gap-5">
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
                      <div className="w-1/2">
                        <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                          Supplier
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

                    <div className="flex flex-row mt-3 w-full gap-5">
                      <div className="w-1/2">
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
                      <div className="w-1/2">
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
                    </div>
                    <div className="flex flex-row mt-3 w-full gap-5">
                      <div className="w-1/2">
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
                      <div className="w-1/2"></div>
                    </div>

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
                    {values.is_addon_product === false && (
                      <div>
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
                              <OrderSelect
                                options={items}
                                handleAddToCart={handleAddProductVariant}
                              />
                            </div>
                          </div>
                          {variantItems.length >= 1 && (
                            <div>
                              <div className="mt-5">
                                <div className="w-full flex flex-row items-start justify-start gap-3">
                                  <label className="block w-1/3 text-nelsa_gray_3 text-xs font-semibold">
                                    Variant Option
                                  </label>
                                  <label className="block w-1/3 text-nelsa_gray_3 text-xs font-semibold">
                                    Name & Description
                                  </label>
                                  <label className="block w-1/3 text-nelsa_gray_3 text-xs font-semibold">
                                    Sale Price
                                  </label>
                                </div>
                                {variantItems?.map((variant, index) => (
                                  <div
                                    className="flex flex-row gap-3 mt-1"
                                    key={variant.slug}
                                  >
                                    <div className="w-1/3">
                                      <VariantSelector
                                        variant={variant}
                                        index={index}
                                        variantOptions={variantOptions}
                                        handleChangeVariantOption={
                                          handleChangeVariantOption
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center w-1/3 px-4 py-3 mt-1 border text-neutral-500 bg-neutral-100 text-xs rounded-md">
                                      <p className="">{variant.name}</p>
                                    </div>
                                    <div className="flex flex-row items-center w-1/3">
                                      <p className="w-4/5 text-neutral-500 bg-neutral-100  px-4 py-3 mt-1 border text-xs rounded-md">
                                        {variant.price}
                                      </p>

                                      <button
                                        type="button"
                                        className="flex items-center justify-center text-2xl text-red-600 p-1.5"
                                        onClick={() =>
                                          handleRemoveVariant(variant)
                                        }
                                      >
                                        x
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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

                              <MultipleSelect
                                options={optionsMain}
                                handleSelectionChange={handleSelectionChange}
                                selectSlug="fruit-select"
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
                              <OrderSelect
                                options={ingredients}
                                handleAddToCart={setFieldValue}
                              />
                            </div>
                          </div>
                          <div className="mt-4 relative overflow-x-auto border rounded-lg p-5">
                            <table className="w-full text-sm text-left ">
                              <thead className=" text-nelsa_primary border-b-2 text-xs">
                                <tr className="">
                                  <th scope="col" className="py-3">
                                    Name & Description
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Purchase Price of 1 Unit
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Sale Price of 1 Unit
                                  </th>

                                  <th scope="col" className="px-6 py-3">
                                    Quantity
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Measuring Unit
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody className=" text-gray-500">
                                {/* {cartItems.length >= 1 ? (
                          cartItems.map((cartItem, index) => (
                            <tr key={index} className="border-t">
                              <td scope="col" className="">
                                {cartItem.name}
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                  <button
                                    className="inline-flex items-center justify-center p-1 text-sm font-medium h-[1.85rem] w-6 text-gray-500 bg-white border border-gray-300 rounded-l focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                    type="button"
                                    onClick={() => {
                                      handleDecreaseCart(cartItem);
                                    }}
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <div>
                                    <input
                                      type="number"
                                      value={cartItem.cartQuantity}
                                      onChange={(e) =>
                                        handleChangeQuantity({
                                          slug: cartItem.slug,
                                          value: e.target.value,
                                        })
                                      }
                                      className="bg-gray-50 w-14 text-center border border-gray-300 text-gray-600 text-sm focus:outline-none block px-2.5 py-1"
                                      placeholder="1"
                                      required
                                    />
                                  </div>
                                  <button
                                    className="inline-flex items-center justify-center h-[1.85rem] w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                    type="button"
                                    onClick={() => {
                                      handleAddToCart(cartItem);
                                    }}
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                    type="number"
                                    value={cartItem.cartUnitPrice}
                                    onChange={(e) =>
                                      handleChangeUnitPrice({
                                        slug: cartItem.slug,
                                        value: e.target.value,
                                      })
                                    }
                                    className="bg-gray-50 w-32 text-left border border-gray-300 text-gray-600 focus:outline-none text-sm rounded block px-2.5 py-1"
                                  />
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div>
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      handleChangeDiscountPrice({
                                        slug: cartItem.slug,
                                        value: e.target.value,
                                      })
                                    }
                                    className="bg-gray-50 w-32 text-left border border-gray-300 text-gray-600 text-sm rounded focus:outline-none block px-2.5 py-1"
                                  />
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                {dollarUSLocale.format(
                                  Math.round(
                                    cartItem.cartUnitPrice *
                                      cartItem.cartQuantity -
                                      (cartItem.cartUnitPrice *
                                        cartItem.cartQuantity *
                                        cartItem.cartDiscountPrice) /
                                        100
                                  )
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className=" p-2 w-8 h-8 bg-red-600 border border-red-100 rounded-md text-white"
                                  onClick={() => handleRemoveFromCart(cartItem)}
                                >
                                  -
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className="text-center text-sm mt-10">
                            <div>Please select items to add</div>
                          </div>
                        )} */}
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center mb-1">
                              <Field
                                type="checkbox"
                                name="update_stock"
                                className="w-4 h-4 cursor-pointer text-nelsa_primary checked:bg-nelsa_primary bg-gray-100 rounded-xl border-gray-300"
                              />
                              <label className="ml-2 text-xs text-nelsa_primary font-bold">
                                Set Product Price as Ingredient Cost
                              </label>
                            </div>
                            <p className="text-xs text-neutral-400 ml-6">
                              If this option is enabled, product sale price and
                              purchase price will be replaced with ingredient
                              cost
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
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
