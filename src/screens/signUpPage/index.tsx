import { Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { Messages } from "../../libs/types/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../libs/types/sweetAlert";
import { UserInput } from "../../libs/types/user";
import UserService from "../../services/UserService";

const Signup = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setAuthMember } = useGlobals();
  const navigate = useNavigate();

  // HANDLERS
  const handleSignup = async () => {
    try {
      const isFullfill =
        userName !== "" && userEmail !== "" && userPassword !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const signupInput: UserInput = {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
      };

      console.log("+", signupInput);

      const user = new UserService();
      const result = await user.signup(signupInput);
      setAuthMember(result);
      navigate("/board/my-boards");
      sweetTopSuccessAlert("Successfully created!");
    } catch (err) {
      navigate("/user/signup");
      sweetErrorHandling(err).then();
    }
  };

  const handleNavigationLogin = async () => {
    navigate(`/user/login`);
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
            placeholder="EMAIL"
            onChange={(e) => setUserEmail(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSignup} style={styles.button}>
            Signup
          </button>
        </Stack>
        <Stack sx={styles.stack}>
          <button onClick={handleNavigationLogin} style={styles.signupButton}>
            Login
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

export default Signup;
