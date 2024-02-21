import Announcement from '@mui/icons-material/Announcement';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { alertDates } from '../metlink/view/dates';
import { AlertSummary } from '../metlink/view/service_alerts';
import { ExternalLinkWithIcon } from './ExternalLink';

// The default styling has a 12px top and bottom margin for AccordionSummary.
const shorterAccordionSummary = createTheme({
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                content: {
                    margin: 0,
                },
            },
        },
    },
});

export const AlertComponent = (alertSummary: AlertSummary) => {

    const show_image = alertSummary.image ? (
        <Typography variant='body1' component='div'>
            <ExternalLinkWithIcon
                url={alertSummary.image}
                label={alertSummary.image_alternative_text || 'show image'}
                icon={<ImageOutlinedIcon />}
            />
        </Typography>
    ) : '';

    const more_info = alertSummary.url ? (
        <Typography variant='body1' component='div' >
            <ExternalLinkWithIcon
                url={alertSummary.url}
                label='Alert details'
                icon={alertSummary.pdf ? (<PictureAsPdfOutlinedIcon />) : undefined}
            />
        </Typography>
    ) : '';

    return (
        <Box key={alertSummary.id} marginY={1}>
            <Typography variant='h6' component='h6' sx={{ display: 'flex', alignItems: 'center' }}>
                <AnnouncementOutlinedIcon color='warning' sx={{ marginRight: 1 }} />
                [{alertDates(alertSummary)}] {alertSummary.header}
            </Typography>
            <Typography variant='body1' component='p'>
                {alertSummary.description}
                {' '}({alertSummary.id})
            </Typography>
            {show_image}
            {more_info}
        </Box>
    )
};

export const AlertsList = ({ alertSummaries, label, expanded }: {
    alertSummaries: AlertSummary[],
    label: string,
    expanded?: boolean,
}) => {

    if (!alertSummaries || alertSummaries.length === 0) {
        return (
            <Box
                sx={{ display: 'flex', alignItems: 'center', margin: 1 }}
            >
                <CheckIcon color='success' sx={{ marginRight: 1 }} />
                No Alerts {label}
            </Box>
        );
    }

    return (
        <ThemeProvider theme={shorterAccordionSummary}>
            <Accordion defaultExpanded={expanded} disableGutters>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant='h6' component='h4' sx={{ display: 'flex', alignItems: 'center', marginX: 2 }}>
                        <Badge badgeContent={alertSummaries.length} color='info' sx={{ marginRight: 3 }}><Announcement color='warning' /></Badge>
                        {'  '}{label}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider flexItem />
                    <Stack marginLeft={3} divider={<Divider flexItem />}>
                        {alertSummaries.map(AlertComponent)}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </ThemeProvider>
    )
};
