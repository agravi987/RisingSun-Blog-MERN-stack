import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileModal = () => {
  const [showModal, setShowModal] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const name = token?.user?.name || "";
  const email = token?.user?.email || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <li className="nav-item">
        <button
          className="btn btn-light"
          style={{
            color: "#6A0DAD",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "1px solid #6A0DAD",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
          onClick={() => setShowModal(true)}
        >
          Profile
        </button>
      </li>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ color: "#6A0DAD", background: "white" }}
        >
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label style={{ fontWeight: "bold", color: "#6A0DAD" }}>Name</label>
            <input type="text" className="form-control" value={name} readOnly />
          </div>
          <div className="form-group mt-2">
            <label style={{ fontWeight: "bold", color: "#6A0DAD" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn "
            style={{ backgroundColor: "#6A0DAD", color: "white" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
