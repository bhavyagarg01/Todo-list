import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import * as React from "react";

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

const UsersTodos: React.FC = () => {
  const [taskList, setTaskList] = useState<IState[]>([]);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IState | null>(null);

  const handleViewClose = () => {
    setViewOpen(false);

    setModalData(null);
  };

  useEffect(() => {
    const arr = localStorage.getItem("tasklist");
    if (arr) {
      const obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const handleDelete = (userId: any) => {
    const updatedUsers = taskList.filter((item: any) => item.userId !== userId);
    setTaskList(updatedUsers);
  };

  const handleClick = (index: number) => {
    const item = taskList[index];
    setModalData(item);
    setViewOpen(true);
  };

  return (
    <>
      <div>
        <div className="container mt-2">
          <div className="row mt-2 ">
            <div className="col-lg-1 col-md-6 col-sm-12"></div>
            <div className="col-lg-11 col-md-6 col-sm-12">
              <div className=" mt-5">
                <table className="table table-striped table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskList.map((item, index) => (
                      <>
                        <tr key={index}>
                          <td>{item.userId}</td>
                          <td>{item.name}</td>
                          <td>{item.value}</td>
                          <td>{item.status}</td>
                          <td>
                            <button onClick={() => handleClick(index)}>
                              View
                            </button>
                          </td>
                          <td>
                            <button onClick={() => handleDelete(item.userId)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <h5>UserId</h5>
              {modalData ? modalData.userId : "UserId"}
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
    </>
  );
};

export default UsersTodos;
