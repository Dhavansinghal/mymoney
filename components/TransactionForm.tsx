'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { addTransaction } from "@/lib/action/transaction.actions"

const formSchema =  z.object({
    vendorId: z.string().min(1,{
        message: "Select Vendor Plasee",
    }),
    gold: z.number().min(1, {
        message:"Please provide the Gold.",
    }),
    silver: z.number().min(1, {
        message: "Please provide the Silver.",
    }),
    rentDate: z.string().min(1, {
        message: "Please provide the Rent Date.",
    }),
    rentMoney: z.number().min(1,{
        message: "Please provide the amount.",
    }),
    interestRate: z.number().min(1,{
        message: "Please provide the Interest Rate.",
    }),
})



export function TransactionForm({user,vendors}:any) {

    const [IsOpen, setIsOpen] = useState(false);
    const [IsLoading,setIsLoading] = useState(false);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            vendorId:'',
            gold:0,
            silver:0,
            rentMoney:0,
            rentDate: '',
            interestRate: 0.0
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>){
        setIsLoading(true);

        try{
            const userData = {
                vendorId: data.vendorId!,
                gold: data.gold!,
                silver: data.silver,
                rentMoney: data.rentMoney!,
                rentDate: data.rentDate!,
                interestRate: data.interestRate!,
                userId: user.userId
            }
            const newTransaction = await addTransaction(userData);
            
        }
        catch (error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <>
            <Button className='add-new-vendor-btn ml-5 bg-bank-gradient' onClick={() => setIsOpen(true)} variant="outline">Give Money</Button>
            
            <Dialog open={IsOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Add a new transaction in the list.
                    </DialogDescription>
                    </DialogHeader>
                        <div className="grid gap-4 py-4 bg-blue">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="vendorId" className="text-right">Vendor </Label>
                                        <FormField
                                            control={form.control}
                                            name="vendorId"
                                            render={({ field }) =>(
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Select  value={field.value} onValueChange={field.onChange} >
                                                        <SelectTrigger>
                                                         <SelectValue placeholder={field.value || "Vendor Select"} /> 
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white">
                                                            {vendors.map((vendor:any) => (
                                                                <SelectItem key={vendor.usercode} value={vendor.usercode}>{vendor.username} ({vendor.usercode})</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="gold" className="text-right">Gold Taken</Label>
                                        <FormField 
                                            control={form.control}
                                            name='gold'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input type="number" placeholder='Please Enter Gold in Gm' {...field}  onChange={(e) => e.target.value =='' ? field.onChange(e.target.value) :  field.onChange(Number(e.target.value))} />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="silver" className="text-right">Silver Taken</Label>
                                        <FormField 
                                            control={form.control}
                                            name='silver'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input type="number"   placeholder='Please Enter Silver in Gm' {...field} onChange={(e) => e.target.value =='' ? field.onChange(e.target.value) :  field.onChange(Number(e.target.value))}   />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="rentMoney" className="text-right">Rent Money</Label>
                                        <FormField 
                                            control={form.control}
                                            name='rentMoney'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input type="number" placeholder='Please Enter Amount' {...field} onChange={(e) => e.target.value =='' ? field.onChange(e.target.value) :  field.onChange(Number(e.target.value))}  />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="interestRate" className="text-right">Interest Rate</Label>
                                        <FormField 
                                            control={form.control}
                                            name='interestRate'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input type="number" placeholder='Please Enter Interest Rate' {...field} onChange={(e) => e.target.value =='' ? field.onChange(e.target.value) :  field.onChange(Number(e.target.value))}  />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="rentDate" className="text-right">Given On</Label>
                                        <FormField 
                                            control={form.control}
                                            name='rentDate'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input type='date' placeholder='Please Enter Date' {...field} />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid items-right gap-4">
                                        <Button type='submit' disabled={IsLoading} className='add-new-vendor-btn bg-bank-gradient'>
                                            {IsLoading ? 
                                                    <>
                                                        <Loader2 
                                                            size={20}
                                                            className='animate-spin'
                                                        /> &nbsp;
                                                        Loading...
                                                    </>
                                                : 'Add New Transaction'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TransactionForm


