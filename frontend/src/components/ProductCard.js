import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container,Form } from 'react-bootstrap'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from './Rating'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from '@mui/material/Button';
import { addToCart } from '../actions/cartActions'
import { useHistory } from 'react-router-dom';
import { GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import Box from '@mui/material/Box';
import { FaChevronRight, FaViadeo } from "react-icons/fa";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { FaMapMarkerAlt, FaCar, FaCalendarCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import MenuItem from '@mui/material/MenuItem';
import { SlCalender ,SlLocationPin,SlEvent,SlSpeedometer,SlGrid} from "react-icons/sl";
import PuchaseInclude from './PurchaseInclude'

const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});

function ProductCard({
  product,
  addToCompare,
  removeFromCompare,
  selected,

}) {
  const history = useHistory()

  const [idproduct, setIdproduct] = useState("");
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  let codecolor=''

  const classes = useStyles();
  const [opendetails, setOpendetails] = React.useState(false);

  const toggleDrawerDetails = (newOpen) => () => {
    setOpendetails(newOpen);
  };

  const handledetails = (id) => {

    setOpendetails(true)
  }


  const addToCartHandler = () => {
    history.push(`/cart/${product._id}?qty=${qty}`)
  }
  return (
    <>
<Card onClick={() => handledetails(product._id)}  style={{borderRadius:25,borderColor:`${product.labelcode.hexCode}`, padding:10}} >
      <Row >
          <Col style={{ alignItems: 'center', textAlign: 'center' }} xs={4}>
             <img src={product.imageurl.trim()} alt={product.name} width={'50%'} />
            {(product.labelcode.hexCode=='#666')?

<Box style={{borderRadius:25,width:100,height:20,backgroundColor:'#fff'}}>
             </Box>
              :
              <Box style={{borderRadius:25,width:100,height:20,backgroundColor:`${product.labelcode.hexCode}`}}>
              <span className='littlenormalwhite'>{product.labelcode.label}</span></Box>
            }
            

          </Col>
          <Col className='textnormal' xs={4} style={{ textAlign: 'left' }}>
            <span className='littlenormal'>
               {product.brandorigin.brand.title}
               <br/>
             {product.brandpattern.pattern}
             <br/>
              {product.tyre.name}</span>
          </Col>
          <Col xs={4}>
            <br/>
          <span className='littlenormal'>
            {product.price}AED<FaChevronRight color={'#666'} />
</span>
          </Col> 
      </Row>
</Card>




      <SwipeableDrawer
        anchor="bottom"
        open={opendetails}
        onClose={toggleDrawerDetails(false)}
        onOpen={toggleDrawerDetails(true)}
        classes={{ paper: classes.drawerPaper }}

      >
        <>
          <Container  style={{
            height: "95vh", alignItems: 'left',
            textAlign: 'left', borderRadius: 3,
          }} > 

            <Box sx={{ textAlign: 'center' }}>
              <Button onClick={toggleDrawerDetails(false)} ><IoIosArrowDown size={30}/></Button>
            </Box>


            <Row className='border-bottom'>

              <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                <img className='img-tire' src={product.imageurl.trim()} alt={product.name}  />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'left' }}>
              <Link to={`/product/${product._id}`} >
                <img  src={`/assets/img/brand/${product.brandorigin.brand.title.toLowerCase().trim()}.png`} width={'30%'}/>
                </Link>
                <br/>
                <h1>{product.brandorigin.brand.title} {product.brandpattern.pattern}</h1>
              </Col>
              <Col className='py-2' xs={12} sm={12} md={12} lg={12} xl={12}  style={{justifyContent:'center',textAlign:'left', alignItems: "left",}}>

              <Card style={{borderRadius:10,backgroundColor:'#EBECF0',padding:10,margin:0}}>
         
              <Row>

              <Col  xs={6} sm={6} md={6} lg={6} xl={6}  style={{ textAlign: 'left' }}>
              <span className='textnormal'>Tire Size:</span><br/>
              <span className='pbold'>{product.tyre.name}</span>
                </Col>
             
              <Col  xs={6} sm={6} md={6} lg={6} xl={6}  style={{ textAlign: 'right' }}>
              <span className='textnormal'>{product.brandorigin.origin.title}</span><br/>
              <span className='textnormal'>{product.productionYear}</span>
                </Col>
                </Row>
                </Card>

                </Col>
              <Col className='py-2' xs={6} sm={6} md={6} lg={6} xl={6}  style={{justifyContent:'center',textAlign:'left', alignItems: "left",}}>
              <Card style={{borderRadius:10,borderColor:'#61dafb',backgroundColor:'#61dafb10',padding:10,margin:0}}>
              <span className='littlenormal'>Recieve AED100 off when buying 4tires.</span>
                </Card>

              </Col>
              <Col className='py-3' style={{justifyContent:'center',textAlign:'center', alignItems: "center",}} xs={6} sm={6} md={6} lg={6} xl={6}>
              
              <span className='pbold'> AED{product.price}</span>  <br/>
              <span className='littlenormal'>Best Price Guarantee</span>
              </Col>
              <Col  xs={12} sm={12} md={12} lg={12} xl={12} >
              <span className='pbold'>Every Purchase Includes:</span>
                <PuchaseInclude/>
              </Col>
              

            </Row>
                <Row className='border-bottom'>

                <Col    xs={12} sm={12} md={12} lg={12} xl={12}>

                <span className='pbold'>Description</span>
                <br/>
                <span className='textnormal'>{product.description}</span>
                </Col>
                </Row>
       
            <br/>
            <br/> <br/>
            <br/> <br/>
            <br/>
          </Container>
          <Box sx={{
            position: 'fixed', backgroundColor: '#fff', boxshadow: 2,
            bottom: 0,
            right: 0,
            left: 0,
            height: 60,
            boxShadow:5,
            textAlign: 'center'
          }}>
            <Row>
              <Col className='p-1' xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl   >
              <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={qty} onChange={(e) => setQty(e.target.value)}
          autoWidth
          style={{borderRadius: '40px', height:40, marginTop:3}}
        >
                  {product.countInStock<9?
                    [...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem  key={x + 1} value={x + 1}    >
                        {x + 1} tires
                      </MenuItem >
                    ))
                    :
                    [...Array(8).keys()].map((x) => (
                      <MenuItem  key={x + 1} value={x + 1}    >
                        {x + 1} tires
                      </MenuItem >
                    ))
                  }
                  </Select>
                </FormControl  >

                <Button variant="contained" 
                  onClick={addToCartHandler}
                  type="button"
                  className="p-2 m-1 btn-block"
                  disabled={product.countInStock === 0} style={{ borderRadius: 25 }}>
                  <span className="textnormalwhite">Add to  cart.  {product.price * qty} AED</span>
                </Button></Col>
            </Row>

          </Box>
          
        </>





      </SwipeableDrawer>
    </>




  );
}
export default ProductCard;
