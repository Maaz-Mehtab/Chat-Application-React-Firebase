import React, { Component } from 'react';
import {Signupui} from '../componentui/signup';
import {signupAction} from '../store/action/action';
import { connect } from 'react-redux'
import firebase from 'firebase';
class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            name:"",
            url:""
        }
        this._onchangeemail=this._onchangeemail.bind(this);
        this._onchangeepassword=this._onchangeepassword.bind(this);
        this.signup=this.signup.bind(this);
        this._picChange = this._picChange.bind(this);
      
    }


    _picChange(e) {
        const file=e.target.files[0];
        console.log("file",file)
        var filename=file.name
        console.log("filename",filename)

        const images = firebase.storage().ref('images/'+filename);
        images.put(file).then(snapShot => {
            images.getDownloadURL().then((url) => {
                this.setState({
                    url:url
                })
            })
        })
      





    }





    _onchangeemail(e){
        this.setState({
            email:e.target.value
        })
    }

    _onchangeepassword(e){
        this.setState({
            password:e.target.value
        })
    }

    _onchangeename(e){
        this.setState({
            name:e.target.value
        })
    }

    signup(){
        let ob={
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            url:this.state.url
        }
        console.log(ob);
        this.props.issignupAction(ob);
    }
    render(){
        // console.log(this.props.currentUser)
        // console.log(this.props.users)
        return(
            <div>
                <Signupui 
                state_email={this.state.email} 
                state_password={this.state.password}
                state_name={this.state.name}
                email={this._onchangeemail.bind(this)}
                password={this._onchangeepassword.bind(this)}
                name={this._onchangeename.bind(this)}
                _picChange={this._picChange.bind(this)}
                signup={this.signup}
                errorMessage={this.props.errorMessage}
                isError={this.props.isError}
                />
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.root.currentUser,
        users:state.root.users,
        errorMessage:state.root.errorMessage,
        isError:state.root.isError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        issignupAction: (user) => {
            dispatch(signupAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Signup);