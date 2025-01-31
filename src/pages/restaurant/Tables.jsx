import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as HeIcons from "react-icons/fa6";
//import { Link, useNavigate } from "react-router-dom";

//import { Button } from "primereact/button";
import AddTable from "../../components/modals/AddTable";
import QRCode from "react-qr-code";
import { getTables } from "../../features/table/tableSlice";
import ScrollableTabBar from "../../components/common/ScrollableTabBar";
import AddArea from "../../components/modals/AddArea";
import { getAreas } from "../../features/area/areaSlice";
import TableModal from "./modals/TableModal";

const Tables = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [openAddArea, setOpenAddArea] = useState(false);
  const { tables } = useSelector((state) => state.tables);
  const { areas } = useSelector((state) => state.areas);

  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(0);

  const filteredTables = tables.filter(
    (table) =>
      table.floor_plan_id && table.floor_plan_id === areas[activeTab]?.id
  );

  console.log(filteredTables);

  const [selectedTable, setSelectedTable] = useState(null);

  const handleEditClick = (account) => {
    setSelectedTable(account);
    setOpenTable(true);
  };

  const closeModal = () => {
    setOpenTable(false);
    setSelectedTable(null);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

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
            <p className="text-xs text-neutral-400">List of tables added</p>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          {areas?.length > 0 ? (
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-row w-full gap-5">
                <div className="w-1/3">
                  <ScrollableTabBar
                    tabs={areas}
                    activeTabIndex={activeTab}
                    onTabClick={handleTabClick}
                  />
                </div>

                <div>
                  <button
                    className="px-3 py-2 bg-tt_rich_black text-white font-semibold text-sm rounded-md"
                    onClick={() => setOpenAddArea(true)}
                  >
                    Add Section
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="px-3 py-2 bg-tt_rich_black text-white font-semibold text-sm rounded-md"
                  onClick={() => setOpenAdd(true)}
                >
                  Add Table
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 py-3">
                {filteredTables?.map((table) => (
                  <div
                    key={table.slug}
                    className="flex flex-col bg-white border rounded-lg p-5"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <QRCode
                        size={5}
                        style={{
                          height: "auto",
                          maxWidth: "50%",
                          width: "50%",
                        }}
                        value={table.slug}
                        viewBox={`0 0 70 70`}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold">
                        {table.table_name} {" - "} {table.table_number}
                      </h2>
                      <h2 className="text-lg font-bold">
                        Seats: {table.table_number}
                      </h2>
                      <div className="flex flex-row gap-2 w-full">
                        <button
                          className="flex flex-row p-1 rounded bg-blue-600 gap-1 w-1/2 items-center justify-center"
                          onClick={() => handleEditClick(table)}
                        >
                          <HeIcons.FaDownload
                            size={14}
                            className="text-white"
                          />
                          <span className="text-white font-semibold">
                            Download
                          </span>
                        </button>
                        <button className="flex flex-row p-1.5 rounded bg-tt_rich_black gap-1 w-1/2 items-center justify-center">
                          <HeIcons.FaEye size={14} className="text-white" />
                          <span className="text-white font-semibold">View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading tabs...</p>
          )}
        </div>
      </div>
      {openAdd && <AddTable open={openAdd} setOpenAdd={setOpenAdd} />}
      {openAddArea && (
        <AddArea open={openAddArea} setOpenAdd={setOpenAddArea} />
      )}
      {openTable && (
        <TableModal
          open={openTable}
          table={selectedTable}
          setOpenAdd={closeModal}
        />
      )}
    </>
  );
};

export default Tables;
