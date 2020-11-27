import React from 'react';
import styled from 'styled-components';

const FooterBody = styled.div`
  background-color: #9dcc99;
  padding: 25px 0;
  margin-top: 100px;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

function Footer() {
  return (
    <FooterBody>
      {/* <div className="row">
        <Content className="col-4">
          <Title>만든 사람들</Title>
        </Content>
        <Content className="col-4">

        </Content>
        <Content className="col-4">

        </Content>
      </div> */}
    </FooterBody>
  );
}

export default Footer;

