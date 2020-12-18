import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
//import { MailComposer } from 'expo';
import * as MailComposer from 'expo-mail-composer';
class Constact extends Component{
    sendMail(){
        MailComposer.composeAsync({
            recipients:['scmanoela@gmail.com'],
            subject:'Enquiry',
            body:'To whom it may concern:'
        })
    }

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
                <Button
                    title='Send Email'
                    buttonStyle={{backgroundColor:'#512DA8'}}
                    icon ={ <Icon name='envelope-o' type='font-awesome' color='white'/>}
                    onPress= {this.sendMail}
                />                 
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