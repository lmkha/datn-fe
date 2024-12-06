import { Box } from "@mui/material";
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

export type Tab = 'Videos' | 'Users';

interface TabsProps {
    onTabChange?: (tab: Tab) => void;
}
export function MyTabs({ onTabChange }: TabsProps) {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (onTabChange) {
            const selectedTab = newValue === 0 ? 'Videos' : 'Users';
            onTabChange(selectedTab);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: 'black',
                        },
                    }}
                >
                    <Tab
                        label="Videos"
                        sx={{
                            textTransform: 'none',
                            fontSize: 'medium',
                            '&.Mui-selected': {
                                color: 'black',
                            },
                        }}
                    />
                    <Tab
                        label="Users"
                        sx={{
                            textTransform: 'none',
                            fontSize: 'medium',
                            '&.Mui-selected': {
                                color: 'black',
                            },
                        }}
                    />
                </Tabs>
            </Box>
        </Box>
    );
}

