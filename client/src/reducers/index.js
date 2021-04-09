import { combineReducers } from "redux";

import connected from "./permissions";
import users from "./users";
import members from "./members";
import movies from "./movies";
import specific from "./specific";
import subscriptions from './subscriptions'

export const reducers = combineReducers({ connected, users, members, movies, specific, subscriptions });
