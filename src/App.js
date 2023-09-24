import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AddConsultant from "./components/Consultants/AddConsultant";
import ConsultantsComp from "./components/Consultants/Consultants";
import AdminProfile from "./profile/AdminProfile";
import UserProfile from "./profile/UserProfile";
import { adminActions, userActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Consultants" element={<ConsultantsComp />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Route path="/add" element={<AddConsultant />} />
              <Route path="/user-admin" element={<AdminProfile />} />{" "}
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
