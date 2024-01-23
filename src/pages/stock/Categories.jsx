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
  addCategory,
  getCategories,
} from "../../features/category/categoriesSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const Categories = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { categories, message, isError } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const initialValues = {
    label: "",
    category_name: "",
    display_on_pos_screen: "",
    display_on_qr_menu: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Category name is required!"),
    description: Yup.string().required("This field is required!"),
    display_on_pos_screen: Yup.string().required("This field is required!"),
    display_on_qr_menu: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { label, description, display_on_pos_screen, display_on_qr_menu } =
      formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addCategory({
          label,
          description,
          display_on_pos_screen,
          display_on_qr_menu,
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Category successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getCategories());
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
          <h3 className="text-lg font-bold text-gray-700">Categories</h3>
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
            header="Add New Category"
            visible={visible}
            style={{ width: "40vw" }}
            onHide={() => setVisible(false)}
            className="font-manrope"
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
                      Category Name
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter Category name"
                      name="label"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.label && touched.label ? "border-red-500" : ""
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
                      Show on POS Screen
                    </label>
                    <Field
                      as="select"
                      name="display_on_pos_screen"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.display_on_pos_screen &&
                        touched.display_on_pos_screen
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="">Select Option</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Field>
                    <ErrorMessage
                      name="display_on_pos_screen"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-nelsa_dark_blue text-sm font-semibold">
                      Show on QR Menu
                    </label>
                    <Field
                      as="select"
                      name="display_on_qr_menu"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.display_on_qr_menu && touched.display_on_qr_menu
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="">Select Option</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Field>
                    <ErrorMessage
                      name="display_on_qr_menu"
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
          value={categories}
          stripedRows
          paginator
          rows={10}
          size="small"
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-manrope rounded-lg"
        >
          <Column field="label" header="Category Name"></Column>
          <Column field="category_code" header="Category Code"></Column>
          <Column
            body={posBodyTemplate}
            field="display_on_pos_screen"
            header="Show on POS Screen"
          ></Column>
          <Column
            body={qrBodyTemplate}
            field="display_on_qr_menu"
            header="Show on QR Menu"
          ></Column>
          <Column
            field="status"
            body={statusBodyTemplate}
            header="Status"
          ></Column>
          <Column field="created_by" header="Created By"></Column>
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

export default Categories;
