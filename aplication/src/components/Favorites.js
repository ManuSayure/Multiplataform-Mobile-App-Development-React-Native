import React, { Component } from 'react';
import {Text, View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
};

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static navigationOptions={
        title:'My Favorites'
    }
    render() { 
        const {navigate} = this.props.navigation;
        const renderFavorites = ({item, index}) =>{
            return ( 
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.descriotion}
                    hideChevron={true}
                    onPress={()=>navigate('Dishedetail', {dishId:item.id})}
                    leftAvatar={{source:{uri:baseUrl + item.image}}}
                 />
             );
        }
        if(this.props.dishes.isLoading){
            return(
                <Loading/>
            );
        }else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            )
        }else{
            return(
                <FlatList
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderFavorites}
                    keyExtractor={item=>item.id.toString()}
                />

            )
        }
       
    }
}
 
export default Favorites;
