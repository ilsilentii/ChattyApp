import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

 render() {

      const messageComponents = this.props.messages.map(message => {
        return <Message key={message.key} data={message} />

      });
   return (
      <main className="messages">
         {messageComponents}
      </main>
   );
 }


}
export default MessageList;