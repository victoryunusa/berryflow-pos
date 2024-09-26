import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as FaIcons from "react-icons/fa6";
import Paypal from "../../components/modals/payment_methods/Paypal";
import Paystack from "../../components/modals/payment_methods/Paystack";
import Bloc from "../../components/modals/payment_methods/Bloc";
import Stripe from "../../components/modals/payment_methods/Stripe";
import Flutterwave from "../../components/modals/payment_methods/Flutterwave";
import BankTransfer from "../../components/modals/payment_methods/BankTransfer";
import { getPaymentMethods } from "../../features/payment_method/paymentMethodSlice";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payment_methods } = useSelector((state) => state.payment_methods);

  const paymentMethodsIndex = payment_methods?.filter(
    (payment_method) => payment_method.activate_on_onboarding === 1
  );

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  const [openStripe, setOpenStripe] = useState(false);
  const [openPaypal, setOpenPaypal] = useState(false);
  const [openPaystack, setOpenPaystack] = useState(false);
  const [openBloc, setOpenBloc] = useState(false);
  const [openBankTransfer, setOpenBankTransfer] = useState(false);
  const [openFlutterwave, setOpenFlutterwave] = useState(false);

  const handlePaymentModal = (method) => {
    switch (method) {
      case "PAYPAL":
        setOpenPaypal(true);
        break;
      case "PAYSTACK":
        setOpenPaystack(true);
        break;
      case "STRIPE":
        setOpenStripe(true);
        break;
      case "BLOC":
        setOpenBloc(true);
        break;
      case "FLUTTERWAVE":
        setOpenFlutterwave(true);
        break;
      default:
        setOpenBankTransfer(true);
    }
  };

  const next = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col align-center">
        <div className="flex flex-col items-center my-10">
          <h3 className="text-2xl font-bold text-nelsa_primary">
            Payment method setup
          </h3>
          <p className="text-sm text-neutral-500 mt-2 text-center">
            Customers will choose one of following payment methods to pay you.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          {paymentMethodsIndex?.map((payment_method) => (
            <div
              className="bg-white p-5  md:m-2 rounded-md w-full md:w-[30rem]"
              key={payment_method.slug}
            >
              <div className="flex flex-row justify-between items-center">
                <label className="block text-nelsa_primary text-sm font-normal">
                  {payment_method.name}
                </label>
                {payment_method.status == 1 ? (
                  <span className="flex items-center justify-center w-6 h-6 bg-green-400 rounded-full text-white">
                    <FaIcons.FaCheck size="10" />
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handlePaymentModal(payment_method.payment_constant)
                    }
                    className="bg-yellow-100 px-2 py-1 rounded-md"
                  >
                    <p className="text-xs text-yellow-600">Setup</p>
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center mt-4 w-full md:w-[30rem]">
            <button
              type="submit"
              onClick={next}
              className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary text-[#ffffff] rounded-md"
            >
              Save
            </button>
          </div>
          {/* <div className="my-3">
                <button className="text-neutral-500">Skip</button>
              </div> */}
        </div>
      </div>
      {openPaypal && <Paypal open={openPaypal} setOpen={setOpenPaypal} />}
      {openPaystack && (
        <Paystack open={openPaystack} setOpen={setOpenPaystack} />
      )}
      {openBloc && <Bloc open={openBloc} setOpen={setOpenBloc} />}
      {openStripe && <Stripe open={openStripe} setOpen={setOpenStripe} />}
      {openFlutterwave && (
        <Flutterwave open={openFlutterwave} setOpen={setOpenFlutterwave} />
      )}
      {openBankTransfer && (
        <BankTransfer open={openBankTransfer} setOpen={setOpenBankTransfer} />
      )}
    </>
  );
};

export default PaymentGateway;
