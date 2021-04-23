import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
const initialState = {
  first_name: "",
  password: "",
};

function LoginForm() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { login } = useContext(AuthContext);

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
    // TODO add validation
    let response = await login(formData);
    console.log(response);
    if (response) {
      setFormData(initialState);
      history.push("/");
    } else {
      setError(response[0]);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          onChange={handleChange}
          name="first_name"
          value={formData.first_name}
          placeholder="Enter a first_name"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          placeholder="Enter a password"
        />
      </div>
      {error && <p>{error}</p>}
      <button>SUBMIT</button>
    </form>
  );
}

export default LoginForm;
