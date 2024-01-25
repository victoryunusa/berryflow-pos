import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";
import Selector from "./Selector";

const FormikSelect = ({ options, name }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (val) => setFieldValue(name, val);
  return (
    <div>
      <Selector options={options} onChange={handleChange} value={field.value} />
    </div>
  );
};

FormikSelect.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.any,
  // ...
};

export default FormikSelect;
