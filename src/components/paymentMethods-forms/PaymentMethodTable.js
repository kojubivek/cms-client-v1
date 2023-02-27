import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletepaymentMethod,
  fetchPayments,
} from "../../pages/paymentMethod/PaymentMethodAction";
import { setShowModal } from "../../system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { EditPaymentMethod } from "./EditPaymentMethod";

export const PaymentMethodTable = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.paymentMethods);
  const [selectedPayment, setSelectedPayment] = useState({});
  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this payment type?")) {
      dispatch(deletepaymentMethod(_id));
    }
  };
  const handleOnEdit = ({ _id, status, paymentType, description }) => {
    const data = { _id, status, paymentType, description };
    setSelectedPayment(data);
    dispatch(setShowModal(true));
  };

  return (
    <>
      <div>{payments.length} Payment Methods Found!</div>
      <CustomModal show={false} title="Update Payment Method">
        <EditPaymentMethod selectedPayment={selectedPayment} />
      </CustomModal>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {payments?.map((item, i) => (
            <tr key={item?._id}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.paymentType}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
