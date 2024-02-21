import Alert from '@mui/material/Alert';
import Box, { BoxProps } from '@mui/material/Box';


export const ErrorBox = (props: BoxProps & { error?: Error }) => {
    const error = props.error;

    if (!error) {
        return;
    }
    return (
        <Box {...props}>
            <Alert severity='error'>
                {error.message}
            </Alert>
        </Box>
    );
};
