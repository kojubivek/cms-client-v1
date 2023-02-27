import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletepaymentMethod,
  fetchPayments,
} from "../../pages/paymentMethod/PaymentMethodAction";

export const PaymentMethodTable = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.paymentMethods);
  console.log(payments);
  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this payment type?")) {
      dispatch(deletepaymentMethod(_id));
    }
  };

  return (
    <>
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
                <Button variant="warning">Edit</Button>{" "}
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
