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
import AddMeasurementUnit from "../../../components/modals/AddMeasurementUnit";

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
    <>
      <div className="flex flex-col space-y-5">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">
              Measurement Units
            </h3>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-tt_rich_black text-white text-sm rounded-md"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="w-full border p-5 bg-white rounded-lg">
          <DataTable
            value={units}
            stripedRows
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
      {visible && <AddMeasurementUnit setOpenUnit={setVisible} />}
    </>
  );
};

export default MeasurementUnits;
