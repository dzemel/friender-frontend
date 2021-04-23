import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm() {
  const { signup } = useContext(AuthContext);
  console.log("Signup", signup);
  const history = useHistory();
  const [formData, setFormData] = useState({
    password: "",
    first_name: "",
    last_name: "",
    hobbies: "",
    photo: "",
    zipcode: "",
    friend_radius: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );
  
  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    console.log("Form Data is here", formData);
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First name</label>
                <input
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Hobbies</label>
                <input
                  name="hobbies"
                  className="form-control"
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Photo</label>
                <input
                  name="photo"
                  className="form-control"
                  value={formData.photo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  name="zipcode"
                  className="form-control"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Friend Radius</label>
                <input
                  name="friend_radius"
                  className="form-control"
                  value={formData.friend_radius}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
