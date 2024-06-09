import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { IAirline } from "../../types/Airline";
import { useCreateAirlineMutation } from "./airlinesSlice";
import { AirlineFrom } from "./components/AirlineFrom";
import { useNavigate } from "react-router-dom";

export const AirlineCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [createUser, status] = useCreateAirlineMutation();
  const [isdisabled, setIsdisabled] = useState(false);
  const [airlineState, setAirlineState] = useState<IAirline>({
    name: "",
    country: "",
    site_url: "",
    logo_url: "",
    is_active: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createUser(airlineState);
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
    if (status.isSuccess) {
      enqueueSnackbar("Airline created successfully", { variant: "success" });
      setIsdisabled(true);
      navigate('/airlines')
    }
    if (status.error) {
      enqueueSnackbar("Airline not created", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Airline</Typography>
          </Box>
        </Box>
        <AirlineFrom
          isLoading={false}
          isdisabled={isdisabled}
          airline={airlineState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};