import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { ITravel } from "../../types/Travel";
import {
  useCreateTravelMutation,
  useGetAllAirlinesQuery,
  useGetAllTravelPackagesQuery,
  useGetAllUsersQuery,
} from "./travelSlice";
import { TravelForm } from "./components/TravelForm";
import { useNavigate } from "react-router-dom";

export const TravelCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { data: travelPackages } = useGetAllTravelPackagesQuery();
  const { data: users } = useGetAllUsersQuery();
  const { data: airlines } = useGetAllAirlinesQuery();
  const [createTravelPackage, status] = useCreateTravelMutation();
  const [isdisabled, setIsdisabled] = useState(false);
  const [travelState, setTravel] = useState<ITravel>({
    client_id: "",
    flights: [],
    travel_package_id: "",
    travelers: [],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createTravelPackage({
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
    setTravel({ ...travelState, [name]: value });
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
    setTravel({ ...travelState, flights: newFlights });
  };

  const addFlight = () => {
    setTravel({
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
    setTravel({ ...travelState, flights: newItineraries });
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
    setTravel({ ...travelState, travelers: newTravelers });
  };

  const addTraveler = () => {
    setTravel({
      ...travelState,
      travelers: [
        ...travelState.travelers,
        {
          email: "",
          name: "",
        },
      ],
    });
  };

  const removeTraveler = (index: number) => {
    const newTravelers = travelState.travelers.filter((_, i) => i !== index);
    setTravel({ ...travelState, travelers: newTravelers });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTravel({ ...travelState, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Package created successfully", { variant: "success" });
      setIsdisabled(true);
      navigate("/travel-packages");
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
        <TravelForm
          isLoading={false}
          isdisabled={isdisabled}
          travel={travelState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
          handleChangeFlight={handleChangeFlight}
          addFlight={addFlight}
          removeFlight={removeFlight}
          travelPackages={travelPackages?.data}
          users={users?.data}
          airlines={airlines?.data}
          addTraveler={addTraveler}
          removeTraveler={removeTraveler}
          handleChangeTraveler={handleChangeTraveler}
        />
      </Paper>
    </Box>
  );
};
