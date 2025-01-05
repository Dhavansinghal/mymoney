'use client'

import { Button } from "@/components/ui/button"



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  
import { useState } from "react"
import {  returnTransactionByTransactionId } from "@/lib/action/transaction.actions"
import { convertNumberToMoney } from "@/lib/utils"



export function TransactionReturnForm({transaction,transactionId}: TransactionReturnFormProps) {

    const [IsOpen, setIsOpen] = useState(false);

    function formReturnTransaction () {
        
        return   new Promise((resolve, reject) => {
                    if(transaction){
                        
                        const result = returnTransactionByTransactionId(transaction);

                        resolve(result); 
                    }
                    else {
                        // console.log(transaction);
                        reject(transaction); 
                    }
                });
    }

    return (
        <>
            <Button className="shadcn-button bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded-lg " variant="outline" onClick={() => setIsOpen(true)} >Returned ?</Button>
            
            <AlertDialog open={IsOpen} onOpenChange={() => setIsOpen(false)}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Is this vendor returned your full amount? That is Now <b>{convertNumberToMoney(transaction?.finalAmount)}</b>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={(event) => {
							formReturnTransaction().then(() => setIsOpen(false));
							event.preventDefault();
						}} className='add-new-vendor-btn bg-bank-gradient'>Returned</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default TransactionReturnForm


