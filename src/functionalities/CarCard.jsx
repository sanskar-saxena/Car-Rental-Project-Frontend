import React from "react";
import { useContext } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const CarCard = ({ car}) => {
  
    const {user} = useContext(UserContext);
    // console.log(user);
  return (
    <>
    <Card className="my-3 p-3">
      {/* <Link to={`/cars/${car.car_id}`}>
        <Card.Img className="img" src={`/images/${car.image}`} />
      </Link> */}
      <Card.Body>
        <Card.Text>
          {car.available==="1" ? (
            <Badge pill bg="success" text="light">
              Available
            </Badge>
          ) : (
            <Badge pill bg="danger" text="light">
              Unavailable
            </Badge>
          )}
        </Card.Text>        
        <Link to={`/cars/${car.car_id}`}>
          <Card.Text as="h2" className="my-3 py-3">
            <strong>{car.vehicle_model}</strong>
          </Card.Text>
        </Link>
          <Card.Text as="h5" className="my-2 py-2">
            <span><b>Vehicle Number:</b> </span>
            <strong>{car.vehicle_num}</strong>
          </Card.Text>
        <Card.Text as="h5" className="my-2 py-2">
        <span><b>Seating Capacity:</b> </span>
            <strong>{car.seating_capacity}</strong>
          </Card.Text>
        <Card.Text as="h5" className="my-2 py-2">
        <span><b>Rent/day:</b> </span>
            <strong>{car.rent_per_day}</strong>
          </Card.Text>
          {user?.role==="Customer" && <Link to={`/rent/${car.car_id}`}>
            <Link to={`/${car.car_id}/${car.vehicle_model}/${car.vehicle_num}/rent`}>
          <Button className="my-3">
            <strong>Rent Car</strong>
          </Button>
          </Link>
        </Link>}
      </Card.Body>
    </Card>
    </>
  );
};

export default CarCard;
