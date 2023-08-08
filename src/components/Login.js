import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };
  return (
    <div className="mt-2">
      <h2 className="my-3">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            value={credentials.email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.password}
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
