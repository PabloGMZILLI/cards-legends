import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    classContainerName?: string;
};