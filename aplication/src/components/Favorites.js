import React, { Component } from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import { deleteFavorite } from '../redux/action-creators/FavoritesActionCreators';
import Swipeout from 'react-native-swipeout';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
};
const mapDispatchToProps = dispatch =>({
    deleteFavorite: (dishId) = dispatch(deleteFavorite(dishId)),
});

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static navigationOptions={
        title:'My Favorites'
    }
    render() { 
        const rigthButton = [
            { 
                text: 'Delete', 
                type: 'delete',
                onPress: () =>{
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                        [
                            {
                                text:'Cancel',
                                onPress: ()=> console.log(item.name + 'Not deleted'),
                                style:'cancel'
                            },
                            {
                                text:'Ok',
                                onPress: () => this.props.deleteFavorite(item.id)

                            }
                        ],
                        {cancelable:false}
                    )
                } 
            }
        ]
        const {navigate} = this.props.navigation;
        const renderFavorites = ({item, index}) =>{
            return ( 
                <Swipeout right={rigthButton} autoClose={true}>
                    <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.descriotion}
                    hideChevron={true}
                    onPress={()=>navigate('Dishedetail', {dishId:item.id})}
                    leftAvatar={{source:{uri:baseUrl + item.image}}}
                 />
                </Swipeout>
                
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
 
export default connect( mapStateToProps, mapDispatchToProps)(Favorites);
