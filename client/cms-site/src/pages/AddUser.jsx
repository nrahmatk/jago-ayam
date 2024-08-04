import { useState } from "react";
import axiosInstance from "../components/axiosInstance";
import MessageModal from "../components/MessageModal";

export default function AddUser() {
  const [addUser, setAddUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser({
      ...addUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/add-user", addUser, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setModalTitle("Success");
      setMessage(`Success add data with email : ${response.data.email}`);
      setAddUser({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
      setShowModal(true);
    } catch (error) {
      setModalTitle("Error");
      setMessage(error.response.data.message);
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="content-title">
        <h2>Add User</h2>
      </div>
      <div className="content-description">Fill form below to add Staff</div>
      <div className="content-body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={addUser.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={addUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={addUser.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={addUser.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id=""
              value={addUser.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="container-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <MessageModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
        message={message}
      />
    </>
  );
}
