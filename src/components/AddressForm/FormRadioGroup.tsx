import { ReactNode, FC } from 'react'
import { FormControlLabel, Radio, RadioGroup, RadioProps } from '@mui/material'
import { BpCheckedIcon, BpIcon } from './style'
import {
  FieldErrors,
  UseFormSetValue,
  DeepMap,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addPostValue } from '../../redux/account-panel/slice'

export type RenderFormFieldsProps = {
  errors: DeepMap<FieldValues, FieldErrors>
  selectedValue: string
  watch: (name: string) => string
  setValue: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
}

type FormRadioGroupProps = {
  selectedValue: string
  // setSelectedValue: Dispatch<SetStateAction<string>>
  renderFormFields: () => ReactNode
}

function BpRadio(props: RadioProps): JSX.Element {
  return (
    <Radio
      disableRipple
      color="default"
      icon={<BpIcon />}
      checkedIcon={<BpCheckedIcon />}
      {...props}
    />
  )
}

const FormRadioGroup: FC<FormRadioGroupProps> = ({
  selectedValue,
  renderFormFields
}) => {
  const dispatch = useDispatch()

  return (
    <RadioGroup
      name="value"
      value={selectedValue}
      onChange={(e) => dispatch(addPostValue(e.target.value))}
    >
      <FormControlLabel
        value="np_office"
        control={<BpRadio />}
        label="Нова пошта (відділення)"
      />
      {selectedValue === 'np_office' && renderFormFields()}

      <FormControlLabel
        value="np_parcel_locker"
        control={<BpRadio />}
        label="Нова пошта (поштомат)"
      />
      {selectedValue === 'np_parcel_locker' && renderFormFields()}

      <FormControlLabel
        value="np_address"
        control={<BpRadio />}
        label="Нова пошта (адресна)"
      />
      {selectedValue === 'np_address' && renderFormFields()}

      <FormControlLabel
        value="ukr_post"
        control={<BpRadio />}
        label="Укрпошта"
      />
      {selectedValue === 'ukr_post' && renderFormFields()}
    </RadioGroup>
  )
}

export default FormRadioGroup
