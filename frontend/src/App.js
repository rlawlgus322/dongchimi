import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fasHeart,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import Main from './pages/Main';
import BoastList from 'pages/boast/BoastList';
import BoastWrite from 'pages/boast/BoastWrite';
import BoastRead from 'pages/boast/BoastRead';
import MyPage from 'pages/mypage/MyPage';
import Register from 'pages/mypage/Register';
import Update from 'pages/mypage/Update';
import PartyList from 'pages/party/PartyList';
import PartyRead from 'pages/party/PartyRead';
import PartyWrite from 'pages/party/PartyWrite';
import PartyUpdate from 'pages/party/PartyUpdate';
import RecommendList from 'pages/recommend/RecommendList';
import PartyRoom from 'pages/Room/PartyRoom';
import Header from "components/Header";

library.add(faEye, faHeart, fasHeart, faCommentDots);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }
  render() {
    return (
      <>
        <Header/>
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
          <Route exact path="/party/join/:id" component={PartyRead} /> {/** 내가 속한 파티 상세 */}
          <Route exact path="/party/open/:id" component={PartyRead} /> {/** 내가 속한 파티 상세 */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/update" component={Update} />
          <Redirect from="*" to="/"/>
        </Switch>
      </>
    );
  }
}

export default App;
