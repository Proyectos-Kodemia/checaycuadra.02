import * as React from 'react'
import { Button, Box, List, ListItem, ListItemIcon, ListItemText, Typography, CardMedia, CardContent } from '@mui/material'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'


const endpoint = 'http://localhost:8000/mercadopago/checkout'

const servicio = {
  title:"consultoria",
  unit_price:"1000",
  quantity:"1"
}


    
    // mode: 'no-cors'

async function LoginAccount (url, credentials) {
  console.log("entrando a la funcion")
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }
  // return fetch(url, options)
  const response = await fetch(url, options)
  return response.json()
}



function Appointment ({handlerAuthGoogle}) {

  const handlerPago = (e)=>{
    console.log("entrando al handler")
    e.preventDefault()
      LoginAccount(endpoint,servicio)
      .then(data =>{
        location.href = data
        })
      .catch(error =>{
        console.log(error)
      })
        
  }


    
      


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 5 }}>
        <Box sx={{ display: 'flex', margin: 3, h: 300, boxShadow: 2, borderRadius: 3 }}>
          <CardMedia
            component='img'
            sx={{ width: 250, margin: 3, borderRadius: 4 }}
            image='https://media-exp1.licdn.com/dms/image/C4E03AQFLWyN2KG8eZw/profile-displayphoto-shrink_200_200/0/1642529783595?e=1648080000&v=beta&t=pJtCPe8HmFsi05fx4ad-rqHlg2ENSnhMkNUioRXFp_Y'
          />

          <CardContent sx={{ width: 220, margin: 3, marginTop: 6 }}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>
              Ana Paula Gomez
            </Typography>
            <br />
            <Typography variant='subtitle1'>
              Contador Publico
            </Typography>
            <br />
            <Typography variant='body2'>
              Cedula 123443455656
            </Typography>
          </CardContent>
        </Box>

        <Box sx={{ display: 'flex', w: 400, h: 300 }}>
          <CardContent
            sx={{ width: 500 }}
          >
            <List>
              <ListItem disableGutters>
                <ListItemIcon>
                  <img src='/icons/iconsCard2/video.svg' alt='video' ml={0} />
                </ListItemIcon>
                <ListItemText primary='Consultoria online' />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <img src='/icons/iconsCard2/especialidad.svg' alt='especialidad' ml={0} />
                </ListItemIcon>
                <ListItemText primary='Especialista en: ' />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <img src='/icons/iconsCard2/price.svg' alt='price' ml={0} />
                </ListItemIcon>
                <ListItemText primary='MXN' />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <img src='/icons/iconsCard2/local.svg' alt='local' ml={0} />
                </ListItemIcon>
                <ListItemText primary='Ubicacion:' />
              </ListItem>
            </List>
            <Typography variant='h5'>
              Acerca de mi:
            </Typography>
            <br />
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus ut etiam quam lacus, neque, nibh consectetur. Velit vulputate tortor amet vulputate. Ipsum semper.
            </Typography>
          </CardContent>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 5 }}>
        <CalendarTodayRoundedIcon sx={{ fontSize: 36, mr: 5 }} />
        <Typography variant='h4'>
          Elije tu horario y agenda tu cita
        </Typography>
      </Box>
      <Box sx={{ w: 50, display: 'flex', justifyContent: 'space-between', p: 1, m: 5 }}>

      <Button
        // href='../../pages/Cuenta/RegisterPage.js'
        onClick={handlerPago}
        variant='contained'
        disableElevation
        size='large'
        marginRigth='0'
        endIcon={<ArrowForwardIcon />}
      >Realizar Pago
      </Button>

        <Button
          // href='../../pages/Cuenta/RegisterPage.js'
          onClick={handlerAuthGoogle}
          variant='contained'
          disableElevation
          size='large'
          marginRigth='0'

        >Confirmar Cita
        </Button>
      </Box>

    </>
  )
}
export default Appointment


/*
http://localhost:4000/mercadopago/success?collection_id=1245561890&collection_status=approved&payment_id=1245561890&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4003030641&preference_id=1059347414-9d0161c7-480f-436a-9cf5-0c7ee7455ac6&site_id=MLM&processing_mode=aggregator&merchant_account_id=null
*/