import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

function Homepage() {
  const { currUser } = useContext(AuthContext);
  return (
    <div>
      {currUser && (
        <div>
          <h1>Friender</h1>
          <p>Lonely? Make some new friends in your area!</p>
          <h2>
            Welcome Back, {currUser.first_name}! Get ready to be more popular!
          </h2>
        </div>
      )}
      {!currUser && (
        <div>
          <h1>Friender</h1>
          <p>
            All the friends in one, convenient place. You aren't getting any
            younger!
          </p>
          <div>
            <Link exact to="/login">
              Log in
            </Link>
            <Link exact to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
