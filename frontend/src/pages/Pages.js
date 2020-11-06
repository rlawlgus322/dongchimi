import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer';
import BoastList from './boast/BoastList';
import BoastWrite from './boast/BoastWrite';
import BoastRead from './boast/BoastRead';
import Main from './Main';
import MyPage from './mypage/MyPage';
import Register from './mypage/Register';
import Update from './mypage/Update';
import PartyList from './party/PartyList';
import PartyRead from './party/PartyRead';
import PartyWrite from './party/PartyWrite';
import PartyUpdate from './party/PartyUpdate';
import RecommendList from './recommend/RecommendList';
import Navbar from '../components/Nav/Navbar';

function Pages() {
  return (
    <>
      <Navbar></Navbar>
      <div className='container'>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/party" component={PartyList} />
          <Route exact path="/party/write" component={PartyWrite} />
          <Route exact path="/party/update" component={PartyUpdate} />
          <Route exact path="/party/:id" component={PartyRead} />
          <Route exact path="/recommend" component={RecommendList} />
          <Route exact path="/boast" component={BoastList} />
          <Route exact path="/boast/write" component={BoastWrite} />
          <Route exact path="/boast/:id" component={BoastRead} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/update" component={Update} />
        </Switch>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Pages;
