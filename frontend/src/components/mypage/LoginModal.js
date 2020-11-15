import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import api from '../../utils/api';
import './login.css';
import jQuery from "jquery";
import dongchimi2 from 'lib/dongchimi2.png';
import styled from 'styled-components';
window.$ = window.jQuery = jQuery;


const Li = styled.li`
  margin-left: 15px;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
`

function LoginModal({ history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        window.$('#signup').click(function () {
            window.$('.pinkbox').css('transform', 'translateX(80%)');
            window.$('.signin').addClass('nodisplay');
            window.$('.signup').removeClass('nodisplay');
        });

        window.$('#signin').click(function () {
            window.$('.pinkbox').css('transform', 'translateX(0%)');
            window.$('.signup').addClass('nodisplay');
            window.$('.signin').removeClass('nodisplay');
        });

        /* ===== Logic for creating fake Select Boxes ===== */
        window.$('.sel').each(function () {
            window.$(this).children('select').css('display', 'none');

            var $current = window.$(this);

            window.$(this).find('option').each(function (i) {
                if (i == 0) {
                    $current.prepend(window.$('<div>', {
                        class: $current.attr('class').replace(/sel/g, 'sel__box')
                    }));

                    var placeholder = window.$(this).text();
                    $current.prepend(window.$('<span>', {
                        class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                        text: placeholder,
                        'data-placeholder': placeholder
                    }));

                    return;
                }

                $current.children('div').append(window.$('<span>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                    text: window.$(this).text()
                }));
            });
        });

        // Toggling the `.active` state on the `.sel`.
        window.$('.sel').click(function () {
            window.$(this).toggleClass('active');
        });

        // Toggling the `.selected` state on the options.
        window.$('.sel__box__options').click(function () {
            var txt = window.$(this).text();
            var index = window.$(this).index();

            window.$(this).siblings('.sel__box__options').removeClass('selected');
            window.$(this).addClass('selected');

            var $currentSel = window.$(this).closest('.sel');
            $currentSel.children('.sel__placeholder').text(txt);
            $currentSel.children('select').prop('selectedIndex', index + 1);
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
            alert("로그인되셨습니다")
            history.push("/")
        }).catch(err => {
            alert("아이디와 비밀번호를 확인해주세요.")
        })
    }


    return (
        <>
            <Li onClick={handleShow}>
                로그인
            </Li>

            <Modal style show={show} onHide={handleClose} size="lg" centered >

                <div className="welcome">
                    <div className="pinkbox">
                        <div className="signup nodisplay">
                            <h1 className="register">register</h1>
                            <form autocomplete="off">

                                <input type="email" placeholder="email"></input>
                                <input type="password" placeholder="password"></input>
                                <input type="password" placeholder="confirm password"></input>
                                <input type="text" placeholder="username"></input>
                                <input className="nick" type="text" placeholder="nickname"></input>
                                
                                <div className="radio">
                                <label className="genderTitle" >성별</label>
                                    <input className="radiobutton" type="radio" name="gender" value="1" defaultChecked /> <label className="gender" >여자 </label>
                                    <input className="radiobutton" type="radio" name="gender" value="2" /> <label className="gender">남자 </label>
                                </div>
                            
                                <label className="category" >선호 카테고리</label>
                                <div>
                                <div className="sel sel--black-panther">

                                    <select id="select-profession" name="category1">
                                        <option value="">1순위</option>
                                        <option value="유화">유화</option>
                                        <option value="수채화">수채화</option>
                                        <option value="파스텔">파스텔</option>
                                        <option value="가죽">가죽</option>
                                        <option value="뜨개질">뜨개질</option>
                                        <option value="비즈">비즈</option>
                                        <option value="일러스트">일러스트</option>
                                        <option value="이모티콘">이모티콘</option>
                                        <option value="편집">편집</option>
                                        <option value="촬영">촬영</option>
                                        <option value="한식">한식</option>
                                        <option value="양식">양식</option>
                                        <option value="일식">일식</option>
                                        <option value="중식">중식</option>
                                        <option value="세계음식">세계음식</option>
                                        <option value="헬스">헬스</option>
                                        <option value="홈트">홈트</option>
                                        <option value="다이어트">다이어트</option>
                                        <option value="작곡">작곡</option>
                                        <option value="작사">작사</option>
                                        <option value="타악기">타악기</option>
                                        <option value="현악기">현악기</option>
                                        <option value="관악기">관악기</option>
                                        <option value="댄스">댄스</option>
                                    </select>
                                
                                </div>
                                <div className="sel sel--black-panther">
                                    <select id="select-profession" name="category2">
                                        <option value="">2순위</option>
                                        <option value="유화">유화</option>
                                        <option value="수채화">수채화</option>
                                        <option value="파스텔">파스텔</option>
                                        <option value="가죽">가죽</option>
                                        <option value="뜨개질">뜨개질</option>
                                        <option value="비즈">비즈</option>
                                        <option value="일러스트">일러스트</option>
                                        <option value="이모티콘">이모티콘</option>
                                        <option value="편집">편집</option>
                                        <option value="촬영">촬영</option>
                                        <option value="한식">한식</option>
                                        <option value="양식">양식</option>
                                        <option value="일식">일식</option>
                                        <option value="중식">중식</option>
                                        <option value="세계음식">세계음식</option>
                                        <option value="헬스">헬스</option>
                                        <option value="홈트">홈트</option>
                                        <option value="다이어트">다이어트</option>
                                        <option value="작곡">작곡</option>
                                        <option value="작사">작사</option>
                                        <option value="타악기">타악기</option>
                                        <option value="현악기">현악기</option>
                                        <option value="관악기">관악기</option>
                                        <option value="댄스">댄스</option>
                                    </select>

                                </div>
                                <div className="sel sel--black-panther">

                                <select id="select-profession" name="category3">
                                        <option value="">3순위</option>
                                        <option value="유화">유화</option>
                                        <option value="수채화">수채화</option>
                                        <option value="파스텔">파스텔</option>
                                        <option value="가죽">가죽</option>
                                        <option value="뜨개질">뜨개질</option>
                                        <option value="비즈">비즈</option>
                                        <option value="일러스트">일러스트</option>
                                        <option value="이모티콘">이모티콘</option>
                                        <option value="편집">편집</option>
                                        <option value="촬영">촬영</option>
                                        <option value="한식">한식</option>
                                        <option value="양식">양식</option>
                                        <option value="일식">일식</option>
                                        <option value="중식">중식</option>
                                        <option value="세계음식">세계음식</option>
                                        <option value="헬스">헬스</option>
                                        <option value="홈트">홈트</option>
                                        <option value="다이어트">다이어트</option>
                                        <option value="작곡">작곡</option>
                                        <option value="작사">작사</option>
                                        <option value="타악기">타악기</option>
                                        <option value="현악기">현악기</option>
                                        <option value="관악기">관악기</option>
                                        <option value="댄스">댄스</option>
                                    </select>
                                </div>
                                </div>
                                <button className="button submit">create account </button>
                            </form>
                        </div>
                        <div className="signin">
                            <h1 className="register login">sign in</h1>
                            <form className="more-padding" autocomplete="off" onSubmit={login}>
                                <input className="signinput" type="text" name="email" placeholder="username"></input>
                                <input className="signinput" type="password" name="password"  placeholder="password"></input>
                                <div className="checkbox">
                                    <input type="checkbox" id="remember" /><label for="remember">remember me</label>
                                </div>

                                <button className="button submit" type="submit" value="로그인">login</button>
                            </form>
                        </div>

                    </div>
                    <div className="leftbox">
                        <h2 className="title"><span>동</span>취미</h2>
                        <p className="desc">동일한 <span>취미</span>를 찾다</p>
                        <img className="flower" src="https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png" alt="1357d638624297b" border="0" />
                        <p className="account nanumsquare">계정이 있으신가요?</p>
                        <button className="button signbutton" id="signin">로그인</button>
                    </div>
                    <div className="rightbox">
                        <h2 className="title"><span>동</span>취미</h2>
                        <p className="desc"> 동일한 <span>취미</span>를 찾다</p>
                        <img className="flower" src={dongchimi2} />
                        <p className="account nanumsquare">계정이 없으신가요?</p>
                        <button className="button signbutton" id="signup">회원가입</button>
                    </div>
                </div>


            </Modal>
        </>
    );
}

export default withRouter(LoginModal);
