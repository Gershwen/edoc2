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

  //access routing capability from the useRouter hook
  const router = useRouter();

  //below function handles the sign in button on the login page:
  //it is linked to the POST handler in the server.
  //upon submit it sends over the username & password in the body of the document.
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
        //This conditional checks what boolean value returned for admin.
        //it then redirects the user to the appropriate page depending on whether
        //the admin value is true or false.
        if (result.admin === true) {
          //the jwt gets stored in sessionStorage to have it persist accross pages after successfull login
          sessionStorage.setItem("token", result.token);
          //if the admin is true the user will be redirected to the /app route. This route
          //is for administrators only.
          router.push("/app");
        } else if (result.admin === false) {
          //the jwt gets stored in sessionStorage to have it persist accross pages after successfull login
          sessionStorage.setItem("token", result.token);
          //if the admin is false the user will be redirected to the /app_doctor route. This route
          //is for doctors only.
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
