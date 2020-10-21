import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    create: {
        saving: false,
        isCompleted: false,
        error: null,
        data: null,
    },
    login: {
        isCompleted: false,
        data: null,
        error: null,
        loading: false
    }
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.RESET_STATE: {
            return {
                ...state,
                create: {
                    ...state.create,
                    saving: false,
                    isCompleted: false,
                    error: null
                },
                login: {
                    ...state.user,
                    isCompleted: false,
                    error: null,
                    loading: false
                }
            };
        }
        case actionTypes.SAVE_REGISTRATION_REQEST: {
            return {
                ...state,
                create: {
                    saving: true,
                    isCompleted: false,
                    error: null,
                    data: null,
                },
                login: {
                    ...state.login,
                    isCompleted: false,
                    error: null,
                    loading: false
                }
            };
        }
        case actionTypes.SAVE_REGISTRATION_LOADED: {
            return {
                ...state,
                create: {
                    saving: false,
                    isCompleted: true,
                    error: null,
                    data: action.payload,
                },
                login: {
                    ...state.login,
                    isCompleted: false,
                    error: null,
                    loading: false
                }
            };
        }
        case actionTypes.SAVE_REGISTRATION_FAILURE: {
            return {
                ...state,
                create: {
                    saving: false,
                    isCompleted: false,
                    error: action.payload,
                    data: null,
                },
                login: {
                    ...state.login,
                    isCompleted: false,
                    error: null,
                    loading: false
                }
            };
        }
        case actionTypes.GET_LOGIN_REQEST: {
            return {
                ...state,
                login: {
                    ...state.login,
                    isCompleted: false,
                    data: null,
                    error: null,
                    loading: true
                },
                create: {
                    saving: false,
                    isCompleted: false,
                    error: null,
                    data: null,
                }

            };
        }
        case actionTypes.GET_LOGIN_LOADED: {
            let isCompleted = false;
            if (action.payload) {
                isCompleted = true
                localStorage && localStorage.removeItem("user")
                localStorage && localStorage.setItem("user", JSON.stringify(action.payload))
            }
            return {
                ...state,
                login: {
                    ...state.login,
                    isCompleted: isCompleted,
                    data: action.payload,
                    error: null,
                    loading: false
                },
                create: {
                    saving: false,
                    isCompleted: false,
                    error: null,
                    data: null,
                }
            };
        }
        case actionTypes.GET_LOGIN_FAILURE: {
            return {
                ...state,
                login: {
                    ...state.login,
                    isCompleted: false,
                    data: null,
                    error: action.payload,
                    loading: false
                },
                create: {
                    saving: false,
                    isCompleted: false,
                    error: null,
                    data: null,
                }
            };
        }

        case actionTypes.GET_LOGOUT_REQEST: {
            localStorage && localStorage.removeItem("user")
            return {
                ...state,
                login: {
                    ...state.login,
                    isCompleted: false,
                    data: null,
                    error: null,
                    loading: false
                },
                create: {
                    saving: false,
                    isCompleted: false,
                    error: null,
                    data: null,
                }
            }
        }

        default:
            return state;
    }
};

export default authReducer;