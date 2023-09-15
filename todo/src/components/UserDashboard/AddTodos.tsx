import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useState } from "react";

interface IState {
  name: string;
  value: string;
  status: string;
  userId: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddTodos: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskList, setTaskList] = useState<IState[]>([]);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [viewIndex, setViewIndex] = useState<number | null>(null);
  const [modalData, setModalData] = useState<IState | null>(null);

  const handleAddOpen = () => setAddOpen(true);
  
  const handleAddClose = () => {
    setAddOpen(false);
    setEditIndex(null);
    clearInputFields();
  };

  const handleViewOpen = (index: number) => {
    setViewIndex(index);
    const item = taskList[index];
    setModalData(item);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewIndex(null);
    setModalData(null);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "taskTitle") {
      setTaskTitle(value);
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    } else if (name === "taskStatus") {
      setTaskStatus(value);
    }
  };

  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleSave = (e: any) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTaskList = [...taskList];
      updatedTaskList[editIndex] = {
        name: taskTitle,
        value: taskDescription,
        status: taskStatus,
        userId: loggedInUser ? JSON.parse(loggedInUser).id : "",
      };
      localStorage.setItem("tasklist", JSON.stringify(updatedTaskList));
      setTaskList(updatedTaskList);
      setEditIndex(null);
      clearInputFields();
    } else {
      const taskObj: IState = {
        name: taskTitle,
        value: taskDescription,
        status: taskStatus,
        userId: loggedInUser ? JSON.parse(loggedInUser).id : "",
      };
      saveTask(taskObj);
      clearInputFields();
    }
    handleAddClose();
  };

  const clearInputFields = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("");
  };

  const saveTask = (taskObj: IState) => {
    const tempList = [...taskList, taskObj];
    localStorage.setItem("tasklist", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  useEffect(() => {
    const arr = localStorage.getItem("tasklist");
    if (arr) {
      const obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const item = taskList[index];
    setTaskTitle(item.name);
    setTaskDescription(item.value);
    setTaskStatus(item.status);
    handleAddOpen();
  };

  const dropdownOptions = [
    { label: "ToDo", value: "ToDo" },
    { label: "In Progress", value: "InProgress" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <>
      <div>
        <h1>Todo</h1>
        <Button
          className="btn btn-primary"
          variant="contained"
          onClick={handleAddOpen}
        >
          Add Todo
        </Button>
        <div className="container mt-2">
          <div className="row mt-2 ">
            <div className="col-lg-1 col-md-6 col-sm-12"></div>
            <div className="col-lg-11 col-md-6 col-sm-12">
              <div className=" mt-5">
                <table className="table table-striped table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskList.map((item, index) => (
                      <>
                        {loggedInUser &&
                          JSON.parse(loggedInUser).id === item.userId && (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.value}</td>
                              <td>{item.status}</td>

                              <td>
                                <button onClick={() => handleViewOpen(index)}>
                                  View
                                </button>
                              </td>
                              <td>
                                <button onClick={() => handleEdit(index)}>
                                  Edit
                                </button>
                              </td>
                            </tr>
                          )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal
          aria-labelledby="add-transition-modal-title"
          aria-describedby="add-transition-modal-description"
          open={addOpen}
          onClose={handleAddClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addOpen}>
            <Box sx={style}>
              <Typography
                id="add-transition-modal-title"
                variant="h6"
                component="h2"
              >
                {editIndex !== null ? "Edit Task" : "Add Task"}
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleSave}>
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={taskTitle}
                    name="taskTitle"
                    onChange={handleChange}
                    placeholder="Add Todo Title"
                  />
                  <FormHelperText />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={taskDescription}
                    name="taskDescription"
                    onChange={handleChange}
                    placeholder="Add Todo Description"
                  />
                  <FormHelperText />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <select
                    className="dropdown"
                    value={taskStatus}
                    name="taskStatus"
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      Status
                    </option>
                    {dropdownOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                {editIndex !== null ? (
                  <div>
                    <Button
                      className="btn btn-primary"
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>{" "}
                    <Button
                      className="btn btn-primary"
                      variant="contained"
                      onClick={handleAddClose}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="btn btn-primary"
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                )}
              </form>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="view-transition-modal-title"
          aria-describedby="view-transition-modal-description"
          open={viewOpen}
          onClose={handleViewClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewOpen}>
            <Box sx={style}>
              <Typography
                id="view-transition-modal-title"
                variant="h6"
                component="h2"
              >
                <h3>View Todo</h3>
              </Typography>
              <Typography id="view-transition-modal-description" sx={{ mt: 2 }}>
                <h5>Todo Title</h5>
                {modalData ? modalData.name : "Todo Title"}
              </Typography>
              <Typography id="view-transition-modal-description" sx={{ mt: 2 }}>
                <h5>Todo Description</h5>
                {modalData ? modalData.value : "Todo Description"}
              </Typography>
              <Typography id="view-transition-modal-description" sx={{ mt: 2 }}>
                <h5>Todo Progress</h5>
                {modalData ? modalData.status : "Status"}
              </Typography>
              <Button
                className="btn btn-primary"
                variant="contained"
                onClick={handleViewClose}
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default AddTodos;
