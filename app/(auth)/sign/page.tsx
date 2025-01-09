import AuthFormPage from '@/components/AuthFormPage'
import React from 'react'

const SignPage = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthFormPage type='SignIn' />
    </section>
  )
}
export default SignPage