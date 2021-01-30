export const isAuth: Function = (localStorage: Storage) =>
  typeof localStorage.token != "undefined" &&
  localStorage.token !== null &&
  localStorage.token !== "" &&
  localStorage.token !== "undefined";
