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
import {
  addIngredientItem,
  decreaseOrderItem,
  getProductIngredientItems,
  getPurchaseIngredientItemTotals,
  removeOrderItem,
  updateDiscountPrice,
  updateMeasurementUnit,
  updateQuantity,
  updateUnitPrice,
} from "../../../features/products/productIngedientSlice";

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
  let dollarUSLocale = Intl.NumberFormat("en-US");

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [addonGroups, setAddonGroups] = useState([]);
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  //   const [image, setImage] = useState(null);

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(discountCodes);

  const loadSuppliers = async () => {
    const response = await axios.get(
      `${BaseUrl}/suppliers/loadSuppliers`,
      config
    );
    setSuppliers(response.data.suppliers);
  };

  const loadDiscountCodes = async () => {
    const response = await axios.get(
      `${BaseUrl}/discounts/loadDiscountCodes`,
      config
    );
    setDiscountCodes(response.data);
  };

  const loadAddonGroups = async () => {
    const response = await axios.get(
      `${BaseUrl}/addon_groups/loadAddonGroups`,
      config
    );
    //console.log(response.data.variant_options);
    setAddonGroups(response.data);
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

  const loadMeasurementUnits = async () => {
    const response = await axios.get(
      `${BaseUrl}/units/loadMeasurementUnits`,
      config
    );
    setMeasurementUnits(response.data);
  };

  const dispatch = useDispatch();

  //const { variant_items } = useSelector((state) => state.variant_items);
  const variantItems = useSelector(getVariantOptions);
  const productIngredientItems = useSelector(getProductIngredientItems);

  const { ingredientItemsTotalSale, ingredientItemsTotalPurchase } =
    useSelector((state) => state.product_ingredient_items);

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
    loadMeasurementUnits();
    loadAddonGroups();
    loadSuppliers();
    loadDiscountCodes();
  }, []);

  useEffect(() => {
    dispatch(getPurchaseIngredientItemTotals());
  }, [productIngredientItems, dispatch]);

  //Add product to cart
  const handleAddProductVariant = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveVariant = (cartItem) => {
    dispatch(removeVariantItem(cartItem));
  };

  const handleChangeMeasurementUnit = (slug, value) => {
    console.log({ slug, value });
    dispatch(updateMeasurementUnit({ slug, unit_slug: value }));
  };

  const handleChangeVariantOption = (slug, value) => {
    console.log({ slug, value });
    dispatch(updateVariantOption({ slug, variant_option: value }));
  };

  //Add product to cart
  const handleAddToCart = (item) => {
    dispatch(addIngredientItem(item));
  };

  //Decrease product quantity
  const handleDecreaseCart = (item) => {
    dispatch(decreaseOrderItem(item));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeOrderItem(cartItem));
  };

  const handleChangeUnitPrice = ({ slug, value }) => {
    dispatch(updateUnitPrice({ slug, unit_price: value }));
  };

  const handleChangeDiscountPrice = ({ slug, value }) => {
    dispatch(updateDiscountPrice({ slug, discount_price: value }));
  };

  const handleChangeQuantity = ({ slug, value }) => {
    dispatch(updateQuantity({ slug, new_quantity: value }));
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

  var newSuppliers = suppliers.map(function (obj) {
    return { value: obj.slug, label: obj.name };
  });

  // var newVariantOptions = variantOptions.map(function (obj) {
  //   return { value: obj.slug, label: obj.label };
  // });

  var newDiscountCodes = discountCodes.map(function (obj) {
    return { value: obj.slug, label: obj.discount_code + " - " + obj.label };
  });

  var newAddonGroups = addonGroups.map(function (obj) {
    return { value: obj.slug, label: obj.label };
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
    purchase_price: "",
    sale_price: "",
    sale_price_including_tax: "",
    par_level: "",
    stock_product: "",
    tax_option: "",
    selling_method: "",
    description: "",
    images: null,
    is_addon_product: false,
    is_ingredient_price: false,
    supplier: "",
    discount_code: "",
    alert_quantity: "",
    quantity: "",
    parent_variant_option: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required!"),
    purchase_price: Yup.string().required("This field is required!"),
    sale_price: Yup.string().required("This field is required!"),
    category: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const {
      name,
      cost,
      price,
      category,
      storage_unit,
      ingredient_unit,
      product_code,
      costing_method,
      storage_to_ingredient,
      purchase_price,
      sale_price,
      sale_price_including_tax,
      par_level,
      stock_product,
      tax_option,
      selling_method,
      description,
      images,
      is_addon_product,
      is_ingredient_price,
      supplier,
      discount_code,
      alert_quantity,
      quantity,
      parent_variant_option,
    } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addProduct({
          product_name: name,
          cost,
          price,
          category,
          storage_unit,
          ingredient_unit,
          product_code,
          costing_method,
          storage_to_ingredient,
          purchase_price,
          sale_price,
          sale_price_including_tax: sale_price,
          par_level,
          stock_product,
          tax_code: tax_option,
          selling_method,
          description,
          images,
          is_addon_product: is_addon_product == true ? "1" : "0",
          is_ingredient_price: is_ingredient_price == true ? "1" : "0",
          supplier,
          discount_code,
          alert_quantity,
          quantity,
          parent_variant_option,
          ingredients: productIngredientItems,
          addon_group_values: selectedValues,
          variants: variantItems,
          logged_user_id: user?.id,
          logged_user_store_id: user?.branch_id,
          logged_user_vendor_id: user?.vendor_id,
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
          <div className="flex flex-col w-full">
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
                          } focus:border-nelsa_primary`}
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
                          options={newSuppliers}
                          value={values.supplier}
                          setFieldValue={setFieldValue}
                          name="supplier"
                        />
                        <ErrorMessage
                          name="supplier"
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
                          options={newDiscountCodes}
                          value={values.discount_code}
                          setFieldValue={setFieldValue}
                          name="discount_code"
                        />
                        <ErrorMessage
                          name="discount_code"
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
                          name="purchase_price"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.purchase_price && touched.purchase_price
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="purchase_price"
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
                          name="sale_price"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.sale_price && touched.sale_price
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="sale_price"
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
                          value={values.sale_price}
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
                          type="number"
                          placeholder=""
                          name="quantity"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.quantity && touched.quantity
                              ? "border-red-500"
                              : ""
                          } focus:border-nelsa_primary`}
                        />
                        <ErrorMessage
                          name="quantity"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-nelsa_primary text-xs font-semibold">
                          Low Quantity Alert
                        </label>
                        <Field
                          type="number"
                          placeholder=""
                          name="alert_quantity"
                          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                            errors.cost && touched.alert_quantity
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
                              <div className="mt-4">
                                <label className="block text-nelsa_primary text-xs font-semibold">
                                  Variant Option for Current Product
                                </label>
                                <select
                                  name="billing_type"
                                  className={`w-1/2 px-3 py-2.5 mt-1 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none`}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "parent_variant_option",
                                      e.target.value
                                    )
                                  }
                                  // onChange={(e) => setBillingType(e.target.value)}
                                >
                                  <option value="">
                                    Select variant option
                                  </option>
                                  {variantOptions.map(
                                    (variant_option, index) => (
                                      <option
                                        value={variant_option.slug}
                                        key={index}
                                      >
                                        {variant_option.label}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className="mt-5">
                                <div className="w-full flex flex-row items-start justify-start gap-3">
                                  <label className="block w-1/3 text-nelsa_primary text-xs font-semibold">
                                    Variant Option
                                  </label>
                                  <label className="block w-1/3 text-nelsa_primary text-xs font-semibold">
                                    Name & Description
                                  </label>
                                  <label className="block w-1/3 text-nelsa_primary text-xs font-semibold">
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
                                options={newAddonGroups}
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
                                handleAddToCart={handleAddToCart}
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

                                  <th scope="col" className="px-4 py-3">
                                    Quantity
                                  </th>
                                  <th scope="col" className="px-4 py-3">
                                    Measuring Unit
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody className=" text-gray-500">
                                {productIngredientItems.length >= 1 ? (
                                  productIngredientItems.map(
                                    (cartItem, index) => (
                                      <tr key={index} className="border-t">
                                        <td scope="col" className="">
                                          {cartItem.name}
                                        </td>

                                        <td scope="col" className="px-6 py-3">
                                          <div className="flex flex-row items-center gap-2">
                                            <input
                                              type="number"
                                              disabled
                                              value={cartItem.cartPurchasePrice}
                                              className="bg-gray-50 w-32 text-left border border-gray-300 text-gray-600 focus:outline-none text-sm rounded block px-2.5 py-1"
                                            />
                                          </div>
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                          <div>
                                            <input
                                              type="number"
                                              disabled
                                              value={cartItem.cartSalePrice}
                                              className="bg-gray-50 w-32 text-left border border-gray-300 text-gray-600 text-sm rounded focus:outline-none block px-2.5 py-1"
                                            />
                                          </div>
                                        </td>
                                        <td scope="col" className="px-4 py-3">
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
                                        <td scope="col" className="px-4 py-3">
                                          <select
                                            name="billing_type"
                                            className={`w-full px-3 py-2.5 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none`}
                                            onChange={(e) =>
                                              handleChangeMeasurementUnit(
                                                cartItem.slug,
                                                e.target.value
                                              )
                                            }
                                            // onChange={(e) => setBillingType(e.target.value)}
                                          >
                                            <option value="">Select</option>
                                            {measurementUnits.map(
                                              (unit, index) => (
                                                <option
                                                  value={unit.slug}
                                                  key={index}
                                                >
                                                  {unit.unit_code}-{unit.label}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            className=" text-red-600 font-bold text-lg"
                                            onClick={() =>
                                              handleRemoveFromCart(cartItem)
                                            }
                                          >
                                            x
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  )
                                ) : (
                                  <div className="text-center text-sm mt-10">
                                    <div>Please select items to add</div>
                                  </div>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="flex flex-row gap-5 my-5">
                            <div className="flex flex-col w-1/3">
                              <h3 className="text-sm text-neutral-500 font-semibold">
                                Total Ingredient Purchase Price
                              </h3>
                              <p>{ingredientItemsTotalPurchase}</p>
                            </div>
                            <div className="flex flex-col w-2/3">
                              <h3 className="text-sm text-neutral-500 font-semibold">
                                Total Ingredient Selling Price Excluding Tax
                              </h3>
                              <p>{ingredientItemsTotalSale}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center mb-1">
                              <SwitchButton
                                name="is_ingredient_price"
                                label="Set Product Price as Ingredient Cost"
                              />
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
