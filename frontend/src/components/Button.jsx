import React from 'react'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        primary: 'bg-primary text-white px-5 py-2 hover:opacity-95 focus:ring-primary/50',
        outline: 'border border-primary text-primary px-5 py-2 hover:bg-primary/5 focus:ring-primary/50'
    }

    return (
        <button
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
