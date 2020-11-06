import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import api from '../../utils/api';

const RegisterBlock = styled.div`
  width: 50%;
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1.25rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem
  outline: none;
  width: 100%;
  %:focus {
    color $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;


const Register = () => {

  const signin = (e) => {
    e.preventDefault();
    console.log('signin', e);
    console.log('email', e.target.email.value);
    console.log('gender', e.target.gender.value);
    console.log('category1', e.target.category1.value);
    console.log('category2', e.target.category2.value);
    console.log('category3', e.target.category3.value);
    api.post('auth/signup', {
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      nickname: e.target.nickname.value,
      gender: e.target.gender.value,
      role: '["mod", "user"]',
      prefer1: e.target.category1.value,
      prefer2: e.target.category2.value,
      prefer3: e.target.category3.value,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <RegisterBlock>
      <h1>회원가입</h1>
      {/* <RegisterForm /> */}
      <AuthFormBlock>
        <form onSubmit={signin}>
          <StyledInput type="text" name="email" placeholder="email" />
          <StyledInput type="text" name="password" placeholder="password" />
          <StyledInput type="text" name="passwordConfirm" placeholder="password Confirm" />
          <StyledInput type="text" name="name" placeholder="name" />
          <StyledInput type="text" name="nickname" placeholder="nickname" />
          <label>
            <input type="radio" name="gender" value="1" defaultChecked />
          여자
        </label>
          <label>
            <input type="radio" name="gender" value="2" />
          남자
        </label>
          <select name="category1">
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
            <option value="작곡">작곡</option>
            <option value="작사">작사</option>
            <option value="타악기">타악기</option>
            <option value="현악기">현악기</option>
            <option value="관악기">관악기</option>
            <option value="댄스">댄스</option>
          </select>
          <select name="category2">
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
            <option value="작곡">작곡</option>
            <option value="작사">작사</option>
            <option value="타악기">타악기</option>
            <option value="현악기">현악기</option>
            <option value="관악기">관악기</option>
            <option value="댄스">댄스</option>
          </select>
          <select name="category3">
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
            <option value="작곡">작곡</option>
            <option value="작사">작사</option>
            <option value="타악기">타악기</option>
            <option value="현악기">현악기</option>
            <option value="관악기">관악기</option>
            <option value="댄스">댄스</option>
          </select>
          <input type="submit" value="회원가입" />
          <input type="reset" value="취소하기" />
        </form>
      </AuthFormBlock>
    </RegisterBlock>
  );
};

export default Register;
