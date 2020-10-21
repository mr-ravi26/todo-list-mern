import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../header';
import Footer from '../../footer';
import MasterStyled from './master.styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            paddingLeft: 0,
            paddingRight: 0,
        },
    }
}));

const Master = (props) => {
    let header = null;
    let footer = null;
    const classes = useStyles();

    return (
        <React.Fragment>
            <MasterStyled className={classes.root}>
                <Header
                    position="static"
                    appName={"To Do List"}
                />
                <CssBaseline />
                <Container maxWidth="xl" className={classes.main}>
                    {props.children}
                </Container>
                <CssBaseline />
                <Footer
                    appName={"To Do List"}
                ></Footer>

            </MasterStyled>
        </React.Fragment>
    );
}


const mapDispatchToProps = (dispath) => ({
    actions: bindActionCreators(ActionCreators, dispath)
});


export default connect(null, mapDispatchToProps)(Master);