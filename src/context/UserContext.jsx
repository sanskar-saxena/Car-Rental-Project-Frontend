import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const Axios = axios.create({
  baseURL: "http://localhost/car_project/",
});

export const UserContextProvider = ({ children }) => {
  const [theUser, setUser] = useState(null);
  const [wait, setWait] = useState(false);

  const carsList = async () => {
    setWait(true);
    try {
      const { data } = await Axios.get("carList.php");
      setWait(false);
      // console.log(data);
      return data.data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const bookingsList = async () => {
    setWait(true);
    try {
      const { data } = await Axios.get("bookinglist.php");
      setWait(false);
      // console.log(data);
      return data.data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const editcar = async (obj) => {
    setWait(true);
    try {
      console.log(JSON.stringify(obj));
      const { data } = await Axios.post("updatecar.php", JSON.stringify(obj));

      console.log(data);
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const addcar = async ({
    vehicle_model,
    vehicle_num,
    rent_per_day,
    seating_capacity,
  }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("registercar.php", {
        vehicle_model,
        vehicle_num,
        rent_per_day,
        seating_capacity,
      });

      console.log(data);
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const addbooking = async ({
    booked_car_id,
    user_email,
    booked_vehicle_model,
    booked_vehicle_num,
    start_date,
    no_of_days,
  }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("registerbooking.php", {
        booked_car_id,
        user_email,
        booked_vehicle_model,
        booked_vehicle_num,
        start_date,
        no_of_days,
      });

      console.log(data);
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };
  const registerUser = async ({ name, email, password }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("register.php", {
        name,
        email,
        password,
      });
      // console.log(data);
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loginUser = async ({ email, password }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("login.php", {
        email,
        password,
      });
      if (data.success && data.token) {
        localStorage.setItem("loginToken", data.token);
        setWait(false);
        return { success: 1, message: "loggedIN!" };
      }
      setWait(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loggedInCheck = async () => {
    const loginToken = localStorage.getItem("loginToken");
    Axios.defaults.headers.common["Authorization"] = "Bearer " + loginToken;
    if (loginToken) {
      const { data } = await Axios.get("getUser.php");
      if (data.success && data.user) {
        setUser(data.user);
        return;
      }
      setUser(null);
    }
  };

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        addcar,
        wait,
        editcar,
        addbooking,
        bookingsList,
        carsList,
        user: theUser,
        loggedInCheck,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
