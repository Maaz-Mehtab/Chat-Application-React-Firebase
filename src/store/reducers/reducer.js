const INITIAL_STATE = {
    authUser: {},
    isAuthenticated: false,
    isProcessing: false,
    isRegistered: false,
    isError: false, 
    errorMessage: {},
    currentUser:'',
    users: [],
    all_message:[],
    message_send:[],
    update_message:[],
    deletemessage:[]
    

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CURRENTUSER":
        return ({
            ...state,
            currentUser: action.payload,isError:false
        }) 
        case "REGISTER_FAIL":
            return ({ ...state, errorMessage: action.payload, isProcessing: false, isError: true })  
    case "ALLUSERS":
        return ({
            ...state,
            users: action.payload
        })
        
        case "LOGOUT":
        return  INITIAL_STATE        
        
        case "SEND":
        return  ({
            ...state,
            send:action.payload
        })
     case "ALL_MESSAGE":
        return {
            ...state,
            all_message:action.payload
        }
        case "UPDATE":
        return {
            ...state,
            deletemessage:action.payload,
            
        }
    
        case "UPDATE_MESSAGE":
        return({
            ...state,
            all_message:action.payload
        })
       case "SEEN":
       return ({
           ...state,
           all_message:action.payload
       })
        default:
            return state;
    }

}