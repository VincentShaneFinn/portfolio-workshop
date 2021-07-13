import React, { Component } from 'react';

export interface MessageProps {
    senderName: string,
    text: string
    id: number,
}

export class Message extends Component<MessageProps> {
    render() {
        return (
            <div className="message-item">
                <div><b>{this.props.senderName}</b></div>
                <span>{this.props.text}</span>
            </div>
        )
    }
}