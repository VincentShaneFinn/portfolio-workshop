import React, { Component } from 'react';
import { ChannelProps } from './channel';
import { ChannelList, ChannelListProps } from './channellist';
import './chat.scss';
import { MessagesPanel } from './messagePannel';

export class Chat extends Component<{}, ChannelListProps> {

    state = {
        channels: [
            { id: 1, name: 'first', participants: 10, messages: [] },
            { id: 2, name: 'second', participants: 10, messages: [] }
        ]
    }

    render() {
        return (
            <div className="container h-100">
                <div className="chat-app">
                    <ChannelList channels={this.state.channels}></ChannelList>
                    <MessagesPanel channel={this.state.channels[0]} />
                </div>
            </div>
        );
    }
}