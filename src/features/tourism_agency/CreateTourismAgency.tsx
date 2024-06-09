import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { ITourismAgency } from "../../types/TourismAgency";
import { useCreateTourismAgencyMutation } from "./tourismAgencySlice";
import { TourismAgencyForm } from "./components/TourismAgencyForm";
import { useNavigate } from "react-router-dom";

export const TourismAgencyCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [createTourismAgency, status] = useCreateTourismAgencyMutation();
  const [isdisabled, setIsdisabled] = useState(false);
  const [tourismAgencyState, setTourismAgencyState] = useState<ITourismAgency>({
    name: "",
    cnpj: "",
    email: "",
    is_active: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createTourismAgency(tourismAgencyState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTourismAgencyState({ ...tourismAgencyState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTourismAgencyState({ ...tourismAgencyState, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Tourism Agency created successfully", { variant: "success" });
      setIsdisabled(true);
      navigate('/tourism-agencies')
    }
    if (status.error) {
      enqueueSnackbar("Tourism Agency not created", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Tourism Agency</Typography>
          </Box>
        </Box>
        <TourismAgencyForm
          isLoading={false}
          isdisabled={isdisabled}
          tourismAgency={tourismAgencyState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};