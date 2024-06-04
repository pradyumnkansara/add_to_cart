import React, { createContext, useState } from 'react'
let cartContext = createContext()

export default function MainContext(props) {
  let [cart, setcart] = useState([])
  let [modal, setmodal] = useState([])
  let [poptoggle, setpoptoggle] = useState(false)
  return (
    <cartContext.Provider value={
      {
        cart, setcart, modal, setmodal,poptoggle,setpoptoggle
      }
    }>
      {props.children}
    </cartContext.Provider>
  )
}

export { cartContext };     