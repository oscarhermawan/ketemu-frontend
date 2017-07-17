import React from 'react'

import {
  StyleSheet,
  View,
  AsyncStorage,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab, Item, Input } from 'native-base';

import { connect } from 'react-redux'

import { fetchDataUser, editDataUser, fetchAsyncstorageId } from '../actions/userAction'
import { getCurrentLocation, } from '../actions'

import { Line, FindAddress } from '../components'

class FormPersonalization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      visiblePopUpPassword: false,
      addressType: '',
      homeAddressName: '',
      homeAddressGeolocation:[],
      officeAddressName: '',
      officeAddressGeolocation:[],
      password: '',
      validasiPassword: ''
    }
  }

  componentWillMount() {
    this.props.getCurrentLocation()

    // this.setState({
    //   homeAddressName: this.props.homeAddressName,
    //   homeAddressGeolocation: this.props.homeAddressGeolocation,
    //   officeAddressName: this.props.officeAddressName,
    //   officeAddressGeolocation: this.props.officeAddressGeolocation
    // })
  }

  componentDidMount() {
    // this.props.fetchAsyncstorageId()
    // console.log('CIHUUUUIII: ', this.props.navigateApp)

    console.log('INI APA??: ', typeof this.state.homeAddressName)
    console.log('INI APA??: ', typeof this.state.homeAddressGeolocation)
    console.log('INI APA??: ', typeof this.state.officeAddressName)
    console.log('INI APA??: ', typeof this.state.officeAddressGeolocation)

    AsyncStorage.getItem('id', (err, id) => {
      if (id) {
        this.props.fetchUser(id)
      }
    })
  }

  doActionEditUser() {
    this.setState({visiblePopUpPassword: true})
  }

  disablePopUpPassword() {
    this.setState({visiblePopUpPassword: false})
  }

  successEditUser() {

    let obj = {
      navigateToLandingPage: this.props.navigateApp,
      dataEdit: {
        password: this.state.password,
        officeAddressGeolocation: this.state.officeAddressGeolocation.length == 0 ? this.props.officeAddressGeolocation : this.state.officeAddressGeolocation,
        officeAddressName: this.state.officeAddressName.length == 0 ? this.props.officeAddressName : this.state.officeAddressName,
        homeAddressGeolocation: this.state.homeAddressGeolocation.length == 0 ? this.props.homeAddressGeolocation : this.state.homeAddressGeolocation,
        homeAddressName: this.state.homeAddressName.length == 0 ? this.props.homeAddressName : this.state.homeAddressName
      }
    }
    // console.log('DATA YANG MAU DIKIRIM WAKTU EDIT: ', obj)
    this.props.editUser(obj)
    this.disablePopUpPassword()
  }

  onCalloutPress = (results) => {
    this.setState({
      isModal: false,
      [`${results.type}AddressName`]: results.placeName,
      [`${results.type}AddressGeolocation`]: [results.latitude, results.longitude],
    })

  }

  handleAddressForm = (addressType) => {
    this.setState({
      isModal: true,
      addressType,
    })
    // console.log('ADDRESS TYPE: ', this.state.addressType)
  }

  render() {
    // console.log('DATA DETAIL USER: ', this.props)
    return (
      <View style={styles.parentView}>
        <Container>
          <Content>
            <Card style={{backgroundColor:'gainsboro'}}>
              <CardItem style={{backgroundColor:'gainsboro'}}>
                <Body>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Fullname: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      {this.props.name.length===0?(
                        <Text>-</Text>
                      ):(
                        <Text>{this.props.name}</Text>
                      )}
                    </View>
                  </View>
                  <Line />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Username: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      {this.props.username.length===0?(
                        <Text>-</Text>
                      ):(
                        <Text>{this.props.username}</Text>
                      )}
                    </View>
                  </View>
                  <Line />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Email: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      {this.props.email.length === 0?(
                        <Text>-</Text>
                      ):(
                        <Text>{this.props.email}</Text>
                      )}
                    </View>
                  </View>
                  <Line />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Home Address: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Item success>
                        <Input
                          placeholder={this.state.homeAddressName.length > 0 ? this.state.homeAddressName : `Set your home address`}
                          style={this.state.homeAddressName.length > 0 ? {color: 'black'} : {color: 'lightgray'}}
                        />
                        <TouchableOpacity
                          onPress={() => {this.handleAddressForm('home')}}
                        >
                          <Icon name='pin' />
                        </TouchableOpacity>
                      </Item>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Office Address: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Item success>
                        <Input
                          placeholder={this.state.officeAddressName.length > 0 ? this.state.officeAddressName : `Set your office address`}
                          style={this.state.officeAddressName.length > 0 ? {color: 'black'} : {color: 'lightgray'}}
                        />
                        <TouchableOpacity
                          onPress={() => {this.handleAddressForm('office')}}
                        >
                          <Icon name='pin' />
                        </TouchableOpacity>
                      </Item>
                    </View>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Button warning onPress={() => this.doActionEditUser()}><Text> Save </Text></Button>
                  </View>

                  <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.isModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    style={styles.parentView}
                  >
                    <View style={styles.parentView}>
                      <FindAddress style={styles.parentView} onCalloutPress={this.onCalloutPress} addressType={this.state.addressType}/>
                    </View>
                  </Modal>

                  <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.visiblePopUpPassword}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    style={styles.parentView}
                  >
                    <View style={styles.parentView}>
                      <Container style={{marginTop: 22}}>
                        <Content>
                          <View style={{flex: 1, flexDirection: 'column'}}>
                            <View>
                              {this.state.password.length === 0 ? (<Text style={{color: 'red'}}>Please input your password!</Text>) : null}
                              {/*<Item rounded>
                                <Input
                                  onChangeText={(text) => this.setState({password: text})}
                                  placeholder={this.state.password.length > 0 ? this.state.password : `Your password`}
                                  style={this.state.password.length > 0 ? {} : {color: 'lightgray'}}
                                />
                              </Item>*/}
                              <TextInput
                                onChangeText={(text) => this.setState({ password: text })}
                                value={ this.state.password }
                                style={{ width: 300 }}
                                secureTextEntry={true}
                                placeholder='Your password'
                              />


                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                              <Button warning onPress={() => this.disablePopUpPassword()}><Text> Back </Text></Button>
                              <Button warning onPress={() => this.successEditUser()}><Text> Save </Text></Button>
                            </View>
                          </View>
                        </Content>
                      </Container>
                    </View>
                  </Modal>

                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentView:{
    flex:1
  },
  upcomingData:{
    flex:4
  },
  marginText:{
    paddingTop:2,
    paddingLeft:8
  },
  formView:{
    flex:1,
    flexDirection: 'row',
    marginTop:5
  }
})

const mapStateToProps = state => {
  console.log('FORMPERSONALIZATION: ', state.users)
  return {
    name: state.users.name,
    username: state.users.username,
    email: state.users.email,
    avatarURL: state.users.avatarURL,
    officeAddressGeolocation: state.users.officeAddressGeolocation,
    officeAddressName: state.users.officeAddressName,
    homeAddressGeolocation: state.users.homeAddressGeolocation,
    updatedDate: state.users.updatedDate,
    createdDate: state.users.createdDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: data => dispatch(fetchDataUser(data)),
    getCurrentLocation: () => dispatch(getCurrentLocation()),
    editUser: data => dispatch(editDataUser(data)),
    fetchAsyncstorageId: () => dispatch(fetchAsyncstorageId())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalization)