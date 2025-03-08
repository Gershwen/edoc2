import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditForm = ({
  handleClose,
  show,
  handleEdit,
  selectedAppointment,
}) => {
  const [formData, setFormData] = useState({
    newFname: "",
    newLname: "",
    newDate: "",
    newTime: "",
  });

  // Populate form fields when a patient is selected
  useEffect(() => {
    if (selectedAppointment) {
      setFormData({
        newFname: selectedAppointment.fname || "",
        newLname: selectedAppointment.lname || "",
        newDate: selectedAppointment.date || "",
        newTime: selectedAppointment.time || "",
      });
    }
  }, [selectedAppointment]);

  // Generic handler to update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Enter updated details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Update first name</Form.Label>
            <Form.Control
              value={formData.newFname}
              onChange={handleChange}
              placeholder="Enter first name"
              id="newFname"
              name="newFname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Update last name</Form.Label>
            <Form.Control
              value={formData.newLname}
              onChange={handleChange}
              placeholder="Enter last name"
              id="newLname"
              name="newLname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New date</Form.Label>
            <Form.Control
              value={formData.newDate}
              onChange={handleChange}
              type="date"
              id="newDate"
              name="newDate"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New time</Form.Label>
            <Form.Control
              value={formData.newTime}
              onChange={handleChange}
              type="time"
              id="newTime"
              name="newTime"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;

