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
import { ITravelPackage } from "../../../types/TravelPackage";

type Props = {
  travelPackage: ITravelPackage;
  isdisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeItinerary: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  addItinerary: () => void
  removeItinerary: (index: number) => void
};

export function TravelPackageForm({
  travelPackage,
  isdisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleToggle,
  handleChangeItinerary,
  addItinerary,
  removeItinerary,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={travelPackage.name || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={addItinerary}>Adicionar itinerário</Button>
          </Grid>
          {travelPackage.itinerary.map((itinerary, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h6">Itinerário {index + 1}</Typography>
                <IconButton onClick={() => removeItinerary(index)}>
                  <Delete />
                </IconButton>
              </Box>
              <Grid item xs={12} mb={1}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="image"
                    label="Image"
                    value={itinerary.image || ""}
                    disabled={isdisabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeItinerary(e, index)}
                    inputProps={{ "data-testid": `image-${index}` }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="description"
                    label="Descrição"
                    multiline
                    rows={4}
                    value={itinerary.description || ""}
                    disabled={isdisabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeItinerary(e, index)}
                    inputProps={{ "data-testid": `description-${index}` }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                component={Link}
                to="/travel-packages"
              >
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
