import React, {Component} from 'react';

class ChatBar extends Component {

constructor(props) {
    super(props);
    this.GetMessage = this.GetMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  GetMessage(e) {
     if (e.key === 'Enter') {
      this.props.chatbox("incomingMessage",document.getElementById('username').value,document.getElementById('chatbox').value);
    }
  }

   handleChange(event) {
    if (event.key === 'Enter') {
    this.props.chatbox("incomingNotification",document.getElementById('username').value,"",this.props.currentUser)
}
  }

  render() {
    return (
       <footer className="chatbar">
  <input id = "username" type="text" className="chatbar-username" onKeyPress={this.handleChange} placeholder="username" />
  <input id = "chatbox" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.GetMessage} />
</footer>

    );
  }
}
export default ChatBar;

