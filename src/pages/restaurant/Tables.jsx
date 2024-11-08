import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link, useNavigate } from "react-router-dom";

//import { Button } from "primereact/button";
import AddTable from "../../components/modals/AddTable";
import QRCode from "react-qr-code";
import { getTables } from "../../features/table/tableSlice";

const Tables = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const { tables, message } = useSelector((state) => state.tables);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch, message]);

  const imageBodyTemplate = (product) => {
    const url = `https://getnelsa.com/${product.slug}`;
    return (
      <QRCode
        size={5}
        style={{ height: "auto", maxWidth: "50%", width: "50%" }}
        value={url}
        viewBox={`0 0 50 50`}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Tables</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <button
              className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
              onClick={() => setOpenAdd(true)}
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-row items-center bg-neutral-100 p-1.5 rounded-lg gap-2 w-4/6 overflow-y-auto">
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>

              <div className="flex flex-row bg-white px-3 py-2 rounded-md text-base font-semibold w-1/6">
                <div>
                  <p>Area One</p>
                </div>
              </div>
            </div>
            <div className="w-2/6">Add Button</div>
          </div>
        </div>
      </div>
      {openAdd && <AddTable open={openAdd} setOpenAdd={setOpenAdd} />}
    </>
  );
};

export default Tables;
