import React, { useState,useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
import api from '../../utils/api';
import './login.css';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


function LoginModal({ history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        window.$('#signup').click(function() {
            window.$('.pinkbox').css('transform', 'translateX(80%)');
            window.$('.signin').addClass('nodisplay');
            window.$('.signup').removeClass('nodisplay');
          });
          
          window.$('#signin').click(function() {
            window.$('.pinkbox').css('transform', 'translateX(0%)');
            window.$('.signup').addClass('nodisplay');
            window.$('.signin').removeClass('nodisplay');
          });
    });

    
    const login = (e) => {
        e.preventDefault()

        api.post('auth/signin', {
            email: e.target.email.value,
            password: e.target.password.value,
        }).then(res => {
            const { accessToken } = res.data;
            sessionStorage.setItem('token', accessToken);
            sessionStorage.setItem('uid', res.data.uid)
            alert("안녕하세요~")
            history.push("/")
        }).catch(err => {
            alert("아이디와 비밀번호를 확인해주세요.")
        })
    }


    return (
        <>
            <li onClick={handleShow}>
                로그인
            </li>

            <Modal show={show} onHide={handleClose} size="lg">
            
                <div className="welcome">
                    <div className="pinkbox">
                        <div className="signup nodisplay">
                            <h1 className ="register">register</h1>
                            <form autocomplete="off">
                                <input type="text" placeholder="username"></input>
                                <input type="email" placeholder="email"></input>
                                <input type="password" placeholder="password"></input>
                                <input type="password" placeholder="confirm password"></input>
                                <button className="button submit">create account </button>
                            </form>
                        </div>
                        <div className="signin">
                                <h1 className ="register">sign in</h1>
                                <form className="more-padding" autocomplete="off">
                                    <input type="text" placeholder="username"></input>
                                    <input type="password" placeholder="password"></input>
                                    <div className="checkbox">
                                        <input type="checkbox" id="remember" /><label for="remember">remember me</label>
                                    </div>

                                    <button className="button submit">login</button>
                                </form>
                        </div>
                    
                    </div>
                    <div className="leftbox">
                            <h2 className="title"><span>BLOOM</span>&amp;<br/>BOUQUET</h2>
                            <p className="desc">pick your perfect <span>bouquet</span></p>
                            <img className="flower smaller" src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg" alt="1357d638624297b" border="0"/>
                            <p className="account">have an account?</p>
                            <button className="button signbutton" id="signin">login</button>
                        </div>
                        <div className="rightbox">
                            <h2 className="title"><span>BLOOM</span>&amp;<br/>BOUQUET</h2>
                            <p className="desc"> pick your perfect <span>bouquet</span></p>
                            <img className="flower" src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"/>
                            <p className="account">don't have an account?</p>
                            <button className="button signbutton" id="signup">sign up</button>
                        </div>
                </div>
           
                
            </Modal>
        </>
    );
}

export default withRouter(LoginModal);
