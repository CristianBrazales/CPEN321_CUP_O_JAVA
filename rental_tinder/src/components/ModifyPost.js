import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input} from './common';
import {Text,View,Switch, StyleSheet} from 'react-native';

const MIN_CHARACTERS = 6;
const MAX_NUMBER = 20;
class ModifyPost extends Component{

  validate_address (address) {
      alph = /^\d+\s[A-z]+\s[A-z]+/
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
  state = { id:'' , address:'', title:'', zipcode:'',roomnumber:'', smoke: false, morning:false, party: false,addressValidate: true,roomNumberValidate: true };


      ChangeState_morning = () =>this.setState(state =>({
              morning: !state.morning
      }));

      ChangeState_party = () =>this.setState(state =>({
          party: !state.party
      }));

      ChangeState_smoking = () =>this.setState(state =>({
          smoke: !state.smoke
      }));

  getdata = async () =>{
      const { navigation } = this.props;
      const id = navigation.getParam('userid', 'NO-ID');
      const address = navigation.getParam('address', 'some default value');
      const zipcode= navigation.getParam('zipcode', 'NO-ID');
      const roomnumber= navigation.getParam('roomnumber', 'NO-ID');
      const smoke = navigation.getParam('smoke', 'NO-ID');
      const morning = navigation.getParam('morning', 'NO-ID');
      const party = navigation.getParam('party', 'NO-ID');
      this.setState({id: id});
      this.setState({address:address});
      this.setState({roomnumber:roomnumber});
      this.setState({zipcode:zipcode});
      this.setState({smoke:smoke});
      this.setState({morning:morning});
      this.setState({party:party});
  }

  componentDidMount(){
      this.getdata().done();
  }

  render(){
    return(
  /*    <View>
        <Text> {this.state.id}</Text>
        <Text> {this.state.address}</Text>
        <Text> {this.state.zipcode}</Text>
        <Text> {this.state.roomnumber}</Text>
        <Text> {this.state.smoke.toString()}</Text>
        <Text> {this.state.morning.toString()}</Text>
        <Text> {this.state.party.toString()}</Text>
      </View>*/

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
            <Input
            placeholder = {this.state.address.toString()}
            label ="Address:"
            value={this.state.address}
                onChangeText={address => this.setState({ address })}

            />
        </CardSection>

        <CardSection>
            <Input
            placeholder = {this.state.roomnumber.toString()}
            label ="# Rooms:"
            value={this.state.roomnumber}
            onChangeText={roomnumber =>this.setState({roomnumber})}
            />
        </CardSection>

        <CardSection>
            <Input
            placeholder = {this.state.zipcode.toString()}
            label =" Zipcode:"
            value={this.state.zipcode}
            onChangeText={zipcode =>this.setState({zipcode})}
            />
        </CardSection>

        <CardSection>
        <View style={styles.container}>
        <Text style={styles.paragraph}>Morning Person:</Text>
       <Switch
            onValueChange={this.ChangeState_morning}
            value={this.state.morning}
       />
       </View>
       </CardSection>


        <CardSection>
        <View style={styles.container}>
        <Text style={styles.paragraph}>Party Person:</Text>
       <Switch
            onValueChange={this.ChangeState_party}
            value={this.state.party}
       />
       </View>
       </CardSection>


        <CardSection>
        <View style={styles.container}>
        <Text style={styles.paragraph}>Smoking Person:</Text>
       <Switch
            onValueChange={this.ChangeState_smoking}
            value={this.state.smoke}
       />
       </View>
       </CardSection>

       <CardSection>
       <Button onPress={this.handlePress_change_post.bind(this)}>
        Change!
       </Button>
       </CardSection>

      </Card>
    );
  }

    handlePress_change_post = async () => {
      await this.validate_address(this.state.address)
      await this.validate_roomNumber(this.state.roomnumber)

      if (this.state.addressValidate == true && this.state.roomNumberValidate== true) {

          fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/edit/post', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:'id='+ this.state.id
              + '&address=' + this.state.address + '&roomNumber=' + this.state.roomnumber
              + '&zipcode='+ this.state.zipcode  + '&smoke='+this.state.smoke+ '&partyPerson='
              +this.state.party + '&earlyMorningPerson='+ this.state.morning
          }).then((response) => response.json())
          .then((res) => {

              if (res.success == true){
              console.warn('_id='+ this.state.id
              + '&address=' + this.state.address + '&roomNumber=' + this.state.roomnumber
              + '&zipcode='+ this.state.zipcode  + '&smoke='+this.state.smoke+ '&partyPerson='
              +this.state.party + '&earlyMorningPerson='+ this.state.morning);

                alert("Success!");
                this.props.navigation.navigate('profile');
              }
              if (res.success == false){

                alert(res.message);
              }
              }).catch((error) => {
                  alert("update failed");
      }).done();
    }

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
        // set flags


    }
    };
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    paragraph:{
        fontSize: 19,
      paddingLeft: 5,
      flex: 1
    },
});
export default ModifyPost;
