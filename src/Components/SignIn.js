import React from 'react';
import Appointments from './Appointments';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function SignIn() {
    let nameUser;
    let passwordUser;
    let rememberMe;

    let SignIn = () => {
        if (nameUser.value === 'admin' && passwordUser.value === 'admin') {
            if (rememberMe.checked == true) {
                localStorage.setItem('SignInTime', `${new Date().getMinutes() * 60000}`);

                nameUser.value = '';
                passwordUser.value = '';
                rememberMe.checked = false;
            }
        }
    }

    let SignInState = false;

    if (localStorage.getItem('SignInTime') !== null) {
        SignInState = true;
    }

    if (SignInState) return <Redirect to={'/appointments'} />;

    return (
        <BrowserRouter>
            <div className="container d-flex justify-content-center">
                <div class="card mt-5 col-5">
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Your name</label>
                                <input type="text" class="form-control" placeholder="admin" ref={(value) => nameUser = value} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" placeholder="admin" ref={(value) => passwordUser = value} />
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" ref={(value) => rememberMe = value} />
                                <label class="form-check-label" for="exampleCheck1">Remember me</label>
                            </div>
                            <a href="/appointments" style={{ width: "100%" }} class="btn btn-dark" onClick={SignIn}>Sign In</a>
                        </form>
                    </div>
                </div>
            </div >
        </BrowserRouter>
    );
}

export default SignIn;