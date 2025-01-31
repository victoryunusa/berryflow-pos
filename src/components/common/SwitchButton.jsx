import { useField } from "formik";
import PropTypes from "prop-types";

const SwitchButton = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const toggleSwitch = () => {
    helpers.setValue(!field.value); // Toggle the value
  };

  return (
    <div className="flex items-center gap-2">
      {/* Switch Button */}
      <div
        className={`relative w-10 h-6 ${
          field.value ? "bg-tt_rich_black" : "bg-gray-300"
        } rounded-full cursor-pointer transition-colors`}
        onClick={toggleSwitch}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
            field.value ? "translate-x-4" : ""
          }`}
        ></div>
      </div>

      {/* Label */}
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="mr-3 text-xs text-tt_rich_black font-bold"
        >
          {label}
        </label>
      )}

      {/* Error Message */}
      {meta.touched && meta.error && (
        <div className="ml-3 text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

SwitchButton.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default SwitchButton;
