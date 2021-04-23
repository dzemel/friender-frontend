import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import FrienderApi from "./FrienderApi";
// TODO we make an update Profile fx, which we use the endpoint
// of patch a user, and we also use post for a user
// so we call Friender.login, just to test whether it passes or not
// if it doesnt throws an invalid password
function Profile() {
  const { currUser, setCurrUser } = useContext(AuthContext);
  const {
    first_name,
    last_name,
    hobbies,
    photo,
    zip,
    friend_radius,
  } = currUser;
  const initialState = {
    first_name,
    last_name,
    hobbies,
    photo,
    zip,
    friend_radius,
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(null);

  function handleChange(evt) {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let response = await FrienderApi.changeUserProfile(first_name, formData);
      setCurrUser((user) => ({ ...user, ...formData }));
      setErrors([]);
    } catch (err) {
      setErrors(err);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <div>First Name: {first_name}</div>
      </div>
      <div className="formGroup">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="
          email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Select an email"
        />
      </div>
      {/* <div>Confirm password to make changes: </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          placeholder="Select a password"
        />
      </div> */}
      {errors && (
        <ul>
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
      <button>SUBMIT</button>
    </form>
  );
}

export default Profile;
