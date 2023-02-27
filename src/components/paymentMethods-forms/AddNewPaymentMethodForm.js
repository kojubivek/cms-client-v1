import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postNewpaymentMethod } from "../../pages/paymentMethod/PaymentMethodAction";

export const AddNewPaymentMethodForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewpaymentMethod(data));
  };
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Payment Type</Form.Label>
              <Form.Control
                placeholder="Payment Method Name"
                name="paymentType"
                onChange={handleOnchange}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Payment Description"
                name="description"
                onChange={handleOnchange}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button className="mt-4" size="lg" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
