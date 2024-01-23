import { Field } from "formik";
import React from "react";

const Identity = ({ errors, touched }) => {
  return (
    <div className="">
      <div className="mt-5">
        <label className="block text-h28_dark_green text-md font-semibold mb-1">
          ID Type
        </label>
        <Field
          as="select"
          className="w-full h-12 px-3 text-sm text-neutral-500 placeholder-gray-600 border rounded-md outline-none focus-none"
        >
          <option disabled>Select</option>
          <option value="NIN">National ID</option>
          <option value="PASSPORT">International Passport</option>
          <option value="VOTERS">Voters Card</option>
        </Field>
      </div>
      <div className="mt-5">
        <label className="block text-h28_dark_green text-ms font-semibold mb-1">
          Identification Number
        </label>
        <Field
          type="text"
          id="email"
          placeholder="Enter your ID number"
          autoComplete="off"
          required
          className="w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-h28_dark_green"
        />
      </div>
      <div className="mt-5">
        <label className="block text-h28_dark_green text-ms font-semibold mb-1">
          Expiry Date
        </label>
        <Field
          type="date"
          id="email"
          placeholder="Enter your ID number"
          autoComplete="off"
          className="w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-h28_dark_green"
        />
      </div>
      <div className="mt-4">
        <label className="block text-h28_dark_green text-ms font-semibold mb-1">
          Identification Image
        </label>
        <Field
          type="file"
          accept={"image/jpeg,image/png"}
          required
          className="w-full px-4 py-3 mt-1 border text-black text-sm rounded-lg focus:border-green-600 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Identity;
