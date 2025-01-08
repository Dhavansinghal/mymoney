'use client'

import React from 'react'
import CountUp from 'react-countup'
import AnimatedCounter from '../AnimatedCounter'

const DashboardCardTest = ({ image, amount,title} : {image:String,amount:number,title:String}) => {
    
    var color ='green';

    if (image === 'underpaid' || image === 'interest'){
        color ='red';

    }
  
    return (
    <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className={"inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-"+color+"-600 bg-"+color+"-100 rounded-full mr-6"}>
            <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
            </svg>
        </div>
        
     
        <div>
            <span className="inline-block text-2xl font-bold"><AnimatedCounter 
                        amount={amount}
                    /></span>
            <span className="inline-block text-xl text-gray-500 font-semibold">  </span>
            <span className="block text-gray-500 dashboard-card-span-text break-words">{title}</span>
        </div>
    </div>
   

    
    
  )
}

export default DashboardCardTest