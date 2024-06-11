import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { ITravelPackage } from "../../types/TravelPackage";
import { useCreateTravelPackageMutation } from "./travelPackageSlice";
import { TravelPackageForm } from "./components/TravelPackageForm";
import { useNavigate } from "react-router-dom";

export const TravelPackageCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [createTravelPackage, status] = useCreateTravelPackageMutation();
  const [isdisabled, setIsdisabled] = useState(false);
  const [travelPackageState, setTravelPackageState] = useState<ITravelPackage>({
    name: "",
    itinerary: [],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createTravelPackage(travelPackageState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelPackageState({ ...travelPackageState, [name]: value });
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

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTravelPackageState({ ...travelPackageState, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Package created successfully", { variant: "success" });
      setIsdisabled(true);
      navigate('/travel-packages')
    }
    if (status.error) {
      enqueueSnackbar("Package not created", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create TravelPackage</Typography>
          </Box>
        </Box>
        <TravelPackageForm
          isLoading={false}
          isdisabled={isdisabled}
          travelPackage={travelPackageState}
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