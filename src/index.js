import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import Layout from './components/layout/layout';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Router>
            <Provider store={store}>
                <Layout>
                    <App /> 
                </Layout>
            </Provider>
        </Router>
    </>
);
    

