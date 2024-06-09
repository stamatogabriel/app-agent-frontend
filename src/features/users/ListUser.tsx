import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "./userSlice";

import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { UsersTable } from "./components/UserTable";

export const UserList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetUsersQuery(options);
  const [deleteUser, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteUserMutation();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }

    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  async function handleDeleteUser(_id: string) {
    await deleteUser({
      _id,
      name: "",
      email: ""
    });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Usuário deletado com sucesso`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Usuário não pôde ser deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Erro ao carregar usuários</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/users/create"
          style={{ marginBottom: "1rem" }}
        >
          Novo Usuário
        </Button>
      </Box>
      <UsersTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteUser}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};