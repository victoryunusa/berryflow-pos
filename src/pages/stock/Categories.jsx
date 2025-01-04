import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as HeIcons from "react-icons/fa6";

import { getCategories } from "../../features/category/categoriesSlice";
import AddCategory from "../../components/modals/AddCategory";
import EditCategory from "../../components/modals/EditCategory";

const Categories = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  const getNextCategories = (url) => {
    dispatch(getCategories(url));
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (account) => {
    setSelectedCategory(account);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Categories</h3>
            <p className="text-xs text-neutral-400">List of all categories</p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">Code</th>
                        <th className="px-2 py-3">Category Name</th>
                        <th className="px-2 py-3">Show on POS Screen</th>
                        <th className="px-2 py-3">Show on QR Menu</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Action</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.data?.map((category, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {category.category_code
                              ? category.category_code
                              : "--"}
                          </td>
                          <td className="px-2 py-3 ">{category.label}</td>

                          <td className="px-2 py-3">
                            {category.display_on_pos_screen ? "Yes" : "No"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {category.display_on_qr_menu ? "Yes" : "No"}
                          </td>
                          <td className="px-2 py-3">
                            {category?.status_data
                              ? category?.status_data.label
                              : "--"}
                          </td>
                          <td className="">
                            <button
                              onClick={() => handleEditClick(category)}
                              className="underline px-2 py-1 text-xs text-blue-500  rounded-md"
                            >
                              Edit
                            </button>
                            <button className="underline px-2 py-1 text-xs text-red-500  rounded-md">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="w-full "></tfoot>
                  </table>
                </div>

                <div className="flex flex-row gap-2 justify-between mt-5">
                  <div>
                    <p>{`Showing  ${categories.from ? categories.from : 0} to ${
                      categories.to ? categories.to : 0
                    } of ${
                      categories.total ? categories.total : 0
                    } entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {categories?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          getNextCategories(link.url.split("=")[1])
                        }
                        className={`${
                          link.active
                            ? "bg-nelsa_primary text-white"
                            : "border text-nelsa_primary"
                        } px-2 py-1 rounded-md`}
                        disabled={link.url == null ? true : false}
                      >
                        {link.label == "&laquo; Previous"
                          ? "<"
                          : link.label
                          ? link.label == "Next &raquo;"
                            ? ">"
                            : link.label
                          : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <AddCategory setOpenCategory={setVisible} />}
      {isEditModalOpen && (
        <EditCategory setOpen={closeModal} category={selectedCategory} />
      )}
    </>
  );
};

export default Categories;
