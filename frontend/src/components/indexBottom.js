import React, { useState,useEffect} from 'react';
import styled from 'styled-components';
import '../indexcss/style.css';
import '../indexcss/bootstrap.min.css';
import api from "utils/api";
import './indexbottom.css';


const IntroSection = styled.section`
	padding: 120px 15px 90px;
	font-family:Cafe24Ohsquare;
`
const IntroWarp = styled.div`
    max-width: 1780px;
    width: 100%;
    margin: 0 auto;
`
const FooterMas = styled.div`
	font-size: 30px;
	margin-top: 60px;
	align: center;
`
const CountNum = styled.p`
	font-size: 60px;
`





function IndexBottom() {
 const [usernum, setusernum] = useState(0);
 const [partynum, setpartynum] = useState(0); 
 
 useEffect(async () => {
    try{
      const {data} = await api.get("auth/userinfo/num")
      setusernum(data);
    }catch(error){
      console.error(error);
    }
    try{
        const {data} = await api.get("hobby/chimi/partynum")
        setpartynum(data);
      }catch(error){
        console.error(error);
      }
  }, [])
  return (
    <IntroSection>
		<IntroWarp>
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-6 col-lg-7 p-0">
						<div className="intro-text">
							<h2>우리는 동치미 입니다. <p></p>취미를 공유하죠</h2>
							<p>혼자서 쓸쓸히 취미를 하고 계셨나요? </p><p>새로운 친구들과 당신의 취미를 공유해 보는건 어떻신가요? </p><p>여러분이 직접 자신의 취미를 소개하고 같은 취미를 가진 친구들을 만들어 보아요.</p><p> 카메라만 있다면 누구나 파티를 열수 있답니다. </p><p>동취미와 함께 당신만의 취미를 모두의 취미로 만들어 보아요~
                            </p>
							{/* <a href="#" className="sp-link">Take a look @my portfolio</a> */}
						</div>
					</div>
					<div className="col-xl-6 col-lg-5 p-0">
						<div className="skill-warp">
							<div className="single-progress-item">
  							<FooterMas >동취미를 통해 취미를 공유한 분들</FooterMas>
								<CountNum>{usernum}</CountNum>
							</div>
							<div className="single-progress-item">
								<FooterMas>동취미를 통해 공유된 취미</FooterMas>
								<CountNum>{partynum}</CountNum>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</IntroWarp>
	</IntroSection>
  );
}

export default IndexBottom;

