import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

import { fade, makeStyles } from '@material-ui/core/styles';
import HeaderStyled from './header.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const useStyles = makeStyles(theme => ({

}));

const Header = (props) => {

    useEffect(() => {
        props.actions.checkSession();
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAuthClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleLogOut = () => {
        props.actions.logout();
        setAnchorEl(null);
    }

    const auth_state = useSelector(storeState => storeState.authState.login);

    return (
        <HeaderStyled>
            <HideOnScroll {...props}>
                <AppBar className={classes.appBar + ' app-bar-header'}>
                    <Toolbar className="app-bar-toolbar">
                        <a href="https://ravi.ind.in" target="_blank" style={{ textDecoration: 'none', color: 'white', 'cursor': 'pointer' }}>
                            <Typography
                                className={classes.title}
                                variant="h6"
                                noWrap
                            >
                                {props.appName} by Ravi B.
                            </Typography>
                        </a>
                        <div className='grow' />
                        <div className={classes.sectionDesktop}>
                            {
                                _.map(props.links, ({ url, name, icon_image }, index) => {
                                    return (
                                        <Link key={index} href={url}>
                                            <MenuItem
                                                className="app-bar-header-menu"
                                                value={name}
                                                key={index}
                                            >
                                                {name}
                                            </MenuItem>
                                        </Link>

                                    );
                                })
                            }

                            {auth_state && auth_state.data && auth_state.data.id
                                &&
                                <MenuItem
                                    className="app-bar-header-menu"
                                    value={'signup'}
                                    key={'signup'}
                                    onClick={handleAuthClick}
                                >
                                    {auth_state.data.name ? auth_state.data.name : auth_state.data.email}
                                </MenuItem>
                            }
                            <Menu
                                id="auth-menu"
                                className="app-bar-header-menu-2"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                            >
                                <MenuItem className="app-bar-header-menu" onClick={handleLogOut}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </HeaderStyled >
    );
}

const mapDispatchToProps = (dispath) => ({
    actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(null, mapDispatchToProps)(Header);