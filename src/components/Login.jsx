import React, {useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../functionalities/Message";
import Loader from "../functionalities/Loader";
import FormContainer from "../functionalities/FormContainer";
import CarsList from "./CarsList";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginUser, wait, loggedInCheck, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setErrMsg("Please Fill in all Required Fields!");
      return;
    }

    const data = await loginUser(formData);
    if (data.success) {
      e.target.reset();
      console.log(data);
      setRedirect("Redirecting...");
      await loggedInCheck();
      navigate("/cars",{replace : true})
      return;
    }
    setErrMsg(data.message);
  };

//   useEffect(()=>{
//     if(user){
        
//     }
// },[user, navigate])

  return (
    <>
      {!user && <FormContainer>
        <h3>Login</h3>
        {wait && <Loader />}
        <Form onSubmit={submitForm}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label htmlFor="email">Email Address :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              value={formData.email}
              required
              onChange={onChangeInput}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label htmlFor="password">Password :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={onChangeInput}
              placeholder="Enter password"
              id="password"
              value={formData.password}
              required
            ></Form.Control>
          </Form.Group>
          {errMsg && <Message variant="danger">{errMsg}</Message>}
          {redirect ? (
            redirect
          ) : (
            <Button
              className="my-3"
              disabled={wait}
              type="submit"
              variant="primary"
            >
              Login
            </Button>
          )}
        </Form>
        <Row className="py-3">
          <Col>
            Don't have an account yet? <Link to="/signup">Sign Up</Link>
          </Col>
        </Row>
      </FormContainer>}
      <CarsList />
    </>
  );
};

export default Login;
