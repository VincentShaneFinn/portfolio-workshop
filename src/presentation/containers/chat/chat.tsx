import { Component } from 'react';
import { ChannelList, ChannelListProps } from './channellist';
import { ChannelProps } from './channel'
import './chat.scss';
import socketClient from "socket.io-client";
import { MessagesPanel } from './messagePannel';
const SERVER = "http://127.0.0.1:8080";

export interface ChatState {
    socket: any,
    channel?: ChannelProps
    channels: Array<ChannelProps>
}

export class Chat extends Component<{}, ChatState> {
    constructor(props: any){
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleChannelSelect = this.handleChannelSelect.bind(this);
    }


    private socket: any;

    state: ChatState = {
        socket: null,
        channels: [],
    }

    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    loadChannels = async () => {
        fetch('/api/getChannels').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
        })
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {

            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {

            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    handleChannelSelect = (id: any) => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        }) as ChannelProps;
        this.setState({ channel });
        this.socket.emit('channel-join', id, (ack: any) => {
        });
    }

    handleSendMessage(channel_id: any, text: any) {
        this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
    }

    render() {
        return (
            <div className="container h-100">
                <div className="chat-app">
                    <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect}></ChannelList>
                    <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel!}></MessagesPanel>
                </div>
            </div>
        );
    }
}

