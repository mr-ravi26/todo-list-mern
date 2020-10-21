import * as userAuthService from '../services/authService';
import * as actionTypes from './types';
import customHistory from '../../utils/history'

export const UserSignUp = (email, password) =>
    async dispatch => {
        dispatch(userRegistrationRequest());
        try {

            const user = await userAuthService.userRegistration(email, password);
            if (user && user.success) {

                let userData = {
                    token: user.token,
                    id: user.id,
                    email: user.email
                };

                dispatch(setUserAuth(userData));
                dispatch(userRegistrationLoaded(user));
                customHistory.push("/main");
            }
            else {
                dispatch(userRegistrationFailure("Unable to register at the moment, please try again later."));
            }

        } catch (error) {
            console.error(error)
            dispatch(userRegistrationFailure("An error has occured while signing up."));
        }
    }

export const signInUser = (email, password) =>
    async dispatch => {
        dispatch(loginRequest());
        try {
            const user = await userAuthService.login(email, password);

            if (user && user.success) {

                let userData = {
                    token: user.token,
                    id: user.id,
                    email: user.email
                };

                dispatch(setUserAuth(userData));
                customHistory.push("/main");
            } else {
                dispatch(loginFailure("Unable to login at the moment, please try again later."));
            }
        } catch (error) {
            console.error(error)
            dispatch(loginFailure("An error has occured while signin."));
        }
    }


export const checkSession = () =>
    async dispatch => {
        try {
            if (localStorage) {
                let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
                if (user) {
                    dispatch(setUserAuth(user));
                    customHistory.push("/main");
                }
            }
        } catch (error) {
            console.error(error)
            dispatch(loginFailure("An error has occured while signin."));

        }
    }



export const resetstate = () =>
    async dispatch => {
        dispatch(resetState());
    }

export const logout = () =>
    async dispatch => {
        customHistory.push("/");
        dispatch(logOutRequest());

    }


const logOutRequest = () => {
    return {
        type: actionTypes.GET_LOGOUT_REQEST
    }
}

const loginRequest = () => {
    return {
        type: actionTypes.GET_LOGIN_REQEST
    }
}

const resetState = () => {
    return {
        type: actionTypes.RESET_STATE,
        payload: {}
    }
}

const setUserAuth = (data) => {
    return {
        type: actionTypes.GET_LOGIN_LOADED,
        payload: data
    }
}

const loginFailure = (error) => {
    return {
        type: actionTypes.GET_LOGIN_FAILURE,
        payload: error
    }
}

const userRegistrationRequest = () => {
    return {
        type: actionTypes.SAVE_REGISTRATION_REQEST
    }
}

const userRegistrationLoaded = (data) => {
    return {
        type: actionTypes.SAVE_REGISTRATION_LOADED,
        payload: data
    }
}

const userRegistrationFailure = (error) => {
    return {
        type: actionTypes.SAVE_REGISTRATION_FAILURE,
        payload: error
    }
}