import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./Users.module.scss";
import AllUsersDetails from "../../Components/AllUsersDetails";
import Loading from "../../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/UserSlice";
export default function AllUsers() {
  const [loading, setLoading] = useState(null);
  const userList = useSelector((state) => state.User.usersList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userList.length === 0) {
      setLoading(true);
      dispatch(getAllUsers());
      setLoading(false);
    }
  }, [userList.length, dispatch]);
  return (
    <div className={style.Users}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        {loading === true ? (
          <div className={style.loading}>
            <Loading />
          </div>
        ) : (
          <AllUsersDetails />
        )}
      </SidebarToggler>
    </div>
  );
}
