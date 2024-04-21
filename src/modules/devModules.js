import axios from "axios";

const dummyLogin = async () => {
  try {
    const apiEndpoint = "http://localhost:3000/accounts";
    // Use Axios to make a GET request with query parameters
    const response = await axios.get(apiEndpoint, {
      params: {
        email: "adisawant123@gmail.com",
        password: "123",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized. Please check your credentials.");
    } else if (error.response && error.response.status === 404) {
      console.log("Resource not found. Please check your request.");
    } else {
      console.log("Unexpected status code:", error.response.status);
    }
  }
};

// import { dummyLogin } from "../../modules/devModules";
{
  /* <button
        className="bg-stone-400 rounded-full px-4 py-3 border-4"
        onClick={async () => {
          dispatch(getAccountData(await dummyLogin()));
        }}
      >
        Dummy Login
      </button> */
}

export { dummyLogin };
