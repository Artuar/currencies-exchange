import { combineEpics, Epic } from "redux-observable";
import { ratesEpic } from "./rates/rates.epics";

export const rootEpic: Epic = combineEpics(ratesEpic);
