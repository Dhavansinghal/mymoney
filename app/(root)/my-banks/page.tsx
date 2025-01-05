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

import Link from 'next/link';

import AddVendorForm from '@/components/AddVendorForm';
import { getLoggedInUser } from '@/lib/action/user.action';
import { redirect } from 'next/navigation';
import { getVendors } from '@/lib/action/vendor.actions';


export default async function MyBanks () {
  
  const appwriteItemId = 456;

  const user = await getLoggedInUser();
  const vendors = await getVendors({userId: user?.userId});

  if(!user) redirect('/sign-in');

  return (
    <section className='home'>
      <div className='home-content'>

        <header className='flex items-center justify-between' >
            <h2 className='recent-transactions-label'>Vendors</h2>
            <div>
              <AddVendorForm user={user}  />

              <Link href={`/transactions/?id=${appwriteItemId}`} className='view-all-btn ml-5'>
                  View All
              </Link>
            </div>
        </header>

        <Table>
          <TableCaption>A list of your recent Vendors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Usercode</TableHead>
              <TableHead>UserName</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead className="text-right">Created Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors!.map((vendor:any, index:string) => (
              <TableRow key={index} >
                <TableCell className="font-medium">{vendor.usercode}</TableCell>
                <TableCell>{vendor.username}</TableCell>
                <TableCell>{vendor.mobilenumber}</TableCell>
                <TableCell className="text-right">{vendor.CreatedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </section>
  )
}