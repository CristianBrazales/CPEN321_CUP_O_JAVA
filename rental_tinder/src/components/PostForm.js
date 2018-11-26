import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input, MessageInput} from './common'
import {Alert} from 'react-native';
import { Text, TouchableOpacity, View,Switch, StyleSheet,AsyncStorage,ScrollView} from 'react-native';


const MIN_CHARACTERS = 6;
const MAX_NUMBER = 20;
function findAndReplace(string, target, replacement) {

var i = 0, length = string.length;

for (i; i < length; i++) {

 string = string.replace(target, replacement);

}

return string;

}
class PostForm extends Component {

    // for sign in, we need the following fields
    constructor(props) {
        super(props);
        this.state = { address: '', roomNumber: '', title: '', price:'', addressValidate: false, zipcode: '', username: '',
         earlyMorningPerson:false, partyPerson:false, smoking:false,
         roomNumberValidate: false, description:'',emptyValidate:false};

    }
    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async () => {
        var value = (await AsyncStorage.getItem('username'));
        //var  details = findAndReplace(value, "\"","");
          this.setState({ username: value, })
    }


    ChangeState_morning = () =>this.setState(state =>({
            earlyMorningPerson: !state.earlyMorningPerson
    }));

    ChangeState_party = () =>this.setState(state =>({
        partyPerson: !state.partyPerson
    }));

    ChangeState_smoking = () =>this.setState(state =>({
        smoking: !state.smoking
    }));
   // validate the address input
    validate_address (address) {

        if (address!='') {
            this.setState({ addressValidate: true, })
        } else {
            this.setState({ addressValidate: false, })
        }
    }
    //validate the password input
    validate_roomNumber  (roomNumber){
        if (roomNumber!= '') {
                this.setState({ roomNumberValidate: true, })
            } else {
                this.setState({ roomNumberValidate: false, })
            }

  }

  validate_empty  (title,description,price,zipcode){
      if (title!='' && description!='' && price!=''&& zipcode!='') {
              this.setState({ emptyValidate: true, })
          } else {
              this.setState({ emptyValidate: false, })
          }

  }



    render(){
        return(
          <ScrollView>
            <Card>
              <CardSection>
                  <Input
                    placeholder = "Title of the place"
                    label ="Title:"
                    value={this.state.title}
                    onChangeText={title => this.setState({ title})}

                    />
                </CardSection>

                <CardSection>
                    <MessageInput
                    placeholder = "Description"
                    label ="Description:"
                    value={this.state.description}
                    onChangeText={  description=>this.setState({description})}
                    />
                </CardSection>

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
                    label ="Zipcode:"
                    value={this.state.zipcode}
                    onChangeText={zipcode =>this.setState({zipcode})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                      placeholder = "Expected price"
                      label ="Price:"
                      value={this.state.price}
                      onChangeText={price => this.setState({ price})}

                      />
                  </CardSection>

                  <CardSection>
                    <Text style={{fontWeight: 'bold',fontSize: 18}}>Please enter your teenant preferences:</Text>
                    </CardSection>


                <CardSection>
                <View style={styles.container}>
                <Text style={styles.paragraph}>Morning Person:</Text>
               <Switch
                    onValueChange={this.ChangeState_morning}
                    value={this.state.earlyMorningPerson}
               />
               </View>
               </CardSection>


                <CardSection>
                <View style={styles.container}>
                <Text style={styles.paragraph}>Party Person:</Text>
               <Switch
                    onValueChange={this.ChangeState_party}
                    value={this.state.partyPerson}
               />
               </View>
               </CardSection>


                <CardSection>
                <View style={styles.container}>
                <Text style={styles.paragraph}>Smoking Person:</Text>
               <Switch
                    onValueChange={this.ChangeState_smoking}
                    value={this.state.smoking}
               />
               </View>
               </CardSection>



                <CardSection>
                <Button onPress={this.handlePress_create_post.bind(this)}>
                   Post!
                </Button>
                </CardSection>



            </Card>
            </ScrollView>
        );
    }


    handlePress_create_post = async () => {

        // upon submit first check the inputs, on sucess send the data
        await this.validate_address(this.state.address)
        await this.validate_roomNumber(this.state.roomNumber)
        await this.validate_empty(this.state.title,this.state.description,this.state.price,this.state.zipcode)

        if (this.state.addressValidate == true && this.state.roomNumberValidate== true && this.state.emptyValidate==true) {

            fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/posting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'username='+ this.state.username
                + '&address=' + this.state.address + '&roomNumber=' + this.state.roomNumber
                + '&zipcode='+ this.state.zipcode  + '&smoke='+this.state.smoking+ '&partyPerson='
                +this.state.partyPerson + '&earlyMorningPerson='+ this.state.earlyMorningPerson
                + '&title='+this.state.title+ '&description='+this.state.description +'&price='+this.state.price
            }).then((response) => response.json())
            .then((res) => {

                if (res.success == true){
              //console.warn(this.state.avatarSource)
                  alert(res.message);
                  this.props.navigation.navigate('profile');
                }
                if (res.success == false){

                  alert(res.message);
                }
                }).catch((error) => {
                    alert(error);
        }).done();
      }
        // look for the error
        else {
            if (this.state.addressValidate == false && this.state.roomNumberValidate == false) {
                Alert.alert(JSON.stringify(
                    "Please enter valid address and room number"

                ));
            } else if(this.state.addressValidate == false) {
                Alert.alert(JSON.stringify(
                    "Please enter valid address"

                ));
            }
            else if (this.state.roomNumberValidate == false) {
                Alert.alert(JSON.stringify(
                    "please check the room number  (Maximum 20 rooms)"

                ));
            }
            else if (this.state.emptyValidate == false) {
                Alert.alert(JSON.stringify(
                    "please fill all the empty boxes"

                ));
            }
            // set flags


        }
    };

}


const styles = StyleSheet.create({
  container_2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  paragraph:{
    fontSize: 19,
    paddingLeft: 5,
    flex: 1
  },
  container:{
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
},
});
export default PostForm;
