import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTourismAgencyQuery,
  useUpdateTourismAgencyMutation,
} from "./tourismAgencySlice";
import { TourismAgencyForm } from "./components/TourismAgencyForm";
import { ITourismAgency } from "../../types/TourismAgency";

export const TourismAgencyEdit = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const { data: tourismAgency, isFetching } = useGetTourismAgencyQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateTourismAgency, status] = useUpdateTourismAgencyMutation();
  const [tourismAgencyState, setTourismAgencyState] = useState<ITourismAgency>({
    _id: "",
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    is_active: false
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateTourismAgency(tourismAgencyState);
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
    if (tourismAgency) {
      setTourismAgencyState(tourismAgency);
    }
  }, [tourismAgency]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Tourism Agency updated successfully", { variant: "success" });
      setIsdisabled(false);
      navigate("/tourism-agencies");
    }
    if (status.error) {
      enqueueSnackbar("Tourism Agency not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Tourism Agency</Typography>
          </Box>
        </Box>
        <TourismAgencyForm
          isLoading={false}
          tourismAgency={tourismAgencyState}
          isdisabled={isFetching || isdisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};