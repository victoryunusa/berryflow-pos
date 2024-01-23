import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Sidebar from "../Sidebar/Sidebar";
import * as HeIcons from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router";
import {
  addMeasurementUnit,
  getMeasurementUnits,
} from "../../../features/units/unitsSlice";
import { alertActions } from "../../../app/store";

const MeasurementUnits = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const { units, message } = useSelector((state) => state.units);

  useEffect(() => {
    dispatch(getMeasurementUnits());
  }, [message]);

  const initialValues = {
    label: "",
    unit_code: "",
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Unit name is required!"),
    unit_code: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { label, unit_code } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addMeasurementUnit({
          label,
          unit_code,
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Measurement successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getMeasurementUnits());
      setLoading(false);
      setVisible(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row space-x-3">
        <button className="bg-blue-600 p-2 text-xs text-white rounded-md">
          <HeIcons.FaSquarePen size={12} />
        </button>
        <button className="bg-red-600 p-2 text-xs text-white rounded-md">
          <HeIcons.FaTrash size={12} />
        </button>
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

      case "renewal":
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

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">
            Settings/Measurements
          </h3>
        </div>
      </div>
      <div className="flex flex-row space-x-5">
        {/* <div className="w-1/4 p-5 bg-white rounded-lg">
          <Sidebar />
        </div> */}
        <div className="w-full p-10 bg-white rounded-lg">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row justify-end items-center">
              <div>
                <button
                  onClick={() => setVisible(true)}
                  className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
                >
                  Add new
                </button>
                <Toast ref={toast} />
                <ConfirmDialog />

                <Dialog
                  header="Add Measurement Unit"
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
                            Unit Name
                          </label>
                          <Field
                            type="text"
                            placeholder="Enter Unit Name"
                            name="label"
                            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                              errors.label && touched.label
                                ? "border-red-500"
                                : ""
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
                            Unit Code
                          </label>
                          <Field
                            type="text"
                            placeholder="Enter Unit Code"
                            name="unit_code"
                            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                              errors.unit_code && touched.unit_code
                                ? "border-red-500"
                                : ""
                            } focus:border-blue-950`}
                          />
                          <ErrorMessage
                            name="unit_code"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex items-baseline justify-between mt-5">
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
            <div className="bg-white rounded-lg text-xs">
              <DataTable
                value={units}
                stripedRows
                size="small"
                tableStyle={{ minWidth: "50rem" }}
                className="text-sm font-manrope rounded-lg"
              >
                <Column field="label" header="Name"></Column>
                <Column field="unit_code" header="Code"></Column>
                <Column
                  field="status"
                  body={statusBodyTemplate}
                  header="Status"
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
        </div>
      </div>
    </div>
  );
};

export default MeasurementUnits;
