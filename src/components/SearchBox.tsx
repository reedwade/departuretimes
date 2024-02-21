import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, SxProps, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { composeStopURL } from '../lib/urls';

export const SearchBox = ({ sx }: { sx?: SxProps }) => {

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const submit = () => {
        // TODO: a nice way to deal with searches which aren't stop IDs
        navigate(composeStopURL(searchValue));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value.toLocaleUpperCase());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault() }}>
            <Box sx={{ ...sx, display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    placeholder='Bus or Train Stop ID...'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton onClick={submit} aria-label='search' >
                    <SearchIcon fontSize='large' />
                </IconButton>
            </Box>
        </form>
    );
};
