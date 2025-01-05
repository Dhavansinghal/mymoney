import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {z} from 'zod'
import { Control, FieldPath} from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('SignUp');

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    type: string
}
const CustomInput = ({control, name,label,placeholder,type}: CustomInputProps) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>{label}</FormLabel>
                <div className='flex w-full'>
                    <FormControl>
                        <Input id={name} type={type==='password' ? 'password':'text'} placeholder={placeholder} className='input-class' {...field} />
                    </FormControl>
                    <FormMessage className='form-message mt-2' /> 
                </div>
            </div>
        )}
    />
  )
}

export default CustomInput