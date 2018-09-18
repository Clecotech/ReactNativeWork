import React, { Component, PropTypes } from 'react';

import { fetchPostsDescriptionWithRedux } from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Body, CardItem, Card, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";

import { StyleSheet, Dimensions, Image, View, TouchableHighlight, ActivityIndicator } from 'react-native'
import * as ReduxActions from '../actions'; //Import your actions
import HTML from 'react-native-render-html';

import { Actions } from 'react-native-router-flux'

class Description extends Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this);
        this.state={
            imageLoading:true
        }
    }

    ImageLoading_Error() {

        this.setState({ imageLoading: false });

        // Write Your Code Here Which You Want To Execute If Image Not Found On Server.

    }


    componentWillMount() {
        debugger
        this.props.fetchPostsDescriptionWithRedux(this.props.id); //call our action
        console.log("PAYLOAD DESCRIPTION", this.props.post);
    }
    render() {
        if (this.props.loading1) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        } else {
        return (
            <Content padder>

                <Card>

                    <CardItem style={{justifyContent: 'center' }}>
                        <Text style={[{ fontSize: 24, textAlign: 'center' }]}>{this.props.post.title}</Text>
                    </CardItem>

                    <CardItem>
                        <Image
                            loadingIndicatorSource={require('../images/logo.png')}
                            style={{ resizeMode: 'contain', width: 320, height: 250 }}
                            source={this.state.imageLoading ? { uri: this.props.post.avatar } : { uri: 'https://www.clecotech.com/images/logo.png' }} onError={this.ImageLoading_Error.bind(this)} />
                    </CardItem>

                    <CardItem>
                        <HTML
                            html={this.props.post.description}
                            imagesMaxWidth={Dimensions.get('window').width - 50}
                        />
                    </CardItem>
                </Card>

            </Content>
        )
    }
    }

    onPress() {
        this.props.actions.buttonPress(this.props.value)
    }
}

function mapStateToProps(state, props) {
    return {
        loading1: state.dataReducer.loading1,
        post: state.dataReducer.post
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Description);
//export default connect(mapStateToProps, { fetchPostsWithRedux })(Home);


const styles = StyleSheet.create({
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    inputButtonHighlighted: {
        backgroundColor: '#193441'
    }
})

//connect(mapStateToProps, { fetchPostsWithRedux })(Description);

