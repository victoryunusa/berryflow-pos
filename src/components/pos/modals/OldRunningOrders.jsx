import { createPortal } from "react-dom";
import { clsx } from "clsx";

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const RunningOrders = ({ open, setOpen, side = "right" }) => {
  return (
    <div
      id={`dialog-${side}`}
      className="relative z-40"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(!open)}
    >
      <div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "pointer-events-none fixed max-w-full bg-red-700",
              classNames[side]
            )}
          >
            <div
              className={clsx(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                { [closeClassNames[side]]: !open },
                { [openClassNames[side]]: open }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  "flex flex-col h-full overflow-y-scroll p-20 shadow-xl bg-white rounded-r-lg w-96"
                )}
              >
                content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningOrders;
