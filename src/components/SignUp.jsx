import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../functionalities/FormContainer";
import Message from "../functionalities/Message";
import Loader from "react-spinners/BarLoader";
import CarsList from "./CarsList";

const SignUp = () => {
  const { registerUser, wait } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setSuccessMsg(false);
      setErrMsg("Please Fill in all Required Fields!");
      return;
    }

    const data = await registerUser(formData);
    console.log(data);
    if (data.success) {
      e.target.reset();
      setSuccessMsg("You have successfully registered.");
      setErrMsg(false);
    } else if (!data.success && data.message) {
      setSuccessMsg(false);
      setErrMsg(data.message);
    }
  };
  return (
    <>
    <FormContainer>
      <h1>Sign Up</h1>
      {wait && <Loader />}
      <Form onSubmit={submitForm}>
      <Form.Group controlId="name" className="my-3">
          <Form.Label htmlFor="name">Name :</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            name="name"
            id="name"
            value={formData.name}
            required
            onChange={onChangeInput}
          ></Form.Control>
        </Form.Group>
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
        {successMsg && <Message variant="success">{successMsg}</Message>}
        {errMsg && <Message variant="danger">{errMsg}</Message>}
        <Button className="my-3" disabled={wait} type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
    <CarsList/>
    </>
  );
};

export default SignUp;
