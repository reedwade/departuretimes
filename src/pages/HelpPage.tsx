import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Container from '@mui/material/Container';
import { PaperWithHeadline } from '../components/PaperWithHeadline';
import { SearchBox } from '../components/SearchBox';

const HelpPage = () => (
    <div>
        <PaperWithHeadline
            headline='Help'
        >
            <p>
                Select a bus or train stop from options on the home page. (or here)
            </p>

            <SearchBox />

            <p>
                You should then see a list of departure times from that location.
            </p>

            <img src='help-list.webp' width='290' height='417' alt='departures listing' />

            <p>
                Selecting the <FavoriteBorderIcon fontSize='small' /> button will add this stop to your favourites which
                show when you visit the home page.
            </p>

            <p>
                Click on the header to see only that stop. (Bookmark it for future use.)
            </p>

            <p>
                At the bottom of the listing click on a departure stop to show only those trips leaving from
                your selected stop to that destination. (Selecting <FavoriteBorderIcon fontSize='small' /> in
                that view will store this favorite with the selected destination.)
            </p>
        </PaperWithHeadline>

        <Container sx={{ margin: 1, padding: 1, textAlign: 'center' }}>
            v{__APP_VERSION__}-{__APP_HASH__}
        </Container>
    </div>
);

export default HelpPage;
