import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import Link from '@mui/material/Link';
import { ReactNode } from 'react';

/**
 * Remove leading "https://" and trailing "/".
 */
export const UrlWithoutDecoration = (url: string) => (url.replace(/^https:\/\//, '').replace(/\/$/, ''));

export const ExternalLinkWithIcon = ({ url, label, target, icon }: {
    url: string,
    label?: string,
    target?: string,
    icon?: ReactNode,
}) => {
    label ||= UrlWithoutDecoration(url);
    icon ||= <LaunchOutlinedIcon />;

    // The ExternalLinkWithIcon class causes the child icon svg to get some spacing added.
    return (
        <Link className='ExternalLinkWithIcon' href={url} target={target || '_blank'} sx={{ whiteSpace: 'nowrap' }}>
            {icon}
            {label}
        </Link>
    );
};

export const ExternalLink = ({ url, label, target }: {
    url: string,
    label?: string,
    target?: string,
}) => (
    <ExternalLinkWithIcon url={url} target={target} label={label} icon={<></>} />
);

export const GithubLink = ({ path }: { path: string }) => ExternalLinkWithIcon({
    url: `https://github.com/${encodeURI(path)}/`, label: `github.com/${path}`, icon: <GitHubIcon />
});
