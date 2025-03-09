import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/MyLayout.js";
import {Button} from "react-bootstrap";
import CreateForm from "../components/CreateForm.js";
import PatientList from "../components/PatientList";
import EditForm from "../components/EditForm";


const App = ({ data }) => {
  //state for CreateForm component
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  //state for edit form
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newDate, setNewDate] = useState();
  const [newTime, setNewTime] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();

  //state of ID that gets called on edit button
  const [id, setId] = useState("");
  //react-bootstrap modal state
  const [show, setShow] = useState(false);

  //using router to redirect between pages on button clicks
  const router = useRouter();

  const handleClose = () => setShow(false);

  //gets first name data from input field inside CreateForm component
  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };

  //gets last name data from input field inside CreateForm component
  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  //gets date data from input field inside CreateForm component
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  //gets time data from input field inside CreateForm component
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  //gets new first name data from input field inside EditForm component
  const handleNewFnameChange = (e) => {
    setNewFname(e.target.value);
  };

  //gets new last name data from input field inside EditForm component
  const handleNewLnameChange = (e) => {
    setNewLname(e.target.value);
  };

  //gets new date data from input field inside EditForm component
  const handleNewDateChange = (e) => {
    setNewDate(e.target.value);
  };

  //gets new time data from input field inside EditForm component
  const handleNewTimeChange = (e) => {
    setNewTime(e.target.value);
  };

  //function that sends patient data to server on submit
  const handleSubmit = () => {
    //JWT token gets passed to ensure the admin has permission to make post requests
    const token = sessionStorage.getItem("token");
    const message = `Bearer ${token}`;

    fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: message,
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        date: date,
        time: time,
      }),
    }).then((response) => response.json())
    .then(() => {
      setFname("");
      setLname("");
      setDate("");
      setTime("");
    })
    .catch(console.error);
  };

  //function that handles the edit button
  const handleShow = (currentAppoinment, fname, lname, date, time) => {
    setShow(true);
    setId(currentAppoinment);
    setSelectedAppointment({
      id: currentAppoinment,
      fname: fname,
      lname: lname,
      date: date,
      time: time,
    })
  };



  const handleEdit = (formData) => {
    
    const token = sessionStorage.getItem("token");
    const message = `Bearer ${token}`;
  
    fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: message,
      },
      body: JSON.stringify({
        fname: formData.newFname,
        lname: formData.newLname,
        date: formData.newDate,
        time: formData.newTime,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Success:", response);
        handleClose();
        router.reload();
      })
      .catch((error) => console.log("Error:", error));
  };
  

  //function that deletes appointsments from the database
  const handleDelete = (currentAppoinment) => {
    const token = sessionStorage.getItem("token");
    const message = `Bearer ${token}`;

    fetch(`/api/appointments/${currentAppoinment}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: message,
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Deleted", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
    router.reload();
  };

  const handleCreateAppointment = () => {
    const targetDiv = document.getElementById("createfrom");
    targetDiv.style.display = targetDiv.style.display === "none" ? "block" : "none";
  };
  

  //Log out button function
  const handleLogOut = () => {
    sessionStorage.setItem("token", null);
    router.push("/");
  };

  return (
    <Layout>
      <div className="btn-select-container">
        <Button onClick={handleCreateAppointment} variant="primary">
          Create Appointment
        </Button>
        <div className="filter-logout-btn-container">
          <Button onClick={handleLogOut} variant="warning">
            Log out
          </Button>
        </div>
      </div>
      <div style={{ display: "none" }} id="createfrom">
        <CreateForm
          handleFnameChange={handleFnameChange}
          handleLnameChange={handleLnameChange}
          handleDateChange={handleDateChange}
          handleTimeChange={handleTimeChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="patientlist-container">
        <PatientList
          data={data}
          handleDelete={handleDelete}
          handleShow={handleShow}
        />
      </div>
      <EditForm
        handleNewFnameChange={handleNewFnameChange}
        handleNewLnameChange={handleNewLnameChange}
        handleNewDateChange={handleNewDateChange}
        handleNewTimeChange={handleNewTimeChange}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleEdit={handleEdit}
        selectedAppointment={selectedAppointment}
      />
    </Layout>
  );
};

//fetching data stored in database
// App.getInitialProps = async () => {
//   const res = await fetch("http://localhost:3000/api/appointments");
//   const data = await res.json();
//   return {
//     data: data,
//   };
// };
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

App.getInitialProps = async () => {
  const res = await fetch(`${API_BASE_URL}/appointments`);
  const data = await res.json();
  return { data };
};

export default App;
