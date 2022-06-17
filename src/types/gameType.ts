import { Dayjs } from "dayjs";

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
export type RoomInfo = {
    id: string;
    name: string;
    description: string;
    event: string;
    directions: Record<string, string>;
    roomItems: Item[];
};
export type LogInfo = {
    message: string;
    time: Dayjs;
    level: "error" | "warn" | "info";
}