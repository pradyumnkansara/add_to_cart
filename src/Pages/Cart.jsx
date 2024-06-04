import React, { useContext, useState } from 'react'
import Header from '../Common/Header'
import { Container, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { cartContext } from '../Context/MainContext';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default function Cart() {
  let { cart, setcart } = useContext(cartContext)
  let finaltot=0;
  cart.forEach(element => {
    finaltot+=(element.price*element.qty)
  });

  let finalcart = cart.map((cartdetail, i) => {
    return (
      <CartItem cartdetail={cartdetail} index={i} key={i} />
    )
  })
  return (
    <>
      <Header />
      <Container fluid>
        <Container>
          <h1 className='text-center my-4'>Cart</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product image</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {finalcart}
            </tbody>
            <h3>
              Total:{finaltot}
            </h3>
          </Table>
        </Container>
      </Container>
      <NotificationContainer/>
    </>
  )
}

function CartItem({ cartdetail, index }) {
  let {cart,setcart}=useContext(cartContext)
  let [qtychange,setqtychange]=useState(cartdetail.qty)
  
  let deleteCart=()=>{
    let finaldelete=cart.filter((item,i)=>i!=index)
    setcart(finaldelete)
    NotificationManager.warning(`${cartdetail.name} deleted`);
  }
  let changeqty=(event)=>{
    setqtychange(event.target.value)
    let qtyfilter=cart.filter((v,i)=>{
      if(index==i){
        v.qty=event.target.value;
      }
      return v;
    })
    setcart(qtyfilter);
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{cartdetail.name}</td>
      <td>
        <img src={cartdetail.image} width="150px" />
      </td>
      <td>{cartdetail.price}</td>
      <td>
        <input type="Number" value={qtychange} min={1} max={14} onChange={changeqty}/>
      </td>
      <td>{cartdetail.price*cartdetail.qty}</td>
      <td>
        <button onClick={deleteCart}>
          delete
        </button>
      </td>
    </tr>
  )
}
