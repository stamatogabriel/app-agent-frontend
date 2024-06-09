import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAirlineQuery,
  useUpdateAirlineMutation,
} from "./airlinesSlice";
import { AirlineFrom } from "./components/AirlineFrom";
import { IAirline } from "../../types/Airline";

export const AirlineEdit = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const { data: user, isFetching } = useGetAirlineQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateUser, status] = useUpdateAirlineMutation();
  const [airlineState, setAirlineState] = useState<IAirline>({
    _id: "",
    name: "",
    country: "",
    site_url: "",
    logo_url: "",
    is_active: false
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateUser(airlineState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAirlineState({ ...airlineState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAirlineState({ ...airlineState, [name]: checked });
  };

  useEffect(() => {
    if (user) {
      setAirlineState(user);
    }
  }, [user]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Airline updated successfully", { variant: "success" });
      setIsdisabled(false);
      navigate("/airlines");
    }
    if (status.error) {
      enqueueSnackbar("Airline not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Airline</Typography>
          </Box>
        </Box>
        <AirlineFrom
          isLoading={false}
          airline={airlineState}
          isdisabled={isFetching || isdisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};