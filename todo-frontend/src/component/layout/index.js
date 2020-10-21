import React from 'react';
import Master from './default/master';

const Layout = (props) => {
    return (
        <Master >
            {props.children}
        </Master>
    );
}

export default Layout;