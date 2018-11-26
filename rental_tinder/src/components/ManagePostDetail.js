import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import {Button, Card, CardSection,  Input} from './common';


const ManagePostDetail = ({ info,navigation}) => {

    const { _id,username, address, zipcode, roomNumber,smoke,earlyMorningPerson, partyPerson, title, description, price} = info;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;
    function senddata(){
      navigation.navigate('modifypost',{
        userid: _id.toString(),
        address:address.toString(),
        roomnumber: roomNumber.toString(),
        smoke: smoke,
        morning:earlyMorningPerson,
        party: partyPerson,
        zipcode:zipcode,
        title: title,
        description: description,
        price: price.toString(),
      })
    }
    return (
      <Card>
        <CardSection>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{"Title: "}{title}</Text>
            <View><Text style={{fontWeight: 'bold'}}>Description: </Text><Text>{description}</Text></View>
            <View><Text style={{fontWeight: 'bold'}}>Address: </Text><Text>{address}</Text></View>
            <View><Text style={{fontWeight: 'bold'}}>Price: </Text><Text>{price}</Text></View>
            <View><Text style={{fontWeight: 'bold'}}>Username: </Text><Text>{username}</Text></View>
          </View>
        </CardSection>


        <CardSection>
          <Button onPress={() =>senddata()}>
            EDIT
          </Button>
        </CardSection>
      </Card>
    );
  };


  const styles = {
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    thumbnailStyle: {
      height: 50,
      width: 50
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    }
  };

  export default ManagePostDetail;
