import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';

class HelloWorld extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>React Native module</Text>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

AppRegistry.registerComponent(Platform.OS === 'ios' ? 'MyIOSComponent': 'MyComponent', () => HelloWorld);
