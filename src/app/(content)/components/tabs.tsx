import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

export type Tab = 'videos' | 'playlists' | 'liked';

interface TabsProps {
    onTabChange?: (tab: Tab) => void;
    isMyProfile?: boolean;
}

export default function MyTabs(props: TabsProps) {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (props.onTabChange) {
            const selectedTab = newValue === 0 ? 'videos' : newValue === 1 ? 'playlists' : 'liked';
            props.onTabChange(selectedTab);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
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
                        label="Playlists"
                        sx={{
                            textTransform: 'none',
                            fontSize: 'medium',
                            '&.Mui-selected': {
                                color: 'black',
                            },
                        }}
                    />
                    {props?.isMyProfile && (
                        <Tab
                            label="Liked"
                            sx={{
                                textTransform: 'none',
                                fontSize: 'medium',
                                '&.Mui-selected': {
                                    color: 'black',
                                },
                            }}
                        />
                    )}
                </Tabs>
            </Box>
        </Box>
    );
}
