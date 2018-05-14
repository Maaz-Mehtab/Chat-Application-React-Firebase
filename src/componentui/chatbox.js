import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';
import { connect } from 'react-redux'
export class Chatboxui extends Component {
   constructor(props) {
        super(props)
        this.state = {
            all_message: []
        }
        setTimeout(() => {
            this.setState({all_message : this.props.all_message})
        }, 3000);
        console.log("messagedata",this.state.all_message)
    // console.log("messagedata",this.props.messagedata)
    }

        
        // console.log("all message state",this.state.all_message)
    


    
        // if(this.props.all_message!==this.props.all_message){
        // console.log("component will Receive props", nextProps.deletestate);
        // console.log("component will Receive props", nextProps.isedit);
            
        // console.log("next props", nextProps.all_message)
        this.setState({
            all_message:nextProps.all_message
        })
        // console.log("state next props",this.state.all_message)

        if (nextProps.deletemess === true || nextProps.isedit === true || nextProps.isseen === true || nextProps.deletestate===true) {

            console.log("yes")
            this.setState({
                all_message:nextProps.all_message
            })
        }
        // }

        
    }

    render() {
        const prop = this.props
        // console.log("seen message",prop.seenmessage);
       

        return (

            <div>

                <div style={{ border: "1px solid black", width: "700px", overflow: "scroll", height: '70vh', padding: '1%', position: 'fixed' }}>
                    <div className="container border border-secondary">
                        <span onClick={prop.model_close} className="close cursor bg-white" style={{ fontSize: '60px' }} >&times;</span>
                        <div className="p-0">

                            <ul className='list-group p-2'>
                                <h3 className="bg-dark text-light p-2" >{prop.stated.name}</h3>
                                {prop.all_message.map((val, i) => {

                                    return (
                                        (val.senderid === prop.currentUser.uid && val.receiverid === prop.uid) ?

                                            // (prop.currentUser.id=== val.senderid) ?


                                            <li className="list-group-item col-9 bg-info text-white mb-1 align-self-start" style={{ borderRadius: '20px' }} key={i} >{val.message}
                                                <div className="container bg-light rounded text-left">
                                                    <span className="text-dark" style={{ fontSize: '12px' }} key={i} >{moment(val.time).format('LLLL')}</span>

                                                    {/* class="efa fa-pncil" */}
                                                    <span onClick={prop.editmess.bind(this, val, i)} className="text-warning ml-4" style={{ fontSize: '20px', cursor: 'pointer' }}>&#x270E;</span>

                                                    {(prop.edit === -1) ? null :
                                                        (prop.edit === i) ?
                                                            <div>
                                                                <input ref="updated" name="updated" type="text" onChange={prop.update_message} />

                                                                <button className="btn btn-success" onClick={prop._updatedone.bind(this, i)}>Done</button>


                                                            </div>
                                                            : null

                                                    }



                                                    {/* {(prop.edit === true) ?

                                                        <div>
                                                            <input type="text" value={prop.all_message.message} />
                                                            <button>Done</button>



                                                        </div>




                                                        :
                                                        <span></span>
                                                    } */}
















                                                    <span onClick={prop.deletemess.bind(this, val, i)} className="cursor text-danger ml-4" style={{ fontSize: '20px', cursor: 'pointer' }}>&times;</span>



                                                    {((val.seenmsg === false) ?
                                                        <span className="glyphicon glyphicon-star-empty text-dark float-right">Unseen</span>
                                                        :
                                                        <span className="glyphicon glyphicon-star-empty text-danger float-right">seen</span>
                                                    )}
                                                </div>
                                            </li>
                                            :
                                            (val.receiverid === prop.currentUser.uid && val.senderid === prop.uid) ?

                                                <li className="list-group-item col-9 alert-success text-dark mb-1 align-self-end" style={{ borderRadius: '20px' }} key={i} > {val.message}
                                                    <div className="container bg-light rounded text-left">
                                                        <span key={i} className="text-dark" style={{ fontSize: '12px' }}  >{moment(val.time).format('LLLL')}</span>

                                                    </div>
                                                </li>
                                                :
                                                <span></span>


                                    )







                                })} <textarea className="form-control container m-0" rows='3' name="message" value={prop.mesastate} onChange={prop.messag} type="text" placeholder="type message..."></textarea>
                                <button onClick={prop.msg} className="btn btn-success m-0 container-fluid">Send</button>


                                {/* {((prop.all_message===null ) ?


                    <div className="container-fluid d-flex flex-row-reverse row">
                   <span className="close cursor bg-white" >&times; X</span>
                        <div className="col-sm-6 border border-secondary">
                            <div className="p-0">
                                <h3 className="bg-dark text-light p-2" >{prop.stated.name}</h3>
                                <ul>


                                </ul>
                                <textarea className="form-control container m-0" rows='3' name="message" value={prop.mesastate} onChange={prop.messag} type="text" placeholder="type message..."></textarea>
                                <button onClick={prop.msg} className="btn btn-success m-0 container-fluid">Send</button>
                            </div>
                        </div>
                    </div>
                    :



                    <div className="container-fluid d-flex flex-row-reverse row">
                   
                        <div className="col-sm-6 border border-secondary">
                         <span className="close cursor bg-white" style={{ fontSize: '60px' }} >&times;</span>
                            <div className="p-0">
                                <h3 className="bg-dark text-light p-2" >{prop.stated.name}</h3>
                                <ul className='list-group p-2'>


                                {prop.all_message.map((val, i) => {
                               
                                        return
                                        (prop.change === val.senderid) ?
                                    <li className="list-group-item col-9 alert-success text-dark mb-1 align-self-end" style={{ borderRadius: '20px'}} key={i} >{val.message}
                                                <div className="container bg-light rounded text-right">
                                                <span className="text-dark" style={{ fontSize: '12px' }} key={i} >{moment(val.time).format('LLLL')}</span> 
                                                    
                                                </div>
                                            </li>



                                            :

                                            <li className="list-group-item col-9 bg-info text-white mb-1 align-self-start" style={{ borderRadius: '20px'}} key={i} > {val.message}
                                            <div className="container bg-light rounded text-left">
                                                <span key={i} className="text-dark" style={{ fontSize: '12px' }} key={i} >{moment(val.time).format('LLLL')}</span>
                                                {((val.flag === false) ?
                                                        <span className="glyphicon glyphicon-star-empty text-dark float-right">seen</span>
                                                        :
                                                        <span className="glyphicon glyphicon-star-empty text-dark float-right">seen</span>
                                                    )}
                                            </div>
                                        </li>



})}     
                                        )
                                    )
                                   
                                </ul>
                                <textarea className="form-control container m-0" rows='3' name="message" value={prop.mesastate} onChange={prop.messag} type="text" placeholder="type message..."></textarea>
                                <button onClick={prop.msg} className="btn btn-success m-0 container-fluid">Send</button>
                            </div>
                        </div>
                    </div>

                )} */}
                            </ul>
                        </div>
                    </div>         </div>

                :
                <span></span>
            </div>

        )
    }
}

