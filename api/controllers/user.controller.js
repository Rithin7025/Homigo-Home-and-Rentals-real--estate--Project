import express from 'express';


const test = async(req,res)=>{
    res.json({
        messsage : 'api is working'
    })
    console.log('return')
}




export default test
