import Table from "react-bootstrap/Table";

//This component is what the doctor gets access to. As only the admin will have
//access to make new appointments, edit or delete.

const PatientListDoc = ({ data }) => {
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientListDoc;
