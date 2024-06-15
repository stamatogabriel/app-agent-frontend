import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTravelQuery,
  useUpdateTravelMutation,
} from "./travelSlice";
import { TravelForm } from "./components/TravelForm";
import { ITravel } from "../../types/Travel";

export const TravelPackageEdit = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const { data: travelPackage, isFetching } = useGetTravelQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateTravel, status] = useUpdateTravelMutation();
  const [travelState, setTravelState] = useState<ITravel>({
    _id: "",
    client_id: "",
    flights: [],
    travel_package_id: "",
    travelers: [],
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateTravel({
      ...travelState,
      client_id: (travelState.client_id as any)[0]._id,
      travel_package_id: (travelState.travel_package_id as any)[0]._id,
      flights: travelState.flights.map((flight) => ({
        ...flight,
        airline_id: (flight.airline_id as any)[0]._id,
      })),
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelState({ ...travelState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTravelState({ ...travelState, [name]: checked });
  };

  const handleChangeFlight = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newFlights = travelState.flights.map((flight, i) => {
      if (i === index) {
        return { ...flight, [name]: value };
      }
      return flight;
    });
    setTravelState({ ...travelState, flights: newFlights });
  };

  const addFlight = () => {
    setTravelState({
      ...travelState,
      flights: [
        ...travelState.flights,
        {
          airline_id: "",
          airport: "",
          date_hour_boarding: new Date(),
          date_hour_departure: new Date(),
          ticket_number: "",
          type: "going",
        },
      ],
    });
  };

  const removeFlight = (index: number) => {
    const newItineraries = travelState.flights.filter((_, i) => i !== index);
    setTravelState({ ...travelState, flights: newItineraries });
  };

  const handleChangeTraveler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newTravelers = travelState.travelers.map((traveler, i) => {
      if (i === index) {
        return { ...traveler, [name]: value };
      }
      return traveler;
    });
    setTravelState({ ...travelState, travelers: newTravelers });
  }

  const addTraveler = () => {
    setTravelState({
      ...travelState,
      travelers: [
        ...travelState.travelers,
        {
          email: "",
          name: "",
        },
      ],
    });
  }
  
  const removeTraveler = (index: number) => {
    const newTravelers = travelState.travelers.filter((_, i) => i !== index);
    setTravelState({ ...travelState, travelers: newTravelers });
  }

  useEffect(() => {
    if (travelPackage) {
      setTravelState(travelPackage);
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
        <TravelForm
          isLoading={false}
          travel={travelState}
          isdisabled={isFetching || isdisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
          handleChangeFlight={handleChangeFlight}
          addFlight={addFlight}
          removeFlight={removeFlight}
          handleChangeTraveler={handleChangeTraveler}
          addTraveler={addTraveler}
          removeTraveler={removeTraveler}
        />
      </Paper>
    </Box>
  );
};