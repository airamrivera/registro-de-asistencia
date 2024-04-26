import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import './login.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
 return (
    <div className="login-box">
      <form onSubmit={Auth}>
      {isError && <p style={{ color: 'red' }}>{message}</p>}
        <div className="user-box">
          
          <input 
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
          
          <label>Email</label>
        </div>
        <div className="user-box">
          <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
          <label>Password</label>
        </div>
        <center>
        <button type="submit">
          {isLoading ? "Loading..." : "Iniciar Sesión"}
            <span></span>
          </button>
        </center>
      </form>
    </div>
  );
};

export default Login;
