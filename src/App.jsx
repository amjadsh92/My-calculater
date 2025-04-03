
/* eslint-disable */

import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {

  const [equation, setEquation] = useState({expression:"",result:""})
  const [preview, setPreview] =useState({previousPreviewType:"", currentPreviewContent:0})

  return(
      <div className="app">
       <div className="calculater">
        <Equation equation = {equation} />
        <Preview preview = {preview}/>
        <Input setEquation = {setEquation} equation = {equation} setPreview= {setPreview} preview = {preview} />        

       </div>

      </div>

  )
  

}


function Input({setEquation, equation, setPreview, preview}){

return (
  <div className="input">
          
          <InputCell name="clear" type="clear" content="AC" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="division" type="operation" content="/" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="multiplication" type="operation" content="⋅" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="seven" type="number" content="7" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview}/>
          <InputCell name="eight" type="number" content="8" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="nine" type="number" content="9" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview}/>
          <InputCell name="minus" type="operation" content="-" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="four" type="number" content="4" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="five" type="number" content="5" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="six" type="number" content="6" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview}/>
          <InputCell name="plus" type="operation" content="+" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="one" type="number" content="1" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="two" type="number" content="2" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="three" type="number" content="3" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="equal" type="equal" content="=" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="zero" type="zero" content="0" setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          <InputCell name="dot" type="dot" content="." setEquation = {setEquation} equation ={equation} setPreview = {setPreview} preview = {preview} />
          

        </div>
)


}


function InputCell({name, type, content, setEquation, equation, setPreview, preview}){

  let equationToEvaluate;
  let expression= equation.expression
  let result = equation.result
  let currentPreviewContent= preview.currentPreviewContent
  let previousPreviewType = preview.previousPreviewType
  const equalRegex = /(.+)?=(.+)/;
  const minusRegex = /-/g;
  const multiplicationRegex = /⋅/g;

  const handleClick = () => {
     
      if (content === "AC"){
        expression=""
        result=""
        currentPreviewContent = 0
        previousPreviewType = ""
        setPreview({previousPreviewType, currentPreviewContent})
        setEquation({expression, result})
      }
      else if (type === "operation"){
         if (equalRegex.test(expression)){
          expression = result + content;
          result = ""
          previousPreviewType = type
          currentPreviewContent = content
          setPreview({previousPreviewType, currentPreviewContent})
          setEquation({ expression, result});

        }
        else{
          
          previousPreviewType = type
          currentPreviewContent = ""
          expression += content
          currentPreviewContent += content
      
      const regex1 = new RegExp(`\\${content}+`, "g")
      const regex6 = new RegExp(`(?<![⋅\\+\\-/])-\\${content}`, "g")
      const regex2 = new RegExp(`(?![/⋅]-|-[⋅\\+\\-/])[⋅\\+\\-/\\.]\\${content}`, "g");
      const regex5 = new RegExp (`(?!^[/⋅].*)[/⋅]-(?!-)\\${content}`, "g")
      const regex3 = new RegExp(`^\\d+\\.\\${content}`);
      const regex4 = new RegExp(`[⋅\\+\\-/]\\d+\\.\\${content}`, "g");
      
      //const regex5 = /×/;
      expression = expression.replace(regex1,`${content}`);
      expression = expression.replace(regex6,`${content}`);
      expression = expression.replace(regex2,`${content}`);
      expression = expression.replace(regex3,`0${content}`);
      expression = expression.replace(regex4,`${content}`);
      expression = expression.replace(regex5,`${content}`);
      
      //equation = equation.replace(regex5,"⋅");
      setPreview({previousPreviewType, currentPreviewContent})
      setEquation({...equation, expression})
        }
      }

      else if(type === "dot") {
        if (equalRegex.test(expression)){
          expression = 0 + content;
          result = ""
          currentPreviewContent = expression
          previousPreviewType = type
          setPreview(previousPreviewType, currentPreviewContent)
          setEquation({ expression, result});
        }
        else{
          debugger;
        
        expression += content;
        const dotRegex1 = new RegExp(`\\${content}+`, "g")
        const dotRegex2 = new RegExp(`^\\${content}|(?<=[+⋅/-])\\.` ,"g")
        const dotRegex3 = new RegExp(`(?<=\\d+\\.\\d+)\\.`);
        expression = expression.replace(dotRegex1,`${content}`);
        expression = expression.replace(dotRegex2,`0${content}`);
        expression = expression.replace(dotRegex3,"");
        if (previousPreviewType === "number" || previousPreviewType === "zero"  ){
          currentPreviewContent += content;
           currentPreviewContent = currentPreviewContent.replace(dotRegex3,"");
          previousPreviewType =type;
          setPreview({previousPreviewType, currentPreviewContent})
        }

        if (previousPreviewType === "operation" || previousPreviewType === "" ){
          currentPreviewContent = 0 + content;
          previousPreviewType =type;
          setPreview({previousPreviewType, currentPreviewContent})
        }
        //setPreview(expression)
        setEquation({...equation, expression})
        }

      }
      else if(type === "equal"){
        
        //const equalRegex = /⋅/g;
        const equalRegex1 = /^[/⋅].+/;
        const equalRegex2 = /(?<=.+)[\.\+\/⋅\*\-]$/;
        const equalRegex3 = /^(\+)/;
        const equalRegex4 = /(\d+(?:\.\d+)?|NAN|INFINITY)[\/⋅\*]-$/
        
        //equation = equation.replace(equalRegex,"");
        debugger;
        equationToEvaluate = expression.replace(multiplicationRegex,"*")
        equationToEvaluate = equationToEvaluate.replace(minusRegex,"-")
        equationToEvaluate = equationToEvaluate.replace("INFINITY","Infinity")
        equationToEvaluate = equationToEvaluate.replace("NAN","NaN")

        if (expression === "⋅" || expression === "/" || expression === "+"  || expression === "-" || expression === ""){
          expression += content + "NAN" 
          result="NAN"
          currentPreviewContent = result
          previousPreviewType = type
          equationToEvaluate = expression.replace("NAN","NaN")
          setPreview({previousPreviewType, currentPreviewContent})
          setEquation({expression, result})
        }

        else if(expression === "/-"){
         expression = "/";
         expression += content + "NAN";
         setEquation({...equation, expression})
        }

        else if(expression === "/⋅"){
          expression = "/";
          expression += content + "NAN";
          setEquation({...equation, expression})
         }

        else if (equalRegex.test(expression)){
          setEquation({...equation, expression});

        }
        else if(equalRegex1.test(expression)){
          if(equalRegex3.test(expression)){
            expression = expression.replace(equalRegex3, "")
          }
          setEquation({...equation, expression})

        }

          else if (equalRegex4.test(expression)){

            expression = expression.replace(equalRegex4,'$1');
            equationToEvaluate = equationToEvaluate.replace(equalRegex4,"$1");
            result = Number(eval(equationToEvaluate).toFixed(9)).toString()
            expression += content + result
            currentPreviewContent = result
            previousPreviewType = type
            setPreview({previousPreviewType, currentPreviewContent})
            setEquation({expression, result})
  
          }  

        
        else if (equalRegex2.test(expression)){
          if(equalRegex3.test(expression)){
            expression = expression.replace(equalRegex3, "")
          }

          expression = expression.replace(equalRegex2,"");
          equationToEvaluate = equationToEvaluate.replace(equalRegex2,"");
          result = Number(eval(equationToEvaluate).toFixed(9)).toString()
          result = result.replace("-","-")
          expression += content + result
          currentPreviewContent = result
          previousPreviewType = type
          setPreview({previousPreviewType, currentPreviewContent})
          setEquation({expression, result})

      }
       
       

      else{
        
        if(equalRegex3.test(expression)){
          expression = expression.replace(equalRegex3, "")
        }
        result = Number(eval(equationToEvaluate).toFixed(9)).toString()
        result = result.replace("-","-")
        expression += content + result
        currentPreviewContent = result
        previousPreviewType = type
        setPreview({previousPreviewType, currentPreviewContent})
        setEquation({expression, result})


      }

      }

      else{
        
        if (equalRegex.test(expression)){
          expression = content;
          result = ""
          currentPreviewContent = content;
          previousPreviewType = type
          setPreview({previousPreviewType, currentPreviewContent})
          setEquation({ expression, result});
        }
          else{
            debugger;
            const zeroRegex = /(?<!\d\.?)0(?=\d)/g;
            expression += content;
            if (previousPreviewType === "operation"){
            currentPreviewContent = content;
            previousPreviewType = type
            setPreview({previousPreviewType, currentPreviewContent})
            }
            else{
            currentPreviewContent += content;
            previousPreviewType = type
            currentPreviewContent = currentPreviewContent.replace(zeroRegex, "")
            setPreview({previousPreviewType, currentPreviewContent})
            }
            expression = expression.replace(zeroRegex, "")
            
            setEquation({...equation, expression})
            }


        
        
          }

      }
  

  return(

  <div id={name} className={type} onClick={handleClick}>{name === "multiplication" ? "×" :content}</div>

  )

  

}

function Equation({equation}){

  return(
    <div id="result" className="result ds-digital">{equation.expression}</div>
  )
}

function Preview({preview}){

  return(
    <div id="preview" className="preview ds-digital">{preview.currentPreviewContent}</div>
  )

}


export default App