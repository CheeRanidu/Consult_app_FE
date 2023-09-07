export const setLogInToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getLogInToken = () => {
  const token = localStorage.getItem("authToken");
  return token;
};

export const removeLoginToken = () => {
  localStorage.removeItem("authToken");
};
