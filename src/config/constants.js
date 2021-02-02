export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://cairn-api.herokuapp.com/"
    : "http://localhost:4000";
export const DEFAULT_MESSAGE_TIMEOUT = 3000;
export const ACCESS_KEY = "32a9e8a6c631e9b354fecd17ee97477f";
