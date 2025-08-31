import axios from "axios";

// NOTE: Temporary endpoint for testing/demo purposes only.
const baseURL = "https://localhost:4000/tasks";
export const fetchReviewTasks = async ({
  limit = 5,
  page = 1,

  params = {},
}) => {
  const response = await axios.get(
    `${baseURL}?column=review&_limit=${limit}&_page=${page}`,
    {
      params,
    }
  );
  return response;
};

export const fetchBacklogTasks = async ({
  limit = 5,
  page = 1,
  params = {},
}) => {
  const response = await axios.get(
    `${baseURL}?column=backlog&_limit=${limit}&_page=${page}`,
    {
      params,
    }
  );
  return response;
};

export const fetchInProgressTasks = async ({
  limit = 5,
  page = 1,
  params = {},
}) => {
  const response = await axios.get(
    `${baseURL}?column=in-progress&_limit=${limit}&_page=${page}`,
    {
      params,
    }
  );
  return response;
};

export const fetchDoneTasks = async ({ limit = 5, page = 1, params = {} }) => {
  const response = await axios.get(
    `${baseURL}?column=done&_limit=${limit}&_page=${page}`,
    {
      params,
    }
  );
  return response;
};
