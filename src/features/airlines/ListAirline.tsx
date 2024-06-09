import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteAirlineMutation,
  useGetAirlinesQuery,
} from "./airlinesSlice";

import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { AirlinesTable } from "./components/AirlineTable";

export const AirlineList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetAirlinesQuery(options);
  const [deleteAirline, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteAirlineMutation();

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

  async function handleDeleteAirline(_id: string) {
    await deleteAirline({
      _id,
      name: "",
      country: "",
      site_url: "",
      logo_url: "",
      is_active: false,
    });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Companhia aérea deletado com sucesso`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Companhia aérea não pôde ser deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Erro ao carregar companhias aereas</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/airlines/create"
          style={{ marginBottom: "1rem" }}
        >
          Nova companhia aérea
        </Button>
      </Box>
      <AirlinesTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteAirline}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};