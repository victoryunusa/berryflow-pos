import clsx from "clsx";
import axios from "axios";
import { twMerge } from "tailwind-merge";

import beep from "../assets/audio/beep.mp3";
import notification from "../assets/audio/notification.mp3";
import { useSelector } from "react-redux";

export const formatCardNumber = (value) => {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

export const formatExpires = (value) => {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
};

export function prettyDate(date) {
  const newDate = new Date(date);
  return newDate.toUTCString();
}

export const removeUnderscoreAndCapitalize = (inputString) => {
  const words = inputString.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalizedWords.join(" ");
};

export const checkPermission = (authUserPermissions, permission) => {
  if (authUserPermissions !== false)
    if (authUserPermissions.includes(permission)) {
      return true;
    } else {
      return false;
    }
};

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const play_beep = () => {
  var audio = new Audio(beep);

  audio.onerror = (e) => {
    console.error("Audio failed to load:", e);
  };

  audio.play().catch((e) => {
    console.error("Audio play failed:", e);
  });
};

export const play_notification = () => {
  var audio = new Audio(notification);
  audio.play();
};
