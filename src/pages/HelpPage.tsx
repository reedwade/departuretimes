import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Container from '@mui/material/Container';
import { PaperWithHeadline } from '../components/PaperWithHeadline';
import { SearchBox } from '../components/SearchBox';

const HelpPage = () => (
    <div>
        <PaperWithHeadline
            headline='Help'
        >
            <h3>
                Quick Start:
            </h3>
            <p>
                Enter a bus or train stop ID in the search box on the home page and press enter or click the
                search button.
            </p>

            <SearchBox/>

            <p>
                You should then see a list of departure times from there.
            </p>

            <img src='help-list.webp' width='290' height='417' alt='departures listing' />

            <p>
                Selecting the <FavoriteBorderIcon fontSize='small' /> button will add this stop to your favourites which will
                then show anytime you visit the home page.
            </p>

            <p>
                Click on the header to see only that stop. (Bookmark it for future use.)
            </p>

            <p>
                Click on a departure stop to show only those trips leaving from your selected stop to
                that destination. (Selecting <FavoriteBorderIcon fontSize='small' /> in that view
                will store this favorite with the selected
                destination.)
            </p>
        </PaperWithHeadline>

        <Container sx={{ margin: 1, padding: 1, textAlign: 'center' }}>
            v{__APP_VERSION__}-{__APP_HASH__}
        </Container>
    </div>
);

export default HelpPage;

