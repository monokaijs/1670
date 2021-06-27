import {SET_SYSTEM_CONFIG} from "../constants/Config";


const initState = {
  system: {
    roles: [],
    eduLevel: [],
    courseCategories: []
  }
}

const config = (state = initState, action) => {
  switch (action.type) {
    case SET_SYSTEM_CONFIG:
      return {
        ...state,
        system: action.payload
      }
    default:
      return state;
  }
}

export default config;
