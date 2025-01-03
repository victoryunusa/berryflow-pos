import { useState, useEffect, useRef } from "react";

const MultipleSelect = ({ options, handleSelectionChange, selectSlug }) => {
  const localStorageKey = `select-${selectSlug}`;
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedSelections = localStorage.getItem(localStorageKey);
    return savedSelections ? JSON.parse(savedSelections) : [];
  });

  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown open state
  const dropdownRef = useRef(null); // Ref to handle clicking outside

  useEffect(() => {
    handleSelectionChange(selectSlug, selectedOptions);
  }, [selectedOptions, selectSlug, handleSelectionChange]);

  useEffect(() => {
    // Close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectChange = (option) => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions.includes(option.value)) {
      // Deselect option if already selected
      setSelectedOptions(
        newSelectedOptions.filter((item) => item !== option.value)
      );
    } else {
      // Select option
      newSelectedOptions.push(option.value);
      setSelectedOptions(newSelectedOptions);
    }
    localStorage.setItem(localStorageKey, JSON.stringify(newSelectedOptions));
  };

  const handleRemovePill = (value) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== value
    );
    setSelectedOptions(newSelectedOptions);
    localStorage.setItem(localStorageKey, JSON.stringify(newSelectedOptions));
  };

  return (
    <div className="w-full relative z-100" ref={dropdownRef}>
      {/* Pills for selected options */}
      <div className="mb-2">
        {selectedOptions.map((selected) => (
          <span
            key={selected}
            className="inline-flex items-center justify-between px-3 py-1 m-1 text-xs font-medium text-white bg-cyan-950 rounded-full"
          >
            {options.find((option) => option.value === selected)?.label}
            <button
              className="ml-1 text-white bg-transparent border-0"
              onClick={() => handleRemovePill(selected)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Select Dropdown */}
      <div>
        <button
          className="w-full px-4 py-3 mt-1 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
        >
          {selectedOptions.length === 0
            ? "Select options"
            : `${selectedOptions.length} option(s) selected`}
        </button>
        {dropdownOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-300 rounded-md max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={`p-2 text-sm cursor-pointer hover:bg-yellow-100 hover:text-yellow-700 ${
                  selectedOptions.includes(option.value)
                    ? "text-yellow-700 font-bold bg-yellow-50"
                    : ""
                }`}
                onClick={() => handleSelectChange(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleSelect;
