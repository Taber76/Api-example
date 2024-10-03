import { LANGUAGE } from "../config/environment";
import { enLang } from "./lang.en";

export const language = () => {
  switch (LANGUAGE) {
    case "EN":
      return enLang
    default:
      return enLang
  }
}