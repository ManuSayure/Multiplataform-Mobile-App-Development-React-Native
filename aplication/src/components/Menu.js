
import {  FlatList, View, Image } from 'react-native';
import { ListItem,  Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import { DISHES } from '../assets/shared/dishes';

const RenderComments = (props) =>{
  const comments = props.comments;
  const renderCommentItem = ({index, item}) => {
      <View key={index} style={{margin:10}}>
          <Text style={{fontSize:14}}>{item.comment}</Text>
          <Text style={{fontSize:12}}>{item.rating}</Text>
          <Text style={{fontSize:12}}>{'-- ' + item.author + ', ' + item.date}</Text>
      </View>       
  }
  return(
      <Card>
          <Card.Title>Comments</Card.Title>
          <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={item=> item.id.toSting()}            
          />
      </Card>

  );

};

const RenderMenu = (props) => {
  const dishes = props.dishes;
  const renderMenuItem =({index, item}) => {
        <ListItem 
            key={index} 
            bottomDivider  
            onPress={ () => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}>
            <Avatar source={{uri: item.image}} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>           
        

  }      
  return(  
    <FlatList
          data={this.props.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()} 
      
      />  
  );
      
        

};
class Menu extends Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES
    };
  }
  static navigationOptions = {
    title: 'Menu'
};
  render(){   
    
    return(
      <RenderMenu dishes = {this.state.dishes}/>      
    );
  }  
   
}; export default Menu;