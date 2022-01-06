import { useRouter } from "next/router";
import Layout from "../components/MyLayout.js";
import Button from "react-bootstrap/Button";
import PatientListDoc from "../components/PatientList_doc";
import fetch from "isomorphic-unfetch";

const App = ({ data }) => {
  const router = useRouter();
  //Log out button function
  const handleLogOut = () => {
    //sessionStroge gets set to null to ensure that the JWT token gets removed upon logout.
    sessionStorage.setItem("token", null);
    //router.push() redirects the user to the homepage
    router.push("/");
  };

  return (
    <Layout>
      <div className="btn-select-container">
        <div className="filter-logout-btn-container">
          <Button onClick={handleLogOut} variant="warning">
            Log out
          </Button>
        </div>
      </div>
      <PatientListDoc data={data} />
    </Layout>
  );
};

//fetching data stored in database then passing the data as props
App.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/appointments");
  const data = await res.json();
  return {
    data: data,
  };
};

export default App;
