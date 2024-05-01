/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import SearchComp from "./components/SearchComp";
import "./sass/SearchStyle.scss";
import TodoComp from "./components/TodoComp";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [filtered, setFiltered] = useState({
    todo: [],
  });
  const [data, setData] = useState({
    loading: false,
    todo: [],
    error: "",
  });

  const fetchData = async () => {
    setData({ ...data, loading: true });
    try {
      const res = await axios.get("http://localhost:3000/todos");
      const todo = await res.data;
      setData({
        loading: false,
        todo: todo,
        error: "",
      });
    } catch (err) {
      setData({
        loading: false,
        todo: [],
        error: (err as Error).message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="search_comp">
      <Box
        sx={{
          py: 3,
          px: 10,
          borderRadius: "10px",
          background: "#fff",
          width: "100%",
          maxWidth: "800px",
          m: "0 auto",
          minHeight: "100vh",
        }}
      >
        <SearchComp setFiltered={setFiltered} data={data} />
        <TodoComp
          filtered={filtered}
          setFiltered={setFiltered}
          setData={setData}
          data={data}
        />
      </Box>
    </div>
  );
};

export default App;
