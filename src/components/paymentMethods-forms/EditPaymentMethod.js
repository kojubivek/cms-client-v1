import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UpdatePaymentStatus } from "../../pages/paymentMethod/PaymentMethodAction";

export const EditPaymentMethod = ({ selectedPayment }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(selectedPayment);
    console.log(selectedPayment);
  }, [selectedPayment]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // const { _id, paymentType, status, description } = formData;
    dispatch(UpdatePaymentStatus(formData));
  };
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row>
          <Col>
            <Form.Select name="status" onChange={handleOnChange} required>
              <option value="">--status--</option>
              <option value="inactive">inactive</option>
              <option value="active"> active</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              placeholder="Payment Type"
              name="paymentType"
              onChange={handleOnChange}
              required
              value={formData.paymentType}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Description"
              name="description"
              onChange={handleOnChange}
              required
              value={formData.description}
            />
          </Col>
          <Col>
            <Button type="submit" variant="warning">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
