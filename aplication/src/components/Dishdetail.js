import React, { Component, useState } from 'react';
import { Text, View, Modal, StyleSheet, Button, Alert, PanResponder,  Share } from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';
import {postFavorite} from '../redux/action-creators/FavoritesActionCreators';
import {postComment} from '../redux/action-creators/CommentsActionCreators'
import * as Animatable from 'react-native-animatable';  
import * as Sharing from 'expo-sharing';

const mapStateToProps = state =>{
    return{
        dishes:state.dishes,
        comments:state.comments,
        favorites:state.favorites
    }
};
const mapDispatchToProps = dispatch =>({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});
const shareDish = (title, message, url) => {
    Share.share({
        title: title,
        message:title + ': ' + message + ' ' + url,
        url: url
    }, {
        dialogTitle: 'Share ' + title
    }
    );
}
const recognizeDrag = ({moveX, moveY, dx, dy}) => {
    if(dx < -200){
        return true;
    }else{
        return false;
    }
};
const recognizeComment = ({}) => {
    if(dx> 200){
        return true;
    }else{
        return false
    }
};
const pandResponder = PanResponder.create({

    onStartShouldSetPanResponder: (e , gestureState) => {
        return true;
    },
    onPanResponderGrant: () => { 
        this.view.rubberBand(1000)
        .then( endState => 
            console.log(endState.finished ? 'finished' : 'cancelled')
            );
    },
    onPanResponderEnd: (e, gestureState) => {
        console.log("pan responder end", gestureState);
        if (recognizeDrag(gestureState)){
            Alert.alert(
                'Add Favorite',
                'Are you sure you wish to add ' + dish.name + ' to favorite?',
                [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                ],
                { cancelable: false }
            );
        }
            
       else if(recognizeComment(gestureState)){
            
            props.toggleModal();
        }

        return true;
    }
})

const RenderDish = (props) => {
    const dish = props.dish;
    handleViewRef = ref => this.view = ref; //function
    console.log(props.favorite, ref);

    if(dish != null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card key={dish.id} >
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Image source={{uri: baseUrl + dish.image}} />
                    <Text style={{margin:10}}> {dish.description}  </Text>
                    <View style={styles.formRow}>
                        <Icon
                            //styles={{}}
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'} // coração preenchido ou vazio
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress(dish.id)}
                            />
                        <Icon
                            raised
                            reverse
                            name={ 'pencil'} // lápis
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.toggleModal()}
                            /> 
                         <Icon
                            raised
                            reverse
                            name={ 'share'}
                            type='font-awesome'
                            color='#51D2A8'
                            //style={}
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                            /> 
                    </View>          
                </Card>
            </Animatable.View>           
           
        );
    }else{
        return(
            <View></View>
        );
    }
};

const RenderComments = (props) =>{
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin:10 , alignItems:'flex-start'}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>           
                <Rating type='star' imageSize={14} styles={{}} readonly startingValue={item.rating}  />
                <Text style={{fontSize:12}}>{'-- ' + item.author + ', ' + 
                 new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'})
                 .format( new Date(Date.parse(item.date )))} </Text>
            </View> 

        );
              
    }
    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}            
                />
            </Card>
        </Animatable.View>
       

    );

};
 

 class Dishdetail extends Component{
  
    constructor(props) {
        super(props);      
        this.state={
            rating : '',
            author : '',
            comment: '',
            openModal:false,
        }
       
       
    }
    resetForm(){
        this.setState({
            rating:'',
            author:'',
            comment:'',
        });
    };
    handleComment(){        
        console.log(JSON.stringify(this.state));
        this.props.postComment( 
            this.props.route.params.dishId, 
            this.state.rating,
            this.state.author, 
            this.state.comment);
            alert('Comentário enviado com sucesso!');
    }
    toggleModal = () =>{
        this.setState({openModal:!this.state.openModal})
    }

    markFavorite(dishId){
         console.log(dishId);
        this.props.postFavorite(dishId);
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
        console.log(this.props.postComment);
        console.log(this.state.openModal);
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish  
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite = {this.props.favorites.some(el=> el === dishId)} //checa se o dishId ja existe na lista de favorites
                    onPress = {(dishId) => this.markFavorite(dishId)}
                    toggleModal={ () => this.toggleModal()}                             
            
                />
                {this.state.openModal ?
                 <Modal style={styles.modal}
                    animationType={'slide'}
                    transparent = {false}
                    visible = {this.state.openModal}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
               >
                   <ScrollView>                                                             
                            <Rating
                                id="rating"
                                type='star'
                                style={{ paddingVertical: 10 }}
                                startingValue={0.0}
                                ratingCount={5}
                                imageSize={60}
                                showRating
                                fractions="{1}"
                                onFinishRating={rating => this.setState({ rating: rating })}
                            />                      
                           <Input
                                placeholder="Author"
                                leftIcon={{ type: 'font-awesome', name: 'user' }}
                                style={styles}
                                onChangeText={value => this.setState({ author: value })}
                                />                     
                                                        
                            <Input
                                id="comment"
                                placeholder="Comment"
                                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                style={styles}
                                onChangeText={value => this.setState({ comment: value })}
                            />                    
                        
                            <Button
                               style={styles.button}
                                onPress={() => {this.handleComment();this.toggleModal(); this.resetForm() }}
                                title='Submit'
                                color="#512DA8"
                                accessibilityLabel="Learn more about this purple button"
                            />
                            <Button
                                style={styles.button}
                                onPress={() => {this.toggleModal();this.resetForm()}}
                                title='Cancel'
                                color= '#A5A8AB'
                                accessibilityLabel="Learn more about this purple button"
                            />                        

                   </ScrollView>             
                    
            </Modal> : null}
                
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                
            </ScrollView>
            
        );

    }
    
};
const styles = StyleSheet.create({
    formRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20,
    },    
    formItem:{
        flex:1,
    },
    button:{
        padding:10
    },
    modal:{
        flex:1,
        justifyContent:'center',
        margin:40
    },

}); export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);