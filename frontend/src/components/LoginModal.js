import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import ModalButton from '../components/common/Button';
import api from '../utils/api';
import styled from 'styled-components';
import palette from '../lib/styles/palette';

function LoginModal({history}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = (e) => {
    e.preventDefault()
    console.log(login, e)
    console.log("아이디 " + e.target.email.value)
    console.log("비밀번호 " + e.target.password.value)
    api.post('auth/signin', {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then(res => {
      const {accessToken} = res.data;
      sessionStorage.setItem('token', accessToken);
      console.log(res)
      alert("안녕하세요~")
      history.push("/")
    }).catch(err => {
      console.log(err)
      alert("아이디와 비밀번호를 확인해주세요.")
    })
  }

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

  return (
    <>
      <a onClick={handleShow}>
        로그인
      </a>

      <Modal show={show} onHide={handleClose} size="lg">
        <Container>
          <Row>
            <Col>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                width="100%"
                height="100%"
              ></img>
            </Col>

            <Col>
              <Modal.Header closeButton>
                <Modal.Title>로그인</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={login}>
                  <StyledInput type="text" name="email" placeholder="email" />
                  <StyledInput type="password" name="password" placeholder="password" />
                  <LoginBtn type="submit" value="로그인" />
                </form>
                <Container>
                  <Row>
                    <Col>
                      <img
                        src="https://lh3.googleusercontent.com/proxy/okXqT_2TAIoQQLm20uGMhA3GA8P4IXBiWChRKaekYyLXxsJnOtNuIGqPK1LFjZXzBuVxk819Yqu_317m2iAf9hFFGCVhIWNoxSlSnY7zFWAsZphwo9BtiK5G2YUYxjEIXjukCwoHJvMVKAwW48CQo69lTYonZXJJ1BlAZiFtBdnchw6E1M2RmG3naSulRcduNrOioVA8nMxeS6H8"
                        alt=""
                        width="25%"
                      ></img>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>

              <Modal.Footer>
                <NavLink to="/register">
                  <ModalButton onClick={handleClose} cyan fullWidth>
                    회원가입
                  </ModalButton>
                </NavLink>
              </Modal.Footer>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}

export default withRouter(LoginModal);
