
import RightSidebar from '@/components/RightSidebar'  
import { getTransactionDashboard } from '@/lib/action/transaction.actions'
import { getLoggedInUser } from '@/lib/action/user.action'
import React from 'react'


import DashboardGoldPrice from '@/components/dashboard/DashboardGoldPrice'
import DashboardSilverPrice from '@/components/dashboard/DashboardSilverPrice'
import DashboardCardTest from '@/components/dashboard/DashboardCardTest'

const Home = async ({searchParams:{id,page}}:SearchParamProps) => {

  const loggedIn = await getLoggedInUser();
  if(!loggedIn) return <div>Not logged in</div>

  const {metal, transactions, totalTransaction }:any = await getTransactionDashboard({userId: loggedIn?.userId});
  
  if(!transactions) return <div>No Transaction</div>

  return (
    <section className='home'>
      <div className='home-content'>
        <div className="flex bg-gray-100 min-h-screen">
          <div className="flex-grow text-gray-800">
            <main className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                  <h2 className="text-gray-600 ml-0.5">Welcome <span className="text-bankGradient">&nbsp;{loggedIn?.firstName || 'Guest'}</span></h2>
                  <h2 className="text-gray-600 ml-0.5 text-14 lg:text-12">{"Last Metal Price Updated : " + (new Date(metal.timestamp))}</h2>
                </div>
              </div>
              
              <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                <DashboardGoldPrice 
                  amount={metal.goldPrice}
                  image="gold"
                  title="Gold"
                />

                <DashboardSilverPrice 
                  amount={metal.silverPrice}
                  image="silver"
                  title="Silver"
                />
              </section>
              <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                <DashboardCardTest
                  amount={totalTransaction.goldCurrentPriceTotal}
                  image="gold"
                  title="Gold hold value"
                />

                <DashboardCardTest
                  amount={totalTransaction.silverCurrentPriceTotal}
                  image="silver"
                  title="Silver hold value"
                />
              </section>

              <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                <DashboardCardTest
                  amount={totalTransaction.underpaidTotal}
                  image="underpaid"
                  title="Total Underpaid"
                />

                <DashboardCardTest
                  amount={totalTransaction.overpaidTotal}
                  image="time"
                  title="Total Overpaid"
                />
              </section>

              <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                <DashboardCardTest
                  amount={totalTransaction.rentMoneyTotal}
                  image="time"
                  title="Total Rent Money"
                />

                <DashboardCardTest
                  amount={totalTransaction.totalInterestTotal}
                  image="interest"
                  title="Current Interest Value"
                />
              </section>

              <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                <DashboardCardTest
                  amount={totalTransaction.finalAmountTotal}
                  image="time"
                  title="Final Amount"
                />

                <DashboardCardTest
                  amount={totalTransaction.assetValueTotal}
                  image="time"
                  title="Total Assets Value"
                />
              </section>

              <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                <DashboardCardTest
                  amount={totalTransaction.goldTotal}
                  image="gold"
                  title="Total Gold"
                />

                <DashboardCardTest
                  amount={totalTransaction.silverTotal}
                  image="silver"
                  title="Total Silver"
                />
              </section>
            </main>
          </div>
        </div>

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