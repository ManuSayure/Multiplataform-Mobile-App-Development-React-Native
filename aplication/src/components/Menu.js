
import {  FlatList, View, Image, Text } from 'react-native';
import { ListItem,  Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';

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
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>   
      );
                
        

  }      
  return(  
    <FlatList
          data={props.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}          
      
      />  
  );
      
        

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
        <RenderMenu dishes = {this.props.dishes.dishes} navigate = { this.props.navigation.navigate} />
      </View>
            
    );
  }  
   
}; export default connect(mapStateToProps)(Menu);