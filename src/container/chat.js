import React, { Component } from 'react';
import {Chatui} from '../componentui/chat';
import {Logout,send, chang,fun } from '../store/action/action'

import { connect } from 'react-redux'
// import { lang } from 'moment';
class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            email:'',
            url:'',
            box:false,
            senderid:'',
            a:'',
            b:'',
           
        }
        this.recepientid=this.recepientid.bind(this);
        
        this.Logoutt=this.Logoutt.bind(this);
    }


    recepientid(id, uid) {
        // console.log("CHAT APP");
        // this.props.isdisplay();
        let sendid = this.props.currentUser.uid;
        this.setState({
            a:id,
            b:uid
        })
        // console.log("id",id);
        // console.log("uid",uid);
        let ob = {
            id: id.uid,
            name: id.name,
            email: id.email,
            box: true,
            sendid: sendid
        }
        this.setState({
            id: ob.uid,
            name: ob.name,
            email: ob.email,
            box: true,
            senderid: ob.sendid
        })
        
        
        this.props.issend(ob);
      
           this.props.ischang(uid);
       
           
       }
       Logoutt(){
        //    console.log("LOGOUT");
           this.props.isLogout();
       }


     

    render(){
        
        return(
            <div>
                
                <Chatui
                    states={this.state}
                    recepientid={this.recepientid}
                    currentUser={this.props.currentUser}
                    users={this.props.users}
                    // recepientid={this.recepientid}
                    id={this.state.a}
                    uid={this.state.b} 
                    Logoutt={this.Logoutt.bind(this)}
                  
                
                   />
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("@@@",state.root.total)
    return {
        currentUser: state.root.currentUser,
        users: state.root.users,
        send: state.root.send,
        change: state.root.change,
        all_message:state.root.all_message
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        issend: (data) => {
            dispatch(send(data))
        },
        ischang: (data) => {
            dispatch(chang(data))
        },
        isfuc :(data)=>{
            dispatch(fun(data))
        },
       
        isLogout:()=>{
            dispatch(Logout())
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);