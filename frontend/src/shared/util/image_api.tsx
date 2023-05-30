import axios from "axios";

const defaults = {
  baseURL: process.env.REACT_APP_IMAGE_API_URL as string,
  headers: () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_IMAGE_API_TOKEN}`,
  }),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact us.",
    status: 503,
    data: {},
  },
};

const imageApi = (
  method: string,
  url: string,
  ContentType?: string,
  variables?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: ContentType
        ? { ...defaults.headers(), "Content-Type": ContentType }
        : defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        if (error.response) {
          reject({
            status: error.response.status,
            message: error.response.statusText,
          });
        } else {
          reject(defaults.error);
        }
      }
    );
  });
};

export default imageApi;
