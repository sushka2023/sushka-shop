import React, { useState, FC, ReactNode } from 'react'
import { Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material'
import { SeparationNP } from './SeparationNP'
import { AddressNP } from './AddressNP'

type PropsType = {
  children: ReactNode
  register: any
  setValue: any
  errors: any
  setError: any
  clearErrors: any
  getValues: any
}

const RadioForm: FC<PropsType> = ({
  children,
  register,
  setValue,
  errors,
  setError,
  clearErrors,
  getValues
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('female')

  return (
    <React.Fragment>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <SeparationNP
          selectedValue={selectedValue}
          errors={errors}
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          getValues={getValues}
        />

        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <AddressNP
          selectedValue={selectedValue}
          errors={errors}
          setError={setError}
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
        />

        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {selectedValue === 'other' && (
          <Typography>Additional text for Other option</Typography>
        )}
      </RadioGroup>
      {children}
    </React.Fragment>
  )
}

export default RadioForm
