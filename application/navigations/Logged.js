import React from 'react';
import SideMenu from './SideMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";

import {Dimensions, Text} from "react-native";

var {height, width} = Dimensions.get('window');

import HomeScreen from '../screens/Home';




const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={27}
	color="white"
	onPress={() => navigation.openDrawer()}
/>;

const navigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f39c12',
      shadowOpacity: 0,
      elevation: 0,
    },
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    }
  }
};

const HomeNavigator = createStackNavigator(

{
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
	  headerLeft: leftIcon(navigation, 'md-menu')
	})
  },
 
}, navigationOptions

);

const RootStack = createDrawerNavigator({

Home: {
    screen: HomeNavigator,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: width * .7,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

export default createAppContainer(RootStack)
