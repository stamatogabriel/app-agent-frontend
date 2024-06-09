import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "./userSlice";
import { UserFrom } from "./components/UserFrom";
import { IUser } from "../../types/User";

export const UserEdit = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const { data: user, isFetching } = useGetUserQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateUser, status] = useUpdateUserMutation();
  const [userState, setUserState] = useState<IUser>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    is_active: false
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateUser(userState);
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
    if (user) {
      setUserState(user);
    }
  }, [user]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("User updated successfully", { variant: "success" });
      setIsdisabled(false);
      navigate("/users");
    }
    if (status.error) {
      enqueueSnackbar("User not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit User</Typography>
          </Box>
        </Box>
        <UserFrom
          isLoading={false}
          user={userState}
          isdisabled={isFetching || isdisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};