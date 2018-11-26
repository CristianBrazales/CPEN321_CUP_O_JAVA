import React, { Component } from 'react';
import {Button, Card, CardSection,  Input} from './common';
import {Switch, View, Text, StyleSheet,Alert} from 'react-native';

class SearchForm extends Component{

    state = { zipcode: '',earlyMorningPerson:false, partyPerson:false, smoking:false, info:[] ,emptyValidate:false};

    ChangeState_morning = () =>this.setState(state =>({
            earlyMorningPerson: !state.earlyMorningPerson
    }));

    ChangeState_party = () =>this.setState(state =>({
        partyPerson: !state.partyPerson
    }));

    ChangeState_smoking = () =>this.setState(state =>({
        smoking: !state.smoking
    }));
    validate_empty  (zipcode){
        if (zipcode!='') {
                this.setState({ emptyValidate: true, })
            } else {
                this.setState({ emptyValidate: false, })
            }

    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                    placeholder = "Zipcode:V6T1X6"
                    label =" Zipcode:"
                    value={this.state.zipcode}
                    onChangeText={zipcode =>this.setState({zipcode})}
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
                <Button onPress={this.handlePress_search.bind(this)}>
                   Search!
                </Button>
                </CardSection>

            </Card>
        );
    }



    handlePress_search = async () => {
//http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/search
      await this.validate_empty(this.state.zipcode)

      if(this.state.emptyValidate==true){
            fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'zipcode='+ this.state.zipcode

              + '&earlyMorningPerson='+this.state.earlyMorningPerson
              + '&partyPerson=' +this.state.partyPerson+ '&smoking =' +this.state.smoking
            }).then((response) => response.json())
            .then((res) => {

                if (res.success == true){
                //  this.setState({info: res.message});
                  //alert(res.success);
                  this.props.navigation.navigate('tmppage',{
                    itemId: 86,
                    otherParam: res.message,
                  });
                }
                if (res.success == false){
                  alert("No housing found near by, Please try again");
                }
                }).catch((error) => {
                    alert("Something goes wrong");
        }).done();
      }
      else{
        Alert.alert(JSON.stringify(
            "please enter valide zipcode"

        ));
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



export default SearchForm;
