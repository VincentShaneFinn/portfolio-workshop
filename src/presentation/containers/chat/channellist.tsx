import React, { Component } from 'react';
import { Channel, ChannelProps } from './channel';

export interface ChannelListProps {
    channels: Array<ChannelProps>
}

export class ChannelList extends Component<ChannelListProps> {
    render() {
        let list: any = 'There is no channels to show';
        if (this.props.channels) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} messages={c.messages}></Channel>);
        }
        return (
            <div className="channel-list">
                {list}
            </div>
        );
    }
}