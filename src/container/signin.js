import React, { Component } from 'react';
import {Signinui} from '../componentui/signin';
import {signinAction,diss } from '../store/action/action';
import {connect} from 'react-redux';
class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
        this._onchangeemail=this._onchangeemail.bind(this);
        this._onchangeepassword=this._onchangeepassword.bind(this);
        this.signin=this.signin.bind(this)
        this.dis=this.dis.bind(this)
   
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

    dis(){
        this.props.isdiss();
    }


    signin(){
        let ob={
            email:this.state.email,
            password:this.state.password
        }
        // console.log(ob);
        this.props.issigninAction(ob,this.dis);
        // this.props.isdisplay();
    }
    render(){
        return(
            <div>
                <Signinui 
                state_email={this.state.email} 
                state_password={this.state.password}
                email={this._onchangeemail.bind(this)}
                password={this._onchangeepassword.bind(this)}
                signin={this.signin}
                errorMessage={this.props.errorMessage}
                isError={this.props.isError}  />
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
        issigninAction: (user,diss) => {
            dispatch(signinAction(user,diss))
        },
        isdiss:()=>{
            dispatch(diss())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Signin);