import React, { Component } from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';
import { Loading } from './Loading';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }


const RenderItem = (props) => {
    const item = props.item;   
    if(props.isLoading) {
        return(
            <Loading/>
        );
    }else if(props.errMess){
        <View>
            <Text>{props.errMess}</Text>
        </View>
    }
    if(item != null){    
        
        return(
            
            <Card key={item.id}>
                 <Card.Image style={{width:"100%",height:100}}
                        source={{uri:baseUrl + item.image}}>
                    <Card.FeaturedTitle style={style.cardFeatureText}>{item.name}</Card.FeaturedTitle>
                    <Card.FeaturedSubtitle style={style.cardFeatureText}>{item.designation}</Card.FeaturedSubtitle>  

                 </Card.Image>                                             
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
const style = StyleSheet.create({
    cardFeatureText: {
        textAlign:'center'
    },
})
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
               <RenderItem 
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}               
               />
               <RenderItem 
                    item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
               <RenderItem 
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
               />              
           </ScrollView>

        );
    }

}; export default connect(mapStateToProps)(Home);