import React, { useContext, useEffect, useState } from "react";
import Loader from "../functionalities/Loader";
import NoDataFound from "./NoDataFound";
import { Table, Row, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

function BookedList() {
  const { wait, bookingsList } = useContext(UserContext);

  const [bookings, setBookings] = useState([]);

  function dateConverter(dateInMS) {
    const date = new Date(+dateInMS);
    return date.toLocaleDateString("en-US");
  }

  const getdata = async () => {
    const ans = await bookingsList();
    console.log(ans);
    setBookings(ans);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      {wait && <Loader />}
      {!bookings ? (
        <NoDataFound displayText="No Bookings Found" />
      ) : (
        <Row>
          <Col md={6}>
            <h1>ALL BOOKINGS : </h1>
          </Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Booked Car Id</th>
                <th>User </th>
                <th>Booked Vehicle Model</th>
                <th>Booked Vehicle Number</th>
                <th>Start Date</th>
                <th>No. of Days</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings.map((item) => (
                  <tr key={item.booked_car_id}>
                    <td>{item.booked_car_id}</td>
                    <td>{item.user_email}</td>
                    <td>{item.booked_vehicle_model}</td>
                    <td>{item.booked_vehicle_num}</td>
                    <td>{dateConverter(item.start_date)}</td>
                    <td>{item.no_of_days}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      )}
    </>
  );
}

export default BookedList;
