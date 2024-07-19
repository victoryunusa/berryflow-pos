import { useState } from "react";
import PropTypes from "prop-types";
import * as HeIcons from "react-icons/fa6";

const OrderSelect = ({ options, handleAddToCart }) => {
  const [inputValue, setInputValue] = useState("");
  //const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  //const selectedItem = options.find((o) => o.value === value);
  //const label = selectedItem?.label ?? "Select Option...";

  return (
    <div className="w-full relative z-10">
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full border bg-white px-3 py-2 items-center cursor-pointer justify-between rounded-md"
      >
        <p>Select one</p>
        <HeIcons.FaChevronDown size={10} />
      </div>
      <ul
        className={`bg-white rounded-lg mt-1 overflow-y-auto absolute z-50 w-full ${
          open ? "max-h-60 border" : "h-0"
        }`}
      >
        <div className="flex flex-row items-center px-2 sticky top-0 bg-white">
          <HeIcons.FaMagnifyingGlass className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            className="placeholder:text-neutral-400 p-2 outline-none w-full"
          />
        </div>
        {options?.map((option) => (
          <li
            key={option?.slug}
            className={`p-2 text-sm hover:bg-nelsa_primary hover:text-white cursor-pointer ${
              option?.name?.toLowerCase().includes(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              //setSelected(option?.name);
              handleAddToCart(option);
              setOpen(false);
            }}
          >
            {option?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

OrderSelect.propTypes = {
  options: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func,
};

export default OrderSelect;
