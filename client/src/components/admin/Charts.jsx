import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    {
      month: "January",
      rent: 4000,
      sale: 2400,
      amt: 2400
    },
    {
      month: "February",
      rent: 3000,
      sale: 1398,
      amt: 2210
    },
    {
      month: "March",
      rent: 2000,
      sale: 9800,
      amt: 2290
    },
    {
      month: "April",
      rent: 2780,
      sale: 3908,
      amt: 2000
    },
    {
      month: "May",
      rent: 1890,
      sale: 4800,
      amt: 2181
    },
    {
      month: "June",
      rent: 2390,
      sale: 3800,
      amt: 2500
    },
    {
      month: "July",
      rent: 3490,
      sale: 4300,
      amt: 2100
    }
  ] 
  

function Charts() {
  return (
    <div className='bg-gray-200'>
                <p className='text-sm font-bold text-slate-600 p-3'>last 6 months</p>

     <AreaChart width={700} height={350} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
 
       
  </defs>
  <XAxis dataKey="month" />
  <YAxis /> 
  <CartesianGrid strokeDasharray="2 2" />
  <Tooltip />
  <Area type="monotone" dataKey="rent" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="sale" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>

    </div>  
  )
}

export default Charts