
/* eslint-disable */

import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {



  return(
      <div className="app">
       <div className="calculater">
        <div className="input">
          <div id="clear" className="clear">AC</div>
          <div id="division" className="operation">/</div>
          <div id="multiplication"  className="operation">×</div>
          <div id="seven" className="number">7</div>
          <div id="eight"  className="number">8</div>
          <div id="nine"  className="number">9</div>
          <div id="minus"  className="operation">-</div>
          <div id="four" className="number">4</div>
          <div id="five"  className="number">5</div>
          <div id="six"  className="number">6</div>
          <div id="minus" className="operation">+</div>
          <div id="one" className="number">1</div>
          <div id="two"  className="number">2</div>
          <div id="three"  className="number">3</div>
          <div id="equal"  className="equal">=</div>
          <div id="zero"  className="zero">0</div>
          <div id="dot"  className="dot">.</div>

        </div>
         

       </div>

      </div>

  )
  

}


export default App