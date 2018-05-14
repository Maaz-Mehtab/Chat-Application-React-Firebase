import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../index.css';
import Chatbox from '../container/chatbox';
export class Chatui extends Component {
    render() {
        const prop = this.props
        console.log("cc",prop.currentUser)


        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-dark text-light bg-dark borBott">
                    <a className="navbar-brand">Chat Champ</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {/* <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link> */}
                            </li>
                            <li className="nav-item active">
                                {/* <Link className="nav-link" to='/create'>CreatePoll <span className="sr-only">(current)</span></Link> */}
                            </li>

                        </ul>
                        <form className="form-inline my-2 my-lg-0">


                        <button onClick={prop.Logoutt} className="btn text-success bg-light" type="submit">Log out</button>

                        </form>
                    </div>
                </nav>
                <div style={{ border: "1px solid black", width: "350px", overflow: "scroll", height: '90vh', padding: '1%', position: 'fixed' }}>

                

                <h3 className='container-fluid pt-3 pb-2' style={{ borderBottom: '2px solid grey', backgroundColor: 'rgba(0, 126, 31, 0.37)' }}>
                <img src={prop.currentUser.url} className="img-circle" style={{width:"100px",height:"100px"}}/>
                
                {prop.currentUser.name}'s chats</h3>


            

                <div className="container mt-4">
                <h2 className='text-secondary'>Select a chat to send message</h2>
                    <ul>
                        {Object.keys(prop.users).map((item, i) => (
<div key={i}>

<img  src={prop.users[item].url} className="img-rounded " style={{width:"50px",height :"50px",display:"inline"}} alt="Profile-Image"/>
                            <button className="btn btn-secondary col-sm-9 text-dark bg-white mb-1 p-0 font-weight-bold text-center" style={{borderRight: '5px solid rgba(0, 126, 31, 0.527)',borderLeft: '5px solid rgba(0, 126, 31, 0.527)'}}
                                onClick={prop.recepientid.bind(this, prop.users[item], prop.users[item].uid)} key={i}  >
                               
                                <li className='list-group-item bg-light' key={i}>
                                
                               
                                    {prop.users[item].name}

                                    
                                </li>
                            </button>
                            </div>
                        ))}

                    </ul>
                      
                </div>
                </div>
                {(prop.states.box === false) ?
                    <span></span>

                    :
                    <div className="container row ">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8 mt-4">
                    <Chatbox  recepientid={prop.recepientid.bind(this)} id={prop.id} uid={prop.uid} isseen={prop.isseen} />
                    </div>
                        
    </div>                        
                }


            </div>
        )
    }
}