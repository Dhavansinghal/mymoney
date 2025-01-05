import { getLoggedInUser } from '@/lib/action/user.action';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getLoggedInUser();
  
  if(!user) redirect('/sign-in');
  
  return (
   <main className="flex h-screen w-full font-inter">
      {children}
   </main>
  );
}
