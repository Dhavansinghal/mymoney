import React from 'react'
import AnimatedCounter from '@/components/AnimatedCounter'
import Image from 'next/image'

const DashboardCard = ({ image, amount,title} : {image:String,amount:number,title:String}) => {
  return (
    <div className='total-balance'>
        <div className='total-balance-chart'>
             <Image 
                src={'/icon/'+image+'.png'}
                width={50}
                height={50}
                alt="HomeWork Logo"
                className='size-[50px]  max-xl:size-14'
                />
        </div>

        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <p className='total-balance-label'>
                    {title}
                </p>
                <div className='total-balance-amount flex-center gap-2'>
                    <AnimatedCounter 
                        amount={amount}
                    />
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default DashboardCard