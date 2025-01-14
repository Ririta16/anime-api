// import { useEffect, useState } from "react";
import "./App.css";
// import axios, { AxiosResponse } from "axios";
// import Loading from "./components/Loading";
import Anime from "./Anime"

// type ParamsType = {
//   page: number;
//   per_page: number;
// };

// type CreateUser = {
//   name: string;
//   job: string;
// };

function App() {
  
  /* const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const url = "https://reqres.in/api";
  // setLoading(true);
  const getDataPromiseByFetch = (page: number, perpage: number) => {
    fetch(`${url}/users?page=${page}&per_page=${perpage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .then((error) => {
        console.error("Error : ", error);
      })
      .finally(() => {
        console.log("Finally");
        // setLoading(false);
      });
  };

  const getDataAsyncByFetch = async () => {
    try {
      const response = await fetch(`${url}/users`);
      if (!response.ok) {
        throw new Error("Error");
      }
      if (response.status === 200) {
        console.log("data : ", response);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      console.log("Finally");
    }
  };

  Axios
  const getDataAxios = async (params: ParamsType) => {
    try {
      const response = await axios.get(`${url}/users`, { params });
      if (response.status === 200) {
        console.log("Axios : ", response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

    const postCreateUser = async () => {
    try {
      const response = await axios({
        url: `${url}/users`,
        method: "POST",
        data:{
          name: "John",
          job: "dev,"
        }
      })
      if (response.status === 201) {
        console.log("Axios : ", response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  const postCreateUser = async (data: CreateUser) => {
    try {
      const response = await axios<
        unknown,
        AxiosResponse<CreateUser>,
        CreateUser
      >({
        url: `${url}/users`,
        method: "POST",
        data: data,
      });
      if (response.status === 201) {
        console.log("Axios : ", response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  useEffect(() => {
    getDataPromiseByFetch(1,3);
    getDataAxios({
      page: 1,
      per_page: 4,
    });
    postCreateUser();
  }, []); */

  return (
    <div>
      <Anime/>
      {/* <Loading/> */}
    </div>
  );
}

export default App;
