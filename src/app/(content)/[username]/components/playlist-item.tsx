'use client';

import { Box, Grid2, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import Image from "next/legacy/image";
import VideosModal from "./videos-modal";
import { useState } from "react";

interface PlaylistItemProps {
    playlist?: any;
    username?: string;
}

interface State {
    openVideosModal?: boolean;
}

export default function PlaylistItem(props: PlaylistItemProps) {
    const [state, setState] = useState<State>();
    return (
        <>
            <Grid2
                size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 6,
                }}
                sx={{
                    height: 100,
                    backgroundColor: 'lightgray',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    padding: 1,
                    cursor: 'pointer',
                }}
                onClick={() => setState({ openVideosModal: true })}
            >
                <Grid2 container direction={'row'} sx={{
                    width: '100%',
                    height: '100%',
                }}>
                    <Grid2 size={8} sx={{
                        height: '100%',
                    }}>
                        <Stack>
                            <Typography
                                variant={'h6'}
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {props.playlist?.name}
                            </Typography>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'gray',
                                }}
                            >
                                {props.playlist?.description}
                            </Typography>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'black',
                                }}
                            >
                                {props.playlist?.videoIdsList.length} videos
                            </Typography>
                        </Stack>
                    </Grid2>
                    <Grid2 size={4} sx={{
                        height: '100%',
                    }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            {props.playlist?.pictureUrl ? (
                                <CldImage
                                    fill={true}
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    src={props?.playlist?.pictureUrl}
                                    alt="Image"
                                />
                            ) : (
                                <Image
                                    width={100}
                                    height={100}
                                    src="/images/playlist.png"
                                    alt="avatar"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />

                            )}
                        </Box>

                    </Grid2>
                </Grid2>
            </Grid2>
            <VideosModal
                open={state?.openVideosModal || false}
                onClose={() => setState({ openVideosModal: false })}
                playlistName={props.playlist?.name}
                videoIds={props.playlist?.videoIdsList}
                username={props.username}
            />
        </>
    );
}
