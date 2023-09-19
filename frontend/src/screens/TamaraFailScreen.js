import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

function Succes() {

    return (
        <Container  maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
<Alert severity="error">
    <h4> Sorry,Tamara Transaction is not Done Successfully! </h4>
<h4>Order ID :</h4>
<h5>******</h5>
</Alert>
            </Box>
            </Container>
    )
}

export default Succes