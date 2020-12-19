import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, Animated, Easing} from 'react-native';
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
    console.log(props);
    if(props.isLoading) {
        return(
            <Loading/>
        );
    }else if(props.errMess){
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );        
    }
    else{
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
            )
        }else{
            return(
                <View></View>
            );
        }
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
        this.animetedValue = new Animated.Value(0);
        console.log(props)
    }
    static navigation
    Options = {
        title:'Home'
    };
    componentDidMount(){
        this.animate();
    };
    animate(){
        this.animetedValue.setValue(0);
        Animated.timing(
            this.animetedValue,
            {
                toValue:8,
                duration:10000,
                useNativeDriver: true,
                easing:Easing.linear
            }
        ).start(() => this.animate());
    }
    
    render(){   
        const xpos1 =this.animetedValue.interpolate({
            inputRange:[0, 1, 3, 5, 8],
            outputRange:[1200, 600, 0, -600, -1200]
        });
        const xpos2 =this.animetedValue.interpolate({
            inputRange:[0, 2, 4, 6, 8],
            outputRange:[1200, 600, 0, -600, -1200]
        });
        const xpos3 =this.animetedValue.interpolate({
            inputRange:[0, 3, 5, 7, 8],
            outputRange:[1200, 600, 0, -600, -1200]
        }) ;    
    
        return(
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos1}]}}>
                    <RenderItem 
                        item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}               
                />
                </Animated.View>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos2}]}}>
                    <RenderItem 
                        item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        errMess={this.props.promotions.errMess}
                    />
                </Animated.View>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos3}]}}>
                    <RenderItem 
                        item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess}
                     />
                </Animated.View>

                
               
               

            </View>
           
                             
          

        );
    }

}; export default connect(mapStateToProps)(Home);