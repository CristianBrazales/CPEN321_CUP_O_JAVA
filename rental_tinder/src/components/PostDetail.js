import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import {Button, Card, CardSection,  Input} from './common';
import {
  AppRegistry,

  PixelRatio,

} from 'react-native';
const PostDetail = ({ info,navigation }) => {
    const { _id,username, address, roomNumber,smoke,photo} = info;
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
            <Text style={headerTextStyle}>{"ID:"}{_id}</Text>
            <Text>{"Username:"}{username}</Text>
            <Text>{"Address:"}{address}</Text>
            <Text>{"somke:"}{smoke.toString()}</Text>
            <Text>{photo.toString()}</Text>
          </View>
        </CardSection>
        <CardSection>
                        <View style={styles.container_2}>

               <View
                 style={[
                   styles.avatar,
                   styles.avatarContainer,
                   { marginBottom: 20 },
                 ]}
               >
                 {
                   <Image style={styles.avatar} source={this.state.avatarSource} />
                 }
               </View>


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
