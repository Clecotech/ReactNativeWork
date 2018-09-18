import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home'
import Description from './components/description'

import { connect } from 'react-redux';

class Main extends Component {

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} title="Home" initial />
                    <Scene key="description" component={Description} title="Description" />
                </Scene>
            </Router>
        );
    }
}

//Connect everything
export default Main;
