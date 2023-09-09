import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveVehicleUser, fetchVehicleUser, updateVehicleuserMain,delVehicleuser } from '../actions/userActions'
import { fetchMakes, fetchModels, fetchTrims } from '../actions/vehicleActions'
import { Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';



///////////////////////////////////////////////////////////////////////

const theme = createTheme();

export default function TermsScreen({ history }, props) {

  return (

        <Container fullwidth="true" >
         
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo's Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions" />
      </Helmet>
      <h1>Terms and Conditions</h1>


                        <Box
            sx={{
              marginTop: 3,
              alignItems: 'left',
              textAlign: 'left'
            }}
          >
          

            </Box>
        
        </Container>

   );
}


