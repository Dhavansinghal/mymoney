// import React from 'react'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
// import { formatAmount, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils'
  
// const TransactionTable = ({transactions}: TransactionTableProps) => {
//     const transactionsA = transactions ? transactions : [];

//   return (
//     <Table>
//       <TableCaption>A list of your recent Transactions.</TableCaption>
//       <TableHeader className='bg-[#f9fafb]'>
//         <TableRow>
//           <TableHead className="px2">Transaction</TableHead>
//           <TableHead className="px2">Amount</TableHead>
//           <TableHead className="px2">Status</TableHead>
//           <TableHead className="px2">Date</TableHead>
//           <TableHead className="px2 max-md:hidden">Channel</TableHead>
//           <TableHead className="px2 max-md:hidden">Category</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {transactionsA.map((t: Transaction) => {
//             const status = getTransactionStatus(new Date(t.date));
//             const amount = formatAmount(t.amount);
//             const isDebit = t.type === "debit";
//             const isCredent = t.type === "credit";

//             return (
//                 <TableRow key={t.id}>
//                     <TableCell className="font-medium"> {removeSpecialCharacters(t.name)}</TableCell>
//                     <TableCell>{t.date}</TableCell>
//                     <TableCell>{t.date}</TableCell>
//                     <TableCell className="text-right">{t.date}</TableCell>
//                 </TableRow>
//             )
//         })}
//       </TableBody>
//     </Table>

//   )
// }

// export default TransactionTable