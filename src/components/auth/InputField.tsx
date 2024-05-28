import { Grid, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps {
  type: string
  label?: string
  register?: UseFormRegisterReturn
  error?: any
  id?: string
  disabled?: boolean
  placeholder?: string
  defaultValue?: string
  sxInput?: object
  sxLabel?: object
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  defaultValue,
  register,
  error,
  disabled = false,
  placeholder,
  type,
  sxInput,
  sxLabel
}) => (
  <Grid item xs={12} md={6}>
    <InputLabel sx={sxLabel}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      defaultValue={defaultValue}
      {...register}
      type={type}
      placeholder={placeholder}
      fullWidth
      error={!!error}
      disabled={disabled}
      sx={sxInput}
    />
    {error && (
      <FormHelperText
        sx={{
          color: 'error.darker',
          fontWeight: 500,
          position: 'absolute'
        }}
      >
        {error.message}
      </FormHelperText>
    )}
  </Grid>
)

export default InputField
