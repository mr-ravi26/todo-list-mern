import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FooterStyled from './footer.styles';
import _ from 'lodash';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    footerText: {
        color: "#fff",
        display: "inline",
        cursor: "pointer",
        textDecoration: "none"
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: theme.palette.primary.main
    },
    
}));

function Copyright() {
    const classes = useStyles();
    return (
        <div className="footer-copyright">
            <a href="https://ravi.ind.in" target="_blank" className={classes.footerText}>
                To do App Test.
            </a>
        </div >
    );
}


export default function Footer(props) {
    const classes = useStyles();
    let lgWidth = 2;
    let mdWidth = 3;
    let smWidth = 4;
    let xsWidth = 6;
    return (
        <FooterStyled className={classes.footer}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Copyright />
                </Grid>
        </FooterStyled >
    );
}