import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteTourismAgencyMutation,
  useGetTourismAgenciesQuery,
} from "./tourismAgencySlice";

import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { TourismAgencyTable } from "./components/TourismAgencyTable";

export const TourismAgenciesList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetTourismAgenciesQuery(options);
  const [deleteTourismAgencies, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteTourismAgencyMutation();

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

  async function handleDeleteTourismAgencies(_id: string) {
    await deleteTourismAgencies({
      _id,
      name: "",
      cnpj: "",
      email: "",
      is_active: false,
    });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Agencia de turismo deletado com sucesso`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Agencia de turismo não pôde ser deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Erro ao carregar agencias de turismo</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/tourism-agencies/create"
          style={{ marginBottom: "1rem" }}
        >
          Nova agencia de turismo
        </Button>
      </Box>
      <TourismAgencyTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteTourismAgencies}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};