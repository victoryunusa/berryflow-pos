import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as HeIcons from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

import { Dialog } from "primereact/dialog";
import { alertActions } from "../../app/store";
import {
  addSupplier,
  getSuppliers,
  reset,
} from "../../features/suppliers/suppliersSlice";
import { prettyDate } from "../../functions/functions";

// const suppliers = [
//   {
//     name: "Agrilet Limited",
//     code: "AGR100992",
//     status: "Active",
//     created_on: "2015-12-09",
//     updated_on: "2015-12-09",
//     created_by: "Victor Yunusa",
//   },
// ];

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const Suppliers = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { suppliers, message, isError } = useSelector(
    (state) => state.suppliers
  );

  useEffect(() => {
    dispatch(getSuppliers());
  }, []);

  const initialValues = {
    email: "",
    supplier_name: "",
    phone: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    supplier_name: Yup.string().required("Supplier name is required!"),
    address: Yup.string().required("This field is required!"),
    phone: Yup.string()
      .required("This field is required!")
      .max(11, "Phone number cannot be more than 11 characters"),
    email: Yup.string()
      .required("This field is required!")
      .email("Please enter a valid email"),
  });

  const handleSubmit = async (formValue) => {
    const { supplier_name, address, phone, email } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addSupplier({
          supplier_name,
          address,
          phone,
          email,
          logged_user_store_id: user.id,
          vendor_id: user.vendor_id,
          branch_id: user.branch_id,
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Supplier successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getSuppliers());
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center justify-center gap-3">
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

  const dateBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center">
        {prettyDate(rowData.created_at)}
      </div>
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case "0":
        return "danger";

      case "1":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status_data.label}
        className={`${
          rowData.status === 1 ? "bg-green-600" : "bg-red-500"
        } text-xs font-manrope w-[3.5rem]`}
        severity={getSeverity(rowData.status)}
      />
    );
  };

  const dt = useRef(null);

  const cols = [
    { field: "name", header: "Supplier Name" },
    { field: "supplier_code", header: "Supplier Code" },
    { field: "status", header: "Status" },
    { field: "created_by", header: "Created By" },
    { field: "created_at", header: "Created Date" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, suppliers);
        const docName = `suppliers_${new Date().getTime()}.pdf`;
        doc.save(docName);
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(suppliers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "suppliers");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex flex-row items-center justify-end gap-2">
      <button
        className="flex items-center justify-center p-2 bg-nelsa_primary text-white rounded-lg"
        onClick={() => exportCSV(false)}
      >
        <HeIcons.FaFileCsv size={20} />
      </button>

      <button
        className="flex items-center justify-center p-2 bg-green-600 text-white rounded-lg"
        onClick={exportExcel}
      >
        <HeIcons.FaFileExcel size={20} />
      </button>
      <button
        className="flex items-center justify-center p-2 bg-red-700 text-white rounded-lg"
        onClick={exportPdf}
      >
        <HeIcons.FaFilePdf size={20} />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Suppliers</h3>
        </div>
        <div>
          <button
            onClick={() => setVisible(true)}
            className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
          >
            Add
          </button>

          <Toast ref={toast} />
          <ConfirmDialog />

          <Dialog
            header="Add New Supplier"
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
                      Supplier Name
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter supplier name"
                      name="supplier_name"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.supplier_name && touched.supplier_name
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="supplier_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-nelsa_dark_blue text-sm font-semibold">
                      Contact Number
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter contact number"
                      name="phone"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.phone && touched.phone ? "border-red-500" : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-nelsa_dark_blue text-sm font-semibold">
                      Email Address
                    </label>
                    <Field
                      type="text"
                      id="email"
                      placeholder="Email"
                      autoComplete="off"
                      name="email"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.email && touched.email ? "border-red-500" : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-nelsa_dark_blue text-sm font-semibold">
                      Address
                    </label>
                    {/* <Field
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      name="password"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    /> */}
                    <Field
                      name="address"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.address && touched.address
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                      component={CustomInputComponent}
                      placeholder="Address"
                    />

                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <div className="flex flex-row justify-start my-4">
                      {/* <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      required
                      className="w-4 h-4 text-nelsa_dark_blue checked:bg-nelsa_dark_blue bg-gray-100 rounded-lg border-gray-300"
                    />
                    <label className="ml-2 text-sm text-neutral-500">
                      I agree to terms and conditions
                    </label>
                  </div>
                   <Link
                    to="/auth/forgot-password"
                    className="text-sm text-zinc-700 hover:text-zinc-900"
                  >
                    Forgot your password?
                  </Link> */}
                    </div>
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
      {/* <div>
        <span>
          <h1 className="text-2xl font-bold">Create Your First Perk</h1>
          <p className="underline cursor-pointer">Click here to create one</p>
        </span>
      </div> */}
      <div className="bg-white p-3 md:p-8 rounded-lg text-xs">
        <DataTable
          value={suppliers}
          stripedRows
          paginator
          rows={10}
          size="small"
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-manrope"
        >
          <Column
            field="name"
            className="w-1/4"
            sortable
            header="Supplier Name"
          ></Column>
          <Column
            field="supplier_code"
            sortable
            header="Supplier Code"
          ></Column>

          <Column
            field="created_at"
            dataType="date"
            sortable
            header="Created On"
            body={dateBodyTemplate}
          ></Column>
          <Column
            field="updated_at"
            dataType="date"
            sortable
            header="Updated On"
            body={dateBodyTemplate}
          ></Column>
          <Column
            field="status"
            sortable
            header="Status"
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="created_user.full_name"
            sortable
            header="Created By"
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

export default Suppliers;
