import React from "react";
import Loader from "../functionalities/Loader";
import {Row, Col } from "react-bootstrap";
import NoDataFound from "./NoDataFound";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CarCard from "../functionalities/CarCard";
import { useState, useEffect } from "react";

 function CarsList() {
  const {wait, carsList } = useContext(UserContext);

  const [cars, setCars] = useState([]);
  
  const getdata = async()=>{
    const ans = await carsList();
    setCars(ans);
  }
  useEffect(() => {
   getdata();
  }, [])

  
  return (
    <>
    {wait && <Loader/>}
      <>
      <h1><b>C A R S </b></h1>
        {cars?.length === 0 ? (
          <NoDataFound displayText="No cars available" />
        ) : (
          <Row>
            {cars?.map((car) => {
              return (
                <Col key={car.car_id} sm={14} md={7} lg={5} xl={4}>
                  <CarCard car={car} />
                </Col>
              );
            })}
          </Row>
        )}
      </>
    </>
  );
}

export default CarsList;
