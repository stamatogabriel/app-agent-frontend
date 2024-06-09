import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import { Link } from "react-router-dom";
import { IAirline } from "../../../types/Airline"; 

type Props = {
  airline: IAirline;
  isdisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AirlineFrom({
  airline,
  isdisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleToggle,
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
                value={airline.name || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="country"
                label="País"
                value={airline.country || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "country" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="site_url"
                label="Site"
                value={airline.site_url || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "site_url" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="logo_url"
                label="Logo"
                value={airline.logo_url || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "logo_url" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={airline.is_active || false}
                    inputProps={{ "aria-label": "controlled" }}
                    data-testid="is_active"
                    disabled={isdisabled}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/categories">
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