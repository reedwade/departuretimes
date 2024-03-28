import Announcement from '@mui/icons-material/Announcement';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { composeStopURL } from '../lib/urls';
import { ErrorHttp404, queryFetch } from '../metlink/api/api';
import { getServiceAlertsUrlAndHeaders } from '../metlink/api/service_alerts';
import { Departure, Destination, getStopPredictionsUrlAndHeaders } from '../metlink/api/stop_predictions';
import { prettyAimedExpected, prettyDelay } from '../metlink/view/dates';
import { ServiceAlerts, extractServiceAlertInfoForStop, tripAlertAnnotation } from '../metlink/view/service_alerts';
import { StopPredictions, destinationStopAndName, gatherUniqueDestinations } from '../metlink/view/stop_predictions';
import { Alerts } from './Alerts';
import { ErrorBox } from './ErrorBox';
import { ExternalLinkWithIcon } from './ExternalLink';
import { FavToggle } from './FavToggle';
import { PaperWithHeadline } from './PaperWithHeadline';
import { SlowLinearProgress } from './SlowLinearProgress';


const Stop = ({ stopID, destinationID }: { stopID: string, destinationID?: string }) => {
    const queryClient = useQueryClient();

    // Rerender every 10 seconds.
    const [, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => t + 1);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();


    const [showAllDepartures, setShowAllDepartures] = useState(false);

    useEffect(() => {
        setShowAllDepartures(false);
    }, [stopID, destinationID]);

    const howManyToShow = 10;

    // Look up stop predictions.

    const [stopPredictions, setStopPredictions] = useState<StopPredictions | null>(null);
    const stopPredictionsQueryKey = ['stops', stopID];

    const stopQueryResult = useQuery({
        enabled: !!stopID,
        queryKey: stopPredictionsQueryKey,
        staleTime: 60 * 1000,
        queryFn: queryFetch(getStopPredictionsUrlAndHeaders(stopID)),
    });

    // Detect completion of most recent stop predictions api fetch.
    // (fetch time has never been set OR it's older than our most recent fetch time)
    if (!stopPredictions?.fetchTime || stopPredictions.fetchTime < Math.max(stopQueryResult.dataUpdatedAt, stopQueryResult.errorUpdatedAt)) {
        if (stopQueryResult.isSuccess) {
            if (stopQueryResult.data === ErrorHttp404) {
                setStopPredictions({
                    error: new Error(`Stop ${stopID} not found`),
                    fetchTime: stopQueryResult.dataUpdatedAt,
                    departures: [],
                });
            } else {
                const stopPredictionsData = { ...(stopQueryResult.data as StopPredictions) };
                stopPredictionsData.fetchTime = stopQueryResult.dataUpdatedAt;
                stopPredictionsData.uniqueDestinations = gatherUniqueDestinations(stopPredictionsData);
                setStopPredictions(stopPredictionsData);
            }
        } else if (stopQueryResult.isError) {
            console.error('getting service stop predictions', stopQueryResult.error);
            setStopPredictions({
                error: stopQueryResult.error,
                fetchTime: stopQueryResult.errorUpdatedAt,
                departures: [],
            });
        }
    }

    const refreshStopPredictionsFetch = () => {
        queryClient.invalidateQueries({ queryKey: stopPredictionsQueryKey });
    };

    // Look up service alerts.

    const [serviceAlerts, setServiceAlerts] = useState<ServiceAlerts | null>(null);

    const serviceAlertsQueryResult = useQuery({
        queryKey: ['servicealerts'],
        staleTime: 2 * 60 * 1000,
        queryFn: queryFetch(getServiceAlertsUrlAndHeaders()),
    });

    // Detect completion of most recent service alerts api fetch.
    if (!serviceAlerts?.fetchTime ||
        serviceAlerts.fetchTime < Math.max(serviceAlertsQueryResult.dataUpdatedAt, serviceAlertsQueryResult.errorUpdatedAt)) {

        if (serviceAlertsQueryResult.isSuccess) {
            const serviceAlertsData = {
                ...(serviceAlertsQueryResult.data as ServiceAlerts),
                fetchTime: serviceAlertsQueryResult.dataUpdatedAt,
            };
            serviceAlertsData.alertSummaries = extractServiceAlertInfoForStop(serviceAlertsData, stopID, destinationID);

            setServiceAlerts(serviceAlertsData);

        } else if (serviceAlertsQueryResult.isError) {
            const serviceAlertsData = {
                ...(serviceAlertsQueryResult.data as ServiceAlerts),
                fetchTime: serviceAlertsQueryResult.errorUpdatedAt,
                error: serviceAlertsQueryResult.error,
            };
            setServiceAlerts(serviceAlertsData);
            console.error('getting servicealerts', serviceAlertsData.error);
        }
    }


    if (!stopID) {
        // Shouldn't happen but just in case.
        return (
            <PaperWithHeadline headline='no Stop ID provided'>
                <p>Enter a bus or train stop ID in the search form above.</p>
            </PaperWithHeadline>
        );
    }


    const handleDestinationChange = (
        event: React.MouseEvent<HTMLElement>,
        newDestination: string,
    ) => {
        if (!newDestination) {
            return;
        }
        navigate(composeStopURL(stopID, newDestination));
    };

    const destButtons = (
        <ToggleButtonGroup
            value={destinationID || '_'}
            exclusive
            onChange={handleDestinationChange}
            aria-label='destination selection'
        >
            <ToggleButton value='_' aria-label='All Destinations' key='_'>
                ALL Destinations
            </ToggleButton>
            {
                stopPredictions?.uniqueDestinations?.map((destination: Destination) => {
                    return (
                        <ToggleButton value={destination.stop_id} key={destination.stop_id}>
                            to {destination.stop_id} {isNumeric(destination.stop_id) ? destination.name : ''}
                        </ToggleButton>
                    );
                })
            }
        </ToggleButtonGroup>
    );

    const now = new Date().getTime();

    const departuresList = stopPredictions ?
        stopPredictions.departures?.
            filter((departure: Departure) => (!destinationID || departure.destination.stop_id === destinationID))
            .map((departure: Departure, index: number) => {
                const tripAlert = tripAlertAnnotation(departure.trip_id, serviceAlerts?.alertSummaries);
                return (
                    <Box
                        key={`${departure.trip_id}-${departure.vehicle_id}`}
                        sx={{ display: 'flex', alignItems: 'center', fontSize: (index < 3 ? '200%' : 'inherit'), fontFamily: 'monospace' }}
                    >
                        {!destinationID ? `to ${destinationStopAndName(departure.destination)} - ` : ''}
                        {' '}{prettyAimedExpected(departure.departure, now)}
                        {' '}{prettyDelay(departure.delay)}
                        {' '}{departure.monitored ? (<GpsFixedIcon color='success' sx={{ marginX: 1 }} />) : ''}
                        {' '}{tripAlert ? (<><Announcement color='warning' sx={{ marginX: 1 }} />{tripAlert}</>) : ''}
                    </Box>
                );
            })
        :
        undefined
        ;

    const headline = (
        <Typography variant='h6' component='h2' sx={{ display: 'flex', alignItems: 'center', marginX: 2 }}>
            <NavLink className='navlink' to={composeStopURL(stopID, destinationID)}>
                Stop {stopID} {destinationID ? `(to ${destinationID})` : ''}
            </NavLink>
            <FavToggle stopID={stopID} destinationID={destinationID} />
            <Tooltip title='refresh'>
                {/* This enclosing <span> is needed to please the Tooltip when button is disabled. */}
                <span>
                    <IconButton
                        onClick={refreshStopPredictionsFetch}
                        disabled={stopQueryResult.isPending || stopQueryResult.isFetching}
                        aria-label='refresh stop predictions'
                    ><RefreshIcon fontSize='large' />
                    </IconButton>
                </span>
            </Tooltip>
        </Typography>
    );

    const departuresListBox = (
        <Box margin={1} display={departuresList?.length ? '' : 'none'}>
            {departuresList?.slice(0, howManyToShow)}
            {showAllDepartures ?
                <>
                    {departuresList?.slice(howManyToShow)}
                    <Button onClick={() => setShowAllDepartures(false)}>Show fewer</Button>
                </>
                :
                <Button
                    onClick={() => setShowAllDepartures(true)}
                    disabled={departuresList && departuresList.length <= howManyToShow}
                >Show more</Button>
            }
        </Box>

    );

    return (
        <Paper elevation={3} sx={{ margin: 3 }}>
            {headline}

            <Divider />

            <Box margin={1} display={stopQueryResult.isPending || stopQueryResult.isFetching ? '' : 'none'}>
                { }
                <SlowLinearProgress />
            </Box>

            <ErrorBox error={stopPredictions?.error} margin={1} />

            <Box display={stopPredictions?.departures ? '' : 'none'}>

                {departuresListBox}

                <Divider />

                <Box margin={1}>
                    {destButtons}
                </Box>

                <Divider />

                <Alerts alertSummaries={serviceAlerts?.alertSummaries} separator={<Divider />} />
            </Box>

            <Box margin={1}>
                <ExternalLinkWithIcon target='metlink' url={'https://www.metlink.org.nz/stop/' + encodeURIComponent(stopID)} />
            </Box>
        </Paper>
    );
};

export default Stop;

const isNumeric = (value: string): boolean => {
    return (value !== '' && !isNaN(+value));
};
