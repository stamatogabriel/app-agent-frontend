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
import { ITourismAgency } from "../../../types/TourismAgency"; 

type Props = {
  tourismAgency: ITourismAgency;
  isdisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TourismAgencyForm({
  tourismAgency,
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
                value={tourismAgency.name || ""}
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
                name="cnpj"
                label="CNPJ"
                value={tourismAgency.cnpj || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "cnpj" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="email"
                label="E-mail"
                value={tourismAgency.email || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "email" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="phone"
                label="Telefone"
                value={tourismAgency.phone || ""}
                disabled={isdisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "phone" }}
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
                    checked={tourismAgency.is_active || false}
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
              <Button variant="contained" component={Link} to="/tourism-agencies">
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