import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import TransactionForm from '@/components/TransactionForm';
import { getLoggedInUser } from '@/lib/action/user.action';
import { redirect } from 'next/navigation';
import { getVendors } from '@/lib/action/vendor.actions';
import { getTransactions } from '@/lib/action/transaction.actions';
import CategoryBadge from '@/components/CategoryBadge';
import TransactionReturnForm from '@/components/TransactionReturnForm';
import { convertNumberToMoney, formatDateToDisplay } from '@/lib/utils';


export default async function TransactionHistory() {

  const user = await getLoggedInUser();
  const vendors = await getVendors({userId: user?.userId});

  const transactionResponse = await getTransactions({userId: user?.userId});

  const { transactions, metal }  = transactionResponse ||  {};

  const { goldPrice, silverPrice, timestamp}  = metal ||  {};

  if(!user) redirect('/sign-in');

  return ( 
    <section className='home'>
      <div className='home-content'>

        <header className='flex items-center justify-between' >
            <h2 className='recent-transactions-label'>Transaction History</h2>
            <div>
              <TransactionForm user={user} vendors={vendors} />

              {/* <Link href={`/transactions/?id=${appwriteItemId}`} className='view-all-btn ml-5'>
                  View All
              </Link> */}
            </div>
        </header>
        <div className='pb-10'>{String(new Date(timestamp))}</div>

        <Table>
          <TableCaption>A list of your recent Transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Given Date</TableHead>
              <TableHead>Gold (gm)</TableHead>
              <TableHead>Silver (gm)</TableHead>
              <TableHead>Given Money</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Total Interest</TableHead>
              <TableHead>Final Amount</TableHead>
              <TableHead>Current Asset Value</TableHead>
              <TableHead>Total Time</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Created Date</TableHead>
              <TableHead>Returned?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions!.map((transaction:Transaction, index:string) =>{
              return (
              <TableRow key={index} >
                <TableCell className="font-medium">{transaction.vendorId}</TableCell>
                <TableCell><CategoryBadge category={transaction?.status || ''} /> </TableCell>
                <TableCell>{formatDateToDisplay(transaction.rentDate)}</TableCell>
                <TableCell>{transaction.gold} ({convertNumberToMoney(transaction?.goldCurrentPrice)})</TableCell>
                <TableCell>{transaction.silver} ({convertNumberToMoney(transaction.silverCurrentPrice)})</TableCell>
                <TableCell>{convertNumberToMoney(transaction.rentMoney)}</TableCell>
                <TableCell>{transaction.interestRate}%</TableCell>
                <TableCell>{convertNumberToMoney(transaction.totalInterest)}</TableCell>
                <TableCell>{convertNumberToMoney(transaction.finalAmount)}</TableCell>
                <TableCell>{convertNumberToMoney(transaction.assetValue)}</TableCell>
                <TableCell>{transaction.interestTime}</TableCell>
                <TableCell> {transaction.isActive ?<CategoryBadge category='Given' /> :<CategoryBadge category='Returned' />}</TableCell>
                <TableCell className="text-right">{formatDateToDisplay(transaction.createdDate)}</TableCell>
                <TableCell>{transaction.isActive ?<TransactionReturnForm transaction={transaction} transactionId={transaction?.$id || ''} /> : ''}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>

      </div>
    </section>
  )
}
