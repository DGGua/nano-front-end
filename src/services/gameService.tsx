import { Item, PlayerInfo, RoomInfo } from "../types/gameType";
import { requestType } from "../types/requestType";
import { globalRequest } from "./globalService";

export const gameService = {
  curRoomInfo: async () => {
    return await globalRequest<requestType<RoomInfo>>({
      method: "GET",
      url: "/player/curRoomInfo",
    });
  },
  curPlayerInfo: async () => {
    return await globalRequest<requestType<PlayerInfo>>({
      method: "GET",
      url: "/player/playerInfo",
    });
  },
  move: async (direction: string) => {
    return await globalRequest<
      requestType<{
        id: string;
        name: string;
        describe: string;
        event: boolean;
        directions: Record<string, string>;
        roomItems: Item[];
      }>
    >({ method: "GET", url: "/player/move", params: { direction } });
  },
  back: async (quantity: number) => {
    return await globalRequest<
      requestType<{
        id: string;
        name: string;
        describe: string;
        event: boolean;
        directions: Record<string, string>;
        roomItems: Item[];
      }>
    >({ method: "GET", url: "/player/back", params: { quantity } });
  },
  take: async (itemId: number) => {
    return await globalRequest<
      requestType<
        Array<{ id: number; name: string; weight: number; available: boolean }>
      >
    >({
      method: "GET",
      url: "/player/take",
      params: { itemId },
    });
  },
  drop: async (itemId: number) => {
    return await globalRequest<
      requestType<
        Array<{ id: number; name: string; weight: number; available: boolean }>
      >
    >({
      method: "GET",
      url: "/player/drop",
      params: { itemId },
    });
  },
  useItem: async (itemId: number) => {
    return await globalRequest<requestType<string>>({
      method: "GET",
      url: "/player/useItem",
      params: { itemId },
    });
  },
  doEvent: async () => {
    return await globalRequest<requestType<string>>({
      method: "GET",
      url: "/player/doEvent",
    });
  },
};
