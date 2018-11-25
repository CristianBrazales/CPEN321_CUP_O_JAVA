import React ,{ Component } from 'react';
import {ScrollView } from 'react-native';
import ManagePostDetail from './ManagePostDetail';
class ManagePost extends Component{

    state = { username:'' ,info:[] };

    getdata = async () =>{
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        this.setState({info: otherParam});
        this.setState({username:name});
    }
    readinfo(){
        return this.state.info.map(info =><ManagePostDetail key={info._id} info={info} navigation={this.props.navigation}/>);
        //   return this.state.info.map(info =><Text key={info._id}>{info.smoke}</Text>);
    }
    componentDidMount(){
        this.getdata().done();
    }

    render() {
        return (
            <ScrollView>
            {this.readinfo()}
            </ScrollView>
        );
      }



}

export default ManagePost;
