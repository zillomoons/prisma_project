import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-purple-400 min-h-screen min-w-screen'>
      <div className='grid grid-cols-12 pt-24 gap-x-5 h-screen w-screen relative z-50'>
        <div className='col-start-4 col-span-6 flex flex-col gap-5 text-white font-bold'>
          {children}
        </div>
      </div>
    </div>
  );
}
