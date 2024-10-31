import axios from "axios";
import { server } from "../../server";

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerFailed",
    //   payload: error.response.data.message,
    });
  }
};

export const logoutSeller = () => async (dispatch) => {
  try {
    await axios.get(`${server}/shop/logout`, { withCredentials: true });
    
    dispatch({
      type: "LogoutSeller",
    });
  } catch (error) {
    console.log("Logout failed:", error.response.data.message);
  }
};
