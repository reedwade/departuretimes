import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export const PaperWithHeadline = ({ headline, children }: { headline?: ReactNode, children?: ReactNode }) => (
    <Paper sx={{ margin: 3, padding: 3 }}>
        <Typography variant='h6' component='h2' sx={{ display: 'flex', alignItems: 'center' }}>
            {headline}
        </Typography>
        <Typography variant='body1' component='div' sx={{ padding: 2 }}>
            {children}
        </Typography>
    </Paper>
);
