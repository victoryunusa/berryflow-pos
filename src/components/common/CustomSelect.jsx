import PropTypes from "prop-types";
import Select from "react-select";
const CustomSelect = ({ value, options, onChange }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => (option.value = value)) : "";
  };

  console.log(defaultValue(options, value));

  return (
    <div className="">
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        isSearchable={true}
        isClearable={true}
        classNames={{
          control: () => "border p-1 rounded-lg mt-1 text-blue-600",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: "black",
            primary: "gray",
          },
        })}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
  // ...
};

export default CustomSelect;
