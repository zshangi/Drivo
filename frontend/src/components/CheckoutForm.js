import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import ApiService from "./StripeApi";
import { Row, Col, Image, ListGroup, Card,Container } from 'react-bootstrap'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Loader from '../components/Loader'
import Message from '../components/Message'

const CheckoutForm = ({order}) => {
        const history  = useHistory()

        const [error, setError] = useState(null);
        const [email, setEmail] = useState(order.user.email);
        const amount = Number(100*(order.totalPrice)).toFixed();
        const [showload, setShowload] = React.useState(false);
        const stripe = useStripe();
        const elements = useElements();

        // Handle real-time validation errors from the card Element.
        const handleChange = (event) => {
            if (event.error) {
                setError(event.error.message);
            } else {
                setError(null);
            }
        }

        // Handle form submission.
        const handleSubmit = async (event) => {
                event.preventDefault();
                setShowload(true);
                const card = elements.getElement(CardElement);

                const {paymentMethod, error} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: card,
                });
                console.log(paymentMethod)

                if (error) {
                    setError(error.response.data)
                }
                else {
                    ApiService.saveStripeInfo({email:email, payment_method_id: paymentMethod.id,amount:amount,user:order.user,order:order._id,servicecenter:order.servicecenter.name,dateservice:order.timetable.datetable,timeservice:order.timeservice,servicecenteremail:order.servicecenter.user.username,servicecenterIncharge:order.servicecenter.user.name,userorder:order.user.name}).then(response => {
                        console.log(response.data);
                        const clientSecret=response.data['clientSecret']
                        history.push(`/success/${clientSecret}`)


                    }).catch(error => {
                        console.log(error)
                        setError(`Payment failed: ${error.message}`);
                    })
                }

            }
        ;

        return (  
            <Container >
                <br/>
                <span className="pbold">Pay Your Order</span>
                <hr/>
                {error?
                <Message variant='warning' text={error} />
            : null}
              <Box component="form" onSubmit={handleSubmit} noValidate >
              

             <CardElement
                        id="card-element"
                        onChange={handleChange}
                    />
                    <div className="card-errors" role="alert">{error}</div>
   

        {showload?
       <>
       <Loader />
       <Button
          type="submit"
          fullwidth="true"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled
        >
          Payment
        </Button>
       </>
        :
        <Button
        type="submit"
        fullwidth="true"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={order.isPaid}
      >
        Payment
      </Button>
        }


      </Box>
      </Container>   

       
        );

    }
;

export default CheckoutForm;