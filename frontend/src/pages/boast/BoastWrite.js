import React, { Component } from 'react';

class BoastWrite extends Component {
  state = {
    title: '',
    content: '',
  }

  write(e) {
    e.preventDefault();
    console.log(e);
    console.log(e.target.title.value);
    console.log(e.target.content.value);
    // TODO : 통신
  }

  render() {
    return (
      <>
        글쓰기
        <div className="row">
          <div className="col-md-4 col-12" style={{ textAlign: "center" }}>사진 영역</div>
          <div className="col-md-8 col-12" style={{ textAlign: "center" }}>
            <form onSubmit={this.write}>
              <input name="title" type="text" className="col-10" placeholder="title" />
              <textarea name="content" className="col-10" placeholder="content" />
              <div>
                <input type="submit" value="등록하기 " />
                <input type="reset"
                  onClick={() => this.props.history.push('/boast')}
                  value="취소하기" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default BoastWrite;
