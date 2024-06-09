import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserList } from "./features/users/ListUser";
import { UserCreate } from "./features/users/CreateUser";
import { UserEdit } from "./features/users/EditUser";

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
