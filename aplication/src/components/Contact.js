import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';

class Constact extends Component{

    render(){
        return(
            <Card style={styles.card}>
                <Card.Title>Our Address</Card.Title>
                <Text style={styles.cardText}> 121, Clear Water Bay Road </Text>
                <Text style={styles.cardText}>Clear Water Bay, Kowloon</Text>      
                <Text style={styles.cardText}>HONG KONG</Text>  
                <Text style={styles.cardText}>Tel: +852 1234 5678</Text>  
                <Text style={styles.cardText}>Fax: +852 8765 4321</Text>  
                <Text style={styles.cardText}>Email:confusion@food.net</Text>   
                
            </Card>

        );
    }
   

}; 
const styles = StyleSheet.create({
    card:{
       
        
    },
    cardText:{
        textAlign: 'center',
        fontWeight:'bold',
        justifyContent:'flex-start'
       

    }
        
}); export default Constact;