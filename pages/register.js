import Layout from "../components/MyLayout.js";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import { useRouter } from "next/router";

//This component renders the register page

const Register = () => {
  //state for RegisterForm component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  //below function adds username to register form

  // let handleUsernameChange = (e) => {
  //   setUsername((username = e.target.value));
  // };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //below function adds password to register form

  // const handlePasswordChange = (e) => {
  //   setPassword((password = e.target.value));
  // };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

  //below handler gets the value from the select options and assigns a boolean
  //value to depending on whether the user selected "admin" or "doctor".

  // const handleAdminChange = (e) => {
  //   if (e.target.value == "admin") {
  //     setAdmin((admin = true));
  //   } else {
  //     setAdmin((admin = false));
  //   }
  // };
  const handleAdminChange = (e) => {
    setAdmin(e.target.value === "admin");
  };

  //access routing capability from the useRouter hook
  const router = useRouter();

  //below function handles the sign up button on the register page:
  //it is linked to the POST handler in the server.
  //upon submit it sends over the username, password & a boolean value for the admin field in the body of the document.
  const handleSignUp = (e) => {
    e.preventDefault();

    fetch("/api/appointments/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        admin: admin,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          //after successfull registration the user is redirected to the login page
          router.push("/login");
        }
      });
  };

  return (
    <Layout>
      <RegisterForm
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleAdminChange={handleAdminChange}
        handleSignUp={handleSignUp}
      />
    </Layout>
  );
};

export default Register;
