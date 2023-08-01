import {
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMode, useSetMode } from "../theme/ThemeContext";
import ThemeToggler from "../theme/ThemeToggler";
import PasswordInput from "./components/PasswordInput";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import SuccessAlert from "../Alert/SuccessAlert";
import { useEffect, useState } from "react";

export default function Login() {
  const mode = useMode();
  const setMode = useSetMode();

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    isSuccess &&
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
  }, [isError, isSuccess, setError]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onSubmit",
  });

  const onsubmit = async (data) => {
    setLoading(true);
    fetch("http://localhost/server/pos/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((obj) => obj.text())
      .then((text) => {
        setLoading(false);
        if (text == "ok") {
          setSuccess(true);
          setError(false);
          setSuccessMessage("Login successful !");
          reset();
        } else {
          setError(true);
          setSuccess(false);
          setWarningMessage(text);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
            <form onSubmit={handleSubmit(onsubmit)}>
              <Stack spacing={2}>
                {isError && (
                  <SuccessAlert
                    message={warningMessage}
                    severity="warning"
                    isFixed={false}
                  />
                )}
                <TextField
                  error={isError || !!errors?.username}
                  helperText={errors?.username?.message}
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required !",
                    },
                  })}
                />
                <PasswordInput
                  label="Password"
                  id="password"
                  register={register}
                  isError={isError || !!errors?.password}
                  errorMessage={errors?.password?.message}
                />
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Login
                </LoadingButton>
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
                <DevTool control={control} />
                {isSuccess && (
                  <SuccessAlert
                    message={successMessage}
                    severity="success"
                    isFixed={true}
                  />
                )}
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
