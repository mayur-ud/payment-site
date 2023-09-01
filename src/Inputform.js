import { Button, TextInput,Box,Image, NumberInput } from '@mantine/core'
import React, { useState } from 'react'
import upiqr from "upiqr";

function Inputform() {

    const [show,setShow] = useState(false)
    const [data , setData] = useState(null)

    const [name , setName] = useState("")
    const [sch , setSch] = useState("")
    const [amt , setAmt] = useState(51)

    
    const UPIGen = ()=>{
        
        if(name.trim() && sch.trim() && amt > 50){
        upiqr({
            payeeVPA: "9111827985@paytm",
            payeeName: "MANIT",
            amount : amt
          })
          .then((upi) => {
            setData({
                'qr' : upi.qr,
                'intent' : upi.intent
            })
            setShow(true)
           
          })
          .catch(err => {
            console.log(err);
          });
        }
    }
    
    
   

  

  return (


    <Box sx={{maxWidth : '30%' }}>
        <TextInput
    placeholder="Your name"
    label="Your name"
    variant="filled"
    withAsterisk
    value={name}
    onChange={(e)=>setName(e.currentTarget.value)}
    />

    <TextInput
    placeholder="Your Scholar Number"
    label="Scholar No"
    variant="filled"
    withAsterisk
    value={sch}
    onChange={(e)=>setSch(e.currentTarget.value)}
    
    />

<NumberInput
    placeholder="Your Donation Amount"
    label="Donation Amount"
    variant="filled"
    withAsterisk
    value={amt}
    />

    

   <Button my='md' onClick={()=>{UPIGen()}}>Donate</Button>

   {show && <Box><Image src={data.qr}/><Button onClick={()=>{window.open(data.intent, '_blank')}}>Open in App</Button></Box>}
    
  </Box>
  )
}

export default Inputform