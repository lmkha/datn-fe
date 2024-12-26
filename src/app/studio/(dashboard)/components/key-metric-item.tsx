'use client';

import { formatNumberToShortText } from "@/core/logic/format";
import { Stack, Typography } from "@mui/material";

interface KeyMetricItemProps {
    title?: string;
    value?: number;
    compareValue?: number;
    compareTime?: string;
}

export default function KeyMetricItem(props: KeyMetricItemProps) {
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
