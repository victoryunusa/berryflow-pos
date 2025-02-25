import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../app/store";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  makeModel: Yup.string()
    .required("Make and Model is required")
    .min(2, "Must be at least 2 characters"),
  licensePlate: Yup.string()
    .required("License Plate is required")
    .min(3, "Must be at least 3 characters"),
  state: Yup.string().required("State is required"),
});

const AddMenu = ({ setOpen }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formValue) => {
    const {
      account_name,
      account_type,
      pos_default,
      initial_balance,
      description,
    } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      //   await dispatch(
      //     addAccount({
      //       account_name,
      //       account_type,
      //       pos_default,
      //       initial_balance,
      //       description,
      //     })
      //   ).unwrap();

      dispatch(
        alertActions.success({
          message: "Account successfully added.",
          showAfterRedirect: true,
        })
      );

      //   dispatch(getAccounts());
      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        makeModel: "",
        licensePlate: "",
        state: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="space-y-5">
          {/* Make and Model Field with AsyncSelect */}
          <div className="">
            <label className="block text-nelsa_gray_3 text-xs font-semibold">
              Menu name
            </label>
            <Field
              type="text"
              placeholder=""
              name="account_name"
              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                errors.account_name && touched.account_name
                  ? "border-red-500"
                  : ""
              } focus:nelsa_gray_3`}
            />
            <ErrorMessage
              name="account_name"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-1/6 px-4 py-3 text-sm font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-500 rounded-lg"
            >
              cancel
            </button>
            <button
              type="submit"
              className="w-1/6 bg-tt_rich_black text-white text-sm font-semibold px-4 py-3 rounded-lg hover:bg-tt_rich_black/90 self-end"
              disabled={isSubmitting}
            >
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddMenu;
