import React, { Component } from 'react';
import { MessageProps } from './message';

export interface ChannelProps {
    name: string,
    participants: number,
    id: number,
    messages: Array<MessageProps>
}

export class Channel extends Component<ChannelProps> {
    render() {
        return (
            <div className="channel-item">
                <div>{this.props.name}</div>
                <div>{this.props.participants}</div>
            </div>
        )
    }
}