import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const connection = new WebSocket('ws:localhost:3001');

class App extends Component {
  constructor(props) {
    super(props);
    this.chatbox = this.chatbox.bind(this);
    this.state = {
    currentUser: 'Anonymous',
      messages: [],
      numberofusers: 0
    };

  }

chatbox(Type,UserName,NewMessage,old) {

    var msg = {
      type: Type,
      oldusername: old,
      username: UserName,
      content: NewMessage
  };

   connection.send(JSON.stringify(msg));
}

componentDidMount() {

  connection.addEventListener('message', (event) => {

    const data = JSON.parse(event.data)
    console.log(data)
   this.setState({
      currentUser: data.username,
      messages:this.state.messages.concat(data),
      numberofusers:data.count
    });
    document.getElementById('chatbox').value = '';
  });

}



 render() {
   return (
     <div id="container">
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className = "usercount">users online: {this.state.numberofusers}</span>
      </nav>
      <MessageList messages = {this.state.messages}/>
      <ChatBar chatbox = {this.chatbox} currentUser = {this.state.currentUser} />
     </div>
   );
 }



}

export default App;











