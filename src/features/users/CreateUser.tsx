import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { IUser } from "../../types/User";
import { useCreateUserMutation } from "./userSlice";
import { UserFrom } from "./components/UserFrom";
import { useNavigate } from "react-router-dom";

export const UserCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [createUser, status] = useCreateUserMutation();
  const [isdisabled, setIsdisabled] = useState(false);
  const [userState, setUserState] = useState<IUser>({
    name: "",
    email: "",
    is_active: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createUser(userState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState({ ...userState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserState({ ...userState, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("User created successfully", { variant: "success" });
      setIsdisabled(true);
      navigate('/users')
    }
    if (status.error) {
      enqueueSnackbar("User not created", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create User</Typography>
          </Box>
        </Box>
        <UserFrom
          isLoading={false}
          isdisabled={isdisabled}
          user={userState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};