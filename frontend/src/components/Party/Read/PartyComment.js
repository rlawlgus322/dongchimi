import React, { Component } from 'react';
import api from '../../../utils/api';

class PartyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hid: this.props.hid,
      token: sessionStorage.getItem('token'),
      data: [],
      comments: [],
    }
  }

  componentDidMount() {
    // 댓글 가져오기
    console.log('comment hid', this.state.hid)
    this.getComment();
  }

  getComment() {
    console.log('get comment');
    api.get(`/hobby/comment/${this.state.hid}`)
      .then(({ data }) => {
        console.log('comment', data);
        this.setState({ comments: data });
      }).catch((err) => {
        console.log(err);
      })
  }

  addComment(e) {
    e.preventDefault();
    console.log('add comment', e.target.comment.value);
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
      <div>
        댓글창
        {
          this.state.comments.map((comment, index) => {
            return (
              <div key={index}>
                {/* <p>{comment.</p> */}
                <p>{comment.chimiComment.content}</p>
              </div>
            )
          })
        }
        <form onSubmit={this.addComment.bind(this)}>
          <input type="text" name="comment" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default PartyComment;
