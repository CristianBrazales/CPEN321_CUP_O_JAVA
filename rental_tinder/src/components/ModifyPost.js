import React ,{ Component } from 'react';
import {Button, Card, CardSection,  Input, MessageInput} from './common';
import {Text,View,Switch, StyleSheet,Alert} from 'react-native';

const MIN_CHARACTERS = 6;
const MAX_NUMBER = 20;
class ModifyPost extends Component{

  validate_address (address) {

      if (address!='') {
          this.setState({ addressValidate: true, })
      } else {
          this.setState({ addressValidate: false, })
      }
  }
  //validate the password input
  validate_roomNumber  (roomNumber){
      if ( roomNumber!= '') {
              this.setState({ roomNumberValidate: true, })
          } else {
              this.setState({ roomNumberValidate: false, })
          }

}
validate_empty  (title,description,price,zipcode){
    if (title!='' && description!='' && price!='' && zipcode !='') {
            this.setState({ emptyValidate: true, })
        } else {
            this.setState({ emptyValidate: false, })
        }

}
  state = { id:'' , address:'', title:'', zipcode:'',roomnumber:'', smoke: false, morning:false, party: false,addressValidate: true,roomNumberValidate: true, description:'',price:'',emptyValidate:false};


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
      const title = navigation.getParam('title', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const price = navigation.getParam('price', 'NO-ID');
      this.setState({id: id});
      this.setState({address:address});
      this.setState({roomnumber:roomnumber});
      this.setState({zipcode:zipcode});
      this.setState({smoke:smoke});
      this.setState({morning:morning});
      this.setState({party:party});
      this.setState({title:title});
      this.setState({description:description});
      this.setState({price:price});
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
            placeholder = {this.state.title}
            label ="Title:"
            value={this.state.title}
            onChangeText={title => this.setState({ title})}
            />
        </CardSection>

        <CardSection>
            <MessageInput
              placeholder = {this.state.description}
              label ="Description:"
              value={this.state.description}
              onChangeText={description => this.setState({ description})}
              />
          </CardSection>



          <CardSection>
              <Input
                placeholder = {this.state.price}
                label ="Price:"
                value={this.state.price}
                onChangeText={price => this.setState({ price})}

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
      await this.validate_empty(this.state.title,this.state.description,this.state.price, this.state.zipcode)

      if (this.state.addressValidate == true && this.state.roomNumberValidate== true && this.state.emptyValidate==true) {

          fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/edit/post', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:'id='+ this.state.id
              + '&address=' + this.state.address + '&roomNumber=' + this.state.roomnumber
              + '&zipcode='+ this.state.zipcode  + '&smoke='+this.state.smoke+ '&partyPerson='
              +this.state.party + '&earlyMorningPerson='+ this.state.morning+ '&title='+this.state.title+
              '&description='+this.state.description +'&price='+this.state.price
          }).then((response) => response.json())
          .then((res) => {

              if (res.success == true){

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
                "please check the room number  "

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
