import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
padding: 20px;
display: flex;
height: 100vh;
width: 90%;
margin: auto;
flex-wrap: wrap;
`;

const StyledVideo = styled.video`
height: 40%;
width: 50%;
`;

const canvas = styled.canvas`
height: 40%;
width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    // const roomID = props.match.params.roomID;
    const roomID = props.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/", { transforts: ['websocket'] }, { path: "/socket.io/" });
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                console.log('front all users');
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
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
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

    function viewShareStart() {
        var canvas = document.querySelector('canvas');
        var video = document.querySelector('video');


        socketRef.current.on("viewsharestart", sharing_user_id => {
            for (let i in this.peer_connections) delete this.peer_connections[i];
            this.sharing_user_id = sharing_user_id; //사용자 아이디
            this.now_sharing = sharing_user_id; //공유하는 사람 아이디
            this.already_sharing = false; //이미 공유되어있나?
            this.view_share_video = this.createVideo(); // 공유할 비디오 
            this.share_block.removeChild(this.share_block.childNodes[0]) // -> 
            if (sharing_user_id == "no one") {
                this.share_block.insertBefore(this.createImg(1), this.share_block.childNodes[0]);
                return;
            }
            //내가 공유하는 사람이면 
            this.user.user_id == sharing_user_id ? this.share_block.insertBefore(this.createImg(0), this.share_block.childNodes[0]) : this.share_block.insertBefore(this.view_share_video, this.share_block.childNodes[0])


            //공유하는 사람이 나이면 
            if (sharing_user_id == this.user.user_id) {
                //읽기 전용 속성은 카메라, 마이크, 화면 공유와 같이 
                //현재 연결된 미디어 입력 장치에 접근할 수 있는 MediaDevices 객체
                navigator.mediaDevices
                    .getDisplayMedia({
                        video: true, audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            sampleRate: 44100
                        }
                    })
                    .then(this.get_stream) //this.get_stream(this.canvas.captureStream(25))
                    .then(() => {
                        for (let peer_id of this.connected_users) {
                            if (peer_id == this.user.user_id) continue
                            this.getPeerConnection(peer_id)
                                .then(t_pc => {
                                    t_pc.createOffer(sdp => {
                                        t_pc.setLocalDescription(sdp)
                                        this.sendMessage({
                                            message: sdp,
                                            study_id: this.study_id,
                                            from: this.user.user_id,
                                            to: peer_id
                                        })
                                    }, e => console.log(e))
                                })
                        }
                    });
            }
        });

    }

    function createVideo() {
        let t_video = document.createElement("video"); //비디오 보여줄 창
        t_video.srcObject = null;
        t_video.style.width = "100%";
        t_video.style.position = "absolute";
        t_video.style.zIndex = 1;
        t_video.autoplay = true;
        t_video.playsinline = true;
        t_video.controls = true;
        return t_video;
    }


    return (
        <Container>

            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container>
    );
};

export default Room;