'use client';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { formatNumberToShortText } from "@/core/logic/convert";
import { Avatar, Box, Button, FormControl, Grid2, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/legacy/image";
import { get } from '@/hooks/use-local-storage';
import { CldImage } from 'next-cloudinary';
import UserAvatar from '@/core/components/avatar';

export default function StudioDashBoard() {
    const router = useRouter();

    return (
        <Stack spacing={2} sx={{
            paddingTop: 1,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8F8F8',
            position: 'relative',
        }}>
            <Grid2 container direction={'row'} spacing={1} sx={{
                width: '90%',
                borderRadius: '10px',
            }}>
                {/* Left side */}
                <Grid2 size={8}>
                    <Stack spacing={2}>
                        {/* Key metrics, contain: Video views, Likes, Comments, Shares */}
                        <Stack spacing={1} sx={{
                            backgroundColor: 'white',
                            padding: 1,
                            borderRadius: '10px',
                        }}>
                            <Stack direction="row"
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h5" fontWeight={'bold'}>Key metrics</Typography>
                                <TimeSelect />
                            </Stack>

                            {/* Video views, Likes */}
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                {/* Video views */}
                                <KeyMetricItem
                                    title="Video views"
                                    value={2552675}
                                    compareValue={532564}
                                    compareTime="Nov 8 - Nov 14"
                                />
                                {/* Likes */}
                                <KeyMetricItem
                                    title="Likes"
                                    value={121456}
                                    compareValue={45324}
                                    compareTime="Nov 8 - Nov 14"
                                />
                            </Stack>

                            {/* Comments, Shared */}
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                {/* Comment */}
                                <KeyMetricItem
                                    title="Comments"
                                    value={17342}
                                    compareValue={3256}
                                    compareTime="Nov 8 - Nov 14"
                                />
                                {/* Shared */}
                                <KeyMetricItem
                                    title="Shares"
                                    value={5426}
                                    compareValue={347}
                                    compareTime="Nov 8 - Nov 14"
                                />
                            </Stack>
                        </Stack>

                        {/* Recent post */}
                        <Stack spacing={1} sx={{
                            backgroundColor: 'white',
                            padding: 1,
                            borderRadius: '10px',
                        }}>
                            <Typography variant="h5" fontWeight={'bold'}>Recent post</Typography>
                            <RecentPost />
                            <RecentPost />
                            <RecentPost />
                            <RecentPost />
                            <RecentPost />
                            <Button variant='outlined' color='inherit'
                                sx={{
                                    textTransform: 'none',
                                }}
                                onClick={() => router.push('/studio/post')}
                            >Show all</Button>
                        </Stack>
                    </Stack>
                </Grid2>

                {/* Right side */}
                <Grid2 size={4}>
                    <Stack spacing={2}>
                        {/* Account info */}
                        <AccountInfo />

                        {/* Recent comments */}
                        <Stack spacing={1} sx={{
                            backgroundColor: 'white',
                            padding: 2,
                            borderRadius: '10px',
                        }}>
                            <Typography variant="h5" fontWeight={'bold'}>Recent comments</Typography>
                            <RecentComment />
                            <RecentComment />
                            <RecentComment />
                            <RecentComment />
                            <RecentComment />
                            <RecentComment />
                            <Button variant='outlined' color='inherit'
                                sx={{
                                    textTransform: 'none',
                                }}
                                onClick={() => router.push('/studio/comment')}
                            >Show all</Button>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </Stack>
    );
}

function TimeSelect() {
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

interface KeyMetricItemProps {
    title?: string;
    value?: number;
    compareValue?: number;
    compareTime?: string;
}

function KeyMetricItem(props: KeyMetricItemProps) {
    return (
        <Stack sx={{
            backgroundColor: 'lightgrey',
            padding: 2,
            width: '49%',
            borderRadius: '10px',

        }}>
            <Typography variant="h6" color="textSecondary">{props?.title || 'Metric'}</Typography>
            <Typography variant="h5" fontWeight={'bold'}>
                {props?.value ? formatNumberToShortText(props.value) : '0'}
            </Typography>
            <Stack direction={'row'} spacing={1}>
                <Typography>
                    {props?.compareValue ?
                        (props.compareValue > 0 ? `+${formatNumberToShortText(props.compareValue)}`
                            : formatNumberToShortText(props.compareValue))
                        : 0}
                </Typography>
                <Typography>vs.</Typography>
                <Typography>{props?.compareTime || ''}</Typography>
            </Stack>
        </Stack>
    );
}

function RecentPost() {
    return (
        <Grid2 container direction={'row'} spacing={2} sx={{
            width: '100%',
            backgroundColor: '#F8F8F8',
            borderRadius: '10px',
        }}>
            <Grid2 size={3}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Image
                        src="/images/video-image.jpg"
                        alt="Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
            </Grid2>
            <Grid2 size={9}>
                <Stack justifyContent={'space-between'} sx={{ height: '100%' }}>
                    <Typography variant="body1" fontWeight={'bold'}>How to became the best developer</Typography>
                    <Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'}>
                                <PlayArrowOutlinedIcon />
                                <Typography>125K</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <FavoriteBorderOutlinedIcon />
                                <Typography>125K</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <ChatBubbleOutlineOutlinedIcon />
                                <Typography>125K</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <ShortcutIcon />
                                <Typography>125K</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Typography>Every one</Typography>
                            <Typography>Nov 17, 2024</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid2>
        </Grid2>
    );
}

function AccountInfo() {
    const user = get<any>('user');
    return (
        <Stack spacing={1} sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: 2,
        }}>
            <Stack direction={'row'} spacing={2}>
                <UserAvatar src={user?.profilePic} size={100} />
                <Stack>
                    <Typography variant="h5" fontWeight={'bold'}>@{user?.username}</Typography>
                    <Typography variant="body1">{user?.fullName}</Typography>
                </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-evenly'}>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>{user?.followerCount}</Typography>
                    <Typography color='textSecondary'>Followers</Typography>
                </Stack>

                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>{user?.followingCount}</Typography>
                    <Typography color='textSecondary'>Following</Typography>
                </Stack>

                {/* <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' fontWeight={600}>0</Typography>
                    <Typography color='textSecondary'>Profile views</Typography>
                </Stack> */}
            </Stack>
        </Stack>
    );
}

function RecentComment() {
    return (
        <Grid2 container direction={'row'} sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#F8F8F8',
            borderRadius: '10px',
            alignItems: 'center',
        }}>
            <Grid2 size={9}>
                <Grid2 container direction={'row'} spacing={1} sx={{
                    alignItems: 'center',
                }}>
                    <Grid2 size={2}>
                        <Avatar
                            alt="Avt"
                            src="/images/avatar.png"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '1',
                                borderRadius: '50%',
                            }}
                        />
                    </Grid2>
                    <Grid2 size={10}>
                        <Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography fontWeight={'bold'}>@lmkha0201</Typography>
                                <Typography sx={{ color: '#EA284E' }}>Viewer</Typography>
                                <Typography color='textSecondary'>2h ago</Typography>
                            </Stack>
                            <Typography
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                color='textSecondary'
                            >This is the best comment in the world</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'}>
                                    <FavoriteBorderOutlinedIcon />
                                    <Typography>125K</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <Typography>19 replies</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
                <Typography
                    variant='body1'
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    How to became the best developer in the world
                </Typography>
            </Grid2>

            <Grid2 size={3} height={'100%'}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Image
                        src="/images/video-image.jpg"
                        alt="Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
            </Grid2>
        </Grid2>
    );
}
