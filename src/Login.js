import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7125/api/User/login", formData);
      alert(response.data.message);
      localStorage.setItem("userId", response.data.userId);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Tên đăng nhập" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
          <button type="submit">Đăng Nhập</button>
        </form>
        <p className="register-link">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
