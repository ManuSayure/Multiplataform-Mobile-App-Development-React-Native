
import {  FlatList, View, Image, Text } from 'react-native';
import { ListItem,  Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';
import { Loading } from './Loading';
import * as Animatable from 'react-native-animatable';  

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
  }
}
const RenderMenu = (props) => {
  const navigate = props.navigate;
  
  const renderMenuItem =({item, index}) => {
      return(
              <ListItem 
                    key={index} 
                    bottomDivider  
                    onPress={ () =>{navigate('Dishdetail', { dishId: item.id })} }>
                    <Avatar source={{uri:baseUrl + item.image}} />
                    <ListItem.Content>
                      <Animatable.View animation="fadeInRightBig" duration={2000}> 
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                      </Animatable.View>                      
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>   
      );
                
        

  }   
  if(props.isLoading){
    return(
      <Loading/>
    );
  }else if(props.errMess){
    return(
      <View>
        <Text>{props.errMess}</Text>
      </View>
    
    );
  }else{
    return(  
      <FlatList
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}          
        
        />  
    );

  }         

};
class Menu extends Component{
  constructor(props){
    super(props);
    console.log(props.navigation.navigate);
  }
  static navigationOptions = {
    title: 'Menu'
};
  render(){   
    
    return(
      <View>
        <RenderMenu 
          dishes = {this.props.dishes.dishes} 
          navigate = { this.props.navigation.navigate}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
         />
      </View>
            
    );
  }  
   
}; export default connect(mapStateToProps)(Menu);