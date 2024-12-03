import { formatNumberToShortText } from "@/core/logic/convert";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";

interface AuthorInfoProps {
    user: any;
}
export default function AuthorInfoComponent(props: AuthorInfoProps) {
    return (
        <>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                {props.user?.profilePic ?
                    (<Box sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <CldImage
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                            }}
                            src={props.user.profilePic}
                            alt="Image"
                        />
                    </Box>) :
                    (<Avatar
                        src="/images/avatar.png"
                        alt="avatar"
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />)}
                <Stack>
                    <Typography variant="body1" fontWeight={'bold'}>{props.user?.username || 'username'}</Typography>
                    <Typography variant="body2">{props.user?.fullName || 'Full Name'}</Typography>
                    <Typography variant="body2" color='textSecondary'>{props.user?.followerCount ? formatNumberToShortText(props.user?.followerCount) : '0'} followers</Typography>
                </Stack>
            </Stack>
        </>
    )
}
