import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postNewCategory } from "../../pages/category/categoryAction";

export const AddNewCatFrm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewCategory({ name }));
  };

  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="text-center border p-4 rounded shadow-lg"
      >
        <Row>
          <Col>
            <Form.Control
              placeholder="Category name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
          <Col>
            <Button type="submit" variant="warning">
              Add New Category
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
