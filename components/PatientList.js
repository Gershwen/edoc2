//Styles are imported from react bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

//This component is only available to the admin.
//is holds the delete function as well as the toggle to reveal the edit modal on click

const PatientList = ({ data, handleDelete, handleShow }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((appointment) => (
          <tr key={appointment._id}>
            <td>{appointment._id}</td>
            <td>{appointment.fname}</td>
            <td>{appointment.lname}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>
            <Button onClick={() => handleShow(appointment._id)}>edit</Button>
            <Button onClick={() => handleDelete(appointment._id)}>
              delete
            </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientList;
