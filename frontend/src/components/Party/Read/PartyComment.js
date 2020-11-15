import React, { Component } from 'react';
import api from '../../../utils/api';
import "./party.scss"
class PartyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hid: this.props.hid,
      userId: this.props.userId,
      token: sessionStorage.getItem('token'),
      // data: [],
      comments: [],
    }
  }

  componentDidMount() {
    // 댓글 가져오기
    // console.log('comment hid', this.state.hid)
    this.getComment();
  }

  getComment() {
    // console.log('get comment');
    api.get(`/hobby/comment/${this.state.hid}`, {
      headers: {
        accessToken: this.state.token,
      }
    })
      .then(({ data }) => {
        // console.log('comment', data);
        this.setState({ comments: data });
      }).catch((err) => {
        console.log(err);
      })
  }

  addComment(e) {
    e.preventDefault();
    // console.log('add comment', e.target.comment.value);
    api.post(`/hobby/comment`, {
      content: e.target.comment.value,
      hid: this.state.hid,
    }, {
      headers: {
        accessToken: this.state.token,
      }
    }).then(({ data }) => {
      console.log('add comments', data);
      this.getComment();
      e.target.comment.value = '';
      // this.setState({ comments: data });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="comment">
        {
          this.state.comments.map((comment, index) => {
            //TODO : 댓글 디자인 다르게 주기!
            if (comment.chimiComment.userId === this.state.userId) { // 댓글쓴이가 글쓴이랑 같을 때
              return (
                <div key={index}>
                  {comment.nickname} - 파티생성자
                  <p class="from-me" >{comment.chimiComment.content}</p>
                </div>
              )
            } else {
              return (
                <div key={index}>
                  {comment.nickname}
                  <p class="from-them">{comment.chimiComment.content}</p>
                </div>
              )
            }
          })
        }


        <form className="commentForm" onSubmit={this.addComment.bind(this)}>
          <input type="text" name="comment" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default PartyComment;
