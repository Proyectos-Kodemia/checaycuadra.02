import React, { useState, useCallback } from 'react'
import { Button, Stack, Typography, Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es-mx'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import locale from 'date-fns/locale/es'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticTimePicker from '@mui/lab/StaticTimePicker'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'
import { URL_FULL } from '../../services/config'

function Schedule () {
  const [selectedStar, changeStar] = useState(moment())
  const startHour = (moment(selectedStar).format('LT'))
  // console.log('startHour', startHour)

  const [selectedEnd, changeEnd] = useState(moment())
  const endHour = (moment(selectedEnd).format('LT'))
  // console.log('endHour', endHour)

  const [checked, setChecked] = React.useState([])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex)
    }

    setChecked(newChecked)
  }

  // console.log('Dias de la semana', checked)

  const dateHoursAvailable = {
    daysAvailable: checked,
    startHour: startHour,
    endHour: endHour
  }

  const handleConfirmation = async () => {
    // Sending informatio to back
    const endpointSchedule = `${URL_FULL}/schedule`
    const token = window.sessionStorage.getItem('token')

    async function sendSchedule (url, data) {
      // console.log("entrando a la funcion")
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(url, options)
      return response.json()
    }

    // console.log('viendo que contienen endpointSchedule dateHoursAvailable', endpointSchedule, dateHoursAvailable)
    await sendSchedule(endpointSchedule, dateHoursAvailable)
      .then(response => {
        // console.log('fecha y hora disponible', dateHoursAvailable)
        // console.log('este es el response', response)
      })
      .catch(error => {
        console.log(error)
      })

    // console.log(dateHoursAvailable)
  }
  const dias = {
    monday: 'LUNES',
    tuesday: 'MARTES',
    wednesday: 'MIERCOLES',
    thursday: 'JUEVES',
    friday: 'VIERNES',
    saturday: 'SABADO',
    sunday: 'DOMINGO'
  }
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        m: 1
      }}
      >
        <Typography className='typografyPerfil' align='center' variant='h4' component='div'>Calendario</Typography>
        <br />
        <br />

        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          1. Selecciona los dias de la semana disponibles<br />
        </Box>
        <Box sx={{ textAling: 'center', mx: 'auto', mb: 5 }}>
          <List dense sx={{ width: '100%', maxWidth: 250 }}>
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <Checkbox
                      edge='end'
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText id={labelId} primary={dias[value]} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        <br />
        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          2. Selecciona tu rango de horarios disponibles<br /><br />
          <Box sx={{ fontSize: '0 rem', fontWeight: '100' }}>
            Recuerda solo se utilizan horas completas<br /><br />
          </Box>
        </Box>
        <Box sx={{ textAling: 'center', mx: 'auto', mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              ampm
              toolbarTitle='Hora Inicial'
              views='hours'
              orientation='landscape'
              value='selectedStar'
              onChange={(newValueStart) => {
                changeStar(newValueStart)
              }}
              renderInput={(params) => <TextField {...params} />}
            />

          </LocalizationProvider>
        </Box>
        <br />
        <Box sx={{ textAling: 'center', mx: 'auto', mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              ampm
              toolbarTitle='Hora Final'
              views='hours'
              orientation='landscape'
              value='selectedEnd'
              onChange={(newValueEnd) => {
                changeEnd(newValueEnd)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <br /><br />
        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          3. Confirma el horario
          <Box sx={{ p: 2, width: 250, fontSize: '1 rem', fontWeight: '300' }}>
            <Typography>
              El horario disponible es de las {dateHoursAvailable.startHour} a las {dateHoursAvailable.endHour}
            </Typography>
          </Box>
        </Box>

      </Box>

      <Box sx={{ mx: 'auto', width: 150, mt: 5 }}>
        <Button
          sx={{ backgroundColor: '#2388C6;', color: 'white' }}
          variant='contained'
          type='submit'
          fullWidth
          onClick={handleConfirmation}
        >
          Confirmar Horario
        </Button>

      </Box>
      <Box sx={{ mx: 'auto', width: 150, mt: 5 }} />
    </>

  )
}

export default Schedule
