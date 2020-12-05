import React, { Component } from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }


const RenderItem = (props) => {
    const item = props.item;    
    if(item != null){    
        
        return(
            
            <Card key={item.id}>
                 <Card.Title>{item.name}</Card.Title> 
                          
           
            <Card.FeaturedTitle h1>ajsjj</Card.FeaturedTitle>
            <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>  
            <Image
              style={{width:"100%",height:100}}
              
              source={{uri:baseUrl + item.image}}
            />          
            <Image source={{uri:baseUrl + item.image}}/>            
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
        console.log(props)
    }
    static navigationOptions = {
        title:'Home'
    };
    
    render(){       
    
        return(
           <ScrollView>
               <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}/>
               <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}/>
               <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}/>              
           </ScrollView>

        );
    }

}; export default connect(mapStateToProps)(Home);