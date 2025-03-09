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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleAdminChange = (e) => {
    setAdmin(e.target.value === "admin");
  };

  //access routing capability from the useRouter hook
  const router = useRouter();

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
