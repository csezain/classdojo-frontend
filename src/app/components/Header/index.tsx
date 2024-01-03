import React from 'react'

type Props = {
    title:string;
    description:string;
}

const Header = ({title,description}: Props) => {
  return (
    <section className='flex justify-center items-center flex-col text-center py-5 md:py-10'>
        <h1 className='text-3xl md:text-6xl font-extrabold max-w-3xl mx-auto text-foreground/90'>{title}</h1>
        <p className='text-lg md:text-2xl font-bold text-foreground/70 max-w-xl mt-5'>{description}</p>
    </section>
  )
}

export default Header