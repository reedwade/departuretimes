import GitHubIcon from '@mui/icons-material/GitHub';
import { Container } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ExternalLink, GithubLink } from '../components/ExternalLink';
import { PaperWithHeadline } from '../components/PaperWithHeadline';

const AboutPage = () => (
    <div>
        <PaperWithHeadline
            headline='About DepartureTimes.click'
        >
            <p>
                This is for seeing when the next few buses / trains will be near your fav stop
                (if you are in Wellington, New Zealand).
            </p>
            <p>
                I take a train from home to the Wellington CBD and back a couple of times
                a week.
                I wanted a fast one click way to see when the next few trains will be (and if
                they&apos;re running or not).
            </p>
            <p>
                The <Link href='https://www.metlink.org.nz/' target='_blank'>Metlink web site</Link> and
                app are great but do a lot more than I normally need.
            </p>
            <p>
                The <Link href='https://opendata.metlink.org.nz/' target='metlink-api'>
                    Metlink Open Data API</Link> is
                used to get stop, trip and alert information.
            </p>
            <Typography component='p' sx={{ display: 'flex', alignItems: 'center' }}>
                <GitHubIcon />
                <Link href='https://github.com/reedwade/departuretimes/' target='github' sx={{ marginLeft: 1 }}>
                    github.com/reedwade/departuretimes</Link>
            </Typography>
        </PaperWithHeadline>

        <PaperWithHeadline
            headline='Privacy'
        >
            <p>
                No trackers or cookies are in place. It's very highly unlikely this would change.
            </p>
            <p>
                Preferences (stop favs) are stored in your browser's local storage area ('on device site data').
            </p>
            <p>
                Your browser does connect to the Metlink API service to get the information you see here.
                You may want to review their privacy policy
                at <Link href='https://www.metlink.org.nz/about/legal/privacy-statement/'>
                    www.metlink.org.nz/about/legal/privacy-statement/
                </Link>
            </p>
        </PaperWithHeadline>

        <PaperWithHeadline
            headline='Known Bugs'
        >
            <dl>
                <dt>destinations button bar can be wider than the page</dt>
                <dd>
                    some stops have more destinations than fit nicely on a phone screen; need to wrap these or something
                </dd>
            </dl>
            <dl>
                <dt>too much whitespace on smaller displays</dt>
                <dd>
                    Margins should be tighter on smaller width displays.
                </dd>
            </dl>
            <dl>
                <dt>the search tool isn't smart at all</dt>
                <dd>
                    Right now, you need to already know the precise stop ID.
                    You can't type "crofton downs" and discover that you want the CROF train stop, for example.
                </dd>
            </dl>
        </PaperWithHeadline>

        <PaperWithHeadline
            headline='About Me (Reed Wade)'
        >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <div>
                    <img src='robot_reddot_r.webp' width='100' height='134' alt='a friendly stick figure robot' />
                </div>
                <div>
                    <p>
                        I'm a software developer in Wellington, New Zealand.
                    </p>
                    <p>
                        (and seeking work right now)
                    </p>
                    <p>
                        Contact and other details at <ExternalLink url='https://Kittens.nz/' />
                    </p>
                </div>
            </Stack>
        </PaperWithHeadline>

        <PaperWithHeadline
            headline='Similar Services'
        >
            <p>
                I'm not the first person to make a simplified 'where's my Wellington train/bus?' web app.
            </p>
            <dl>
                <dt>
                    <ExternalLink url='https://catchy.nz/' />
                </dt>
                <dd>
                    has a cool map view for finding stops plus a snapper balance thing
                </dd>
            </dl>
            <dl>
                <dt>
                    <ExternalLink url='https://www.missinglink.link/wellington' />
                </dt>
                <dd>
                    'A site to provide you with statistics, graphs and maps on how New Zealand's public transport services are doing, today and in the past'
                </dd>
                <dd><GithubLink path='allister-grange/missinglink' /></dd>
            </dl>
            <dl>
                <dt>
                    <ExternalLink url='https://rti-anywhere.net/' />
                </dt>
                <dd>
                    'A fast, bookmarkable app for getting RTI info for bus stops in Wellington that don't have displays.'
                </dd>
                <dd><GithubLink path='PetraOleum/RTI' /></dd>
            </dl>
        </PaperWithHeadline>

        <Container sx={{ margin: 1, padding: 1, textAlign: 'center' }}>
            v{__APP_VERSION__}-{__APP_HASH__}
        </Container>

    </div>
);

export default AboutPage;
