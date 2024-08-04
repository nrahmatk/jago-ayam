import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import MessageModal from "../components/MessageModal";
import axiosInstance from "../components/axiosInstance";

export default function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [modalTitle, setModalTitle] = useState('')
  const [message, setMessage] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const changeHandler = async (e) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      setModalTitle('Error')
      setMessage(error.response.data.message)
      setShowModal(true)
    }
  };

  return (
    <>
      <div className="page-login">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={submitHandler}>
            <div className="form-login-group">
              <input
                className="form-login-input"
                type="email"
                id="email"
                name="email"
                value={loginForm.email}
                onChange={changeHandler}
                placeholder="Masukkan email"
                required
              />
              <input
                className="form-login-input"
                type="password"
                id="password"
                name="password"
                value={loginForm.password}
                onChange={changeHandler}
                placeholder="Masukkan password"
                required
              />
              <button className="container-button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
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
