import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserList } from "./features/users/ListUser";
import { UserCreate } from "./features/users/CreateUser";
import { UserEdit } from "./features/users/EditUser";
import { AirlineList } from "./features/airlines/ListAirline";
import { AirlineCreate } from "./features/airlines/CreateAirline";
import { AirlineEdit } from "./features/airlines/EditAirline";
import { TourismAgenciesList } from "./features/tourism_agency/ListTourismAgency";
import { TourismAgencyCreate } from "./features/tourism_agency/CreateTourismAgency";
import { TourismAgencyEdit } from "./features/tourism_agency/EditTourismAgency";

// import { ProtectedRoute } from "./components/ProtectedRoute";
// import Login from "./components/Login";

function App() {
  return (
    <div data-testid="app">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Box sx={{ color: "text.primary" }}>
                <Typography variant="h1">Home</Typography>
              </Box>
            }
          />

          {/* Users */}
          <Route
            path="/users"
            element={
              <Box sx={{ color: "text.primary" }}>
                <UserList />
              </Box>
            }
          />
          <Route
            path="/users/create"
            element={
              <Box sx={{ color: "text.primary" }}>
                <UserCreate />
              </Box>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <Box sx={{ color: "text.primary" }}>
                <UserEdit />
              </Box>
            }
          />

          {/* Airlines */}
          <Route
            path="/airlines"
            element={
              <Box sx={{ color: "text.primary" }}>
                <AirlineList />
              </Box>
            }
          />
          <Route
            path="/airlines/create"
            element={
              <Box sx={{ color: "text.primary" }}>
                <AirlineCreate />
              </Box>
            }
          />
          <Route
            path="/airlines/edit/:id"
            element={
              <Box sx={{ color: "text.primary" }}>
                <AirlineEdit />
              </Box>
            }
          />

          {/* Tourism Agencies */}
          <Route
            path="/tourism-agencies"
            element={
              <Box sx={{ color: "text.primary" }}>
                <TourismAgenciesList />
              </Box>
            }
          />
          <Route
            path="/tourism-agencies/create"
            element={
              <Box sx={{ color: "text.primary" }}>
                <TourismAgencyCreate />
              </Box>
            }
          />
          <Route
            path="/tourism-agencies/edit/:id"
            element={
              <Box sx={{ color: "text.primary" }}>
                <TourismAgencyEdit />
              </Box>
            }
          />

          <Route
            path="*"
            element={
              <Box sx={{ color: "text.primary" }}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found</Typography>
              </Box>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
