import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

function Succes({ match }) {
    const paymentId = match.params.id
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
<Alert severity="success">
    <h4>Your payment is Done Successfully! </h4>
<h4>Payment ID :</h4>
<h5>{paymentId}</h5>
</Alert>
            </Box>
            </Container>
            </ThemeProvider>
    )
}

export default Succes