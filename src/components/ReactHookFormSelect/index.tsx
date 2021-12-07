import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <Controller
        render={({ field }) => (
          <>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select {...field} labelId={labelId} label={label}>
              {children}
            </Select>
          </>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: {value: true, message: `${label} is required!`} }}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;