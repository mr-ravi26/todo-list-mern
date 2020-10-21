
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import customHistory from '../utils/history';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      console.log("this.props.signin", this.props.signin)
      if (!this.props.signin) {
        customHistory.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  // function mapStateToProps({auth}) {
  //   return { authenticated: auth.authenticated };
  // }
  
  const mapStateToProps = (state) => {
    return {  signin: state.authState.login.data };
  }; 

  Authentication.contextTypes = {
    router: PropTypes.object
  }

  return connect(mapStateToProps)(Authentication);
}