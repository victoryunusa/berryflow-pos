import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col pt-10 px-5 md:px-12 space-y-2 bg-zinc-100 flex-grow pb-8">
      {children}
    </div>
  );
};

export default PageWrapper;
