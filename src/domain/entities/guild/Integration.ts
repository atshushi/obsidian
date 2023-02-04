import type { IDiscordClient } from '@types';

import { Application, User } from '../index';
import { Base } from '../base';

export class Integration extends Base {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  syncing?: string;
  roleID?: string;
  enableEmoticons?: boolean;
  expireBehaviour?: number;
  expireGracePeriod?: number;
  user?: User;
  account: {
    id: string;
    name: string;
  };
  syncedAt?: Date;
  subscriberCount?: number;
  revoked?: boolean;
  application?: Application;
  scopes?: string[];

  constructor(client: IDiscordClient, data?: any) {
    super(client, data);

    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.enabled = data.enabled;
    this.syncing = data.syncing;
    this.roleID = data.role_id;
    this.enableEmoticons = data.enable_emoticons;
    this.expireBehaviour = data.expire_behavior;
    this.expireGracePeriod = data.expire_grace_period;
    this.user = new User(data.user);
    this.account = data.account;
    this.syncedAt = new Date(data.synced_at);
    this.subscriberCount = data.subscriber_count;
    this.revoked = data.revoked;
    this.application = new Application(data.application);
    this.scopes = data.scopes;
  }
}
