import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { ITravel } from "../../../types/Travel";
import { AutoCompleteFields } from "../../../components/AutoCompleteField";
import { ITravelPackage } from "../../../types/TravelPackage";
import { IAirline } from "../../../types/Airline";
import { IUser } from "../../../types/User";

type Props = {
  travel: ITravel;
  isdisabled?: boolean;
  isLoading?: boolean;
  travelPackages?: ITravelPackage[];
  airlines?: IAirline[];
  users?: IUser[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeFlight: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  addFlight: () => void;
  removeFlight: (index: number) => void;
  handleChangeTraveler: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  addTraveler: () => void;
  removeTraveler: (index: number) => void;
};

export function TravelForm({
  travel,
  isdisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleToggle,
  handleChangeFlight,
  addFlight,
  removeFlight,
  travelPackages = [],
  airlines = [],
  users = [],
  addTraveler,
  handleChangeTraveler,
  removeTraveler,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <AutoCompleteFields
                handleChange={handleChange}
                isDisabled={false}
                label="Cliente"
                name="client_id"
                options={users}
                isLoading={false}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <AutoCompleteFields
                handleChange={handleChange}
                isDisabled={false}
                label="Pacote"
                name="travel_package_id"
                options={travelPackages}
                isLoading={false}
              />
            </FormControl>
          </Grid>

          {travel.flights.map((flight, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h6">Voo {index + 1}</Typography>
                <IconButton onClick={() => removeFlight(index)}>
                  <Delete />
                </IconButton>
              </Box>
              <Grid item xs={12} mb={2}>
                <FormControl fullWidth>
                  <AutoCompleteFields
                    handleChange={(e) => handleChangeFlight(e, index)}
                    isDisabled={false}
                    label="Companhia Aérea"
                    name="airline_id"
                    options={airlines}
                    isLoading={false}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Número do Bilhete"
                  name="ticket_number"
                  value={flight.ticket_number}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeFlight(e, index)
                  }
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Tipo"
                  name="type"
                  value={flight.type}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeFlight(e, index)
                  }
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Data e Hora de Embarque"
                  name="date_hour_boarding"
                  type="datetime-local"
                  value={flight.date_hour_boarding}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeFlight(e, index)
                  }
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Data e Hora de Partida"
                  name="date_hour_departure"
                  type="datetime-local"
                  value={flight.date_hour_departure}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeFlight(e, index)
                  }
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Aeroporto"
                  name="airport"
                  value={flight.airport}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeFlight(e, index)
                  }
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={addFlight}>Adicionar Voo</Button>
          </Grid>

          {travel.travelers.map((traveler, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h6">Viajante {index + 1}</Typography>
                <IconButton onClick={() => removeFlight(index)}>
                  <Delete />
                </IconButton>
              </Box>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={traveler.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeTraveler(e, index)
                  }
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={traveler.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeTraveler(e, index)
                  }
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={addTraveler}>Adicionar Viajante</Button>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/travels">
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isdisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
