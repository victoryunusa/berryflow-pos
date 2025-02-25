const SuperModal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 py-20">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] md:w-[600px]">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-base font-bold text-tt_rich_black">{title}</h2>
          <button onClick={onClose} className="text-red-500 text-3xl">
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default SuperModal;
