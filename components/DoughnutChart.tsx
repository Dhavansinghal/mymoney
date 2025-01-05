'use client'
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({totalTransaction}:any) => {
  
  const data = {
    datasets: [
      {
        label: 'Type',
        data: [totalTransaction.underpaidTotal,totalTransaction.overpaidTotal],
        backgroundColor: ['#2265d8','#2f91fa']
      },
    ],
    labels:['Underpaid','Overpaid']
  };

  return (
    <Doughnut data={data} 
    options={{
        cutout:'60%',
        plugins: {
            legend:{
                display:false
            }
        }
    }}
    />
  )
}

export default DoughnutChart
