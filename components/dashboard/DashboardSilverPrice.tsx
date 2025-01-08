'use client'

import React from 'react'
import CountUp from 'react-countup'

const DashboardSilverPrice = ({ image, amount,title} : {image:String,amount:number,title:String}) => {
  return (
    <div className="flex items-center p-8 bg-white shadow rounded-lg">
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-gray-100 rounded-full mr-6">
        <svg
            viewBox="0 0 32 32"
        >
          <path fill="#C0C0C0" d="M11 28.004H1l1.158-4.632a1.428 1.428 0 0 1 1.386-1.082h4.912c.656 0 1.227.446 1.386 1.082L11 28.004zm10 0H11l1.158-4.632a1.428 1.428 0 0 1 1.386-1.082h4.912c.656 0 1.227.446 1.386 1.082L21 28.004zm10 0H21l1.158-4.632a1.428 1.428 0 0 1 1.386-1.082h4.912c.656 0 1.227.446 1.386 1.082L31 28.004zm-15-5.715H6l1.158-4.632a1.428 1.428 0 0 1 1.386-1.082h4.912c.656 0 1.227.446 1.386 1.082L16 22.289zm10 0H16l1.158-4.632a1.428 1.428 0 0 1 1.386-1.082h4.912c.656 0 1.227.446 1.386 1.082L26 22.289z"></path>
            <path fill="#C0C0C0" d="M21 16.575H11l1.158-4.632a1.428 1.428 0 0 1 1.386-1.082h4.912c.656 0 1.227.446 1.386 1.082L21 16.575z"></path>
            <path fill="#A5A5A5" d="M9.842 23.372a1.428 1.428 0 0 0-1.386-1.082H7.43l.449 1.797a2 2 0 0 1-1.94 2.485h-4.58L1 28.004h10l-1.158-4.632zm10 0a1.428 1.428 0 0 0-1.386-1.082H17.43l.449 1.797a2 2 0 0 1-1.94 2.485h-4.58L11 28.004h10l-1.158-4.632zm10 0a1.428 1.428 0 0 0-1.386-1.082H27.43l.449 1.797a2 2 0 0 1-1.94 2.485h-4.58L21 28.004h10l-1.158-4.632zm-15-5.715a1.428 1.428 0 0 0-1.386-1.082H12.43l.449 1.797a2 2 0 0 1-1.94 2.485h-4.58L6 22.289h10l-1.158-4.632zm10 0a1.428 1.428 0 0 0-1.386-1.082H22.43l.449 1.797a2 2 0 0 1-1.94 2.485h-4.58L16 22.289h10l-1.158-4.632z"></path>
            <path fill="#A5A5A5" d="M19.842 11.943a1.428 1.428 0 0 0-1.386-1.082H17.43l.449 1.797a2 2 0 0 1-1.94 2.485h-4.58L11 16.575h10l-1.158-4.632z"></path>
            <path fill="#C0C0C0" d="m20.4 8.454 1.6-.4-1.6-.4-.4-1.6-.4 1.6-1.6.4 1.6.4.4 1.6zm3.9 1.9 1.2-.3-1.2-.3-.3-1.2-.3 1.2-1.2.3 1.2.3.3 1.2zm-.6-4.1.8-.2-.8-.2-.2-.8-.2.8-.8.2.8.2.2.8z"></path>
        </svg>
        
        
      </div>
      <div>
        <span className="block text-2xl font-bold">{title}</span>
        <span className="block text-gray-500">
        24k {title} : ₹ <CountUp end={(amount*1)} decimals={0} decimal=',' prefix=' '/> <br/>
        22k {title} : ₹ <CountUp end={(amount*0.9167)} decimals={0} decimal=',' prefix=' '/> <br/>
        21k {title} : ₹ <CountUp end={(amount*0.8750)} decimals={0} decimal=',' prefix=' '/> <br/>
        18k {title} : ₹ <CountUp end={(amount*0.7500)} decimals={0} decimal=',' prefix=' '/> <br/>
        </span>        
      </div>
    </div>
    
  )
}

export default DashboardSilverPrice