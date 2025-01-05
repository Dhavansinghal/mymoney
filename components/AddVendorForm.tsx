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
import { addVendor } from '@/lib/action/vendor.actions'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema =  z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    usercode: z.string().min(3, {
        message: "usercode must be at least 3 characters.",
    }),
    mobilenumber: z.string().min(10, {
        message: "Mobile number must be at least 10 characters.",
    })
})



export function AddVendorForm({user}:any) {

    const [IsOpen, setIsOpen] = useState(false);
    const [IsLoading,setIsLoading] = useState(false);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username:'',
            usercode:'',
            mobilenumber:''
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>){
        setIsLoading(true);

        try{
            const userData = {
                username: data.username!,
                usercode: data.usercode!,
                mobilenumber: data.mobilenumber,
                userId: user.userId
            }
            const newUser = await addVendor(userData);
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
            <Button className='add-new-vendor-btn ml-5 bg-bank-gradient' onClick={() => setIsOpen(true)} variant="outline">Add New Vendor</Button>
            
            <Dialog open={IsOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                    <DialogTitle>Add Vendor Profile</DialogTitle>
                    <DialogDescription>
                        Add a new vendor in the list.
                    </DialogDescription>
                    </DialogHeader>
                        <div className="grid gap-4 py-4 bg-blue">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">Username</Label>
                                        <FormField 
                                            control={form.control}
                                            name='username'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input placeholder='Please Enter vendor Name' {...field} />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="usercode" className="text-right">Usercode</Label>
                                        <FormField 
                                            control={form.control}
                                            name='usercode'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input placeholder='Please Enter vendor Code' {...field} />
                                                    </FormControl>
                                                    <FormMessage /> 
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="mobilenumber" className="text-right">Mobile Number</Label>
                                        <FormField 
                                            control={form.control}
                                            name='mobilenumber'
                                            render={({field}) =>(
                                                <FormItem className="col-span-3">
                                                    <FormControl>
                                                        <Input placeholder='Please Enter vendor  Mobile Number' {...field} />
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
                                                : 'Add New Vendor'
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

export default AddVendorForm


