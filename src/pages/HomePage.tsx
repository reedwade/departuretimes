import { SearchBox } from '../components/SearchBox';
import Stop from '../components/Stop';
import { getFavs } from '../lib/favs';
import HelpPage from './HelpPage';

const HomePage = () => {
    const allStops = getFavs().map(
        (value) => <Stop stopID={value.stopID} destinationID={value.destinationID} key={value.key} />
    );
    return (
        <>
            <SearchBox sx={{ flexGrow: 1, margin: 1 }} />
            {allStops.length ? allStops : <HelpPage />}
        </>
    );
};

export default HomePage;
