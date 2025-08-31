// NOTE: Temporary endpoint for testing/demo purposes only.
const baseURL = "https://localhost:4000/tasks";
export const fetchTasks = async () => {
  const response = await fetch(baseURL);
  const data = await response.json();
  return data;
};
