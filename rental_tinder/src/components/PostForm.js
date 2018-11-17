import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common'
import {Alert} from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';


const MIN_CHARACTERS = 6;
const MAX_NUMBER = 20;

class PostForm extends Component {
    // for sign in, we need the following fields
    state = { address: '', roomNumber: '',  addressValidate: false, smoker: true,
    drinker: false, usernameF: 'Cristian', zipcodeF: 'v6m1r9'
    ,zipcode: '', roomNumberValidate: false, startDateTimePickerVisible: false , endDateTimePickerVisible:false, startDate: '', endDate:''};
   // validate the address input
    validate_address (address) {
        alph = /^[a-zA-Z]+$/
        if (alph.test(address) && address.length > MIN_CHARACTERS) {
            this.setState({ addressValidate: true, })
        } else {
            this.setState({ addressValidate: false, })
        }
    }
    //validate the password input
    validate_roomNumber  (roomNumber){
        if (roomNumber <= MAX_NUMBER) {
                this.setState({ roomNumberValidate: true, })
            } else {
                this.setState({ roomNumberValidate: false, })
            }

  }

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    this.setState({startDate: date})
    this.hideStartDateTimePicker();

  };

  handleEndDatePicked = (date) => {
    this.setState({endDate: date})
    this.hideEndDateTimePicker();
  };

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                    placeholder = "please enter address"
                    label ="Address:"
                    value={this.state.address}
                        onChangeText={address => this.setState({ address })}

            />
                </CardSection>

                <CardSection>
                    <Input
                    placeholder = "How many rooms do you have"
                    label ="# Rooms:"
                    value={this.state.roomNumber}
                    onChangeText={roomNumber =>this.setState({roomNumber})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                    placeholder = "Zipcode:V6T1X6"
                    label =" Zipcode:"
                    value={this.state.zipcode}
                    onChangeText={zipcode =>this.setState({zipcode})}
                    />
                </CardSection>


                <CardSection>
                <View style={{ flex: 1 ,justifyContent: 'center',alignItems: 'center' }}>
                <TouchableOpacity onPress={this.showStartDateTimePicker}>
                  <Text style={{fontSize:20,color: '#007aff'}}>Set start date</Text>
                 </TouchableOpacity>
                  <DateTimePicker
                  isVisible={this.state.startDateTimePickerVisible}
                  onConfirm={this.handleStartDatePicked}
                   onCancel={this.hideStartDateTimePicker}
                  />
                 </View>
                </CardSection>

                <CardSection>
                <View style={{ flex: 1 ,justifyContent: 'center',alignItems: 'center' }}>
                <TouchableOpacity onPress={this.showEndDateTimePicker}>
                  <Text style={{fontSize:20,color: '#007aff'}}>Set end date</Text>
                 </TouchableOpacity>
                  <DateTimePicker
                  isVisible={this.state.endDateTimePickerVisible}
                  onConfirm={this.handleEndDatePicked}
                   onCancel={this.hideEndDateTimePicker}
                  />
                 </View>
                </CardSection>


                <CardSection>
                <Button onPress={this.handlePress_create_post.bind(this)}>
                   Post!
                </Button>
                </CardSection>



            </Card>
        );
    }


    handlePress_create_post = async () => {

        // upon submit first check the inputs, on sucess send the data
        await this.validate_address(this.state.address)
        await this.validate_roomNumber(this.state.roomNumber)

        if (this.state.addressValidate == true && this.state.roomNumberValidate== true) {



            Alert.alert(JSON.stringify(
                "sucess posted"

            ));

            fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/posting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'username='+ this.state.usernameF
                + '&address=' + this.state.address + '&roomNumber=' + this.state.roomNumber
                + '&zipcode='+ this.state.zipcode  + '&smoke='+this.state.smoker+ '&partyPerson=' +this.state.drinker
            }).then((response) => response.json())
            .then((res) => {

                if (res.success == true){

                  alert(res.message);
                }
                if (res.success == false){

                  alert(res.message);
                }
                }).catch((error) => {
                    alert("please, check the password and username");
        }).done();
      }
        // look for the error
        else {
            if (this.state.addressValidate == false && this.state.roomNumberValidate == false) {
                Alert.alert(JSON.stringify(
                    "please enter valid address and room number"

                ));
            } else if(this.state.addressValidate == false) {
                Alert.alert(JSON.stringify(
                    "please check the address (at least 6 characters)"

                ));
            }
            else if (this.state.roomNumberValidate == false) {
                Alert.alert(JSON.stringify(
                    "please check the room number  (Maximum 20 rooms)"

                ));
            }
            // set flags


        }
    };

}


export default PostForm;
