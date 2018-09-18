/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'clecotech.auth0.com', clientId: '9uu48oZwaep4ae7141WWsyiq9l78mgLD' });

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  loginWindow() {
   // Alert.alert('You tapped the button!');

    auth0
      .webAuth
      .authorize({ scope: 'openid profile email', audience: 'http://clecotech.auth0.com/userinfo' })
      .then(credentials =>
        console.log(credentials)
        // Successfully authenticated
        // Store the accessToken
      )
      .catch(error => console.log(error));

    // auth0
    //   .webAuth
    //   .authorize({ scope: 'aishwarya.surana@clecotech.com', audience: `http://${auth0.domain}/userinfo`, useBrowser: true })
    //   .then(credentials => {
    //     console.log(credentials)
    //     Alert.alert('You tapped the button!');
    //     // Successfully authenticated
    //     // Store the accessToken
    //   })
    //   .catch(error => console.log(error));

    // auth0
    //   .auth
    //   .passwordRealm({ username: "info@auth0.com", password: "password", realm: "myconnection" })
    //   .then(console.log)
    //   .catch(console.error);


  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>

        <Button
          title="login"
          onPress={() => this.loginWindow()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
