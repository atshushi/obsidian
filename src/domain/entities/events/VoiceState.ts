import type { IDiscordClient } from '@types';
import { Member } from '../index';

export class VoiceState {
  client: IDiscordClient;
  data?: any;
  userID: string;
  member?: Member;
  sessionID: string;
  isDeaf: boolean;
  isMute: boolean;
  isSelfDeaf: boolean;
  isSelfMute: boolean;
  isSelfStream: boolean;
  isSelfVideo: boolean;
  isSuppress: boolean;
  requestToSpeak: Date | null;

  constructor(client: IDiscordClient, data?: any) {
    this.client = client;
    this.data = data;

    this.userID = data.user_id;
    this.member = data.member ?? new Member(client, this.guild, data.member);
    this.sessionID = data.session_id;
    this.isDeaf = data.deaf;
    this.isMute = data.mute;
    this.isSelfDeaf = data.self_deaf;
    this.isSelfMute = data.self_mute;
    this.isSelfStream = data.self_stream;
    this.isSelfVideo = data.self_video;
    this.isSuppress = data.suppress;
    this.requestToSpeak = new Date(data.request_to_speak_timestamp);
  }

  get guild() {
    return this.client.guilds.get(this.data.guild_id);
  }

  get channel() {
    return this.guild.channels.find((channel) => channel.id === this.data.channel_id);
  }
}
