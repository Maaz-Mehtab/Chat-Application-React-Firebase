
import history from '../../History';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBll_oanbXLq-s_g7Tbp9hM6UwHkjaTBhI",
    authDomain: "todoapp-11111.firebaseapp.com",
    databaseURL: "https://todoapp-11111.firebaseio.com",
    projectId: "todoapp-11111",
    storageBucket: "todoapp-11111.appspot.com",
    messagingSenderId: "937490587630"
};
firebase.initializeApp(config);

export function registerFail(error) {
    return {
        type: "REGISTER_FAIL",
        payload: error.message
    }
}

export function signupAction(user) {

    return dispatch => {
        console.log('user', user);
		console.log(firebase.auth().createUserWithEmailAndPassword(user.email, user.password))
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('users/').once('value')
                            .then((userData) => {
                                let allUsers = userData.val();
                                let currentUserUid = firebase.auth().currentUser.uid;
                                dispatch({ type: "ALLUSERS", payload: allUsers })
                                dispatch({ type: "CURRENTUSER", payload: currentUserUid })
                                firebase.database().ref('/').child('Message').on('child_added', (snap) => {
                                    var obj = snap.val();
                                    obj.id = snap.key;
                                    // console.log(obj);
                                })
                                history.push('/');
                            })
                    })
            }).catch((error) => {
                console.log("error",error);
                dispatch({ type: "REGISTER_FAIL", payload: error.message})
            })
    }
}



export function chang(data){
    return dispatch =>{
        dispatch ({ type :"CHANGE" , payload : data})
    }
}
let allmessage_send=[];
export function diss(){
    return dispatch=>{
        firebase.database().ref('/').child("Message/").on('child_added',(snap) =>{
            var obj=snap.val();
            obj.messageid=snap.key;
            allmessage_send.push(obj);
            
            console.log("ar",allmessage_send);
            dispatch({ type:"ALL_MESSAGE" ,payload:allmessage_send})
        })

    }
}



// let allmessage_send=[];
export function signinAction(user,dis) {
    return dispatch => {
            console.log("user",user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let allUsers = userData.val();
                        let currentUserUid = firebase.auth().currentUser.uid;
                         firebase.database().ref('/').child("users").on('child_added', (snap) => {
                            var obj = snap.val();
                            obj.id = snap.key;
                            if (obj.id === currentUserUid) {
                                dispatch({ type: "ALLUSERS", payload: allUsers })
                                dispatch({ type: "CURRENTUSER", payload: obj })
                                dis()
                                // firebase.database().ref('/').child("Message/").on('child_added',(snap) =>{
                                //     var obj=snap.val();
                                //     obj.messageid=snap.key;
                                //     allmessage_send.push(obj);
                                    
                                //     console.log("ar",allmessage_send);
                                //     dispatch({ type:"ALL_MESSAGE" ,payload:allmessage_send})
                                // })




                                history.push('/chat');
                            }
                        })



                    })
            }).catch((error) => {
                console.log("error",error);
                dispatch({ type: "REGISTER_FAIL", payload: error.message})
            })
    }
}


export function Logout(){
    return dispatch =>{
        // firebaseSignOut.signOut()
        // firebase.auth.signOut();
        // loggedInUser.signOut(); 

        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        
        dispatch({type:"LOGOUT"})
        history.push('/');
    }
}

// export function send(data) {
//     return dispatch => {
//         console.log("action",data)
//         let arr = []
//         arr.push(data);
//         // console.log("action arr",arr)
//         dispatch({ type: "SEND", payload: data })


      

//     }
// }
export function edit(data,i)
{
// console.log("Data",data);
// console.log("i",i);

}


let collect=[]
export function del(data,i,dis){
    return dispatch =>{
        //     console.log("data",data);
        // console.log("i",i);
        console.log("data",data);
        console.log("before delete",allmessage_send)
        firebase.database().ref('/').child("Message/"+data).remove()
        .then(()=>{
            firebase.database().ref('/').child("Message/").on('child_added',(snap) =>{
                                    var obj=snap.val();
                                    obj.messageid=snap.key;
                                    collect.push(obj);
                                    
                                    console.log("collect",collect);
                                    dispatch({ type:"ALL_MESSAGE" ,payload:collect})
                                })
        })
        
        // allmessage_send.splice(i,1);
         

                // console.log("after delete ",allmessage_send)
                //     dispatch({ type:"UPDATE",payload:allmessage_send})
 }}


 export function update(data,i){
    return dispatch =>{
        //  console.log("data",data);
        //  console.log("index",i);
         let id=data.messageid;
         delete data.messageid
        //  console.log("after",data);
         firebase.database().ref('/').child('Message/'+id).update(data)
        allmessage_send.splice(i,1,data)
        // console.log("All_message",allmessage_send)
         dispatch({type:"UPDATE_MESSAGE",payload:allmessage_send})
    }
}

export function seeen(data,i){
    return dispatch =>{
    //    console.log("seen",data.seenmsg); 
    //     console.log("Dataid",data.messageid)
        if(data.seenmsg===false){
        let ob={
            message:data.message,
            senderid:data.senderid,
            receiverid:data.receiverid,
            seenmsg:true,
            se:true,
            time:data.time
        }

        // console.log("Messageid ",messageid)
    
        firebase.database().ref('/').child('Message/'+data.messageid).update(ob)
        // console.log("index",i);
        allmessage_send.splice(i,1,ob);
        // console.log("after",allmessage_send);
        dispatch({ type:"SEEN",payload:allmessage_send})
    }
    }}










export function messagese(data) {
    return dispatch => {
        // console.log("action data ka patao", data);


        console.log("all_message before",allmessage_send)
        firebase.database().ref('Message/').push(data)
            .then(() => {
                // console.log('Message Send');
                allmessage_send.concat(data);
                console.log("concat",allmessage_send)
                dispatch({ type: "MESSAGE_SEND", payload: allmessage_send })
            })
                
      

        }
}



export function send(data) {
    return dispatch => {
        // console.log("send data action",data)
        let arr = []
        arr.push(data);
        // console.log("action arr",arr)
        dispatch({ type: "SEND", payload: data })


      

    }
}






export function fun(data) {
    return dispatch => {
        // console.log("action function",data)

        dispatch({type :"FUNC" ,payload:data })
      
        // console.log("action arr",arr)
      

        
    }
}





