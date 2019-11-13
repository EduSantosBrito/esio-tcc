import React from 'react';
import { TextField } from '@material-ui/core';

type InputProps = {
    label: string;
    value: any;
    variant: any;
    autoComplete?: string;
    type: string;
    onChange: any;
    name?: string;
    disabled?: boolean;
}

function Input({
    label,
    value,
    variant,
    autoComplete,
    type,
    onChange,
    name,
    disabled,
}: InputProps) {
    return (
        <TextField
            label={label}
            value={value}
            variant={variant}
            autoComplete={autoComplete}
            type={type}
            onChange={onChange}
            name={name}
            disabled={disabled}
        />
    );
}

export default Input;
