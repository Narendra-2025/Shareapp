
export const fetchUser = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    return JSON.parse(storedUser);
  } else {
    localStorage.clear();
    return null;
  }
};
