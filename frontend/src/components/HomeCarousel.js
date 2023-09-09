import {  Container, Row,  Col,Carousel } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';




function HomeCarousel() {
  
  
    return (
     
        
      <div className="cards-container">

      <Card  style={{ borderRadius: 18,}} sx={{boxShadow:4}}>
      <Link to="/registerotpscreen"><img src={'assets/images/specialoffer/promotionbanner.png'} width={'100%'} /></Link>
       </Card>

     {/* <Card style={{ borderRadius: 18, }}>
      <img src={'assets/images/specialoffer/2.jpg'} width={'100%'} />
     </Card>

     <Card  style={{ borderRadius: 18, }}>
      <img src={'assets/images/specialoffer/3.jpg'} width={'100%'}/>
     </Card> */}
 
  </div>

    )
}

export default HomeCarousel
