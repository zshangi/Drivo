import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import { Row, Col, Image, ListGroup, Card, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { goPayGate } from '../actions/orderActions'
import axiosInstance from '../utils/axiosInstance'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Header from '../components/Header'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";
import { makeStyles } from '@material-ui/core/styles';
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { createOrder } from '../actions/orderActions'
import { getUserDetailsAction, updateUserProfileAction, userLogoutAction } from '../actions/userActions'
import { TextField } from '@mui/material';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});
function OrderScreen({ history }) {
  const dispatch = useDispatch()

  const orderCreate = useSelector(state => state.orderCreate)
  const { success, order, error, loading } = orderCreate
  const cart = useSelector(state => state.cart)
  const [discount, setDiscount] = useState(0)
  const [paymenttype, setPaymenttype] = useState('')

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  cart.shippingPrice = (cart.serviceCenter.serviceid != 2 ? 0 : 150).toFixed(2)
  cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)-discount).toFixed(2)
  
  const useStyles = makeStyles({
    drawerPaper: {
      borderRadius: '20px 20px 0 0',
    },
  });
  const [orderId, serOrderId] = useState('')

  useEffect(() => {
    if (success) {
      if (paymenttype=='stripe'){
      history.push(`/payment/${order._id}`)
    }else{
      const data={
        "country": "AE",
        "order_value": {
        "amount": "100.00",
        "currency": "AED"
        },
        "phone_number": "+971502223333",
        "is_vip": true
        }
  
      const method="POST"
      return axios({
        url: `https://api-sandbox.tamara.co/checkout/payment-options-pre-check`,
        method,
        data,
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
      }
      })
      .then(response => {
        console.log(response.data);
        if (response.data['has_available_payment_options']==true){
          let data={
            "order_reference_id": "123456",
            "order_number": "A123456",
            "total_amount": {
              "amount": 100.55,
              "currency": "AED"
            },
            "description": "string",
            "country_code": "AE",
            "payment_type": "PAY_BY_INSTALMENTS",
            "instalments": null,
            "locale": "en_US",
            "items": [
              {
                "reference_id": "123456",
                "type": "Digital",
                "name": "Lego City 8601",
                "sku": "SA-12436",
                "image_url": "https://www.example.com/product.jpg",
                "item_url": "https://www.example.com/product.html",
                "quantity": 1,
                "unit_price": {
                  "amount": "100.00",
                  "currency": "AED"
                },
                "discount_amount": {
                  "amount": "100.00",
                  "currency": "AED"
                },
                "tax_amount": {
                  "amount": "100.00",
                  "currency": "AED"
                },
                "total_amount": {
                  "amount": "100.00",
                  "currency": "AED"
                }
              }
            ],
            "consumer": {
              "first_name": "Mona",
              "last_name": "Lisa",
              "phone_number": "+971502223333",
              "email": "user@example.com"
            },
            "billing_address": {
              "first_name": "Mona",
              "last_name": "Lisa",
              "line1": "3764 Al Urubah Rd",
              "line2": "string",
              "region": "As Sulimaniyah",
              "postal_code": "12345",
              "city": "Riyadh",
              "country_code": "AE",
              "phone_number": "+971502223333"
            },
            "shipping_address": {
              "first_name": "Mona",
              "last_name": "Lisa",
              "line1": "3764 Al Urubah Rd",
              "line2": "string",
              "region": "As Sulimaniyah",
              "postal_code": "12345",
              "city": "Riyadh",
              "country_code": "AE",
              "phone_number": "+971502223333"
            },
            "discount": {
              "name": "Christmas 2020",
              "amount": {
                "amount": "100.00",
                "currency": "AED"
              }
            },
            "tax_amount": {
              "amount": "100.00",
              "currency": "AED"
            },
            "shipping_amount": {
              "amount": "100.00",
              "currency": "AED"
            },
            "merchant_url": {
              "success": "https://drivo.ae/#/tamarasuccess",
              "failure": "https://drivo.ae/#/tamarafail",
              "cancel": "https://drivo.ae/#/tamaracancel",
              "notification": "https://drivo.ae/payments/tamarapay"
            },
            "platform": "Magento",
            "is_mobile": false,
            "risk_assessment": {
              "customer_age": 22,
              "customer_dob": "31-01-2000",
              "customer_gender": "Male",
              "customer_nationality": "AE",
              "is_premium_customer": true,
              "is_existing_customer": true,
              "is_guest_user": true,
              "account_creation_date": "31-01-2019",
              "platform_account_creation_date": "string",
              "date_of_first_transaction": "31-01-2019",
              "is_card_on_file": true,
              "is_COD_customer": true,
              "has_delivered_order": true,
              "is_phone_verified": true,
              "is_fraudulent_customer": true,
              "total_ltv": 501.5,
              "total_order_count": 12,
              "order_amount_last3months": 301.5,
              "order_count_last3months": 2,
              "last_order_date": "31-01-2021",
              "last_order_amount": 301.5,
              "reward_program_enrolled": true,
              "reward_program_points": 300
            },
            "expires_in_minutes": 0,
            "additional_data": {
              "delivery_method": "home delivery",
              "pickup_store": "Store A",
              "store_code": "Store code A",
              "vendor_info": [
                {
                  "vendor_amount": 0,
                  "merchant_settlement_amount": 0,
                  "vendor_reference_code": "string"
                }
              ]
            }
          }
          return axios({
            url: `https://api-sandbox.tamara.co:443/checkout`,
            method,
            data,

            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
          }
          })
          .then(response => {
            console.log(response.data['checkout_url'])
            return axios({
            url: response.data['checkout_url'],
            method,
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJhMGMwYjAwMy03NWY2LTQ3ZjEtOTQ5ZC1mYTkwNzkwMTliMjAiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOWM3NWQ0ZGY0MGRkZTc2N2E3ODhlZDRlNTY5NzdlN2MiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5MzQ2MjE2NiwiaXNzIjoiVGFtYXJhIn0.OpSRcgDVK4M4mgL7Mg4F_PPTm0m6TZPm7-BHvyO9U4v_NT2gLkD7PfFNwcGygOPYaaoB18p1HIfxJEjyi7099AxYtGOucmbwKoXAvtjpaMtgAKZVZN4GrkoX3mfVRzjtzCmjNQULWi5yoQs6wmz_REKM_P7AycPUwsve-WRwVaVnUSgWrNI-xsDkWj1bj3KQky11TMryi3z6ZEiXefkaXaucPFhgwlRqUtYqkNNYRet8PTdWC0S1In1gZg8bdkJZa7uhirOkwARga_Zp1n1OcZQyfEbEPlzIe4X-oTnzW7yH4EDtozl6d3lgZW8_iiTcbdDDESCLe2VJO-MwwRIFYw'
          }
             })



             })
        }else{
          console.log('fail')
        }
  
         })
    }
      dispatch({ type: ORDER_CREATE_RESET })
    }
    if (error){
      console.log(error)
    }
    cart.cartItems?.map((country) => (
      country.qty>3?
      setDiscount(100)
      :
      null
    ))
  }, [success])


  const placeOrder = () => {
    setPaymenttype('stripe')
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      service: cart.serviceMethod,
      serviceCenter: cart.serviceCenter,
      paymentMethod: 'stripe',
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      discount:discount,
      totalPrice: cart.totalPrice,
    }))
  }
  const tamaraHandler = () => {
    setPaymenttype('tamara')
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      service: cart.serviceMethod,
      serviceCenter: cart.serviceCenter,
      paymentMethod: 'tamara',
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      discount:discount,
      totalPrice: cart.totalPrice,
    }))
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Container fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Order</title>
        <meta name="description" content="Order" />
      </Helmet>
      <h1>my order</h1>
      <Row className='p-2 my-1 border' style={{ alignItems: 'left', textAlign: 'left',border:'1px'}}>

        <Col md={12}>

          <p>
            <span className="textblue">Location: </span>
            <span className="textnormal">{cart.shippingAddress.address} </span>
          </p>
          <p>
            <span className="textblue">Requested Service: </span>
                  {cart.serviceCenter.serviceid==1?
               <span className="textnormal">local service center</span>
               :
               cart.serviceCenter.serviceid==2?
               <span className="textnormal">van service </span>
               :
               <span className="textnormal">ship to an address</span>
              } 
          </p>
          <p>
            <span className="textblue">Service: </span>
            <span className="textnormal">{cart.serviceCenter.servicecenter} </span>
            </p><p>
            <span className="textblue">Date: </span>
            <span className="textnormal">{cart.serviceCenter.timetable} </span>
            <span className="textblue">Time: </span>
            <span className="textnormal">{cart.serviceCenter.timeservice} </span>
          </p>
        </Col >
        <hr/>
        <Col md={12}>
          {
            cart.cartItems.length === 0
              ? <Message variant='info' text='Your order is empty !' />
              : <>
                {cart.cartItems.map((item, index) => (
                  <Row key={cart.cartItems}>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} className='my-auto'>
                      <p> <Link to={`/product/${item.product}`}>{item.name} </Link></p>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} className='my-auto' style={{
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
                }}>AED {cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Service Fee: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>AED {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>VAT: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>AED {cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Discount: </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}>
                AED{discount}
                
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col> <span className="textnormal">Total:</span> </Col>
                <Col style={{
                  alignItems: 'right',
                  textAlign: 'right'
                }}><span className="textnormal">AED{cart.totalPrice}</span></Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item
              style={{
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Button
                type='button'
                variant="contained"
                onClick={placeOrder}
                style={{ borderRadius: 25 }}
              >Pay Order By Card</Button>
              <Divider>OR</Divider>
              <Button sx={{width:'150px'}} ><img
        src={'assets/img/tamara.jpg'} 
        alt=""
        id="secret_folder"
        width="100%"
        onClick={tamaraHandler}
      /></Button>
    
      
      <p>Tamara: split it up to 4 payments, interest-free</p>
            </ListGroup.Item>
          </ListGroup>



        </Col>

      </Row>

      {/* /////////////////////////////////////////////////////////////////////////////////////////  */}

      <br/><br/><br/><br/>



    </Container>

  )
}
export default OrderScreen