import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../functionalities/FormContainer";
import { UserContext } from "../context/UserContext";
import Message from "../functionalities/Message";
import Loader from "react-spinners/BarLoader";
import { useNavigate } from "react-router-dom";

function AddCar() {
  const { addcar, wait } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicle_model: "",
    vehicle_num: "",
    rent_per_day: "",
    seating_capacity: "",
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

    const data = await addcar(formData);
    if (data.success) {
      e.target.reset();
      setSuccessMsg("Car Succesfully Added.");
      setTimeout(() => {
        navigate("/cars", { replace: true });
      }, 2000);
      setErrMsg(false);
    } else if (!data.success && data.message) {
      setSuccessMsg(false);
      setErrMsg(data.message);
    }
  };

  return (
    <FormContainer>
      <h1>ADD CAR :</h1>
      {wait && <Loader />}
      <Form onSubmit={submitForm}>
        <Form.Group controlId="model" className="my-3">
          <Form.Label>Vehicle Model :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Model"
            name="vehicle_model"
            id="vehicle_model"
            value={formData.vehicle_model}
            required
            onChange={onChangeInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="number" className="my-3">
          <Form.Label>Vehicle Number :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Vehicle Number"
            name="vehicle_num"
            id="vehicle_num"
            value={formData.vehicle_num}
            required
            onChange={onChangeInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="seating capacity" className="my-3">
          <Form.Label>Seating Capacity :</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Seating Capacity"
            name="seating_capacity"
            id="seating_capacity"
            value={formData.seating_capacity}
            required
            onChange={onChangeInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="rent per day" className="my-3">
          <Form.Label>Rent Per Day :</Form.Label>
          <Form.Control
            type="number"
            placeholder="Rent Per Day"
            name="rent_per_day"
            id="rent_per_day"
            value={formData.rent_per_day}
            required
            onChange={onChangeInput}
          ></Form.Control>
        </Form.Group>
        {successMsg && <Message variant="success">{successMsg}</Message>}
        {errMsg && <Message variant="danger">{errMsg}</Message>}
        <Button
          className="my-3"
          disabled={wait}
          type="submit"
          variant="primary"
        >
          ADD CAR
        </Button>
      </Form>
    </FormContainer>
  );
}

export default AddCar;
