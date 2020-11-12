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
    // console.log(login, e)
    // console.log("아이디 " + e.target.email.value)
    // console.log("비밀번호 " + e.target.password.value)
    api.post('auth/signin', {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then(res => {
      // console.log("로그인 데이터 " + JSON.stringify(res.data))
      // console.log("로그인 uid " + JSON.stringify(res.data.uid))
      const { accessToken } = res.data;
      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('uid', res.data.uid)
      // console.log(res)
      alert("안녕하세요~")
      history.push("/")
    }).catch(err => {
      // console.log(err)
      alert("아이디와 비밀번호를 확인해주세요.")
    })
  }

  return (
    <>
      <li onClick={handleShow}>
        로그인
      </li>

      <Modal show={show} onHide={handleClose} size="lg">
        <Container>
          <Row>
            <Col>
              <img
                src="https://lab.ssafy.com/s03-final/s03p31a409/uploads/3960e6fd2eed33ded85590499d95b729/7FB9DDA2-C9B7-473B-BD78-282A33AA084F-9716-000009E931E8FB4C_file.jpg"
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
                {/* <Container>
                  <Row>
                    <Col>
                      <img
                        src="https://lh3.googleusercontent.com/proxy/okXqT_2TAIoQQLm20uGMhA3GA8P4IXBiWChRKaekYyLXxsJnOtNuIGqPK1LFjZXzBuVxk819Yqu_317m2iAf9hFFGCVhIWNoxSlSnY7zFWAsZphwo9BtiK5G2YUYxjEIXjukCwoHJvMVKAwW48CQo69lTYonZXJJ1BlAZiFtBdnchw6E1M2RmG3naSulRcduNrOioVA8nMxeS6H8"
                        alt=""
                        width="25%"
                      ></img>
                    </Col>
                  </Row>
                </Container> */}
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
