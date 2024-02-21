import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { PaperWithHeadline } from '../components/PaperWithHeadline';

const saveSettings = (exampleValue: string | null) => {
    if (!exampleValue) {
        localStorage.removeItem('example_key');
        return;
    }
    localStorage.setItem('example_key', exampleValue);
};

const SettingsPage = () => {
    const [exampleValue, setExampleValue] = useState(localStorage.getItem('example_key'));

    return (
        <PaperWithHeadline
            headline='Settings'
        >
            <Stack direction='column' spacing={2}>
                <TextField variant='outlined'
                    label='Example' value={exampleValue || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setExampleValue(event.target.value);
                    }}
                />
                <div>
                    <Button variant='outlined' onClick={() => saveSettings(exampleValue)}>Apply</Button>
                </div>
            </Stack>
            <p>
                This isn't used right now but might be.
            </p>
        </PaperWithHeadline>
    );
};

export default SettingsPage;
