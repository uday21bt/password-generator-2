import React from 'react'
import { useState } from 'react'
import { faFontAwesome } from '@fortawesome/free-regular-svg-icons'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import '../styles/InputForm.css'



const InputForm = () => {
    const [passwordLength,setPasswordLength]=useState('8')
    const [password,setPassword]=useState('')

    const [fromCheckBoxes,setFromCheckBoxes]= useState({
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true
    })

    const handleSubmit=(e)=>{
        
    e.preventDefault()
    console.log(fromCheckBoxes)
      
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=[]{}|:;"<>,.?/';

    let validChars='';
    let generatePassword='';

    if(fromCheckBoxes.includeUppercase) validChars+=uppercaseChars
    if(fromCheckBoxes.includeLowercase) validChars+=lowercaseChars
    if(fromCheckBoxes.includeNumbers)   validChars+=numberChars
    if (fromCheckBoxes.includeSymbols)  validChars+=symbolChars

   const validCharsLength=validChars.length;

   for (let i = 0;i<passwordLength;i++) {
       const randomIndex=Math.floor(Math.random()*validCharsLength);
       generatePassword+=validChars.charAt(randomIndex)

   }
   setPassword(generatePassword)
 }
  
 const copyToClipboard=()=>{
  if(password){
    navigator.clipboard.writeText(password)
    .then(()=>{
      alert('passWord copied to clipboard')
    })
    .catch((error)=>{
           console.log('failed to copy')
    })
  }

 }

 const handlePasswordLength=(e)=>{
  const length =parseInt(e.target.value)
  setPassword(length)
 }

 const inputHandler=(e)=>{
      setFromCheckBoxes({
        ...fromCheckBoxes,

        [e.target.name]:e.target.checked
      })
 }


  return (
       
     <div className='form-container'>
      <h1>Password  Generator</h1>
      <div className="password-container">
        <p>{password}</p>
         <faFontAwesome  onClick={copyToClipboard} icon={faClipboard} className='clip-icon'/>  
      </div>
      <form action="" className='password-form' onSubmit={handleSubmit}>
        <div className="length-input">
          <label htmlFor="password-length"></label>
          <input type="number"
           value={passwordLength}
           onChange={handlePasswordLength}
           name='passwordlength'
           id='password-length'
           min='6'
           max='20'
           />
        </div>
         <div className="conditional-input">
          <label htmlFor="uppercase">Include Uppercase letters</label>
          <input type="checkbox"
          name='includeUppercase'
          id='uppercase'
          checked={fromCheckBoxes.includeUppercase}
          onChange={inputHandler} />
         </div>

         <div className="conditional-input">
          <label htmlFor="uppercase">Include Lowercase letters</label>
          <input type="checkbox"
          name='includeLowercase'
          id='uppercase'
          checked={fromCheckBoxes.includeLowercase}
          onChange={inputHandler} />
         </div>

         <div className="conditional-input">
          <label htmlFor="numeric">Include Number</label>
          <input type="Checkbox"
           name='include Number '
           id='Symbolic'
           checked={fromCheckBoxes.includeNumbers}
           onChange={inputHandler} />
         </div>

         <div className="conditional-input">
          <label htmlFor="numeric">Include Symbols</label>
          <input type="Checkbox"
           name='include Symbol'
           id='Symbolic'
           checked={fromCheckBoxes.includeSymbols}
           onChange={inputHandler} />
         </div>

         <button className='generate-password-button'>
          Generate
         </button>
      </form>

     </div>
  )
}

export default InputForm