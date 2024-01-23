import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as HeIcons from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

import { Dialog } from "primereact/dialog";
import { alertActions } from "../../app/store";
import {
  addIngredient,
  getIngredients,
} from "../../features/ingredients/ingredientsSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const Ingredients = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { ingredients, message, isError } = useSelector(
    (state) => state.ingredients
  );

  const { units } = useSelector((state) => state.units);

  useEffect(() => {
    dispatch(getIngredients());
  }, [message]);

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
    description: Yup.string().required("This field is required!"),
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
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Ingredient successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getIngredients());
      setLoading(false);
      setVisible(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  const toast = useRef(null);

  const acceptFunc = (id) => {
    alert(id);
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: `Do you want to delete this record?`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => acceptFunc(id),
      reject,
    });
  };

  const getSeverity = (status) => {
    switch (status) {
      case "0":
        return "danger";

      case "1":
        return "success";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status === 1 ? "Active" : "Inactive"}
        className={`${
          rowData.status === 1 ? "bg-green-600" : "bg-red-500"
        } text-xs font-manrope w-[3.5rem]`}
        severity={getSeverity(rowData.status)}
      />
    );
  };

  const posBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.display_on_pos_screen === 1 ? "Yes" : "No"}
        className={`${
          rowData.display_on_pos_screen === 1
            ? "text-green-500"
            : "text-red-600"
        } bg-transparent text-xs font-semibold font-manrope w-2/3 `}
        severity={getSeverity(rowData.display_on_pos_screen)}
      />
    );
  };

  const qrBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.display_on_qr_menu === 1 ? "Yes" : "No"}
        className={`${
          rowData.display_on_qr_menu === 1 ? "text-green-500" : "text-red-600"
        } bg-transparent text-xs font-semibold font-manrope w-2/3 `}
        severity={getSeverity(rowData.display_on_qr_menu)}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center justify-center space-x-3">
        <button className="bg-blue-600 p-2 text-xs text-white rounded-md">
          <HeIcons.FaSquarePen size={12} />
        </button>
        <button
          onClick={() => confirmDelete(rowData.id)}
          className="bg-red-600 p-2 text-xs text-white rounded-md"
        >
          <HeIcons.FaTrash size={12} />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Ingredients</h3>
        </div>
        <div>
          <button
            onClick={() => setVisible(true)}
            className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
          >
            Add New
          </button>
          <Toast ref={toast} />
          <ConfirmDialog />

          <Dialog
            header="Add Ingredient"
            visible={visible}
            style={{ width: "40vw" }}
            onHide={() => setVisible(false)}
            className="font-manrope "
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="p-5 w-full">
                  <div className="mt-4">
                    <label className="block text-nelsa_dark_blue text-sm font-semibold">
                      Ingredient Name
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter ingredient name"
                      name="name"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.name && touched.name ? "border-red-500" : ""
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
                          errors.cost && touched.cost ? "border-red-500" : ""
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
                          errors.price && touched.price ? "border-red-500" : ""
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
                          errors.alert_quantity && touched.alert_quantity
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
                    <label className="block text-nelsa_dark_blue text-sm font-semibold">
                      Measurement Unit
                    </label>
                    <Field
                      as="select"
                      name="unit"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.unit && touched.unit ? "border-red-500" : ""
                      } focus:border-blue-950`}
                    >
                      <option value="">Select Option</option>
                      {units.map((unit) => (
                        <option value={unit.id}>
                          {unit.unit_code} - {unit.label}
                        </option>
                      ))}
                    </Field>
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

                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <div className="flex flex-row justify-start my-4"></div>
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
          </Dialog>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg text-xs">
        <DataTable
          value={ingredients}
          stripedRows
          size="small"
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-manrope rounded-lg"
        >
          <Column
            field="name"
            className="w-1/4"
            sortable
            header="Name"
          ></Column>
          <Column field="cost" sortable header="Cost"></Column>
          <Column field="price" sortable header="Price"></Column>
          <Column field="unit.label" sortable header="Unit"></Column>
          <Column
            field="quantity"
            sortable
            header="Available Quantity"
          ></Column>
          <Column
            body={actionBodyTemplate}
            className="w-1/12"
            exportable={false}
            header="Action"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Ingredients;
