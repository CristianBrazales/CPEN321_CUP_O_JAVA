import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import {Button, Card, CardSection,  Input} from './common';
import {
  AppRegistry,

  PixelRatio,

} from 'react-native';
const PostDetail = ({ info,navigation }) => {
    const { _id,username, address, roomNumber,smoke ,title, description,price} = info;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;

    function sendemail(){
      navigation.navigate('sendemail',{
       username: username.toString(),
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
          <Button onPress={() =>sendemail()}>
            Send Email
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
      fontSize: 18
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
    },container_2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      borderRadius: 75,
      width: 150,
      height: 150,
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
  }
  };

  export default PostDetail;
