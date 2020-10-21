import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'

import { LoadingOverlay, Loader } from 'react-overlay-loader';
import CircularProgress from '@material-ui/core/CircularProgress';

import {ValidateEmail, ValidatePassword} from '../../utils/validation';
import Divider from '@material-ui/core/Divider';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { ActionCreators } from '../../redux/actions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';


const styles = theme => ({
    margin: {
        margin: theme.spacing()  * 2,
    },
    padding: {
        padding: theme.spacing() * 2,
        width: '35%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        }
    }
});

class LoginTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          isSignUp: false,
          required: {
            email: false,
            password: false,
          },
        };
      }


    handleTextChange = (key) => event => {

        let inValidData = false;
        if (!ValidateEmail(event.target.value)) {
            inValidData = true;
        }

        this.setState({
            ...this.state,
            [key]: event.target.value,
            required: {
                ...this.state.required,
                [key]: inValidData
            }
        });
    };

    authenticateUser = () => {
        if (this.state.isSignUp) {
            this.props.actions.UserSignUp(this.state.email, this.state.password);
        }
        else {
            this.props.actions.signInUser(this.state.email, this.state.password);
        }
    }

    handlePasswordChange = (key) => event => {

        let inValidData = false;
        if (!ValidatePassword(event.target.value, this.state.isSignUp)) {
            inValidData = true;
        }

        this.setState({
            ...this.state,
            [key]: event.target.value,
            required: {
                ...this.state.required,
                [key]: inValidData
            }
        });
    };
    
    render() {
        const { classes } = this.props;
        const { email, password, required } = this.state;
        return (
            <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            >
            <Paper className={classes.padding}>
            <LoadingOverlay>
                <div className={classes.margin}>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>

                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            label="Email" 
                            type="email" 
                            fullWidth 
                            autoFocus  
                            value={email}
                            error={required.email}
                            onChange={ this.handleTextChange('email')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">

                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            label="Password" 
                            type="password" 
                            fullWidth  
                            value={password}
                            error={required.password}
                            helperText={this.state.isSignUp && "Min 8 characters required"}
                            onChange={ this.handlePasswordChange('password')}
                        />
                        </Grid>
                    </Grid>


                    
                    <Grid container justify="center" style={{ marginTop: '20px' }}>
                        <Button 
                        variant="outlined" 
                        color="primary" 
                        style={{ textTransform: "none" }}
                        onClick={() => this.authenticateUser()}
                    
                        >{
                            this.state.isSignUp ? "Sign Up" : "Sign In"
                        }</Button>
                    </Grid>

                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Divider />
                    </Grid>

                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button 
                            disableFocusRipple 
                            disableRipple 
                            style={{ textTransform: "none" }} 
                            variant="text" color="primary"
                            onClick={() => this.setState({isSignUp: !this.state.isSignUp})}
                            >{
                                this.state.isSignUp ? "Already registered, click sign in" : "Trying New Email, Click to sign up"
                            }
                        </Button>
                    </Grid>
                   {this.props.signin.error  && <Grid container justify="center" style={{ marginTop: '10px' }}>
                        {this.props.signin.error && <Alert severity="warning">{this.props.signin.error}</Alert>}
                    </Grid> 
                    }
                    {this.props.signup.error && <Grid container justify="center" style={{ marginTop: '10px' }}>
                            {this.props.signup.error && <Alert severity="error">{this.props.signup.error}</Alert>}
                        </Grid> 
                    }
                </div>
                {
                  this.props.signin.loading || this.props.signup.saving &&
                  <CircularProgress style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-25px',
                    marginLeft: '-12px'
                  }} />
                }
                <Loader loading={this.props.Loading} text="" />
              </LoadingOverlay>
            </Paper>
            </Grid>
        );
    }
}


const mapDispatchToProps = (dispath) => ({
    actions: bindActionCreators(ActionCreators, dispath)
});

const mapStateToProps = (state) => ({
    signin: state.authState.login,
    signup: state.authState.create
}); 


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginTab);