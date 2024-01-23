import React, { useState } from "react";

import * as HeIcons from "react-icons/fa6";
import { useSelector } from "react-redux";

const Selector = (props) => {
  const { countries } = useSelector((state) => state.countries);

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full relative z-50">
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full border bg-white p-3 items-center cursor-pointer justify-between rounded-md"
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25)
            : selected
          : "Choose option"}
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
        {countries?.map((country) => (
          <li
            key={country?.id}
            className={`p-2 text-sm hover:bg-nelsa_primary hover:text-white ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);

                setOpen(false);
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
