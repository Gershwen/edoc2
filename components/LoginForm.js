//Styles are imported from React boostrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//Link is imported from next.js library to make anchor tags able to navigate
//on the client side.
import Link from "next/link";

//This component gets passed to the login page and renders the login form.
//this form allows the user to type in their username and password to log in.

const LoginForm = ({
  handleUsernameLoginChange,
  handlePasswordLoginChange,
  handleSignIn,
}) => {
  return (
    (<div className="form-container">
      <Form onSubmit={handleSignIn}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="usernameLogin"
            id="usernameLogin"
            onChange={handleUsernameLoginChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="passwordLogin"
            id="passwordLogin"
            onChange={handlePasswordLoginChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <div>
        <h3 className="newuserHeading">New user?</h3>
        <Link href="/register" passHref>
          Sign Up
        </Link>
      </div>
    </div>)
  );
};

export default LoginForm;
