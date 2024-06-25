import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";

import { addRole, getRoles } from "../../features/role/roleSlice";
import { useEffect } from "react";
import { getModules } from "../../features/master_actions/modulesSlice";
import { removeUnderscoreAndCapitalize } from "../../functions/functions";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddRole = (props) => {
  const { setOpenRole } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { modules } = useSelector((state) => state.modules);

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  const initialValues = {
    name: "",
    permissions: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Role name is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name, permissions } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addRole({
          name,
          permissions,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Role successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getRoles());
      setLoading(false);
      setOpenRole(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  const separateValues = (value) => {
    return value.split(",");
  };

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setOpenRole(false)}
          ></div>
          <div className="flex items-center min-h-screen px-2 py-2">
            <div className="relative w-full max-w-xl p-6 md:p-6 mx-auto bg-white rounded-md shadow-lg font-manrope">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Add Role
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
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Role Name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter Role name"
                              name="name"
                              className={`w-full px-4 py-3 mt-1 border text-gray-500 text-sm rounded-md focus:outline-none ${
                                errors.name && touched.name
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="mt-4 h-96 overflow-y-scroll w-full bg-neutral-50 rounded-lg p-2">
                            {modules?.map((module) => {
                              return (
                                <div
                                  key={module.id}
                                  className="flex flex-col w-full mb-5 text-neutral-700 text-md font-semibold"
                                >
                                  {removeUnderscoreAndCapitalize(module.name)}
                                  <div className="flex flex-wrap w-full gap-5 ">
                                    {separateValues(module.actions).map(
                                      (action, index) => (
                                        <label
                                          key={index}
                                          className="flex gap-2 text-sm mt-1 text-neutral-500 font-normal"
                                        >
                                          <Field
                                            type="checkbox"
                                            name="permissions"
                                            value={module.name + "|" + action}
                                          />
                                          {removeUnderscoreAndCapitalize(
                                            action
                                          )}
                                        </label>
                                      )
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-baseline justify-between">
                            {loading ? (
                              <button
                                type="submit"
                                className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary/60 text-[#ffffff] rounded-md flex items-center justify-center"
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

export default AddRole;
