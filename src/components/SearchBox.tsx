import { Autocomplete, Box, SxProps, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { composeStopURL } from '../lib/urls';

// TODO: this is 50k compressed; would be nice to avoid when it's not needed.
// Also, this doesn't load correctly when jest test runs. That's ok for now.
import STOPS from '../data/stops.json';

const numericStops = STOPS?.filter(item => !!item.id.substring(0, 1).match(/\d/));
const nonNumericStops = STOPS?.filter(item => !item.id.substring(0, 1).match(/\d/));

export const SearchBox = ({ sx, options }: { sx?: SxProps, options?: { label: string, id: string }[] }) => {
    const navigate = useNavigate();

    const onAutocompletechange = (_event: React.SyntheticEvent, value: unknown) => {
        const idFromRecord = (value as { id: string })?.id;
        if (idFromRecord) {
            navigate(composeStopURL(idFromRecord));
        }
    };

    return (
        <Box sx={{ ...sx, display: 'flex', flexWrap: 'wrap' }}>
            <Autocomplete
                sx={{ flexGrow: 1 }}
                disablePortal
                options={options || nonNumericStops || []}
                onChange={onAutocompletechange}
                renderInput={(params) => <TextField {...params} label="Pick Train Stop" />}
            />
            <Autocomplete
                sx={{ flexGrow: 1 }}
                disablePortal
                options={options || numericStops || []}
                onChange={onAutocompletechange}
                renderInput={(params) => <TextField {...params} label="Pick Bus Stop" />}
            />
        </Box>
    );
};
