import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getBillCounters } from "../../../features/bill_counter/billCounterSlice";
import { alertActions } from "../../../app/store";
import { useNavigate } from "react-router";
import { openBusinessRegister } from "../../../features/business_register/billingCounterStatSlice";
import { setActiveRegister } from "../../../features/pos/businessRegisterSlice";

const AddBusinessRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bill_counters } = useSelector((state) => state.bill_counters);
  const [billCounter, setBillCounter] = useState("");

  const [loading, setLoading] = useState(false);

  const initialValues = {
    opening_amount: 0,
  };

  const validationSchema = Yup.object().shape({
    opening_amount: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { opening_amount } = formValue;
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      const response = await dispatch(
        openBusinessRegister({
          opening_amount,
          billing_counter: billCounter,
        })
      ).unwrap();

      // Update the active register in Redux
      console.log(response);
      dispatch(setActiveRegister(response));

      navigate("/pos", { replace: true });
    } catch (error) {
      dispatch(alertActions.error(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getBillCounters());
  }, []);
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Open register</h3>
          <p className="text-xs text-neutral-400">
            Select the plan that you want to subscribe to
          </p>
        </div>
        {/* <div className="flex flex-row gap-3">
          <button className="flex items-center px-4 py-3 rounded-md bg-blue-700 text-white text-xs font-bold">
            Open register & continue
          </button>
        </div> */}
      </div>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col bg-white rounded-lg p-10 gap-5 border">
              <div className="flex flex-col">
                <div>
                  <h5 className="text-sm font-bold">Choose Bill Counter</h5>
                </div>
                <div className="flex flex-col md:flex-row flex-wrap gap-3 mt-4">
                  {bill_counters?.map((bill_counter, index) => (
                    <div
                      onClick={() => setBillCounter(bill_counter.slug)}
                      className={`w-full md:w-1/5 border  hover:border-green-300  hover:bg-green-50  hover:text-green-600 rounded-md p-5 cursor-pointer ${
                        billCounter === bill_counter.slug
                          ? "bg-green-50 text-green-600 border-green-300"
                          : "bg-neutral-100 text-neutral-600 border-neutral-200"
                      }`}
                      key={index}
                    >
                      <h3 className="text-sm font-semibold">
                        {bill_counter.billing_counter_code}-
                        {bill_counter.counter_name}
                      </h3>
                      <span className="text-xs">
                        {bill_counter.register !== null ? "Occupied" : "Free"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold">Cash at hand</label>
                <Field
                  className="w-full md:w-1/5 px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none"
                  type="number"
                  name="opening_amount"
                />
              </div>
              <div className="flex items-baseline justify-between">
                {loading ? (
                  <button
                    type="submit"
                    className="w-full md:w-1/5 px-4 py-3 text-sm font-bold bg-[#7893d3] text-[#ffffff] rounded-md flex items-center justify-center"
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
                    className="w-full md:w-1/5 px-4 py-3 text-sm font-bold bg-nelsa_primary text-[#ffffff] rounded-md"
                  >
                    Open register & continue
                  </button>
                )}
              </div>
              {/* <div className="flex flex-row gap-3">
                <button className="w-full md:w-1/5 flex items-center justify-center px-4 py-3 rounded-md bg-blue-700 text-white text-xs font-bold">
                  Open register & continue
                </button>
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBusinessRegister;
