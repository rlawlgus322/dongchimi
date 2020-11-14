import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import ModalButton from '../common/Button';
import api from '../../utils/api';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'

const StyledInput = styled.input`
  font-size: 1.25rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.teal[7]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const LoginBtn = styled.input`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  height: 50px;
  variant: info;

  background: info;
  &:hover {
    background: info;
  }
`;

function LoginModal({ history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <div className="page">
                    <div className="container">
                        <div className = "left">
                            <div className = "login">Login</div>
                            <div className="eula">By logging in you agree to the ridiculously long terms that you didn't bother to read</div>               
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default withRouter(LoginModal);
