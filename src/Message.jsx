import React, {Component} from 'react';

class Message extends Component {

  render() {
    const {username, oldusername, type, content} = this.props.data;
    let MessageView;
      if(type === 'incomingNotification') {
          MessageView  = (<span className="message system">{`${oldusername} is now called ${username}`}</span>)
      }
      if (type === 'incomingMessage') {
          MessageView = (<div className="message"><span className="message-username">{username}</span>
                         <span className="message-content">{content}</span></div>)
        }
      if (type === 'connected') {
          MessageView = (<span className="message system">User has Connected</span>)
        }
        if (type === 'disconnected') {
          MessageView = (<span className="message system">User has disconnected</span>)
        }
        if (type === 'incomingMessage' && {oldusername} !== {username}) {
          console.log("hello")
        }

 return (
       <div>
        {MessageView}
         </div>
    );
  }
}
export default Message;


