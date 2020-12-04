import React, { Component } from 'react';
import { Card, Text } from 'react-native-elements';

class Constact extends Component{

    render(){
        return(
            <Card>
                <Card.Title>Our Address</Card.Title>
                <Text> 121, Clear Water Bay Road </Text>
                <Text>Clear Water Bay, Kowloon</Text>      
                <Text>HONG KONG</Text>  
                <Text>Tel: +852 1234 5678</Text>  
                <Text>Fax: +852 8765 4321</Text>  
                <Text>Email:confusion@food.net</Text>   
                
            </Card>

        );
    }

}; export default Constact;