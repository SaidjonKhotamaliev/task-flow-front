import { Stack } from "@mui/material";
import axios from "axios";
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

  //   HADNLERS
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

      const user = new UserService();
      const result = await user.signup(signupInput);
      setAuthMember(result);
      //   handleSignupClose();
      navigate("/board/getMyBoards");

      sweetTopSuccessAlert("Succesfully created!");
    } catch (err) {
      //   handleSignupClose();
      sweetErrorHandling(err).then();
    }

    // try {
    //   await signup({ email, password });
    //   navigate("/login");
    // } catch (err) {
    //   alert("Signup failed");
    // }
  };
  const handleNavigationLogin = async () => {
    navigate(`${process.env.REACT_APP_API_URL}/user/login`);
  };

  return (
    <div>
      <Stack>
        <h2>Task Flow</h2>
      </Stack>
      <Stack>
        <h2>Signup</h2>
        <input
          placeholder="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="userEmail"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          placeholder="userPassword"
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
      </Stack>
      <Stack>
        <button onClick={handleNavigationLogin}>Login</button>
      </Stack>
    </div>
  );
};

export default Signup;
