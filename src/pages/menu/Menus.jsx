import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { textEllipsis } from "../../functions/functions";
import SuperModal from "../../components/SuperModal";
import AddMenu from "./AddMenu";
import { getMenus } from "../../features/menu/menuSlice";

const Menus = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { menus } = useSelector((state) => state.menus);

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Menus</h3>
            <p className="text-xs text-neutral-400">List of all menus</p>
          </div>
          <div>
            {/* <Link to="/menu/products/add">
              <button className="px-3 py-2 bg-tt_rich_black text-white text-small font-semibold rounded-md">
                Add New
              </button>
            </Link> */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-tt_rich_black text-white text-small font-semibold rounded-lg"
            >
              Add New
            </button>
            {/* Modal for Adding Vehicle */}
            {isModalOpen && (
              <SuperModal
                title="Add Menu"
                onClose={() => setIsModalOpen(false)}
              >
                <AddMenu setOpen={setIsModalOpen} />
              </SuperModal>
            )}
          </div>
        </div>

        <div className="flex gap-5">
          <input
            type="text"
            className={`w-1/5 px-3 py-2.5 border border-neutral-300 text-neutral-600 text-small rounded-lg focus:outline-none`}
          />
        </div>

        <div></div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-zinc-100 ">
          {menus?.map((menu, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-md border rounded-lg cursor-pointer p-2"
              onClick={() => {}}
            >
              <div className="flex flex-col gap-1.5 rounded">
                <div className=" w-full">
                  <p className="text-sm md:text-md font-semibold text-neutral-700">
                    {textEllipsis(menu.name, 20)}
                  </p>
                  <span>
                    <p className="text-xs">{menu.label}</p>
                  </span>
                </div>

                <div className="w-full flex flex-row gap-2">
                  <button className="p-2 flex items-center justify-center text-white rounded-md bg-tt_rich_black hover:bg-tt_rich_black/90 w-full">
                    <span className="text-sm font-semibold">View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menus;
