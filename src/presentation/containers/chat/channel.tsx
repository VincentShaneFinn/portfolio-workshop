import React, { Component } from 'react';
import { MessageProps } from './message';

export interface ChannelProps {
    name: string,
    participants: number,
    id: number,
    messages: Array<MessageProps>,
    handleClick: any
}

export class Channel extends Component<ChannelProps> {
    constructor(props: ChannelProps) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        this.props.handleClick(this.props.id);
    }

    render() {
        return (
            <div className="channel-item" onClick={this.click}>
                <div>{this.props.name}</div>
                <div>{this.props.participants}</div>
            </div>
        )
    }
}