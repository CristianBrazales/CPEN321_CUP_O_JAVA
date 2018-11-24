import React, { Component } from 'react';
import {Button, Card, CardSection,  Input} from './common';
import {Switch, View, Text, StyleSheet} from 'react-native';

class SearchForm extends Component{

    state = { search: '' };



    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                    placeholder = " Search"
                    label =" Search: "
                    value={this.state.zip}
                    onChangeText={search =>this.setState({search})}
                    />
                </CardSection>
        );
    }



    handlePress_search = async () => {
//http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/search

            fetch('http://ec2-18-236-130-168.us-west-2.compute.amazonaws.com:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'zipcode='+ this.state.zipcode
            }).then((response) => response.json())
            .then((res) => {

                if (res.success == true){
                //  this.setState({info: res.message});
                  //alert(res.success);
                  this.props.navigation.navigate('tmppage',{
                    itemId: 88,
                    otherParam: res.message,
                  });
                }
                if (res.success == false){

                  alert("faild");
                }
                }).catch((error) => {
                    alert("Something goes wrong");
        }).done();

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
