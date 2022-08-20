import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import { UserContext } from "../context/UserContext";

const RentCar = () => {
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const params = useParams();

  const [startDateX, setStartDate] = useState(new Date().getTime());
  const [days, setDays] = useState(1);

  const { user, wait, carsList, addbooking } = useContext(UserContext);

  const [cars, setCars] = useState([]);

  const getdata = async () => {
    const ans = await carsList();
    setCars(ans);
  };
  useEffect(() => {
    getdata();
  }, []);

  const obj = cars.filter((car) => car.car_id === params.id);

  const car = obj.at(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    booked_car_id: params.id,
    user_email: user?.email,
    booked_vehicle_model: params.model,
    booked_vehicle_num: params.num,
    start_date: startDateX,
    no_of_days: +days,
  });

  const submitForm = async (e) => {
    e.preventDefault();

    const data = await addbooking(formData);
    if (data.success) {
      setSuccessMsg("Car Rented Successfully.");
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
    <>
      <Row>
        <Col md={3}>
          {wait && <Loader />}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{car?.vehicle_model}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{car?.vehicle_num}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <span>
                <h3>RENT : </h3>
              </span>
              <h3>{car?.rent_per_day}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {car?.available === "1" ? (
                      <Badge pill bg="success" text="light">
                        Available
                      </Badge>
                    ) : (
                      <Badge pill bg="danger" text="light">
                        Unavailable
                      </Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Start Date</Col>
                  <Col>
                    <DatePicker
                      selected={startDateX}
                      onChange={(date) => {
                        setStartDate(date.getTime());
                        setFormData((prev) => ({ ...prev, start_date: date.getTime() }));
                      }}
                      minDate={new Date()}
                      dateFormat="yyyy/MM/dd"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group controlId="formBasicSelect">
                  <Form.Label>
                    For how many days you want to rent the {car?.vehicle_model}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={days}
                    onChange={(e) => {
                      setDays(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        no_of_days: e.target.value,
                      }));
                    }}
                  >
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                    <option value="8">8 days</option>
                    <option value="9">9 days</option>
                    <option value="10">10 days</option>
                    <option value="11">11 days</option>
                    <option value="12">12 days</option>
                  </Form.Control>
                </Form.Group>
              </ListGroup.Item>

              {successMsg && <Message variant="success">{successMsg}</Message>}
              {errMsg && <Message variant="danger">{errMsg}</Message>}
              <ListGroup.Item>
                <Button
                  type="submit"
                  className="btn-block"
                  onClick={submitForm}
                  disabled={car?.available !== "1"}
                >
                  Book Now
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RentCar;
