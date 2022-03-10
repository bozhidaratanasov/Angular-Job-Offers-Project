import { User } from './../../user/models/user.model';

export interface Offer {
  id?: number;
  organizationId: number;
  title: string;
  description: string;
  type: string;
  category: string;
  appliedUsers: User[]
  userWhoLiked: number[]
}