import Cookies from "js-cookie";

const setUser = (userDetails) => {
  Cookies.set("userDetails", JSON.stringify(userDetails));
  Cookies.set("isLoggedIn", true);
};

const getUser = () => {
  const userDetailsString = Cookies.get("userDetails");
  return userDetailsString ? JSON.parse(userDetailsString) : null;
};

const isLoggedIn = () => {
  return Cookies.get("isLoggedIn") === "true";
};

const logout = () => {
  Cookies.remove("userDetails");
  Cookies.remove("isLoggedIn");
};

export { setUser, getUser, isLoggedIn, logout };
