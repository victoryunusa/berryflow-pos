import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

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
    //dispatch(reset());
  }, [token, navigate]);

  return (
    <div className="flex font-br bg-white font-medium text-neutral-700 ">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />

          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default MainLayout;
