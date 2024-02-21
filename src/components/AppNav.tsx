import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, useRoutes } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import HelpPage from '../pages/HelpPage';
import HomePage from '../pages/HomePage';
import StopPage from '../pages/StopPage';

export const NotFound = () => (
    <main>
        <div>
            Page Not Found
        </div>
    </main>
);

export const AppRoutes = () => {
    const element = useRoutes([
        { path: '/', element: <HomePage /> },
        // { path: '/settings', element: <SettingsPage /> },
        { path: '/help', element: <HelpPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/stop', element: <StopPage /> },
        { path: '*', element: <NotFound /> }
    ]);
    return element;
};

export const AppNavBar = () => {
    return (
        <nav>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar component='nav' sx={{ flexWrap: 'wrap' }}>
                        <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
                            <NavLink className='navlink' to='/' >
                                DepartureTimes.click
                            </NavLink>
                        </Typography>
                        <NavLink className='navlink' to='/help'>
                            <Button color='inherit' aria-label='Help Page'><HelpOutlineOutlinedIcon /></Button>
                        </NavLink>
                        {/* <NavLink className='navlink' to='/settings'>
              <Button color='inherit'><SettingsIcon></SettingsIcon></Button>
            </NavLink> */}
                        <NavLink className='navlink' to='/about' aria-label='About Page'>
                            <Button color='inherit'>About</Button>
                        </NavLink>
                    </Toolbar>
                </AppBar>
            </Box>
        </nav>
    );
};
