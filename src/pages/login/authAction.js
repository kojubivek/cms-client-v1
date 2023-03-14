import { fetchAdminProfile, loginAdmin } from "../../helper/axios";
import { requestPending, requestSuccess } from "./authSlice";
import { toast } from "react-toastify";

export const loginAction = (formData) => async (dispatch) => {
  try {
    dispatch(requestPending());

    // call axios-helper / api
    const pendingResp = loginAdmin(formData);

    toast.promise(pendingResp, { pending: "Please wait ...." });

    const { status, message, tokens } = await pendingResp;
    toast[status](message);
    if (status === "success") {
      const { accessJWT, refreshJWT } = tokens;
      sessionStorage.setItem("accessJWT", accessJWT);
      localStorage.setItem("refreshJWT", refreshJWT);
      dispatch(getAdminProfile());
    }

    // status === "success"
    //   ? dispatch(requestSuccess(user))
    //   : dispatch(requestSuccess({}));
  } catch (error) {
    return {
      status: "error",
      message: error.messsage,
    };
  }
};

const getAdminProfile = () => async (dispatch) => {
  const { status, user } = await fetchAdminProfile();
  status === "success"
    ? dispatch(requestSuccess(user))
    : dispatch(requestSuccess({}));
};
