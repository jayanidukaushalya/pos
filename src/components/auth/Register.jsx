import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  Input,
} from "@mui/material";
import { useMode, useSetMode } from "../theme/ThemeContext";
import ThemeToggler from "../theme/ThemeToggler";
import { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function Register() {
  const mode = useMode();
  const setMode = useSetMode();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(password);
    console.log(confirmPassword);
  };

  return (
    <>
      <Grid
        container
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4} paddingX={5}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  error
                  helperText="Please enter your username"
                  id="username"
                  label="Username"
                  variant="outlined"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                  id="password"
                  label="Password"
                  setPassword={setPassword}
                />
                <PasswordInput
                  id="confirm-password"
                  label="Confirm Password"
                  setPassword={setConfirmPassword}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={1}
                >
                  <Typography variant="caption" display="block">
                    Powered by
                  </Typography>
                  <Link
                    href={"http://beecodelabs.com/"}
                    variant="caption"
                    fontWeight={"bold"}
                    display="block"
                    color={"#ffc010"}
                    underline="none"
                  >
                    BeeCode Labs
                  </Link>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Box position={"absolute"} top={10} right={10}>
        <ThemeToggler mode={mode} setMode={setMode} />
      </Box>
    </>
  );
}
