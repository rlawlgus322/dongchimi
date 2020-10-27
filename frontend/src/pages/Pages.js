import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../components/Footer';
import BoastList from './boast/BoastList';
import Main from './Main';
import MyPage from './mypage/MyPage';
import PartyList from './party/PartyList';
import RecommendList from './recommend/RecommendList';
import Navbar from '../components/Nav/Navbar';

function Pages() {
  return (
    <div>
      <Navbar></Navbar>
      <Route exact path="/" component={Main} />
      <Route path="/party" component={PartyList} />
      <Route path="/recommend" component={RecommendList} />
      <Route path="/boast" component={BoastList} />
      <Route path="/mypage" component={MyPage} />
      <Footer></Footer>
    </div>
  );
}

export default Pages;
