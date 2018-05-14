import React, { Component } from 'react';
import {Chatboxui} from '../componentui/chatbox';
import {update,send,edit,messagese,del,diss} from '../store/action/action'
import { connect } from 'react-redux'
import firebase from 'firebase';
// import moment from 'moment';

class Chatbox extends Component{
    constructor(props){
        super(props);
        super(props);
        this.state={
            id:'',
            name:'',
            email:'',
            box:false,
            senderid:'',
            message:'',
            seenmsg:false,
            se:true,
            note:false,
            edit:-1,
            delete:false,
            update:'',
            messageid:'',
            isedit:false,
            messagedata:[],
            all:[]
        }
        setTimeout(() => {
            this.setState({
                all:this.props.all_message
            })    
        }, 1500);
        
        // console.log("all_message",this.props.all_message);

        // console.log("props chat box id",this.props.id);
        // console.log("props chat box uid",this.props.uid);
        // console.log("props chat box",props.func);
        this._messa=this._messa.bind(this);
        this._messageOnchange=this._messageOnchange.bind(this);
        this.deletemess=this.deletemess.bind(this)        
        this.editmess=this.editmess.bind(this);
        this.dis=this.dis.bind(this)
        let arr=[];
        firebase.database().ref('/').child("Message/").on('child_added',(snap) =>{
            var obj=snap.val();
            obj.messageid=snap.key;
            arr.push(obj);
            
            // console.log("CONTAINER",arr);
          setTimeout(() => {
            this.setState({
                messagedata:arr
            })  
          }, 2000);
            
            // console.log("message data",this.state.messagedata)
        })
        
    //     this.seenmessage=this.seenmessage.bind(this);
    //     this.seenmessage();    
    // // this._messageUpdate=this.__messageUpdate.bind(this);    
    // this.seenmessage=this.seenmessage.bind(this);    
    
    }
    
    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            console.log("delete message ",nextProps.all_message)
        }, 2000);
    }
 
        


    _messageOnchange(e){
        this.setState({
            message:e.target.value
        })
    }

    _messa(){
        
        // console.log("vvvv",this.props.send.sendid);
        // console.log("vvvv",this.props.change);
        // console.log("vvvv",this.props.uid);
        // console.log("vvv",this.props.currentUser.id);
        let ob={
            senderid:this.props.currentUser.id,
            receiverid:this.props.send.id,
            message:this.state.message,
            seenmsg:this.state.seenmsg,
            se:true,
            time:firebase.database.ServerValue.TIMESTAMP
        }
        

        // let user={
        //     email:this.props.currentUser.email,
        //     password:this.props.currentUser.password
        // }
        // console.log("user",user);
        // this.props.issigninAction(user);


        this.props.ismessagese(ob);
        
        // this.props.isdisplay();
         


        this.setState({
            message:''
        })
     
        
    }

    
    dis(){
        this.props.isdiss();
    }
    
    deletemess(data,i){
        let d=Date.now();
        let difference = d-data.time;
        if(difference<60000){
            // console.log("Congrats")
            console.log("Data",data.messageid);
            this.props.isdel(data.messageid,i, this.dis)
            setTimeout(() => {
                this.setState({
                    delete:true,
                    all:this.props.deletemessage
                })
            }, 2000);

           
            console.log("Delete",this.state.all)
            console.log("delete props",this.props.deletemessage)
        }
        else{
            alert("No Delete this Message over Exceed Time Limit");
        }
    }


    editmess(data,i){
        // console.log("edit message",data);
        // console.log("edit message index",i);
        let d=Date.now();
        let difference = d-data.time;
        if(difference<60000){
            this.setState({
                edit:i,
                messageid:data.id
            })

        }
        else{
            alert("No Edit Message Time over Limit")
        }
            

        // this.props.isdel(data.id,i)
            
  
    }

    _messageUpdate(e){
        this.setState({
            update:e.target.value
        })
    }

    _updatedone(i,e){
        // console.log("index",i)
        // console.log("index",e);
        if(this.state.update===""){
            alert("Please enter a message");
            
        }
        else{
        let ob={
            messageid:this.state.messageid,
            message:this.state.update,
            senderid:this.props.currentUser.id,
            receiverid:this.props.send.id,
            seenmsg:this.state.seenmsg,
            se:true,
            time:firebase.database.ServerValue.TIMESTAMP
        }

        
        this.setState({
            edit:-1
        })
        this.props.isupdate(ob,i);

        this.setState({
            isedit:true
        })

    }

    }



    // seenmessage(){
    //     let currentUser=this.props.currentUser;
    //     console.log("currentUSer",currentUser);
    //     let all_message=this.props.all_message
    //     let rec=this.props.send;
    //     console.log("recepint user",rec);
    //     for(var i=0;i<all_message.length;i++){
    //         console.log("recerverid",all_message[i].receiverid)
    //         console.log("recerverid",all_message[i].senderid)
    //     if(currentUser===all_message[i].receiverid && rec===all_message[i].senderid){
    //         console.log("Seen kara do");
    //     }}
    // }

    
    render(){
        
        return(
            <div>
                <Chatboxui
                stated={this.props.send}
                currentUser={this.props.currentUser}
                users={this.props.users}
                msg={this._messa.bind(this)}
                messag={this._messageOnchange.bind(this)}
                mesastate={this.state.message}
               
                change={this.props.change}
               
                se={this.state.se}
               
                msggg={this.state.message}
                recepientid={this.props.recepientid.bind(this)}
                id={this.props.id}
                uid={this.props.uid}
                note={this.state.note}
                // all_message={this.state.messagedata}
                // all_message={this.props.all_message}
                all_message={this.state.all}
                deletemess={this.deletemess}
                deletestate={this.state.delete}
                editmess={this.editmess}
                edit={this.state.edit}
                update_message={this._messageUpdate.bind(this)}
                _updatedone={this._updatedone.bind(this)}
                isedit={this.state.isedit}
                isseen={this.props.isseen}
                // seenmessage={this.seenmessage.bind(this)}
                                />
             
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("!!!",state.root.show)
    return {
        currentUser: state.root.currentUser,
        users:state.root.users,
        send:state.root.send,
        change:state.root.change,
        all_message:state.root.all_message,
        deletemessage:state.root.deletemessage
       

       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        issend: (data) => {
            dispatch(send(data))
        },
        ismessagese:(data)=> {
            dispatch(messagese(data))
        },
        
        isdel :(data,i,dis)=>{
            dispatch(del(data,i,dis))
        },
        isedit :(data,i) =>{
            dispatch(edit(data,i))
        },
        isupdate :(data,i)=>{
            dispatch(update(data,i))
        },
        isdiss:()=>{
            dispatch(diss())
        }
   
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Chatbox);