import { createStore, combineReducers } from "redux";
import { Dishes } from "./dishes";
import { Leaders } from "./leader";
import { Comments } from "./comments";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      promotions: Promotions,
      leaders: Leaders,
      comments: Comments,
    })
  );

  return store;
};
