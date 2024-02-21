import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { favsKey } from '../lib/favs';


export const FavToggle = ({ stopID, destinationID }: { stopID: string, destinationID?: string }) => {

    const key = favsKey(stopID, destinationID);

    const isSet = !!localStorage.getItem(key);

    const [isEnabled, setEnabled] = useState(isSet);

    useEffect(() => {
        setEnabled(isSet);
    }, [key, isSet]);

    const toggleFav = () => {
        if (isEnabled) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, '1');
        }
        setEnabled(!isEnabled);
    };

    return (
        <Tooltip title={isEnabled ? 'remove from favs' : 'add to favs'}>
            <IconButton sx={{ marginLeft: 3 }} onClick={toggleFav}>
                {isEnabled ? (<FavoriteIcon fontSize='large' htmlColor='red' />) : (<FavoriteBorderIcon fontSize='large' />)}
            </IconButton>
        </Tooltip>
    );
};
