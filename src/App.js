import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CarsList from "./components/CarsList";
import ManageCars from "./components/ManageCars";
import { Container } from "react-bootstrap";
import AddCar from "./components/AddCar";
import CarEdit from "./components/EditCar";
import RentCar from "./components/RentCar";
import BookedList from "./components/BookedList";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              {!user && (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </>
              )}

              <Route path="/cars" element={<CarsList />} />
              {user && (
                <>
                  <Route path="/manage/cars" element={<ManageCars />} />
                  <Route path="/create/cars" element={<AddCar />} />
                  <Route path="/manage/cars/:id/edit" element={<CarEdit />} />
                  <Route path="/:id/:model/:num/rent" element={<RentCar />} />
                  <Route path="/manage/rent/cars" element={<BookedList />} />
                </>
              )}
              <Route
                path="*"
                element={<Navigate to={user ? "/cars" : "/login"} />}
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
