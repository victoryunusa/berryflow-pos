import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as HeIcons from "react-icons/fa6";

const OrderSelect = ({ options, handleAddToCart }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const orderSelectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        orderSelectRef.current &&
        !orderSelectRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative z-100" ref={orderSelectRef}>
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full border bg-white px-3 py-3 items-center cursor-pointer justify-between rounded-md"
      >
        <p className="text-xs text-neutral-500">Select option</p>
        <HeIcons.FaChevronDown size={10} />
      </div>
      <ul
        className={`bg-white rounded-lg mt-1 overflow-y-auto absolute z-[999] w-full ${
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
            key={option?.slug}
            className={`px-2 py-2.5 text-xs text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 cursor-pointer  ${
              option?.name?.toLowerCase().includes(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
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
