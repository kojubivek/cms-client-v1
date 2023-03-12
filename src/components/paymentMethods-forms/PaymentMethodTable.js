import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletepaymentMethod,
  fetchPayments,
  UpdatePaymentStatus,
} from "../../pages/paymentMethod/PaymentMethodAction";
import { setShowModal } from "../../system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { EditPaymentMethod } from "./EditPaymentMethod";

export const PaymentMethodTable = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.paymentMethods);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [shouldFetch, setShouldFetch] = useState(true);
  const [showPayments, setShowPayments] = useState([]);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setShouldFetch(true);
    shouldFetch && dispatch(fetchPayments());
    setShowPayments(payments);
    setShouldFetch(false);
  }, [dispatch, shouldFetch, payments]);

  // useEffect(() => {
  //   if (!showPayments.length) {
  //     setShowPayments(payments);
  //   }
  // });
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
  const handleOnCheck = (e) => {
    e.preventDefault();
    const { checked, value } = e.target;

    const { _id, paymentType, description } = payments.find(
      (item) => item._id === value
    );
    dispatch(
      UpdatePaymentStatus({
        status: checked === true ? "active" : "inactive",
        _id,
        paymentType,
        description,
      })
    );
    // dispatch(fetchPayments());
  };
  const handleOnSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    const temp = showPayments.filter((item) =>
      item.paymentType.toLowerCase().includes(value.toLowerCase())
    );

    if (!temp.length) {
      setMsg("No payment methods found!");
    } else if (!search) {
      setShouldFetch(true);
      setShowPayments(payments);
      setMsg("");
    } else {
      setShowPayments(temp);
      setMsg("");
    }
  };

  return (
    <>
      <div>
        <Form.Control
          lable="Search Payments"
          placeholder="search"
          name="search"
          onChange={handleOnSearch}
        ></Form.Control>
      </div>{" "}
      {!msg ? (
        <>
          {" "}
          <div>{showPayments.length} Payment Methods Found!</div>
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
              {showPayments?.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>
                    {item.status}
                    <div>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        value={item._id}
                        checked={item.status === "active"}
                        onChange={handleOnCheck}
                      />
                    </div>
                  </td>
                  <td>{item.paymentType}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleOnEdit(item)}
                    >
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
      ) : (
        <>
          <div>{msg}</div>
        </>
      )}
    </>
  );
};
