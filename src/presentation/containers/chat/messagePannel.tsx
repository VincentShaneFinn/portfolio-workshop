import React, { Component } from 'react';
import { ChannelProps } from './channel';
import { Message } from './message';

export interface MessagesPannelProps {
    channel: ChannelProps,
    onSendMessage?: any,
}

export class MessagesPanel extends Component<MessagesPannelProps> {
    constructor(props: MessagesPannelProps) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.send = this.send.bind(this);
    }

    state = {
        inputValue: ''
    }

    send() {
        if (this.state.inputValue && this.state.inputValue != '') {
            this.props.onSendMessage(this.props.channel.id, this.state.inputValue);
            this.setState({ inputValue: '' });
        }
    }

    handleInput(e: any) {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        let list: any = <div className="no-content-message">There is no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text}></Message>);
        }

        return (
            <div className="messages-panel">
                <div className="messages-list">{list}</div>
                <div className="messages-input">
                    <input type="text" onChange={this.handleInput} value={this.state.inputValue} />
                    <button onClick={this.send}>Send</button>
                </div>
            </div>
        );
    }
}