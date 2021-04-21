import React from 'react'
import { BarChart, ResponsiveContainer } from 'recharts';
import {Container, Row,Col} from 'react-bootstrap'


export default function CustomBarChart({chartData,color}) {
    return (
        
                <ResponsiveContainer height="100%">
                    
                <BarChart height="100%" >
                    <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={60} label="name" fill={color}  />
                    <Tooltip />
                  </BarChart>
                
                  </ResponsiveContainer>
                 
    )
}
