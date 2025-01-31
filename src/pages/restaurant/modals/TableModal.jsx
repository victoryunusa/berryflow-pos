import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import { getBranches } from "../../../features/branch/branchSlice";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import logo from "../../../assets/images/main_logo.png";

const TableModal = ({ setOpenAdd, table, open }) => {
  const dispatch = useDispatch();
  const printRef = useRef();

  const { user } = useSelector((state) => state.user);
  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find((branch) => branch.id === user.branch_id);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const handleDownloadPDF = async () => {
    const input = printRef.current;
    const buttons = input.querySelectorAll(".export-hide"); // Select elements to hide

    if (input) {
      // Hide buttons
      buttons.forEach((button) => (button.style.display = "none"));

      const canvas = await html2canvas(input, {
        scale: 3, // Higher scale = better quality
      });

      const imgData = canvas.toDataURL("image/png");

      // A5 dimensions in mm
      const pdf = new jsPDF("p", "mm", "a5");
      const imgWidth = 148; // A5 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth - 20, imgHeight - 15); // Adjust margins
      pdf.save(`table-${table.table_name}-details.pdf`);

      // Show buttons again
      buttons.forEach((button) => (button.style.display = "block"));
    }
  };

  const handleDownloadPNG = async () => {
    const input = printRef.current;
    const buttons = input.querySelectorAll(".export-hide"); // Select elements to hide

    if (input) {
      buttons.forEach((button) => (button.style.display = "none"));
      const canvas = await html2canvas(input, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `table-${table.table_name}-details.png`;
      link.click();
      // Show buttons again
      buttons.forEach((button) => (button.style.display = "block"));
    }
  };

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setOpenAdd(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div
              className="relative w-full max-w-lg mx-auto font-br bg-white rounded-md shadow-lg "
              ref={printRef} // Reference for capturing content
            >
              <div className="w-full">
                <div className="flex flex-col justify-center items-center gap-20">
                  <div>
                    <div className="flex flex-col items-center justify-center mt-5 my-5 gap-1">
                      <h1 className="text-4xl font-extrabold">Order & Pay</h1>
                      <h1 className="text-2xl font-bold">
                        {user?.vendor.business_name}
                      </h1>
                      <h2>{activeBranch?.name}</h2>
                      <p className="w-2/3 text-sm capitalize text-center">
                        Address: {activeBranch?.address}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center my-5 gap-5">
                      <span className="flex flex-row items-center gap-4">
                        <span className="flex flex-col items-end text-neutral-600">
                          <p>Table</p>
                          <p>number</p>
                        </span>
                        <span className="font-bold text-5xl">
                          <p>{table?.table_number}</p>
                        </span>
                      </span>
                      <span className="flex flex-row items-center gap-4">
                        <span className="flex flex-col items-end">
                          <p>Section:</p>
                        </span>
                        <span className="font-bold text-xl">
                          {table?.floor_plan?.name}
                        </span>
                      </span>
                    </div>
                    {/* <div className="flex flex-col gap-2 items-center justify-center mb-5 w-full">
                      <p className="text-sm">Powered by: </p>
                      <img className="" src={logo} alt="CaterOS" />
                    </div> */}
                  </div>
                  <div className="bg-[#f35925] flex flex-row w-full px-28 pb-10 justify-center">
                    <div className="flex flex-col w-full py-5 rounded-b-2xl bg-white items-center border-t-4 border-[#f35925] relative -top-10">
                      <h2 className="capitalize font-semibold text-neutral-400 mb-5">
                        Scan with phone camera
                      </h2>
                      <QRCode
                        size={10}
                        style={{
                          height: "auto",
                          maxWidth: "50%",
                          width: "50%",
                        }}
                        value={`https://${user?.vendor.url}.truetab.site`}
                        viewBox={`0 0 70 70`}
                      />
                      <div className="flex flex-col gap-1 items-center justify-center my-5 w-full">
                        <p className="text-sm">Powered by: </p>
                        <img className="w-28" src={logo} alt="CaterOS" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download PDF Button */}
                <div className="mt-1 flex flex-row items-center justify-center gap-3 my-10">
                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 export-hide"
                  >
                    Download as PDF
                  </button>
                  <button
                    onClick={handleDownloadPNG}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 export-hide"
                  >
                    Download as PNG
                  </button>
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

export default TableModal;
