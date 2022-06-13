import { globalRequest } from "./globalService";

export const gameService = {
    curRoomInfo:()=>{
        return globalRequest()
    }
};
