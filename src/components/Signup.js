import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2">
      <h2 className="my-3">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            required
            id="name"
            name="name"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group  my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            required
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group  my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            minLength={5}
            required
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group  my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            minLength={5}
            required
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
