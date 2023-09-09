import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Row, Col, Container } from 'react-bootstrap'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {FaChevronRight,FaViadeo} from "react-icons/fa";
import { GiHomeGarage,GiShoppingBag,GiBugleCall } from "react-icons/gi";
import { makeStyles } from '@material-ui/core/styles';
import {AiOutlineClose} from "react-icons/ai";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { AiOutlineLogout } from 'react-icons/ai'
import { RxAvatar } from "react-icons/rx";
import { FaMapMarkerAlt ,FaCar,FaCalendarCheck} from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg'

import { RiLoginCircleFill } from 'react-icons/ri'

import { userLogoutAction } from '../actions/userActions'
const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});
function Header() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const loginHandler = () => {
    history.push('/registerotpscreen?redirect=');
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  const classes = useStyles();

  ////////////////////////////////////////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const history = useHistory();
const myHandler = () => {
  setOpen(false)
  history.push('/my');
}
const garageHandler = () => {
  setOpen(false)
  history.push('/garage');
}
const helpHandler = () => {
  setOpen(false)
  history.push('/help');
}
const profileHandler = () => {
  setOpen(false)
  history.push('/profile');
}
const locationHandler = () => {
  setOpen(false)
  history.push('/location');
}
const dealHandler = () => {
  setOpen(false)
  history.push('/deal');
}
const termsHandler = () => {
  setOpen(false)
  history.push('/terms');
}
const logoutHandler = () => {
  dispatch(userLogoutAction())
  setOpen(false)
  window.location.reload();
} 
useEffect(() => {
 
}, [ userInfo])

    return ( 
      <Container fluid>
      <Row className="my-2" >
      <Col className="p-1">
 
      </Col>
      <Col className="p-1">
    
        <Box sx={{alignItems:'center', textAlign:'center'}}>
          <img src={'/assets/img/icon-10.png'} width={100} height={44} />
        </Box>
       
  
      </Col>
      <Col className="p-1">
      <Box sx={{alignItems:'right', textAlign:'right'}}>
      {!userInfo?
    <Button sx={{color:'#666'}}  startIcon={<RiLoginCircleFill size={20} color={'#666'}/>} onClick={loginHandler} >Login</Button>
    :
    <span className='littlenormalyellow'>Hi! <h3>{userInfo.name}</h3></span>
      }
   </Box>
      </Col>
    </Row>
           <SwipeableDrawer
           anchor="bottom"
           open={open}
           onClose={toggleDrawer(false)}
           onOpen={toggleDrawer(true)}
           classes={{ paper: classes.drawerPaper }}

         >
            <Box sx={{height:"70vh",alignItems: 'left',
                    textAlign:'left',  borderRadius: 3,
                  }} >
                         

             <MenuList>
             <MenuItem>
          <ListItemIcon>
            <RxAvatar size={30} color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText><Button  onClick={profileHandler}><span className="pbold">Profile</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
            <Button onClick={toggleDrawer(false)}  startIcon={<AiOutlineClose size={15} color={'#666'}/>}></Button> 

          </Typography>
        </MenuItem>
        <Divider sx={{ borderBottomWidth: 7 }} />
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}}>
          <ListItemIcon>
            <FaCar color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText><Button  onClick={garageHandler} ><span className="pbold">My Garage</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
            <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}}>
          <ListItemIcon>
            <GiShoppingBag color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText>
          <Button onClick={myHandler}  ><span className="pbold">My Orders</span></Button> 

          </ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}}>
          <ListItemIcon>
          <FaMapMarkerAlt color={'#61dafb'}/>
          </ListItemIcon>
        <ListItemText><Button onClick={locationHandler}><span className="pbold">My Locations</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
          <FaViadeo color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText> <Button onClick={dealHandler} ><span className="pbold">My Deals</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <Divider sx={{ borderBottomWidth: 7 }} />
        <MenuItem sx={{borderBottom:1,borderColor:'#61dafb'}}>
          <ListItemIcon>
            <GiBugleCall color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText> <Button ><span className="pbold">Call support</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaCalendarCheck color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText> <Button onClick={termsHandler}  ><span className="pbold">Terms and Conditions</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
          <FaChevronRight color={'#666'}/>
          </Typography>
        </MenuItem>
        <Divider sx={{ borderBottomWidth: 7 }} />

        <MenuItem>
          <ListItemIcon>
          <AiOutlineLogout color={'#61dafb'}/>
          </ListItemIcon>
          <ListItemText><Button  onClick={logoutHandler}><span className="pbold">Sign out</span></Button></ListItemText>
          <Typography variant="body2" color="text.secondary">
          </Typography>
        </MenuItem>
      </MenuList></Box>
               </SwipeableDrawer>
               </Container>
    )
}

export default Header
