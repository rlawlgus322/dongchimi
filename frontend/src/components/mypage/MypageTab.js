import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import OpenParty from './OpenParty';
import JoinParty from './JoinParty';
import JoinedParty from './JoinedParty';
import LikeParty from './LikeParty';
import WaitParty from './WaitParty';

const obj = {
  0: <OpenParty />,
  1: <JoinParty />,
  2: <JoinedParty />,
  3: <LikeParty />,
}

class MypageTab extends Component {
  state = {
    activeTab: 0,
    value: "1",
  }
  clickHandler = (e, id) => {
    this.setState({ value: id });
  }

  render() {
    return (
      <>
        <TabContext value={this.state.value}>
          <TabList onChange={this.clickHandler}>
            <Tab label="내가 연 파티" value="1" />
            <Tab label="참가하는 파티" value="2" />
            <Tab label="신청한 파티" value="3" />
            <Tab label="찜한 파티" value="4" />
          </TabList>
          <TabPanel value="1"><OpenParty /></TabPanel>
          <TabPanel value="2"><JoinParty /></TabPanel>
          {/* <TabPanel value="3"><JoinedParty /></TabPanel> */}
          <TabPanel value="3"><WaitParty /></TabPanel>
          <TabPanel value="4"><LikeParty /></TabPanel>
        </TabContext>
      </>
    );
  }
}

export default MypageTab
