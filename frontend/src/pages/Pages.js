import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../components/Footer';
import BoastList from './boast/BoastList';
import Main from './Main';
import MyPage from './mypage/MyPage';
import Register from './mypage/Register';
import Update from './mypage/Update';
import PartyList from './party/PartyList';
import PartyRead from './party/PartyRead';
import RecommendList from './recommend/RecommendList';
import Navbar from '../components/Nav/Navbar';

function Pages() {
  return (
    <div>
      <Navbar></Navbar>
      <Route exact path="/" component={Main} />
      <Route exact path="/party" component={PartyList} />
      <Route path="/party/:id" component={PartyRead} />
      <Route path="/recommend" component={RecommendList} />
      <Route path="/boast" component={BoastList} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/register" component={Register} />
      <Route path="/update" component={Update} />
      <Footer></Footer>
    </div>
  );
}

export default Pages;
