import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { alertActions } from "../app/store";

import * as HeIcons from "react-icons/fa6";

import { logout, reset, selectBranch } from "../features/auth/authSlice";
import SideBar from "./SideBar/SideBar";
import { Avatar } from "primereact/avatar";
import { getProfile, reset as profileReset } from "../features/user/userSlice";
import { getBranches } from "../features/branch/branchSlice";
import Header from "../components/layouts/Header";
import HeaderMobile from "../components/layouts/HeaderMobile";
import MarginWidthWrapper from "../components/layouts/MarginWidthWrapper";
import PageWrapper from "../components/layouts/PageWrapper";
import SideNav from "./SideBar/SideNav";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.user);

  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find((branch) => branch.id === user.branch_id);

  //console.log(branchIndex);

  useEffect(() => {
    dispatch(getProfile());
    return () => {
      dispatch(profileReset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    if (user?.branch_id === null) {
      navigate("/select/branch");
    }
  }, [navigate, user?.branch_id]);

  useEffect(() => {
    if (user?.vendor?.kyc_fulfilled === 1) {
      navigate("/business_verification");
    }
  }, [navigate, user?.vendor?.kyc_fulfilled]);

  useEffect(() => {
    if (token === null) {
      navigate("/auth/login");
    }
    dispatch(reset());
  }, [token, navigate, dispatch]);

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenBranchSelect, setIsOpenBranchSelect] = useState(false);
  //const [activeBranch, setActiveBranch] = useState(branch);

  //setActiveBranch(branchIndex);

  // const onClick = () => {
  //   setIsOpen(!isOpen);
  // };

  const onSetBranch = async (branchId) => {
    setIsOpenBranchSelect(!isOpenBranchSelect);
    // //setActiveBranch(branchId);
    // console.log(branchId);
    // window.location.reload(true);
    dispatch(alertActions.clear());

    try {
      const logged_user_slug = user.slug;
      const branch_slug = branchId.slug;

      await dispatch(selectBranch({ logged_user_slug, branch_slug })).unwrap();
      //dispatch(reset());
      window.location.reload(true);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  return (
    <div className="flex font-manrope bg-white antialiased text-neutral-500 ">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />

          <PageWrapper>
            {/* <div className="w-full flex flex-row justify-between items-center bg-blue-100 text-blue-700 p-3 rounded-lg my-2">
            <p className="text-sm">
              To use this app your acccount has to be verified.
            </p>
            <Link
              to="business_verification"
              className="cursor-pointer flex justify-center w-20 py-2 px-2.5 text-sm font-semibold rounded-full bg-blue-700 text-white"
            >
              Verify
            </Link>
          </div> */}
            {/* <div className="w-full flex flex-row justify-between items-center bg-green-100 text-green-700 p-3 rounded-lg my-2">
            <p className="text-sm">
              To use this app your acccount has to be verified.
            </p>
            <span className="cursor-pointer py-2 px-2.5 text-sm font-semibold rounded-full bg-green-700 text-white">
              Verify
            </span>
          </div> */}

            <Outlet />
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default MainLayout;
