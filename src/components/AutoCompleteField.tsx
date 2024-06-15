import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { IAirline } from "../types/Airline";
import { IUser } from "../types/User";
import { ITravelPackage } from "../types/TravelPackage";

type Props = {
  name: string;
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
  values?: (IAirline | IUser | ITravelPackage)[]
  options?: (IAirline | IUser | ITravelPackage)[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AutoCompleteFields = ({
  name,
  label,
  values,
  options,
  isLoading,
  isDisabled,
  handleChange,
}: Props) => {
  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IAirline | IUser | ITravelPackage
  ) => (
    <li {...props} key={option._id}>
      {option.name}
    </li>
  );

  const isEqualId = (
    option: IAirline | IUser | ITravelPackage,
    value: IAirline | IUser | ITravelPackage
  ) => {
    return option._id === value._id;
  };

  const handleOnChange = (
    _e: React.ChangeEvent<{}>,
    newValue: (IAirline | IUser | ITravelPackage)[]
  ) => {
    handleChange({ target: { name, value: newValue } } as any);
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} />
  );

  return (
    <Autocomplete
      multiple
      value={values}
      options={options || []}
      loading={isLoading}
      onChange={handleOnChange}
      renderInput={renderInput}
      data-testid={`${name}-search`}
      renderOption={renderOptions}
      isOptionEqualToValue={isEqualId}
      disabled={isDisabled || !options}
      getOptionLabel={(option : any) => option.name}
    />
  );
};