import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NavHeader from './components/NavHeader';
import BoastList from './pages/boast/BoastList';
import Home from './pages/Home';
import MyPage from './pages/mypage/mypage';
import PartyList from './pages/party/PartyList';
import RecommendList from './pages/recommend/RecommendList';

function App() {
  return (
    <div className="App">
      <NavHeader></NavHeader>
      <Route exact path="/" component={Home} />
      <Route path="/party" component={PartyList} />
      <Route path="/recommend" component={RecommendList} />
      <Route path="/boast" component={BoastList} />
      <Route path="/mypage" component={MyPage} />
      <Footer></Footer>
    </div>
  );
}

export default App;
