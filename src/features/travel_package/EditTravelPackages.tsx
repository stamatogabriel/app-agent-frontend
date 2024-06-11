import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTravelPackageQuery,
  useUpdateTravelPackageMutation,
} from "./travelPackageSlice";
import { TravelPackageForm } from "./components/TravelPackageForm";
import { ITravelPackage } from "../../types/TravelPackage";

export const TravelPackageEdit = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const { data: travelPackage, isFetching } = useGetTravelPackageQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateTravelPackage, status] = useUpdateTravelPackageMutation();
  const [travelPackageState, setTravelPackageState] = useState<ITravelPackage>({
    _id: "",
    name: "",
    itinerary: [],
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateTravelPackage(travelPackageState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelPackageState({ ...travelPackageState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTravelPackageState({ ...travelPackageState, [name]: checked });
  };

  const handleChangeItinerary = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const newItineraries = travelPackageState.itinerary.map((itinerary, i) => {
      if (i === index) {
        return { ...itinerary, [name]: value };
      }
      return itinerary;
    });
    setTravelPackageState({ ...travelPackageState, itinerary: newItineraries });
  }

  const addItinerary = () => {
    setTravelPackageState({
      ...travelPackageState,
      itinerary: [...travelPackageState.itinerary, { image: "", description: "" }],
    });
  };

  const removeItinerary = (index: number) => {
    const newItineraries = travelPackageState.itinerary.filter((_, i) => i !== index);
    setTravelPackageState({ ...travelPackageState, itinerary: newItineraries });
  }

  useEffect(() => {
    if (travelPackage) {
      setTravelPackageState(travelPackage);
    }
  }, [travelPackage]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Package updated successfully", { variant: "success" });
      setIsdisabled(false);
      navigate("/travel-packages");
    }
    if (status.error) {
      enqueueSnackbar("Package not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Package</Typography>
          </Box>
        </Box>
        <TravelPackageForm
          isLoading={false}
          travelPackage={travelPackageState}
          isdisabled={isFetching || isdisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
          handleChangeItinerary={handleChangeItinerary}
          addItinerary={addItinerary}
          removeItinerary={removeItinerary}
        />
      </Paper>
    </Box>
  );
};