import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScoreBody = styled.div`
  width: 250px;
  height: 50px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
`;

const Stars = styled.div`
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
`;

const Rate = styled.label`
  height: 50px;
  margin-left: -5px;
  padding: 5px;
  font-size: 25px;
  position: relative;
  cursor: pointer;
  input[type="radio"] {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,0%);
    pointer-events: none;
  }
  &:nth-child(1) {
    .face {
      &::after {
        content: "🙁";
        padding-top: "5px";
      }
    }
  }
  &:nth-child(2) {
    .face {
      &::after {
        padding-top: "5px";
        content: "😐";
      }
    }
  }
  &:nth-child(3) {
    .face {
      &::after {
        content: "🙂";
      }
    }
  }
  &:nth-child(4) {
    .face {
      &::after {
        content: "😊";
      }
    }
  }
  &:nth-child(5) {
    .face {
      &::after {
        content: "😄";
      }
    }
  }
  &:hover {
    .face {
      opacity: 1;
    }
  }
`;

const Face = styled.div`
  opacity: 0;
  position: absolute;
  width: 40px;
  height: 35px;
  background: #9dcc99;
  border-radius: 5px;
  top: -50px;
  left: 2px;
  transition: 0.2s;
  font-size: 1.5rem;
  pointer-events: none;
  &::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: "▼";
    display: inline-block;
    color: #9dcc99;
    z-index: 1;
    position: absolute;
    left: 9px;
    bottom: -15px;
  }
  &::after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    display: inline-block;
    color: #fff;
    z-index: 1;
    position: absolute;
    left: 5px;
    top: -1px;
  }
`;

function UserScore(props) {
  const { user, handleUserRate } = props;
  // console.log('user score', user);
  const [rate, setRate] = useState(0);

  function handleRate(e) {
    const selected = e.target.id;
    if (selected === 'star1') {
      setRate(1);
      handleUserRate(1);
    } else if (selected === 'star2') {
      setRate(2);
      handleUserRate(2);
    } else if (selected === 'star3') {
      setRate(3);
      handleUserRate(3);
    } else if (selected === 'star4') {
      setRate(4);
      handleUserRate(4);
    } else if (selected === 'star5') {
      setRate(5);
      handleUserRate(5);
    }
  }

  return (
    <>
      <ScoreBody>
        <Stars>
          <Rate className="rate" onClick={handleRate}>
            <input type="radio" name="radio1" id="star1" value="star1" />
            <Face className="face"></Face>
            {/* <i class="far fa-star star one-star"></i> */}
            {
              rate >= 1 ? <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" /> : <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" className="far" />
            }
          </Rate>
          <Rate className="rate" onClick={handleRate}>
            <input type="radio" name="radio1" id="star2" value="star2" />
            <Face className="face"></Face>
            {/* <i class="far fa-star star two-star"></i> */}
            {
              rate >= 2 ? <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" /> : <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" className="far" />
            }
          </Rate>
          <Rate className="rate" onClick={handleRate}>
            <input type="radio" name="radio1" id="star3" value="star3" />
            <Face className="face"></Face>
            {/* <i class="far fa-star star three-star"></i> */}
            {
              rate >= 3 ? <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" /> : <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" className="far" />
            }
          </Rate>
          <Rate className="rate" onClick={handleRate}>
            <input type="radio" name="radio1" id="star4" value="star4" />
            <Face className="face"></Face>
            {
              rate >= 4 ? <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" /> : <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" className="far" />
            }
            {/* <i class="far fa-star star four-star"></i> */}
          </Rate>
          <Rate className="rate" onClick={handleRate}>
            <input type="radio" name="radio1" id="star5" value="star5" />
            <Face className="face"></Face>
            {/* <i class="far fa-star star five-star"></i> */}
            {
              rate >= 5 ? <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" /> : <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" className="far" />
            }
          </Rate>
        </Stars>
      </ScoreBody>
    </>
  )

}

export default UserScore;