import DashboardCard from '@/components/DashboardCard'
import { HeaderBox } from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getTransactionDashboard } from '@/lib/action/transaction.actions'
import { getLoggedInUser } from '@/lib/action/user.action'
import React from 'react'

import AnimatedCounter from '@/components/AnimatedCounter'
import Image from 'next/image'
import DashboardCardPrice from '@/components/DashboardCardPrice'

const Home = async ({searchParams:{id,page}}:SearchParamProps) => {

  const loggedIn = await getLoggedInUser();
  if(!loggedIn) return <div>Not logged in</div>

  const {metal, transactions, totalTransaction }:any = await getTransactionDashboard({userId: loggedIn?.userId});
  
  if(!transactions) return <div>No Transaction</div>

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext = "Access and Manage Money"
            subtext2 ={"Last Metal Price Updated : " + (new Date(metal.timestamp))}
          />
        </header>

        <DashboardCardPrice 
          amount={metal.goldPrice}
          image="gold"
          title="Gold"
        />

        <DashboardCardPrice 
          amount={metal.silverPrice}
          image="silver"
          title="Silver"
        />

        {/* <DashboardCard 
          amount={metal.goldPrice}
          image="gold"
          title="Current Gold Value"
        />
        <DashboardCard 
          amount={metal.silverPrice}
          image="silver"
          title="Current Silver Value"
        /> */}

        <DashboardCard 
          amount={totalTransaction.goldCurrentPriceTotal}
          image="gold"
          title="Gold hold value"
        />
        <DashboardCard 
          amount={totalTransaction.silverCurrentPriceTotal}
          image="silver"
          title="Silver Hold value"
        />

        <DashboardCard 
          amount={totalTransaction.underpaidTotal}
          image="time"
          title="Total Underpaid"
        />
        <DashboardCard 
          amount={totalTransaction.overpaidTotal}
          image="time"
          title="Total Overpaid"
        />

        <DashboardCard 
          amount={totalTransaction.rentMoneyTotal}
          image="time"
          title="Total Rent Money"
        />
        <DashboardCard 
          amount={totalTransaction.totalInterestTotal}
          image="time"
          title="Current Interest Value"
        />

        <DashboardCard 
          amount={totalTransaction.finalAmountTotal}
          image="time"
          title="Final Amount"
        />
         <DashboardCard 
          amount={totalTransaction.assetValueTotal}
          image="time"
          title="Total Assets Value"
        />

        <DashboardCard 
          amount={totalTransaction.goldTotal}
          image="gold"
          title="Total Gold"
        />

        <DashboardCard 
          amount={totalTransaction.silverTotal}
          image="silver"
          title="Total Silver"
        />

        <TotalBalanceBox 
            totalTransaction={totalTransaction}
          />
        <TotalBalanceBox 
            totalTransaction={totalTransaction}
          />


      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={transactions}
      />

    </section>
  )
}

export default Home