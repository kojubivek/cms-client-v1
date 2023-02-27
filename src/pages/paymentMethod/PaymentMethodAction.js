import { toast } from "react-toastify";
import {
  addPaymentMethod,
  deletePaymentMethod,
  fetchpaymentmethods,
  updatePaymentMethod,
} from "../../helper/axios";
import { setPayments } from "./PaymentMethodSlice";

export const fetchPayments = () => async (dispatch) => {
  const { status, paymentTypes } = await fetchpaymentmethods();
  status === "success" && dispatch(setPayments(paymentTypes));
};

export const postNewpaymentMethod = (data) => async (dispatch) => {
  const resultpending = addPaymentMethod(data);
  toast.promise(resultpending, { pending: "please wait ..." });

  const { status, message } = await resultpending;
  toast[status](message);

  status === "success" && dispatch(fetchPayments());
};

export const deletepaymentMethod = (_id) => async (dispatch) => {
  const resultpending = deletePaymentMethod(_id);
  toast.promise(resultpending, {
    pending: " please wait...",
  });

  const { status, message } = await resultpending;

  toast[status](message);
  status === "success" && dispatch(fetchPayments());
};
export const UpdatePaymentStatus = (_id) => async (dispatch) => {
  const resultPending = updatePaymentMethod(_id);
  toast.promise(resultPending, {
    pending: "please wait",
  });
  const { status, message } = await resultPending;
  toast[status](message);
  status === "success" && dispatch(fetchPayments());
};
