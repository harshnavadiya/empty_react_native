import React from 'react';

import { Asset, Font } from 'expo-asset';
import { AppLoading } from 'expo';
import { Root } from "native-base";
import { StatusBar } from "react-native";
import AppPreLoader from "./application/components/AppPreLoader";

import GuestNavigation from './application/navigations/Guest';
import LoggedNavigation from './application/navigations/Logged';
import OfflineBar from "./application/components/OfflineBar";

console.disableYellowBox = true;

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogged: false,
            loaded: false,
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            // require('./assets/images/bg.jpg'),
           
        ]);

        await Promise.all([...imageAssets]);
    }

    async componentDidMount() {

        await Expo.Font.loadAsync({
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf"),
            SimpleLineIcons: require("native-base/Fonts/SimpleLineIcons.ttf")


        });
        this.setState({
            isLogged: true,
            loaded: true
         });
        // await firebase.auth().onAuthStateChanged((user) => {
        //     if (user !== null) {
        //         this.setState({
        //             isLogged: true,
        //             loaded: true
        //         });
        //     } else {
        //         this.setState({
        //             isLogged: false,
        //             loaded: true
        //         });
        //     }
        // })

    }

    render() {

        if (!this.state.isReady) {
            return ( <
                AppLoading startAsync = { this._loadAssetsAsync }
                onFinish = {
                    () => this.setState({ isReady: true })
                }
                onError = { console.warn }
                />
            );
        }

        const { isLogged, loaded, isReady } = this.state;

        if (!loaded) {
            return ( <
                AppPreLoader / >
            );
        }

        if (isLogged && isReady) {
            return ( <Root>
                <
                OfflineBar / >
                <
                StatusBar barStyle = "light-content"
                backgroundColor = "#ce8512" / >

                <
                LoggedNavigation / >
                <
                /Root>
            );
        } else {
            return ( <
                Root >
                <
                StatusBar hidden / >
                <
                GuestNavigation / >
                <
                /Root>
            );
        }
    }
}