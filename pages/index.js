import Link from "next/link";

//This component serves as the home page.

const Home = () => {
  return (
    <div>
      <div className="wrapper">
        <h1>eDoc</h1>
        <Link href="login" passHref>
          <button className="sign-in" variant="primary">
            Sign in
          </button>
        </Link>
      </div>
      <div className="welcome-wrapper">
        <h2>Welcome to eDoc</h2>
        <p>
          The application built for doctors that takes care of the paperwork so
          that doctors can take care of the people.
        </p>
      </div>
    </div>
  );
};

export default Home;

// image from https://northyorkdoctors.com/
