import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import "./FaceChat.css";
import { Container } from "@material-ui/core";

// const Container = styled.div`
// padding: 20px;
// display: flex;
// height: 100vh;
// width: 90%;
// margin: auto;
// flex-wrap: wrap;
// `;

const StyledVideo = styled.video`
height: 40%;
width: 50%;
`;

const ActiveVideo = styled.video`
height: 60%;
width: 70%;
border: solid;
`;

const InactiveVideo = styled.video`
height: 40%;
width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
        console.log('Video', props)
    }, []);

    return (
        <>
            {/* <StyledVideo playsInline autoPlay ref={ref} /> */}
            {/* <InactiveVideo playsInline autoPlay ref={ref} /> */}
            <video className="inactive-video" playsInline autoPlay ref={ref}
                onClick={() => {
                    console.log('click inactive video props.peer', props.peer);
                    console.log('click inactive video ref', ref);
                }}
                style={{ cursor: "pointer" }}
            />
        </>
    );
}

// 화면 크기
const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
    // height: "350px",
    // width: "200px",
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const [inactive, setInactive] = useState([]);
    const [active, setActive] = useState();
    const [all, setAll] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    // const roomID = props.match.params.roomID;
    const { roomID, name } = props;
    const tempRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect("/", { transforts: ['websocket'] }, { path: "/socket.io/" });
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                console.log('front all users', users);
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);

                // 추가중인 코드...
                setInactive(peers);
                const allPeers = [];
                allPeers.push(userVideo);
                // peers.forEach(peer => {
                //     // const ref = useRef();
                //     peer.on("stream", stream => {
                //         tempRef.current.srcObject = stream;
                //     })
                //     allPeers.push(tempRef);
                // })

                allPeers.push(peers);
                setAll(allPeers);
                console.log('all peers', all);
            })
            console.log('front peers', peers);
            console.log('front inactive', inactive);

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
                console.log('user joined', peers);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function changeActivePeer(e) {
        // userVideo 에 현재 선택한 친구 넣어주고
        // peers를 다시 업데이트 해주자!
        console.log('changeActive', e);
    }

    return (
        // <Container>
        <div className="video-container">
            {/* <StyledVideo muted ref={userVideo} autoPlay playsInline /> */}
            {/* <ActiveVideo muted ref={userVideo} autoPlay playsInline /> */}
            <video className="active-video" muted ref={userVideo} autoPlay playsInline
                onClick={() => console.log('active video', userVideo)}
            ></video>
            {/** 다른 사람들 */}
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </div>
        // </Container>
    );
};

export default Room;