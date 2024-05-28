/* eslint-disable */
import * as React from 'react'

import { useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import {
  ListboxComponent,
  StyledPopper
} from '../Autocomplete/VariableSizeList'
import InputField from '../auth/InputField'

type RadioFormProps = {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  // novaPoshtaCity: Array<{ Addresses: Array<{ Present: string }> }>;
  // novaPoshtaOffices: Array<{ Description: string }>;
  // getNovaPoshtaCity: () => void;
  // getNovaPoshtaOffices: () => void;
}
export const RadioForm: React.FC<RadioFormProps> = ({ register, setValue }) => {
  const [selectedValue, setSelectedValue] = useState<string>('np_office')
  const [novaPoshtaOffices, setNovaPoshtaOffices] = useState<any[]>([])
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])

  const getNovaPoshtaCity = async () => {
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
          CityName: 'к',
          Limit: 50,
          Page: 2
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
          CityName: 'київ',
          Limit: 50,
          Page: 2
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

  return (
    <>
      <RadioGroup
        sx={{ width: '400px', margin: '20px 0' }}
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
            <Autocomplete
              {...register('first')}
              id="virtualize-demo1"
              disableListWrap
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
              onOpen={getNovaPoshtaCity}
              onChange={(_, value) => {
                setValue('first', value)
              }}
            />
            <Autocomplete
              {...register('second')}
              id="virtualize-demo"
              disableListWrap
              fullWidth
              sx={{ mt: 2 }}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={novaPoshtaOffices.map(
                (office: any) => office.Description
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Оберіть віділення" />
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
            <Autocomplete
              {...register('third')}
              id="virtualize-demo1"
              disableListWrap
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
              onOpen={getNovaPoshtaCity}
              onChange={(_, value) => {
                setValue('third', value)
              }}
            />
            <Autocomplete
              {...register('four')}
              id="virtualize-demo1"
              disableListWrap
              fullWidth
              sx={{ mt: 2 }}
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
              onOpen={getNovaPoshtaCity}
              onChange={(_, value) => {
                setValue('four', value)
              }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 1
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
