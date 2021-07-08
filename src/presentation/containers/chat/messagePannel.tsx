import React, { Component } from 'react';
import { ChannelProps } from './channel';
import { Message } from './message';

export interface MessagesPannelProps {
    channel: ChannelProps
}

export class MessagesPanel extends Component<MessagesPannelProps> {
    render() {
        let list: any = <div className="no-content-message">There is no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text}></Message>);
        }

        return (
            <div className="messages-panel">
                <div className="messages-list">{list}</div>
                <div className="messages-input">
                    <input type="text" />
                    <button>Send</button>
                </div>
            </div>
        );
    }
}