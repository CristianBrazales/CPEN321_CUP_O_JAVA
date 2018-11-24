import React ,{ Component } from 'react';
import {ScrollView } from 'react-native';
import PostDetail from './PostDetail';
class tmp extends Component{

    state = { info:[] };

    getdata = async () =>{
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        this.setState({info: otherParam});
    }
    readinfo(){
        return this.state.info.map(info =><PostDetail key={info._id} info={info} />);
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

export default tmp;