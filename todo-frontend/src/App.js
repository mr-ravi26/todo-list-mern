import React from 'react';
import './App.css';
import Layout from './component/layout'
function App(props) {
  return (
    <Layout>
      {props.children}
    </Layout>
  );
}

export default App;
