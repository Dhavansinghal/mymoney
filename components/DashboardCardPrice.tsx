'use client'

import React from 'react'
import Image from 'next/image'
import CountUp from 'react-countup'

const DashboardCard = ({ image, amount,title} : {image:String,amount:number,title:String}) => {
  return (
    <div className='total-balance'>
        <div className='total-balance-chart'>
            <Image 
                src={'/icon/'+image+'.png'}
                width={40}
                height={40}
                alt="HomeWork Logo"
                className='size-[50px]  max-xl:size-14'
                />
        </div>

        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                <p className='total-balance-label'>
                24k {title} : ₹ <CountUp end={(amount*1)} decimals={0} decimal=',' prefix=' '/> <br/>
                22k {title} : ₹ <CountUp end={(amount*0.9167)} decimals={0} decimal=',' prefix=' '/> <br/>
                21k {title} : ₹ <CountUp end={(amount*0.8750)} decimals={0} decimal=',' prefix=' '/> <br/>
                18k {title} : ₹ <CountUp end={(amount*0.7500)} decimals={0} decimal=',' prefix=' '/> <br/>
                </p>
            </div>
        </div>
    </div>
    
  )
}

export default DashboardCard