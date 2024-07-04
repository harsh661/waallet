'use client';

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()
    return (
        <>
            <h1 className="max-w-2xl lg:text-center mono-font text-4xl md:text-5xl lg:text-7xl font-semibold mb-10 relative z-10">Know where your <br /> <span id="underline">money</span> is going</h1>
            <p className="text-sm md:text-lg py-5 sm:max-w-xl sm:px-10 md:text-center relative z-10">Track how you&apos;re spending every penny, identify unwanted subscriptions, and discover trends in your spending to figure out how to improve.</p>
            <Button
                variant="outline"
                size="lg"
                className="relative z-10 font-semibold border-2 text-lg mt-5 lg:mt-10 group"
                onClick={() => router.push('/dashboard')}
            >
                Join Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-2 duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </Button>
        </>
    )
}

export default Hero