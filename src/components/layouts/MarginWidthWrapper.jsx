const MarginWidthWrapper = ({ children }) => {
  return (
    <div className="flex flex-col md:ml-72 sm:border-r min-h-screen">
      {children}
    </div>
  );
};

export default MarginWidthWrapper;
