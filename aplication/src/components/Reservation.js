import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Card, } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';  
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
//import Button from 'material-ui/Button';


class Reservation extends Component{
    constructor(props){
        super(props);
        this.state = {
            guests:1,
            smoking:false,
            date: '',
            showModal:false,

        }
    }
    static navigationOptions = {
        title: 'Reserve Table',
    };
    selectDate = (selectedDate) => {
        
        this.setState({date: selectedDate});
      }

    handleReservation(){
        console.log(JSON.stringify(this.state));         
        this.toggleModal(); 
            
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
    renderDatePicker = ({ input, defaultValue, meta: { touched, error } }) => (
        <DatePicker 
            errorText = {touched && error} 
            {...input}
            value = {input.value !== ''? new Date(input.value) : null}
            onChange = {(event, value) => {console.log(value); input.onChange(value)}} />
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
    AlertRender= () =>{
        return(
            Alert.alert(
                
                                   
                          
                'Delete Favorite?',
                'Are you sure you wish to delete the favorite dish ' +  + '?',
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style:'cancel'
                      
                    },
                    { text: "OK", 
                    onPress: () => { () => this.handleReservation(); console.log("OK Pressed")},
                   
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={this.state.date}
                            onChange={(value) => this.setState({date:value})}
                            KeyboardButtonProps = {{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                        
                                 
                    </View>
                    <View style={style.formRow}>
                        <Button                        
                            onPress={  Alert.alert(
                
                                   
                          
                                'Delete Favorite?',
                                'Are you sure you wish to delete the favorite dish ' +  + '?',
                                [
                                    {
                                      text: "Cancel",
                                      onPress: () => console.log("Cancel Pressed"),
                                      style:'cancel'
                                      
                                    },
                                    { text: "OK", 
                                    onPress: () => { () => this.handleReservation(); console.log("OK Pressed")},
                                   
                                }
                                  ],
                               
                                {cancelable:false}
                            )}                        
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