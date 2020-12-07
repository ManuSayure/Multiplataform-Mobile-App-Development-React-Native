import React, { Component } from 'react';
import { View, Image, Platform, Button, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';

/**Packagens */
import Constants from 'expo-constants';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';

/**Components */
import Menu from './Menu'; 
import Dishdetail from './Dishdetail';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Reservtion from './Reservation';
import {fetchDishes} from '../redux/action-creators/DishesActionCreators';
import {fetchComments} from '../redux/action-creators/CommentsActionCreators';
import {fetchLeaders} from '../redux/action-creators/LeadersActionCreators';
import {fetchPromotions} from '../redux/action-creators/PromotionsActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromotions: () => dispatch(fetchPromotions()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

function MenuScreen({ navigation }) {
  const Stack = createStackNavigator();
  return (   
     
    <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor:"#512DA8",
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  color: "#fff" ,
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{  
                  title: 'Menu',
                  headerLeft:() => ( <Icon name="menu" size={24} color= 'white'
                  onPress={ () => navigation.toggleDrawer() } /> ),
                  headerRight: () => ( <Icon name="menu" size={24} color= 'white'
                  onPress={ () => navigation.goBack() } /> )
                 }}
              />
              <Stack.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ 
                              title: 'Dishdetail',
                             
                                       
                }}
              />
  </Stack.Navigator>
  
    
  );
}
const Stack = createStackNavigator(
 );
function HomeScreen({ navigation }) {
  
  return (
    <Stack.Navigator              
    screenOptions={{
      headerStyle: {
        backgroundColor:"#512DA8",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         color: "#fff" ,
          fontWeight: 'bold',
      },
}}  >
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ 
                            title: 'Home', 
                            headerLeft:() => ( <Icon name="menu" size={24} color= 'white'
                            onPress={ () => navigation.toggleDrawer() } /> )  
                }}
              />
  </Stack.Navigator>   
  );
}
function AboutScreen({ navigation }) {  
  return (
    <Stack.Navigator              
    screenOptions={{
      headerStyle: {
        backgroundColor:"#512DA8",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         color: "#fff" ,
          fontWeight: 'bold',
      },
}} >
              <Stack.Screen
                name="About"
                component={About}
                options={{ 
                            title: 'About',
                            headerLeft:() => ( <Icon name="menu" size={24} color= 'white'
                            onPress={ () => navigation.toggleDrawer() } /> )  
              
               }}
              />
  </Stack.Navigator>   
  );
}
function ContactScreen({ navigation }) {
  
  return (
    <Stack.Navigator              
    screenOptions={{
      headerStyle: {
        backgroundColor:"#512DA8",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         color: "#fff" ,
          fontWeight: 'bold',
      },
}}  >
              <Stack.Screen
                name="Contact"
                component={Contact}
                options={{ 
                            title: 'Contact',
                            headerLeft:() => ( <Icon name="menu" size={24} color= 'white'
                            onPress={ () => navigation.toggleDrawer() } /> ) 
              
                 }}/>
  </Stack.Navigator>   
  );
};
function ReservtionScreen({ navigation }) {  
  return (
    <Stack.Navigator              
    screenOptions={{
      headerStyle: {
        backgroundColor:"#512DA8",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         color: "#fff" ,
          fontWeight: 'bold',
      },
}} >
              <Stack.Screen
                name="Reservation"
                component={Reservtion}
                options={{ 
                           
                            title: 'Reserve a Table',
                            headerLeft:() => ( <Icon name="menu" size={24} color= 'white'
                            onPress={ () => navigation.toggleDrawer() } /> )  
              
               }}
              />
  </Stack.Navigator>   
  );
}


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigatior = ({navigation}) =>{
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContentComponent {...props} />} 
     initialRouteName="Home"
       
        drawerStyle={{
          backgroundColor: '#D1C4E9',         
          
        }}
    >
        <Drawer.Screen name="Home" component={HomeScreen} 
          options={{
            title:'Home', 
            drawerLabel:'Home', 
            drawerIcon: ({ tintColor, focused }) => (
                      <Icon
                        name='home'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                      />
          ),}} />
        <Drawer.Screen name="Menu" component={MenuScreen} 
          options={{
            title:'Menu', 
            drawerLabel:'Menu', 
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='info-circle'
                type='font-awesome'            
                size={24}
                color={tintColor}
              />
          ),}}/>
        <Drawer.Screen name="Contact" component={ContactScreen} options={{title:'Contact', drawerLabel:'Contact Us', 
         drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='address-card'
            type='font-awesome'            
            size={22}
            color={tintColor}
          />
        ),
      }}/>
        <Drawer.Screen name="About" component={AboutScreen} options={{title:'About', drawerLabel:'About Us',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='info-circle'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ), 
      }}/>
       <Drawer.Screen name="Reserve a Table" component={ReservtionScreen} options={{title:'Reserve Table', drawerLabel:'Reserve Table',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cutlery'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ), 
      }}/>
      
     
    </Drawer.Navigator>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


class Main extends Component {
  constructor(props){
    super(props);
  };

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
  }
   render(){
    return (
      <NavigationContainer style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <MainNavigatior/>      
      </NavigationContainer>
    );

   }
  
 }; export default connect(mapStateToProps, mapDispatchToProps)(Main);

