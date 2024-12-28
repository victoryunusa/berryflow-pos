import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
//import * as HeIcons from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import logo from "../assets/images/truetab.svg";

const WelcomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(reset());

    navigate("/auth/login");
    window.location.reload(true);
  };
  return (
    <div className="flex-1 bg-gray-100 antialiased font-br">
      <div className="flex flex-row">
        <div className="flex-1 flex-col justify-center sm:text-left">
          <div className="bg-white px-5 py-2 md:py-2 rounded-lg w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="">
                <h3 className="text-xl font-bold text-nelsa_primary">
                  <img className="w-[7.5rem]" src={logo} alt="logo" />
                </h3>
              </div>
              <div>
                <button
                  onClick={onLogout}
                  className="flex flex-row items-center gap-1 py-2.5 px-3 text-md font-bold text-neutral-400 rounded-lg"
                  type="button"
                >
                  <IoLogOut size={30} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-center min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default WelcomeLayout;
