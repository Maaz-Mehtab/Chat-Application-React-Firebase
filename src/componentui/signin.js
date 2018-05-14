import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Signinui extends Component {
    render() {
        const prop = this.props

        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-dark mb-5 bg-dark text-light mb-4 borBott">
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


                            <Link className='nav-link' to='/signup'><button className="btn text-success bg-light" type="submit">Sign up</button></Link>

                        </form>
                    </div>
                </nav>

                <div className="container bg-light ml-auto mr-auto p-0 rounded col-6 borTop">
                    <h1 className='display-4 colorSignIn m-3'>Sign in</h1>
                    <div className="ml-auto mr-auto text-dark mt-4 p-3">
                        <div className='form-group row'>
                            <label className='col-form-label col-3'>Email address</label>
                            <div className='col-9'>
                                <input className="form-control" id='exampleInputEmail1' type='text' name='email' value={prop.state_email} placeholder="Enter Your Email" onChange={prop.email} />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label  className='col-form-label col-3'>Password</label>
                            <div className='col-9'>
                                <input type='password' id='exampleInputEmail2' className="form-control" name='password' value={prop.state_password} onChange={prop.password} placeholder="Enter your Password" />
                            </div>
                        </div>
                    </div>
                    <button onClick={prop.signin} className="btn btn-info container-fluid" >Log in</button>
                
                {(prop.isError) ?
                    <div className="alert alert-danger text-center" role="alert">
                        {prop.errorMessage}
                    </div>
                    : ""
                }</div>
            </div>
        )
    }
}