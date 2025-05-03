import axios from "axios";
import { serverApi } from "../libs/types/config";
import { LoginInput, User, UserInput } from "../libs/types/user";

class UserService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async signup(input: UserInput): Promise<User> {
    try {
      const url = `${this.path}/user/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup, result: ", result);

      const member: User = result.data.member;
      console.log("signup, member: ", member);
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, signup: ", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<User> {
    try {
      const url = `${this.path}/user/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login, result: ", result);

      const member: User = result.data.member;
      console.log("login, member: ", member);
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, login: ", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = `${this.path}/member/logout`;
      const result = await axios.post(url, {}, { withCredentials: true });

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, logout: ", err);
      throw err;
    }
  }
}

export default UserService;
