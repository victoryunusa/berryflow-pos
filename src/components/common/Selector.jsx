import { useState } from "react";
import PropTypes from "prop-types";
import * as HeIcons from "react-icons/fa6";

const Selector = ({ options, name, value, onChange, setFieldValue }) => {
  const selectedItem = options.find((o) => o.value === value);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(
    selectedItem ? selectedItem.value : ""
  );
  const [open, setOpen] = useState(false);

  //const label = selectedItem?.label ?? "Select Option...";

  return (
    <div className="w-full relative z-5">
      <div
        onClick={() => setOpen(!open)}
        className={`flex w-full border bg-white px-3 py-2 items-center cursor-pointer justify-between rounded-md `}
      >
        <p className="text-xs text-gray-500">
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25)
              : selected
            : "Select option"}
        </p>
        <HeIcons.FaChevronDown size={10} />
      </div>
      <ul
        className={`bg-white rounded-lg mt-1 overflow-y-auto absolute z-[200] w-full ${
          open ? "max-h-60 border" : "h-0"
        }`}
      >
        <div className="flex flex-row items-center px-2 sticky top-0 bg-white text-xs">
          <HeIcons.FaMagnifyingGlass className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            className="placeholder:text-neutral-400 text-neutral-500 p-2 outline-none w-full"
          />
        </div>
        {options?.map((option) => (
          <li
            key={option?.value}
            className={`p-2 text-xs text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 cursor-pointer ${
              option?.label?.toLowerCase().includes(inputValue)
                ? "block"
                : "hidden"
            } ${
              option?.label?.toLowerCase() == selected.toLowerCase()
                ? "font-bold"
                : ""
            }`}
            onClick={() => {
              setSelected(option?.label);
              setFieldValue(name, option?.value);
              setOpen(false);
            }}
            onChange={(selected) => onChange(selected)}
          >
            {option?.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

Selector.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.any,
  value: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
};

export default Selector;
