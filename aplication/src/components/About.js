import React, { Component } from 'react';
import {Text, ScrollView, FlatList, Image, StyleSheet} from 'react-native';
import {Card,  ListItem, Avatar} from 'react-native-elements';
import { LEADERS} from '../assets/shared/leaders';
import {connect} from 'react-redux';
import {baseUrl} from '../assets/shared/baseUrl';

const mapStoreToProps = state =>{
    return{
        leaders: state.leaders
    }
}

const RenderLeaders = (props) =>{
        
        const renderleader = (leader, index) => {
            return(
                <ListItem 
                    key={index} 
                    bottomDivider  
                >
                    <Image source={ {uri: baseUrl + item.image}} />
                    <Avatar  source={require('../assets/images/alberto.png') && { uri: '../assets/images/alberto.png' }}/>
                    <ListItem.Content>
                        <ListItem.Title>{leader.name}</ListItem.Title>
                        <ListItem.Subtitle>{leader.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>  
            );
        }  
   return(
       <Card>
           <Card.Title>Corporate Leadership</Card.Title>
           <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderleader}
                keyExtractor={leader => leader.id.toString()} 

            />

       </Card>
            

   ); 
}
const History = () => {
    return(
        <Card>
            <Card.Title>Our History</Card.Title>  

            <Text style={{margin:10, textAlign:"justify"}}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.
                Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{margin:10, textAlign:"justify"}}>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.   

            </Text>
           
        </Card>

    );
}
const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
  })

class About extends Component{
   

    render(){
        return(
            <ScrollView>  
                <History/>                
                <RenderLeaders leaders={this.state.leaders}/>                
            </ScrollView>

        );
    }
};export default  connect(mapStateToProps)(About);
