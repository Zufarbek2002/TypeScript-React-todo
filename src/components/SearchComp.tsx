import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SearchComp = ({ setFiltered, data }) => {
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const group = e.target.value;
    let filteredValue;
    if (group == "All") {
      filteredValue = data.todo;
    } else {
      filteredValue = data.todo.filter((data) => `${data.completed}` == group);
    }
    setFiltered(filteredValue);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      title: `${e.target.value}`,
      completed: false,
    });
  };

  const handleAdd = async () => {
    if (todo.title.length >= 2) {
      await axios.post("http://localhost:3000/todos", todo);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setFiltered(
      data.todo.filter((element) => element.title.toLowerCase().includes(text))
    );
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ pt: 3 }}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "500",
              fontFamily: '"Lobster Two", sans-serif',
            }}
          >
            Todo App
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
              mt: 5,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Add Todo"
              variant="outlined"
              sx={{ width: "100%" }}
              size="small"
              onChange={handleInput}
            />
            <Button type="submit" variant="contained" onClick={handleAdd}>
              <AddIcon />
            </Button>
          </Box>

          <Box
            sx={{
              minWidth: 120,
              display: "flex",
              mt: 5,
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "100%", maxWidth: "150px" }}>
              <InputLabel id="demo-simple-select-label">Filter todo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Filter todo"
                onChange={handleChange}
                size="small"
                defaultValue="All"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
                <MenuItem value="false">Uncompleted</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Search..."
              variant="outlined"
              size="small"
              sx={{ width: "100%", maxWidth: "300px" }}
              onChange={handleSearch}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SearchComp;
