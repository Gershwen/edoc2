//Styles are imported from react bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//Link is imported from next.js library to add client side navigation to anchor tags
import Link from "next/link";

//This component handles and renders the register form.
//handles are passed down from the parent "App" component.

const RegisterForm = ({
  handleUsernameChange,
  handlePasswordChange,
  handleAdminChange,
  handleSignUp,
}) => {
  return (
    <Form onSubmit={handleSignUp} className="form-container">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          id="username"
          onChange={handleUsernameChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Form.Select
        onChange={handleAdminChange}
        aria-label="Default select example"
      >
        <option>Open this select menu</option>
        <option value="admin">Administrator</option>
        <option value="doctor">Doctor</option>
      </Form.Select>
      <div className="signUpOrLogIn-container">
        <Button className="signup-btn" variant="primary" type="submit">
          Sign Up
        </Button>
        <Link href="/login" passHref>
          <a>Log in</a>
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
