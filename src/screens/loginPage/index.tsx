import { Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { Messages } from "../../libs/types/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../libs/types/sweetAlert";
import { LoginInput } from "../../libs/types/user";
import UserService from "../../services/UserService";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setAuthMember } = useGlobals();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const isFullfill = userName !== "" && userPassword !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        userName: userName,
        userPassword: userPassword,
      };

      const user = new UserService();
      const result = await user.login(loginInput);
      setAuthMember(result);
      navigate("/board/my-boards");
      sweetTopSuccessAlert("Succesfully created!");
    } catch (err) {
      navigate("/user/login");
      sweetErrorHandling(err).then();
    }
  };

  const handleNavigationSignup = async () => {
    navigate(`/user/signup`);
  };

  return (
    <div>
      <Stack sx={styles.container}>
        <Stack sx={styles.stack}>
          <h2 style={styles.header}>Task Flow</h2>
        </Stack>
        <Stack sx={styles.stack}>
          <input
            placeholder="USERNAME"
            onChange={(e) => setUserName(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            LOGIN
          </button>
        </Stack>
        <Stack sx={styles.stack}>
          <button onClick={handleNavigationSignup} style={styles.signupButton}>
            Signup
          </button>
        </Stack>
      </Stack>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg, #4f9be8, #2c6ba5)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
  },
  stack: {
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    marginBottom: "20px",
  },
  header: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  input: {
    width: "93%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "2px solid #fff",
    outline: "none",
    fontSize: "1rem",
    background: "#fff",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    backgroundColor: "#56b4d3",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
  },
  signupButton: {
    marginTop: "50px",
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    backgroundColor: "#ffcc00",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Login;
