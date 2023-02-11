import type {
  IDiscordClient,
  IActivityTimestamps,
  IActivityParty,
  IActivityAssets,
  IActivitySecrets,
  IActivityButton,
} from '@types';
import { Emoji } from '../index';

export class Activity {
  name: string;
  type: number;
  url?: string | null;
  createdAt: number;
  timestamps?: IActivityTimestamps;
  applicationID?: string;
  details?: string | null;
  state?: string | null;
  emoji?: Emoji | null;
  party?: IActivityParty;
  assets?: IActivityAssets;
  secrets?: IActivitySecrets;
  instance?: boolean;
  flags?: number;
  buttons?: IActivityButton;

  constructor(client: IDiscordClient, data?: any) {
    this.name = data.name;
    this.type = data.type;
    this.url = data.url;
    this.createdAt = data.created_at;
    this.timestamps = data.timestamps;
    this.applicationID = data.application_id;
    this.details = data.details;
    this.state = data.state;
    this.emoji = new Emoji(client, data.emoji);
    this.party = data.party;
    this.assets = data.assets;
    this.secrets = data.secrets;
    this.instance = data.instance;
    this.flags = data.flags;
    this.buttons = data.buttons;
  }
}
