import { createPortal } from "react-dom";

const RunningOrders = ({ setOpen }) => {
  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed z-[999] overflow-y-auto">
          <div className="fixed w-full h-full bg-black opacity-40"></div>
          <div className="flex min-h-screen">
            <div className="relative w-72 p-6 md:p-3 mx-auto bg-white rounded-r-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-between gap-5 min-h-screen">
                  <div className="flex justify-between">
                    <h3 className="text-md font-bold text-nelsa_primary">
                      Running Orders
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2 mb-10">
                    <button className="w-full bg-nelsa_primary px-4 py-3 rounded-lg text-white text-xs md:text-md font-semibold  focus-none">
                      Hold List
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full bg-nelsa_primary px-4 py-3 rounded-lg text-white text-xs md:text-md font-semibold  focus-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default RunningOrders;
