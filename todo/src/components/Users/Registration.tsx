import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  id: number;
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>({
    id: 0,
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("users");
    if (userData) {
      setUsers(JSON.parse(userData));
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: IUser = { ...user, id: Date.now() };
    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setUser({
      id: 0,
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="w-50">
          <form className="card p-4 mt-4" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="FirstName"
                value={user.FirstName}
                onChange={handleChange}
                className="form-control"
                id="FirstName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="LastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="LastName"
                value={user.LastName}
                onChange={handleChange}
                className="form-control"
                id="LastName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                id="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
