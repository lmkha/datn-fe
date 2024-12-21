'use client';

import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export default function TimeSelect() {
    const [selectedTime, setSelectedTime] = useState('Today'); // Giá trị mặc định là 'Today'

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedTime(event.target.value);
    };

    return (
        <Box sx={{ width: '30%' }}> {/* Đảm bảo Box mở rộng theo chiều ngang */}
            <FormControl fullWidth>
                <Select
                    size="small"
                    value={selectedTime}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Time period selection' }} // Đặt accessible name
                    sx={{
                        border: '1px solid lightgray',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                    }}
                >
                    <MenuItem value="Today">Today</MenuItem>
                    <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                    <MenuItem value="Last month">Last month</MenuItem>
                    <MenuItem value="Last 3 months">Last 3 months</MenuItem>
                    <MenuItem value="Last 6 months">Last 6 months</MenuItem>
                    <MenuItem value="Last year">Last year</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}