import { useState, useEffect } from "react";

const VariantSelector = ({
  variant,
  index,
  variantOptions,
  handleChangeVariantOption,
}) => {
  const localStorageKey = `variant-${variant.slug}`;
  const defaultOption = variantOptions.length > 0 ? variantOptions[0].slug : "";

  // Retrieve saved option from localStorage or fallback to default
  const [selectedVariant, setSelectedVariant] = useState(() => {
    return localStorage.getItem(localStorageKey) || defaultOption;
  });

  useEffect(() => {
    // Initialize the parent handler with the saved or default value
    handleChangeVariantOption(variant.slug, selectedVariant);
  }, [variant.slug, selectedVariant, handleChangeVariantOption]);

  const handleSelectChange = (e) => {
    const value = e.target.value;

    // Update state and save to localStorage
    setSelectedVariant(value);
    localStorage.setItem(localStorageKey, value);

    // Call the parent handler
    handleChangeVariantOption(variant.slug, value);
  };

  return (
    <select
      id={`variant-${variant.slug}`}
      className="w-full px-4 py-3 mt-1 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none"
      onChange={handleSelectChange}
      value={selectedVariant} // Bind selected value
      required
    >
      <option value="">Select an option</option>
      {variantOptions.map((variant_option) => (
        <option value={variant_option.slug} key={variant_option.slug}>
          {variant_option.label}
        </option>
      ))}
    </select>
  );
};

export default VariantSelector;
