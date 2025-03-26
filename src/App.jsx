
/* eslint-disable */

import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {



  return(
      <div className="app">
       <div className="calculater">
       <Input />        

       </div>

      </div>

  )
  

}


function Input(){

return (
  <div className="input">
          
          <InputCell name="clear" type="clear" content="AC" />
          <InputCell name="division" type="operation" content="/" />
          <InputCell name="multiplication" type="operation" content="×" />
          <InputCell name="seven" type="number" content="7" />
          <InputCell name="eight" type="number" content="8" />
          <InputCell name="nine" type="number" content="9" />
          <InputCell name="minus" type="operation" content="-" />
          <InputCell name="four" type="number" content="4" />
          <InputCell name="five" type="number" content="5" />
          <InputCell name="six" type="number" content="6" />
          <InputCell name="plus" type="operation" content="+" />
          <InputCell name="one" type="number" content="1" />
          <InputCell name="two" type="number" content="2" />
          <InputCell name="three" type="number" content="3" />
          <InputCell name="equal" type="equal" content="=" />
          <InputCell name="zero" type="zero" content="0" />
          <InputCell name="dot" type="dot" content="." />
          

        </div>
)


}


function InputCell({name, type, content}){

  return(

  <div id={name} className={type}>{content}</div>

  )

  

}


export default App