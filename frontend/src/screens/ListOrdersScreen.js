import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getMyOrderList } from '../actions/orderActions'
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet';


function ListOrdersScreen({ history }) {
    const dispatch = useDispatch()

    // handle getUserDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const userDetails = useSelector(state => state.userDetails)
    const { user, error: errorUserDetails, loading: loadingUserDetails } = userDetails


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error: errorUpdateProfile, loading: loadingUpdateProfile } = userUpdateProfile


    // handle getMyOrderList
    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, error: errorOrders, loading: loadingOrders } = orderListMy


    // handle loading and error
    let loading = false
    let error = ''

    if (loadingUserDetails || loadingUpdateProfile) {
        loading = true
    }

    if (errorUserDetails) {
        error = errorUserDetails
    } else if (errorUpdateProfile) {
        error = errorUpdateProfile
    }




    useEffect(() => {

        if (!userInfo) {
            history.push('/registerotpscreen?redirect=')
        } else {
            if (!user || !user.name || success) {
                dispatch(getMyOrderList())
            } else {
            }
        }
    }, [history, userInfo, user, dispatch, success])


    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Drivo my order</title>
                <meta name="description" content="my order" />
            </Helmet>
            <h1>My order<span className='textnormalbold'>(ckeck your order)</span></h1>

            <Row>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>

                    <hr />
                    {
                        loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message variant='danger' text={errorOrders} />
                        ) : orders && orders.length === 0 ? (
                            <Message variant='warning' text='There is no any order !' />
                        ) : (
                            <Table striped responsive className='table-sm text-center'>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>date</th>
                                        <th>total</th>
                                        <th>paid</th>
                                        <th>delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        orders.map(order => (
                                            <tr
                                                key={order._id}
                                                className={order.isPaid && order.isDelivered ? 'bg-success text-white' : ''}
                                            >
                                                <td>#{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>$ {order.totalPrice}</td>
                                                <td>
                                                    {order.isPaid ?
                                                        order.paidAt.substring(0, 10) : (
                                                            <i className='fas fa-times text-danger'></i>
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.isDelivered ?
                                                            order.deliveredAt.substring(0, 10) : (
                                                                <i className='fas fa-times text-danger'></i>
                                                            )
                                                    }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/payment/${order._id}`}>
                                                        <Button
                                                            className='btn-sm'
                                                        >
                                                            details
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ListOrdersScreen