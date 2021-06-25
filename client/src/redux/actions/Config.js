import {SET_SYSTEM_CONFIG} from "../constants/Config";

export const setSystemConfig = (config) => {
  return {
    type: SET_SYSTEM_CONFIG,
    payload: config
  }
}
