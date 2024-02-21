import { AlertSummary } from '../metlink/view/service_alerts';
import { AlertsList } from './AlertsList';


export const Alerts = ({ alertSummaries, separator }: { alertSummaries?: AlertSummary[], separator: React.ReactNode }) => {

    const alertsToday = alertSummaries?.filter(alertInfo => alertInfo.is_today);
    const alertsFuture = alertSummaries?.filter(alertInfo => !alertInfo.is_today);
    return <>
        <AlertsList alertSummaries={alertsToday || []} label='Today' expanded />
        {separator}
        <AlertsList alertSummaries={alertsFuture || []} label='Upcoming' />
    </>;
}

