import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface IState {
  user: {
    email: string;
    password: string;
  };
}

const AdminLogin: React.FC = () => {
  const [state, setState] = useState<IState>({
    user: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      state.user.email === adminEmail &&
      state.user.password === adminPassword
    ) {
      alert("Admin Login Successful");
      navigate("/Dashboard");
    } else {
    }

    let usersList: any[];
    const data = localStorage.getItem("users");
    if (data) {
      usersList = JSON.parse(data);
    } else return;

    const loggedInUser = usersList.find(
      (_e) =>
        state.user.email === _e.email && state.user.password === _e.password
    );

    console.log(usersList.find((_e) => state.user.email === _e.email));

    if (loggedInUser) {
      navigate("/UsersDashboard");
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
    }
  };

  return (
    <>
      <div className="container">
        <div className="w-50">
          <form className="card p-4 mt-4" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={state.user.email}
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={state.user.password}
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/Registration">
              <p>New User?Register here</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
