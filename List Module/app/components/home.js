import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';

import { fetchPostsWithRedux } from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions'; //Import your actions

import { Actions } from 'react-native-router-flux'

//Buttons for Action Sheet

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {imageLoading:true};

        this.renderItem = this.renderItem.bind(this);
    }

    ImageLoading_Error() {
        this.setState({ imageLoading: false });
        // Write Your Code Here Which You Want To Execute If Image Not Found On Server.
    }


    componentDidMount() {
        //debugger
        this.props.fetchPostsWithRedux(); //call our action
        console.log("PAYLOAD", this.props.fetchPostsWithRedux());
        
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.posts}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()} />

                    {/* for FAB button */}
                    {/* <TouchableHighlight style={styles.addButton}
                        underlayColor='#ff7043' onPress={() => Actions.new_quote()}>
                        <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
                    </TouchableHighlight> */}
                </View>
            );
        }
    }

    renderItem({ item, index }) {
        return (
            <TouchableHighlight onPress={() => Actions.description({id:item.id})} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Image
                        loadingIndicatorSource={require('../images/logo.png')}
                        style={{ resizeMode: 'contain', width: 32, height: 32 }}
                        source={this.state.imageLoading ? { uri: item.avatar } : { uri: 'https://www.clecotech.com/images/logo.png' }} onError={this.ImageLoading_Error.bind(this)} />

                    <Text style={styles.author}>
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        posts: state.dataReducer.posts
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default connect(mapStateToProps, { fetchPostsWithRedux })(Home);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        flexDirection:'row'
    },

    author: {
        fontSize: 14,
        fontWeight: "600",
        margin: 10,

    },

    quote: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});
