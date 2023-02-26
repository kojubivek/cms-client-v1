import React, { useEffect, useRef } from "react";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./authAction";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passRef = useRef("");
  const { isLoading, user } = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formDt = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    // disptach login action to call api
    if (!formDt.email || !formDt.password) {
      return alert("Please fill in both the fields!");
    }
    dispatch(loginAction(formDt));
  };

  useEffect(() => {
    user?._id && navigate("/dashboard");

    // TODO: make router private and auto login
  }, [user, navigate]);

  return (
    <div>
      <Header />
      <div className="main login-page">
        <Form className="shadow-lg rounded" onSubmit={handleOnSubmit}>
          <h3 className="text-center">Welcome Back!</h3>
          <hr className="mb-5" />

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isLoading ? (
              <Spinner variant="dark" animation="border" />
            ) : (
              " Submit"
            )}
          </Button>

          <div className="text-end">
            Forget password? <a href="/reset-password">Reset now</a>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
