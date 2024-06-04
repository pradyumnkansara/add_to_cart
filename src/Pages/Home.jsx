import React, { useContext, useEffect, useState } from 'react'
import Header from '../Common/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { cartContext } from '../Context/MainContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default function Home() {
  let [Products, setProducts] = useState([])
  let { modal, setmodal } = useContext(cartContext)
  let { poptoggle, setpoptoggle } = useContext(cartContext)

  let modopen = () => {
    setpoptoggle(!poptoggle)
  }

  let getProduct = () => {
    axios.get('https://dummyjson.com/products')
      .then((res) => res.data)
      .then((finalRes) => {
        setProducts(finalRes.products)
      })
  }
  
  useEffect(() => {
    getProduct();
  }, [])

  let allProduct = Products.map((pitems, i) => <ProductDiv pdata={pitems} key={i} />)


  return (
    <>
      <Header />
      <Container fluid>
        <Container>
          <h1 className='text-center my-4'>Products</h1>
          <Row className='gy-4'>
            {allProduct}
          </Row>
        </Container>
      </Container>
      {
        modal.map((v,i)=>{
          return(
            < Container fluid className={`mdmain z-3 ${poptoggle
              ?
              'mdopen'
              :
              ''
              }`}>
              <Container className='d-flex justify-content-center'>
                <div className='bg-white p-4 mt-5' style={{ width: "60%" }}>
                  <Row>
                    <Col lg={8}>
                      <div>
                        <img src={v.thumbnail}/>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <h2></h2>
                      <span className='fw-bold fs-1' onClick={modopen}>
                        &times;
                      </span>
                    </Col>
                  </Row>
                </div>
              </Container>
            </Container >
          )
        })
      }
      <NotificationContainer />
    </>
  )
}

function ProductDiv({ pdata }) {
  let { cart, setcart } = useContext(cartContext)
  let { modal, setmodal } = useContext(cartContext)
  let { poptoggle, setpoptoggle } = useContext(cartContext)
  let modopen = (mddata) => {
    setmodal([mddata])
    setpoptoggle(!poptoggle)
  }
  let addtocart = () => {

    let filterdata = cart.filter((v, i) => v.name == pdata.title)
    if (filterdata.length) {
      let finalfilterdata = cart.filter((v, i) => {
        if (v.name == pdata.title) {
          v.qty += 1;
        }
        return v;
      })
      setcart(finalfilterdata)
      NotificationManager.success(`${pdata.title} qty updated in cart`);
    }
    else {
      let cartdetail = {
        name: pdata.title,
        image: pdata.thumbnail,
        price: pdata.price,
        qty: 1
      }
      setcart([...cart, cartdetail])
      NotificationManager.success(`${pdata.title} added to cart`);
    }


  }
  return (
    <Col lg={4} md={6} xs={12} >
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={pdata.thumbnail} style={{ width: '100%', height: '250px' }} onClick={() => modopen(pdata)} />
        <Card.Body>
          <Card.Title>{pdata.title}</Card.Title>
          <Card.Text>
            {pdata.description.slice(0, 11)}...
          </Card.Text>
          <h2>Rs.{pdata.price}</h2>
          <Button variant="primary" onClick={addtocart}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

// function Modal({mdata}) {
//   let { poptoggle, setpoptoggle } = useContext(cartContext)

//   let modopen = () => {
//     setpoptoggle(!poptoggle)
//   }

//   return (
//     < Container fluid className={`mdmain z-3 ${poptoggle
//       ?
//       'mdopen'
//       :
//       ''
//       }`}>
//       <Container className='d-flex justify-content-center'>
//         <div className='bg-white p-4 mt-5' style={{ width: "60%" }}>
//           <Row>
//             <Col lg={8}>
//               <div>
//                 <img src={mdata}/>
//               </div>
//             </Col>
//             <Col lg={4}>
//               <h2></h2>
//               <span className='fw-bold fs-1' onClick={modopen}>
//                 &times;
//               </span>
//             </Col>
//           </Row>
//         </div>
//       </Container>
//     </Container >
//   )
// }








// "https://i.dummyjson.com/data/products/1/thumbnail.jpg"