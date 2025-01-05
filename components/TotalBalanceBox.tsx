
import React from 'react'
import AnimatedCounter from '@/components/AnimatedCounter'
import DoughnutChart from './DoughnutChart'


const TotalBalanceBox = ({ totalTransaction} : any) => {
  return (
    <div className='total-balance'>
        <div className='total-balance-chart'>
            <DoughnutChart
                totalTransaction={totalTransaction}
            />
        </div>

        <div className='flex flex-col gap-6'>
            <h2 className='header-2'>
                {totalTransaction.rentMoneyTotal} Rent Amount
            </h2>
            <div className='flex flex-col gap-2'>
                <p className='total-balance-label'>
                    Total Current value
                </p>
                <div className='total-balance-amount flex-center gap-2'>
                    <AnimatedCounter 
                        amount={totalTransaction.finalAmountTotal}
                    />
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default TotalBalanceBox