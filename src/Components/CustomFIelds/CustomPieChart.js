import React,{useEffect,useContext} from 'react'
import { Pie,  PieChart, Tooltip,ResponsiveContainer } from 'recharts';
import {ReRenderContext} from '../../CustomContextProvider';


export default function CustomBarChart({chartData,color}) {
    const ReRenderContextObject = useContext(ReRenderContext);
    useEffect(()=>{},[ReRenderContextObject.rerenderForm]);
    return (
        
                <ResponsiveContainer height="100%">
                    
                <PieChart height="100%" >
                    <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={60} label="name" fill={color}  />
                    <Tooltip />
                  </PieChart>
                
                  </ResponsiveContainer>
                 
    )
}
