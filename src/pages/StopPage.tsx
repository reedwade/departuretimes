import { useSearchParams } from 'react-router-dom';
import Stop from '../components/Stop';
import { SearchBox } from '../components/SearchBox';
import { PaperWithHeadline } from '../components/PaperWithHeadline';

const StopPage = () => {
      const [searchParams] = useSearchParams();
      const stopID = searchParams.get('stop');

      if (!stopID) {
            return (
                  <>
                        <SearchBox sx={{ flexGrow: 1, margin: 1 }} />
                        <PaperWithHeadline headline='no Stop ID provided'>
                              <p>Enter a bus or train stop ID in the search form above.</p>
                        </PaperWithHeadline>
                  </>
            );
      }

      return (
            <Stop
                  stopID={stopID}
                  destinationID={searchParams.get('destination') || undefined}
            />
      );
};

export default StopPage;
