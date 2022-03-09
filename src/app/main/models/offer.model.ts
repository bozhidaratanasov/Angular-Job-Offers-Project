import { User } from './../../user/models/user.model';

export interface Offer {
  id?: number;
  title: string;
  description: string;
  likesCount?: number;
  type: string;
  category: string;
  appliedUsers?: User[]
}