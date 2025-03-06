//styles are imported from React Bootstrap
import { Button, Form, Row, Col } from "react-bootstrap";


//This component handles the create new appointment functionality of the app.
//It renders all the input fields for the admin to add patient details in.
//all handlers are passed down from the parent "App" component.

const CreateForm = ({
  handleSubmit,
  handleFnameChange,
  handleLnameChange,
  handleDateChange,
  handleTimeChange,
}) => {
  return (
    <Form onSubmit={handleSubmit} className="createform">
      <Row>
        <Col>
          <Form.Control
            onChange={handleFnameChange}
            placeholder="First name"
            name="fname"
            id="fname"
          />
        </Col>
        <Col>
          <Form.Control
            onChange={handleLnameChange}
            placeholder="Last name"
            name="lname"
            id="lname"
          />
        </Col>
        <Col>
          <Form.Control
            onChange={handleDateChange}
            type="date"
            name="date"
            id="date"
          />
        </Col>
        <Col>
          <Form.Control
            onChange={handleTimeChange}
            type="time"
            name="time"
            id="time"
          />
        </Col>
      </Row>
      <Button className="createButton" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateForm;
