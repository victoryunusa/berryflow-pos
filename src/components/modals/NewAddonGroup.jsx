import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import {
  addVariantOption,
  getVariantOptions,
} from "../../features/variant_option/variantOptionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import OrderSelect from "../common/OrderSelect";
import {
  addItem,
  clearItems,
  getAddonItems,
  removeAddonItem,
} from "../../features/addon_group/addonProductSlice";
import {
  addAddonGroup,
  getAddonGroups,
} from "../../features/addon_group/addonGroupSlice";

const NewAddonGroup = ({ setOpen, open, children }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dispatch = useDispatch();

  const loadProducts = async () => {
    const response = await axios.get(
      `${BaseUrl}/products/load_addon_group_product`,
      config
    );

    setItems(response.data.data);
  };

  console.log(items);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChooseAddonProduct = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveAddon = (cartItem) => {
    dispatch(removeAddonItem(cartItem));
  };

  const addonItems = useSelector(getAddonItems);

  const initialValues = {
    addon_group_name: "",
    multiple_selection: "",
  };

  const validationSchema = Yup.object().shape({
    addon_group_name: Yup.string().required("Name is required!"),
    multiple_selection: Yup.string().required("Option is required!"),
  });

  const closeModal = () => {
    setOpen(false);
    dispatch(clearItems());
  };

  const handleSubmit = async (formValue) => {
    const { addon_group_name, multiple_selection } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addAddonGroup({
          addon_group_name,
          multiple_selection,
          addon_products: addonItems,
          logged_user_id: user?.id,
          logged_user_store_id: user?.branch_id,
          logged_user_vendor_id: user?.vendor_id,
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Add-on group successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getAddonGroups());

      setLoading(false);
      setVisible(false);
      closeModal();
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={closeModal}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div className="relative w-full max-w-xl p-6 md:p-6 mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-base font-bold text-tt_rich_black">
                      New Add-on Group
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form className="w-full">
                          <div className="">
                            <label className="block text-tt_rich_black text-xs font-bold">
                              Add-on group name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter name"
                              name="addon_group_name"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.addon_group_name &&
                                touched.addon_group_name
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="addon_group_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-tt_rich_black text-xs font-semibold">
                              Enable multiple products
                            </label>
                            <Field
                              as="select"
                              name="multiple_selection"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.multiple_selection &&
                                touched.multiple_selection
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            >
                              <option value="">Select</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </Field>
                            <ErrorMessage
                              name="multiple_selection"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div>
                            <div>
                              <p className="text-tt_rich_black/60 text-base font-semibold my-5">
                                Choose Add-on Products
                              </p>
                            </div>
                            <div className=" flex flex-row space-x-3 mt-1">
                              <div className="w-full">
                                <label className="block text-tt_rich_black text-xs font-semibold mb-1">
                                  Search and Add Products
                                </label>
                                <OrderSelect
                                  options={items}
                                  handleAddToCart={handleChooseAddonProduct}
                                />
                              </div>
                            </div>
                            {addonItems.length >= 1 && (
                              <div>
                                <div className="mt-5">
                                  <div className="w-full flex flex-row items-start justify-start gap-3">
                                    <label className="block w-1/2 text-nelsa_gray_3 text-xs font-semibold">
                                      Name & Description
                                    </label>
                                    <label className="block w-1/2 text-nelsa_gray_3 text-xs font-semibold">
                                      Sale Price
                                    </label>
                                  </div>
                                  {addonItems?.map((addon, index) => (
                                    <div
                                      className="flex flex-row gap-3 mt-1"
                                      key={addon.slug}
                                    >
                                      <div className="flex items-center w-1/2 px-4 py-3 mt-1 border text-neutral-500 bg-neutral-100 text-xs rounded-md">
                                        <p className="">{addon.name}</p>
                                      </div>
                                      <div className="flex flex-row items-center w-1/2">
                                        <p className="w-full text-neutral-500 bg-neutral-100  px-4 py-3 mt-1 border text-xs rounded-md">
                                          {addon.price_excluding_tax}
                                        </p>

                                        <button
                                          type="button"
                                          className="flex items-center justify-center text-2xl text-red-600 p-1.5"
                                          onClick={() =>
                                            handleRemoveAddon(addon)
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

                          <div className="flex flex-row justify-end mt-5">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={closeModal}
                                className="w-full px-4 py-3 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-md"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-4 py-3 font-bold bg-tt_rich_black/80 text-[#ffffff] rounded-md flex items-center justify-center"
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

export default NewAddonGroup;
