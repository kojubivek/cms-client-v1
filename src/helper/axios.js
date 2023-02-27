import axios from "axios";
const rootUrl = "http://localhost:8000/api/v1";
const adminApi = rootUrl + "/admin";
const catApi = rootUrl + "/category";
const paymentApi = rootUrl + "/paymentMethods";

const fetchProcesser = async ({ method, url, data }) => {
  try {
    // await axios.post(adminApi + "/register", data);

    const res = await axios({
      method,
      url,
      data,
    });

    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ======= admin
export const postNewAdmin = async (data) => {
  const url = adminApi + "/register";
  const obj = {
    method: "post",
    url,
    data,
  };
  return fetchProcesser(obj);
};

export const postEmailVerification = async (data) => {
  const url = adminApi + "/verify";
  const obj = {
    method: "post",
    url,
    data,
  };
  return fetchProcesser(obj);
};

export const loginAdmin = async (loginData) => {
  const url = adminApi + "/login";
  const obj = {
    method: "post",
    url,
    data: loginData,
  };
  return fetchProcesser(obj);
};

export const fetchOtpRequest = async (data) => {
  const url = adminApi + "/request-otp";
  const obj = {
    method: "post",
    url,
    data,
  };
  return fetchProcesser(obj);
};

export const resetPassRequest = async (data) => {
  const url = adminApi + "/reset-password";
  const obj = {
    method: "patch",
    url,
    data,
  };
  return fetchProcesser(obj);
};

// ===== category
export const postCategory = async (data) => {
  const url = catApi;
  const obj = {
    method: "post",
    url,
    data,
  };
  return fetchProcesser(obj);
};

export const fetchCategory = async () => {
  const url = catApi;
  const obj = {
    method: "get",
    url,
  };
  return fetchProcesser(obj);
};

export const deleteCategory = async (_id) => {
  const url = catApi + "/" + _id;
  const obj = {
    method: "delete",
    url,
  };
  return fetchProcesser(obj);
};

export const updateCategory = async (data) => {
  const url = catApi;
  const obj = {
    method: "put",
    url,
    data,
  };
  return fetchProcesser(obj);
};

/////payment methods
export const addPaymentMethod = async (data) => {
  const url = paymentApi;
  const obj = {
    method: "post",
    url,
    data,
  };
  return fetchProcesser(obj);
};

export const fetchpaymentmethods = async () => {
  const url = paymentApi;
  const obj = {
    method: "get",
    url,
  };
  return fetchProcesser(obj);
};

export const deletePaymentMethod = async (_id) => {
  const url = paymentApi + "/" + _id;
  const obj = {
    method: "delete",
    url,
  };
  return fetchProcesser(obj);
};

export const updatePaymentMethod = async (data) => {
  const url = paymentApi;
  const obj = {
    method: "put",
    url,
    data,
  };
  return fetchProcesser(obj);
};
