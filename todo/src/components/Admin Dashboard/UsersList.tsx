import React, { useEffect, useState } from "react";

interface IUser {
  id: number;
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const arr = localStorage.getItem("users");
    if (arr) {
      const obj = JSON.parse(arr);
      setUsers(obj);
    }
  }, []);

  const handleDelete = (id: any) => {
    const updatedUsers = users.filter((u: any) => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <div>
        <div className="container mt-2">
          <div className="row mt-2">
            <div className="col-lg-1 col-md-6 col-sm-12"></div>

            <div className="col-lg-11 col-md-6 col-sm-12">
              <div className="mt-5">
                <table className="table table-striped table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>User Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((u: any) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.FirstName}</td>
                          <td>{u.LastName}</td>
                          <td>{u.email}</td>
                          <td>{u.password}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(u.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
