import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Card, } from 'react-native-elements';
import { Permissions, Notifications } from 'expo';
import DatePicker from 'react-native-datepicker';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';  
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import RNDateTimePicker from '@react-native-community/datetimepicker';
//import Button from 'material-ui/Button';

const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state = {
            guests:1,
            smoking:false,
            date: new Date(),
            showModal:false,

        }
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    };
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    static navigationOptions = {
        title: 'Reserve Table',
    };
    selectDate = (selectedDate) => {
        
        this.setState({date: selectedDate});
      }

    handleReservation(){
        console.log(JSON.stringify(this.state));         
        //this.toggleModal(); 
            
    };
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        selectedDate(currentDate);
      };
    
    resetForm(){
        
        this.setState({
            guests: 1,
            smoking:false,
            date:'',           
        });
    };
    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }
    setDate = (event, date) => {
        date = date || this.state.date;
 
        this.setState({
           date
        });
     }
    renderDatePicker = ({ input, defaultValue, meta: { touched, error } }) => (
        <DatePicker 
            errorText = {touched && error} 
            {...input}
            value = {input.value !== ''? new Date(input.value) : null}
            //value = {this.state.date}
            onChange = {(event, value) => 
                                        {   console.log(value, input.value); 
                                            input.onChange(value);
                                            this.setState({date: new Date(value)})}
                                        } />
    )
    ModalRender = () =>{
        return(
            <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={style.modal}>
                        <Text style={style.modalTitle}>Your Reservation</Text>
                        <Text style={style.modalText}> Number of Guests: {this.state.guests}</Text>
                        <Text style={style.modalText}> Smoking? : {this.state.smoking? 'Yes':'No'}</Text>
                        <Text style={style.modalText}> Date and Time : {this.state.date}</Text>
                        <Button 
                            onPress={() => {this.toggleModal(); this.resetForm()}} 
                            color='#512DAB' 
                            title="Close"/>

                    </View>
                    

                </Modal>
        );
    };
    AlertRender = () =>{
        return(
            alert(     

                'Your Reservation?',
                'Number of Guests: '+ this.state.guests ,
                'Smoking? : ' + this.state.smoking? 'Yes':'No' ,
                'Date and Time : '+ this.state.date,
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style:'cancel'
                      
                    },
                    { text: "OK", 
                    onPress: () => { () => this.handleReservation(); console.log("OK Pressed"), this.presentLocalNotification(this.state.date)},
                   
                }
                  ],
               
                {cancelable:false}
            )

        );
    }

    render(){
        
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <View style={style.formRow}>
                        <Text style={style.formLabel}>Number of Guests</Text>
                        <Picker 
                        style={style.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIdex) => this.setState({guests:itemValue})}
                        >
                            <Picker.Item label='1' value='1'/>
                            <Picker.Item label='2' value='2'/>
                            <Picker.Item label='3' value='3'/>
                            <Picker.Item label='4' value='4'/>
                            <Picker.Item label='5' value='5'/>
                            <Picker.Item label='6' value='6'/>
                        </Picker>
                    </View>
                    <View style={style.formRow}>
                        <Text style={style.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={style.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({smoking:value})}>
                        </Switch>
                    </View>
                    <View style={style.formRow}>
                        <Text style={style.formLabel}>Date and Time</Text>
                        <RNDateTimePicker mode="date" value={this.state.date} onChange={this.setDate} />
                        <DateTimePicker 
                            value={ this.state.date }
                            mode='default'
                            display='default'
                            onChange={ date => this.setState({ date:date }) } />                  
                        
                                 
                    </View>
                    <View style={style.formRow}>
                        <Button                        
                            onPress={() => {this.AlertRender(), console.log('Reservado')}    }                   
                            title='Reserve'
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        ></Button>
                         
                    </View>

                </Animatable.View>             
            </ScrollView>

        );
    };
}
const style = StyleSheet.create({
    formRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20,
    },
    formLabel:{
        fontSize:18,
        flex:2,
    },
    formItem:{
        flex:1,
    },
    modal:{
        justifyContent:'center',
        margin:20
    },
    modalTitle:{
        fontSize:24,
        fontWeight:'bold',
        backgroundColor:'#512DAB',
        textAlign:'center',
        marginBottom:20
    },
    modalText:{
        fontSize:18,
        margin:10
    }

});
export default Reservation;