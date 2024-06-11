import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteTravelPackageMutation,
  useGetTravelPackagesQuery,
} from "./travelPackageSlice";

import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { TravelPackagesTable } from "./components/TravelPackageTable";

export const TravelPackagesList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: '',
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetTravelPackagesQuery(options);
  const [deleteTourismAgencies, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteTravelPackageMutation();

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
      itinerary: [],
    });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Pacote deletado com sucesso`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Pacote não pôde ser deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Erro ao carregar pacotes</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/travel-packages/create"
          style={{ marginBottom: "1rem" }}
        >
          Novo pacote
        </Button>
      </Box>
      <TravelPackagesTable
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