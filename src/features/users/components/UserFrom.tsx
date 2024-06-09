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
import { IUser } from "../../../types/User"; 

type Props = {
  user: IUser;
  isdisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UserFrom({
  user,
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
                value={user.name || ""}
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
                name="email"
                label="E-mail"
                value={user.email || ""}
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
                value={user.phone || ""}
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
                    checked={user.is_active || false}
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