  
import React, { Component } from "react";
import { db } from "../../services/firebase";
import './styles.css';
import {
    Container, 
    Header,
    Button,
    Divider,
    Icon,
    Input,
    Label,
    Dimmer,
    Loader,
    Image

} from 'semantic-ui-react';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.props.user.uid,
        name: this.props.user.displayName.split(' ')[0]
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  handleFocus(e) {
      e.target.setAttribute('autocomplete', 'off');
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <Container>
          <Header as="h1">Chat Room</Header>
          <fieldset>
            <div className="chat-area" ref={this.myRef}>
                {/* loading indicator */}
                {this.state.loadingChats ? <div className="text-success" role="status">
                    <Dimmer active inverted>
                        <Loader content="Loading..." />
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </div> : ""}
                {/* chat area */}
                {this.state.chats.map(chat => {
                    return <p key={chat.timestamp} className={"chat-bubble " + (this.props.user.uid === chat.uid ? "current-user" : "")}>
                    <Label color='orange' ribbon>{chat.name}</Label>
                    <br />
                    <span>{chat.content}</span>
                        <br />
                        <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                    </p>
                })}
            </div>
            <form onSubmit={this.handleSubmit} ref={el => this.myFormRef = el}>
                <Input type="text" focus className="form-control" name="content" onChange={this.handleChange} onFocus={this.handleFocus} value={this.state.content} />
                {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                <Button animated="fade" primary type="submit">
                    <Button.Content visible><Icon name='send'/></Button.Content>
                    <Button.Content hidden>Send</Button.Content>
                </Button>
            </form>
            <Label attached='bottom right'>
                Logged in as: <strong className="text-info">{this.props.user.email}</strong>
            </Label>
        </fieldset>
        <Divider />
        The chat room is open to all logged in users.
      </Container>
    );
  }
}