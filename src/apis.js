import axios from "axios";
import { useAuth } from "./Authentication/auth";

const baseURL = "http://10.0.0.26:5000/api";

const config = {
  baseURL: baseURL,
};

const configWithToken = (token) => ({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const useLogin = () => {
  const setToken = useAuth((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);
  const setRole = useAuth((state) => state.setRole);
  const setAuthenticated = useAuth((state) => state.setAuthenticated);
  const setMessage = useAuth((state) => state.setMessage);

  const login = async ({ username, password }) => {
    try {
      const res = await axios
        .create(config)
        .post("/login", { userName: username, password });

      if (res.status !== 200) {
        setAuthenticated(false);
        setMessage(res.data.message);
        return false;
      }

      // console.log(res);
      sessionStorage.setItem("token", res.data.access);
      sessionStorage.setItem("user", res.data.username);
      sessionStorage.setItem("role", res.data.role);
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");
      const role = sessionStorage.getItem("role");

      setAuthenticated(true);
      setMessage(res.data.message);
      setToken(token);
      setUser(user);
      setRole(role);

      return true;
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
      setMessage(error);
      return false;
    }
  };

  return { login };
  //esle function naii return gareko ho i.e login function
};

const useToken = () => {
  const token = useAuth((state) => state.accesstoken);
  const tokenInstance = axios.create(configWithToken(token));
  return { tokenInstance };
};

const useLogout = () => {
  const setToken = useAuth((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);
  const setRole = useAuth((state) => state.setRole);
  const setAuthenticated = useAuth((state) => state.setAuthenticated);
  const logout = () => {
    try {
      sessionStorage.clear();
      setToken(null);
      setUser(null);
      setRole(null);
      setAuthenticated(false);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { logout };
};

export { useLogin, useToken, useLogout, config };
