import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../functionalities/Loader";
import { UserContext } from "../context/UserContext";

function ManageCars() {
  const navigate = useNavigate();

  const { wait, carsList } = useContext(UserContext);

  const [cars, setCars] = useState([]);

  const getdata = async () => {
    const ans = await carsList();
    setCars(ans);
  };
  useEffect(() => {
    getdata();
  }, []);

  const createCar = () => {
      navigate(`/create/cars`)
    }

  const editHandler=(id)=>{
      navigate(`/manage/cars/${id}/edit`)
    }

  return (
    <>
      {wait && <Loader />}
      <Row>
        <Col md={11}>
          <h1>ALL CARS: </h1>
        </Col>
        <Col md={1}>
          <Button
            size="sm"
            variant="primary"
            type="button"
            onClick={() => createCar()}
          >
            CREATE
          </Button>
        </Col>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle Model</th>
              <th>Vehicle Number</th>
              <th>Seating Capacity</th>
              <th>Rent Per day</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {cars &&
              cars.map((car) => (
                <tr key={car.car_id}>
                  <td>{car.car_id}</td>
                  <td>{car.vehicle_model}</td>
                  <td>{car.vehicle_num}</td>
                  <td>{car.seating_capacity}</td>
                  <td>{car.rent_per_day}</td>
                  <td>{car.available==="1" ? "Available" : "Unavailable"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-info"
                      type="button"
                      onClick={() => editHandler(car.car_id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default ManageCars;
