import React, { useEffect, useState } from 'react'
import { Form , Container,Col,Row,ListGroup} from 'react-bootstrap'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";
import { getOrderDetails } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

function PaymentScreen({ history,match }) {
  const stripePromise = loadStripe('pk_live_51N3E1bFw6Mk3kjuwRQTOKcmqhFZiCuNEPDkhgD1Lrs5kRzYeT1IZdJrOLeHKiLyB8rDsO1wfqJ63RKEVXuamjGaT003j68Mi0I');
  // const stripePromise = loadStripe('pk_test_51N1RJWGcJKS2UZRpxbqbIdpkQGpH4mX0WrQy1uhTWPjjTjeip5B8ALHbS6oTUFjAilkHxmL2HmpI0QeQ8aIoTLNG00Snv7pjaf');
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails
  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  }
    const [show, setShow] = useState(true);
    
    const theme = createTheme();

    const useStyles = makeStyles({
      drawerPaper: {
        borderRadius: '20px 20px 0 0',
      },
    });
  const tamaraHandler = (e) => {
    e.preventDefault()


      const data = {
        "country": "AE",
        "order_value": {
          "amount": "100.00",
          "currency": "UAE"
        },
        "phone_number": "560123123",
        "is_vip": true
      }
      const method="POST"
      return axios({
        url: `https://api-sandbox.tamara.co`,
        
        method,
        data,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw`
      }
      })
      .then(response => {
        console.log(response.data[0].supportedInstalments);
         })
       }

  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [validatename, setValidatename] = useState(userInfo.name)
  useEffect(() => {
    
    dispatch(getOrderDetails(orderId))

}, [ dispatch,validatename])


    return (
      <Container fluid>

    {/*SEO PART////////////////////////////////////////////////////////////////////////// */}
    <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Payment</title>
        <meta name="description" content="Pay your order" />
      </Helmet>
      <h1>pay your order</h1>



{loading ? <Loader />
              : error ? <Message variant='danger' text={error} />
                :
                <Row className="my-2">

                <Col sx={{ textAlign: 'center', alignItems: 'center' }} xs={12} sm={12} md={6} lg={6} xl={6}>

                <Row className='p-2 my-1' style={{alignItems:'left',textAlign:'left'}}>
      
      <Col md={12}>
      <p>
            <span className="textblue">Name: </span>
            <span className="textnormal">{order.user.name} {order.user.lastName}</span>
            </p>
            <p>
            <span className="textblue">Location: </span>
            <span className="textnormal">{order.shippingAddress.address} </span>
            </p>
            <p>
            <span className="textblue">Requested Service: </span>
              {order.service==1?
               <span className="textnormal">local service center</span>
               :
               order.service==2?
               <span className="textnormal">van service </span>
               :
               <span className="textnormal">ship to an address</span>
              } 
              <br/>
              <span className="textnormal">{order.servicecenter.name}, </span>
               <span className="textblue">Date: </span>
               <span className="textnormal">{order.timetable.datetable} </span>
               <span className="textblue">Time: </span>
               <span className="textnormal">{order.timeservice} </span>
            </p>
        </Col >
        <hr/>
        <Col md={12}>
            {
              order.orderItems.length === 0
                ? <Message variant='info' text='Your order is empty !' />
                : <>
                     {order.orderItems.map((item, index) => (
                           <Row key={order}>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}className='my-auto'>
                                  <p> {item.tyreproduct.brandorigin.brand.title} {item.tyreproduct.brandpattern.pattern} </p>
                            </Col>
                              <Col xs={8} sm={8} md={8} lg={8} xl={8} className='my-auto' style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>
                              <p>  {item.qty} X {item.price} = AED {(item.price * item.qty).toFixed(2)}</p>
                              </Col>
                              </Row>
                    ))} 
                 </>}         
      </Col>
      <hr/>
      <Col md={12}>

          <ListGroup variant='flush'>
   

            <ListGroup.Item>
              <Row>
                <Col>Items: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Service Fee: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>VAT: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Discount: </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}>AED {order.discount}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col> <span className="textnormal">Total:</span> </Col>
                <Col style={{
            alignItems: 'right',
            textAlign: 'right'
          }}><span className="textnormal">AED {order.totalPrice}</span></Col>
              </Row>
            </ListGroup.Item>

      
        
          </ListGroup>

    

      </Col>
      
    </Row>

                
</Col>

<Col sx={{ textAlign: 'center', alignItems: 'center' }}  xs={12} sm={12} md={6} lg={6} xl={6}>
{order.isPaid?
  <Message variant='info' text='Your order is empty !' />
  :
  <>
<Button sx={{width:'60px'}} ><img
        src={'assets/img/tamara.jpg'} 
        alt=""
        id="secret_folder"
        width="100%"
        onClick={tamaraHandler}
      /></Button>
    
      
      <p>pay in 3 split with tamara</p>


<hr/>
      <Card> 

                  <Elements stripe={stripePromise}>
              <CheckoutForm order={order}  />
            </Elements>  
            

        </Card>
        </>
}
</Col>
</Row>
}


      
   {/* /////////////////////////////////////////////////////////////////////////////////////////  */}
 



<br/><br/><br/><br/>
<br/><br/>
<br/><br/>


        </Container>

    )
}
 
export default PaymentScreen