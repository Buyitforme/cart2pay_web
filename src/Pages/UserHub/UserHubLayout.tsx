import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserHubNav from "./UserHubNav";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/state";
import { triggerGetUserProfile } from "../../redux/features/UserAccountManagement/userAccountManagementThunk";
import { PageLoader } from "../../Components/PageLoader";

const UserHubLayout = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const { getUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management,
  );

  // ✅ FETCH PROFILE ONCE HERE
  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (getUserProfileData.loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <UserHubNav />

      <main className="pt-6 pb-12 md:pt-6 flex-1 bg-background  ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserHubLayout;
