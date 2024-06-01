/* eslint-disable */
import * as React from 'react'

import { useState, useRef } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  FormHelperText,
  CircularProgress
} from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import {
  ListboxComponent,
  StyledPopper
} from '../Autocomplete/VariableSizeList'
import InputField from '../auth/InputField'
import { CityDefault } from './CityDefault'

type RadioFormProps = {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: any
  // novaPoshtaCity: Array<{ Addresses: Array<{ Present: string }> }>;
  // novaPoshtaOffices: Array<{ Description: string }>;
  // getNovaPoshtaCity: () => void;
  // getNovaPoshtaOffices: () => void;
}

export const RadioBtns: React.FC<RadioFormProps> = ({
  register,
  setValue,
  errors
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('np_office')
  const [novaPoshtaOffices, setNovaPoshtaOffices] = useState<any[]>([])
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])
  const [defaultCityValue, setDefaultCityValue] = useState('')
  console.log('✌️defaultCityValue --->', defaultCityValue)
  const [loading, setLoading] = useState(false)

  const getNovaPoshtaCity = async (cityName: string) => {
    setLoading(true)

    const apiKey = 'f07607422838cfac21a0d1b8603086ca'
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey,
        modelName: 'AddressGeneral',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: cityName
        }
      })
    }

    try {
      const response = await fetch(
        'https://api.novaposhta.ua/v2.0/json/',
        requestOptions
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log('✌️data --->', data)
      if (data && data.data && data.data.length > 0) {
        setNovaPoshtaCity(data.data)
      } else {
        console.error('No data available')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getNovaPoshtaOffices = async () => {
    const apiKey = 'f07607422838cfac21a0d1b8603086ca'
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey,
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityName: 'київ'
        }
      })
    }

    try {
      const response = await fetch(
        'https://api.novaposhta.ua/v2.0/json/',
        requestOptions
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log('✌️data --->', data)
      if (data && data.data && data.data.length > 0) {
        const totalCount = data.info.totalCount
        console.log('✌️totalCount --->', totalCount)
        setNovaPoshtaOffices(data.data)
      } else {
        console.error('No data available')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const autocompleteRef = useRef(null)

  React.useEffect(() => {
    const timer = setTimeout(() => {}, 1000)
    getNovaPoshtaCity
    return () => clearTimeout(timer)
  }, [defaultCityValue])

  const renderMap =
    novaPoshtaCity && novaPoshtaCity.length > 0
      ? novaPoshtaCity[0].Addresses.map((address: any) => address.Present)
      : []

  React.useEffect(() => {
    setValue('first', defaultCityValue)
  }, [setValue, defaultCityValue])

  return (
    <>
      <RadioGroup
        sx={{ margin: '20px 0' }}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <FormControlLabel
          value="np_office"
          control={<Radio />}
          label="Нова пошта (самовивіз)"
        />
        {selectedValue === 'np_office' && (
          <Box>
            <CityDefault
              setDefaultCityValue={setDefaultCityValue}
              autocompleteRef={autocompleteRef}
              defaultCityValue={defaultCityValue}
              getNovaPoshtaCity={getNovaPoshtaCity}
              setLoading={setLoading}
            />
            {(errors.first || errors.second) && (
              <FormHelperText
                sx={{
                  color: 'error.darker',
                  fontWeight: 500,
                  mt: 2
                }}
              >
                {errors.first?.message || errors.second?.message}
              </FormHelperText>
            )}
            <Autocomplete
              {...register('first', { required: 'This field is required' })}
              id="virtualize-demo1"
              disableListWrap
              sx={{ mt: 2, maxWidth: 350 }}
              fullWidth
              ref={autocompleteRef}
              value={defaultCityValue}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              inputValue={defaultCityValue}
              onInputChange={(_, value) => {
                setDefaultCityValue(value)
                if (value.length > 3) {
                  getNovaPoshtaCity(value)
                }
              }}
              options={renderMap}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Оберіть місто"
                  error={!!errors.first}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    )
                  }}
                />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
              onChange={(_, value) => {
                setValue('first', value)
                if (value !== defaultCityValue) {
                  setDefaultCityValue('')
                }
              }}
              isOptionEqualToValue={(option, value) => {
                // Перевіряємо, чи option має таке ж значення як value, або value є порожнім рядком
                if (option === value || value === '') {
                  // Якщо умова виконується, повертаємо true
                  return true
                }
                // Якщо умова не виконується, повертаємо false
                return false
              }}
            />

            <Autocomplete
              {...register('second')}
              id="virtualize-demo"
              disableListWrap
              fullWidth
              sx={{ mt: 2, maxWidth: 350 }}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={novaPoshtaOffices.map(
                (office: any) => office.Description
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Оберіть віділення"
                  error={!!errors.second}
                />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
              onOpen={getNovaPoshtaOffices}
              onChange={(_, value) => {
                setValue('second', value)
              }}
            />
          </Box>
        )}

        <FormControlLabel
          value="np_address"
          control={<Radio />}
          label="Нова пошта (адресна)"
        />
        {selectedValue === 'np_address' && (
          <Box>
            {/* <CityDefault
              setDefaultCityValue={setDefaultCityValue}
              autocompleteRef={autocompleteRef}
            /> */}
            <Autocomplete
              {...register('third')}
              id="virtualize-demo1"
              disableListWrap
              sx={{ mt: 2, maxWidth: 350 }}
              fullWidth
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={
                novaPoshtaCity && novaPoshtaCity.length > 0
                  ? novaPoshtaCity[0].Addresses.map(
                      (address: any) => address.Present
                    )
                  : []
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Оберіть місто" />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
              // onOpen={getNovaPoshtaCity}
              onChange={(_, value) => {
                setValue('third', value)
              }}
            />
            <Autocomplete
              {...register('four')}
              id="virtualize-demo1"
              disableListWrap
              fullWidth
              sx={{ mt: 2, maxWidth: 350 }}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={
                novaPoshtaCity && novaPoshtaCity.length > 0
                  ? novaPoshtaCity[0].Addresses.map(
                      (address: any) => address.Present
                    )
                  : []
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Вулиця" />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
              // onOpen={getNovaPoshtaCity}
              onChange={(_, value) => {
                setValue('four', value)
              }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 1,
                maxWidth: 350
              }}
            >
              <InputField
                type="text"
                id="apartament"
                placeholder="Будинок"
                register={register('first_name')}
              />
              <InputField
                type="text"
                id="house"
                placeholder="Квартира"
                register={register('two_name')}
              />
            </Box>
          </Box>
        )}

        <FormControlLabel
          value="ukr_post"
          control={<Radio />}
          label="Укрпошта"
        />
        {selectedValue === 'ukr_post' && (
          <Typography>Additional text for Other option</Typography>
        )}
      </RadioGroup>
    </>
  )
}

/* eslint-enable */
