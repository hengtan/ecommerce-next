import React from 'react';
import { cn } from '@/utils/cn'; // Função para mesclar classes

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                'w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300',
                className
            )}
            {...props}
        />
    );
};