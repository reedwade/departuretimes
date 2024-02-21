import { ThemeProvider, createTheme } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

const slowLinearProgress = createTheme({
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                bar: {
                    animationDuration: '30s',
                },
            },
        },
    },
});

export const SlowLinearProgress = (props: LinearProgressProps) => (
    <ThemeProvider theme={slowLinearProgress}>
        <LinearProgress {...props} />
    </ThemeProvider>
);

SlowLinearProgress.muiName = 'MuiLinearProgress';
