import React, { Component } from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from '../assets/shared/dishes';
import {PROMOTIONS} from '../assets/shared/promotions';
import {LEADERS} from '../assets/shared/leaders';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';
import { leaders } from '../redux/reducers/leaders';


const mapStateToProps = state =>{
    return{
        dishes:state.dishes,
        comments:state.comments,
        leaders:state.leaders,
        promotions:state.promotions
    }
}




const RenderItem = (props) => {
    const item = props.item;    
    if(item != null){
      
        
        return(
            
            <Card>          
           
            <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
            <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            
            <Image source={{uri: baseUrl + item.image}}/>
           
            <Image source={item.image}/>
            
            <Text
                style={{margin: 10}}>
                {item.description}</Text>
        </Card>
           

        );

    }else{
        return(
            <View></View>
        );
    }
}

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
           
        }
    }
    static navigationOptions = {
        title:'Home'
    };
    render(){
        return(
           <ScrollView>
               <RenderItem item={this.state.dishes.dishes.filter((dish) => dish.featured )[0]}/>
               <RenderItem item={this.state.promotions.promotions.filter((promo) => promo.featured )[0]}/>
               <RenderItem item={this.state.leaders.leaders.filter((leader) => leader.featured )[0]}/>              
           </ScrollView>

        );
    }

}; export default connect(mapStateToProps)(Home);