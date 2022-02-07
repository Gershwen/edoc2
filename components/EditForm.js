//Styles are imported from React bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//This component handles the editing of existing data.
//On edit button click a modal should pop up and provide the admin with fields
//to update the selected patients record.

const EditForm = ({
  handleNewFnameChange,
  handleNewLnameChange,
  handleNewDateChange,
  handleNewTimeChange,
  handleClose,
  show,
  handeEdit,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Enter updated details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handeEdit}>
          <Form.Group className="mb-3">
            <Form.Label>Update first name</Form.Label>
            <Form.Control
              onChange={handleNewFnameChange}
              placeholder="Enter first name"
              id="newFname"
              name="newFname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Update last name</Form.Label>
            <Form.Control
              onChange={handleNewLnameChange}
              placeholder="Enter last name"
              id="newLname"
              name="newLname"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New date</Form.Label>
            <Form.Control
              onChange={handleNewDateChange}
              type="date"
              id="newDate"
              name="newDate"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New time</Form.Label>
            <Form.Control
              onChange={handleNewTimeChange}
              type="time"
              id="newTime"
              name="newTime"
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
