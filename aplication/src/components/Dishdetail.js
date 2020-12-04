import React, { Component } from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import { DISHES } from '../assets/shared/dishes';
import {image} from '../assets/images/alberto.png';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {COMMENTS} from '../assets/shared/comments';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';

const mapStateToProps = state =>{
    return{
        dishes:state.dishes,
        comments:state.comments
    }
}

const RenderDish = (props) => {
    const dish = props.dish;
    console.log({image});
    console.log(props);
    if(dish != null){
        return(
           
            <Card           
            >
            <Card.Title>{dish.name}</Card.Title>
            <Card.Image source={{uri: baseUrl + dish.image}} />
                <Text style={{margin:10}}>
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'} // coração preenchido ou vazio
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
            </Card>

        );
    }else{
        return(
            <View></View>
        );
    }
};
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
 
class Dishdetail extends Component{
    constructor(props) {
        super(props);
        this.state = {           
            favorite:[]
        };
        console.log(props);
       
    }
    markFavorite(dishId){
        this.setState({
            favorite:[... this.state.favorite, dishId ]
        });
    }

    //static navigationOptions = {
   //     title: 'Dish Details'
    //};
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = this.props.route.params;
        title: 'Dish Details';
    }
    render(){
              
        //const { navigation } = this.props;
        console.log(this.props.route.params.dishId);
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish  
                    dish={this.state.dishes.dishes[+dishId]}
                    favorite = {this.state.favorite.some(el=> el === dishId)} //checa se o dishId ja existe na lista de favorites
                    onPress = {this.markFavorite(dishId)} />
                <RenderComments comments={this.state.comments.comments.filter((comment) => comment.dishId === dishId)}/>
            </ScrollView>
            
        );

    }
    
};export default  connect(mapStateToProps)(Dishdetail);