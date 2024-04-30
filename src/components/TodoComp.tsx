/* eslint-disable react-hooks/exhaustive-deps */
import { TodoCompProps } from "../types/types";
import { useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoComp = ({ filtered, setFiltered, data, setData }: TodoCompProps) => {
  const handleDelete = async (todoId: number) => {
    if (confirm("Are you sure delete")) {
      setFiltered(filtered.filter((todo) => todo.id !== todoId));
      await axios.delete(`http://localhost:3000/todos/${todoId}`);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number
  ) => {
    const bool = e.target.checked;
    try {
      const res = await axios.patch(`http://localhost:3000/todos/${todoId}`, {
        completed: bool,
      });
      const dataTodo = await res.data;
      setData({
        loading: false,
        todo: data.todo.map((todo) =>
          todo.id == dataTodo.id ? dataTodo : todo
        ),
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
    setFiltered(data.todo);
  }, [data.todo]);
  return (
    <div>
      <Container>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          mt={5}
          sx={{
            fontFamily: '"Lobster Two", sans-serif',
            fontWeight: 400,
            fontSize: "18px",
          }}
        >
          All your notes Here...
        </Typography>
        <Divider />
        <Box mt={4}>
          {data.loading && <h2>Loading...</h2>}
          {data.error && <h2>{data.error}</h2>}
          {filtered.length > 0 &&
            filtered.map((data, i: number) => (
              <Card
                key={data.id}
                sx={{
                  mb: 2,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Checkbox
                    defaultChecked={data.completed}
                    onChange={(e) => handleChange(e, data.id)}
                  />
                  <h2
                    style={{
                      textDecorationLine: data.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {i + 1}. {data.title}
                  </h2>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(data.id)}
                >
                  <DeleteIcon />
                </Button>
              </Card>
            ))}
        </Box>
      </Container>
    </div>
  );
};

export default TodoComp;
