export type Item = {
  id: number;
  name: string;
  weight: number;
  available?: boolean;
};
export type PlayerInfo = {
  playerId: string;
  userItems: Item[];
  bearing_capacity: number;
  cur_weight: number;
};
