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
      <Stack>
        <h2>Task Flow</h2>
      </Stack>
      <Stack>
        <h2>Login</h2>
        <input
          placeholder="USERNAME"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="PASSWORD"
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button onClick={handleLogin}>LOGIN</button>
      </Stack>
      <Stack>
        <button onClick={handleNavigationSignup}>Signup</button>
      </Stack>
    </div>
  );
};

export default Login;
