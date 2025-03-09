import Layout from "../components/MyLayout.js";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useRouter } from "next/router";

//This component renders the login page

const Login = () => {
  //state that holds login data
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  //handles input from username field in login page
  const handleUsernameLoginChange = (e) => {
    setUsernameLogin(e.target.value);
  };

  //handles input from password field in login page
  const handlePasswordLoginChange = (e) => {
    setPasswordLogin(e.target.value);
  };

  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();

    fetch("/api/appointments/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: usernameLogin,
        password: passwordLogin,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.admin === true) {
          sessionStorage.setItem("token", result.token);
          router.push("/app");
        } else if (result.admin === false) {
          sessionStorage.setItem("token", result.token);
          router.push("/app_doctor");
        } else {
          alert("Try again");
        }
      });
  };

  return (
    <Layout>
      <LoginForm
        handleUsernameLoginChange={handleUsernameLoginChange}
        handlePasswordLoginChange={handlePasswordLoginChange}
        handleSignIn={handleSignIn}
      />
    </Layout>
  );
};

export default Login;
