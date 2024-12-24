'use client';

import { InputLabel } from "@mui/material";
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from "react";

interface SelectComponentProps {
    label: string;
    options: string[];
    onChange?: (value: string) => void;
}
export default function SelectComponent(props: SelectComponentProps) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };

    return (
        <FormControl
            size="small"
            sx={{
                minWidth: 140,
                borderRadius: '10px',
                '.MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#F8F8F8',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    borderRadius: '10px',
                },
            }}
        >
            <InputLabel id={props.label}>{props.label}</InputLabel>
            <Select
                sx={{
                    borderRadius: '10px',
                    backgroundColor: '#F8F8F8',
                    '.MuiSelect-select': {
                        borderRadius: '10px',
                    },
                }}
                labelId={props.label}
                value={selectedValue}
                onChange={handleChange}
                label={props.label}
                id="order-by-select"
            >
                {props.options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                            '&.Mui-focusVisible': {
                                outline: 'none',
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}

