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
  return newDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
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

export const distance = (lat1, lng1, lat2, lng2) => {
  let radiationLat1 = (Math.PI * lat1) / 180;
  let radiationLat2 = (Math.PI * lat2) / 180;
  let theta = lng1 - lng2;
  let radiationTheta = (Math.PI * theta) / 180;
  let distance =
    Math.sin(radiationLat1) * Math.sin(radiationLat2) +
    Math.cos(radiationLat1) *
      Math.cos(radiationLat2) *
      Math.cos(radiationTheta);
  distance = Math.acos(distance);
  distance = (distance * 180) / Math.PI;
  distance = distance * 60 * 1.1515;
  distance = distance * 1.609344;
  return distance;
};

export const order_status_class = (status) => {
  if (status == "accepted" || status == "processing") {
    return "py-0.5 px-2 rounded-full text-[10px] leading-4 first-letter:capitalize whitespace-nowrap text-[#2AC769] bg-[#CBFFE0]";
  } else if (status == "pending") {
    return "py-0.5 px-2 rounded-full text-[10px] leading-4 first-letter:capitalize whitespace-nowrap text-[#F6A609] bg-[#FFEEC6]";
  } else if (status == "out-for-delivery") {
    return "py-0.5 px-2 rounded-full text-[10px] leading-4 first-letter:capitalize whitespace-nowrap text-[#008BBA] bg-[#BDEFFF]";
  } else if (status == "delivered") {
    return "py-0.5 px-2 rounded-full text-[10px] leading-4 first-letter:capitalize whitespace-nowrap text-tt_rich_black bg-[#FFD7E7]";
  } else {
    return "py-0.5 px-2 rounded-full text-[10px] leading-4 first-letter:capitalize whitespace-nowrap text-[#FB4E4E] bg-[#FFDADA]";
  }
};

export const getDetail = (value, key) => {
  if (value) {
    const item = JSON.parse(value);
    return item?.[key] ?? null;
  } else {
    return null;
  }
};

export const textEllipsis = (
  str,
  maxLength,
  { side = "end", ellipsis = "..." } = {}
) => {
  if (str.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
};
