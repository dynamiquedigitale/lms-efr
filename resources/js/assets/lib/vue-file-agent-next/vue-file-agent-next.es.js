var ve = Object.defineProperty;
var we = (e, t, i) => t in e ? ve(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var m = (e, t, i) => (we(e, typeof t != "symbol" ? t + "" : t, i), i);
import { defineComponent as S, openBlock as v, createElementBlock as y, Fragment as W, renderList as he, createCommentVNode as x, resolveComponent as K, normalizeClass as M, createElementVNode as w, createVNode as T, normalizeStyle as B, toDisplayString as $, withKeys as Z, createBlock as Y, renderSlot as C, h as k, resolveDynamicComponent as _, withCtx as N, TransitionGroup as ye } from "vue";
const q = {
  audio: [
    "aif",
    "cda",
    "mid",
    "midi",
    "mpa",
    "wma",
    "wpl"
  ],
  "audio-playable": ["mp3", "ogg", "wav"],
  archive: ["7z", "arj", "deb", "pkg", "rar", "rpm", "tar.gz", "z", "zip"],
  disc: [
    "dmg",
    "iso",
    "toast",
    "vcd"
  ],
  database: [
    "csv",
    "dat",
    "db",
    "dbf",
    "log",
    "mdb",
    "sav",
    "sql",
    "tar"
  ],
  executable: ["apk", "bat", "bin", "cgi", "pl", "com", "exe", "gadget", "jar", "py", "wsf", "ipa"],
  font: ["fnt", "fon", "otf", "ttf"],
  image: ["ai", "bmp", "gif", "ico", "jpeg", "jpg", "png", "ps", "psd", "svg", "tif", "tiff"],
  markup: [
    "asp",
    "aspx",
    "cer",
    "cfm",
    "cgi",
    "pl",
    "css",
    "scss",
    "htm",
    "html",
    "jsp",
    "part",
    "php",
    "py",
    "rss",
    "xml",
    "xhtml"
  ],
  presentation: ["key", "odp", "pps", "ppt", "pptx"],
  script: ["c", "class", "cpp", "cs", "h", "java", "js", "json", "sh", "swift", "vb"],
  sheet: ["ods", "xlr", "xls", "xlsx"],
  system: [
    "bak",
    "cab",
    "cfg",
    "cpl",
    "cur",
    "dll",
    "dmp",
    "drv",
    "icns",
    "ini",
    "lnk",
    "msi",
    "sys",
    "tmp"
  ],
  video: [
    "3g2",
    "3gp",
    "avi",
    "flv",
    "h264",
    "mkv",
    "mpg",
    "mpeg",
    "rm",
    "swf",
    "vob",
    "wmv"
  ],
  "video-playable": ["mp4", "webm", "mov"],
  vue: ["vue"],
  doc: [
    "doc",
    "docx",
    "odt",
    "rtf",
    "tex",
    "wks",
    "wps",
    "wpd"
  ],
  text: ["txt"],
  ebook: ["epub"],
  pdf: ["pdf"],
  folder: ["folder"],
  play: ["play"]
};
class g {
  constructor(t, i, s) {
    m(this, "category", "");
    this.paths = t, this.color = i, this.viewBox = s;
  }
}
const ee = ["M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"], U = {
  folder: new g(
    [
      "M96.5 93.7h-93c-2 0-3.5-1.5-3.5-3.5V35.4h100v54.8c0 2-1.5 3.5-3.5 3.5z",
      "M44.9 20V9.7c0-2-1.5-3.5-3.5-3.5h-38C1.5 6.3 0 7.8 0 9.7v25.7h100V23.5c0-2-1.5-3.5-3.5-3.5H44.9z"
    ],
    "#efce4a"
  ),
  audio: new g(
    [
      "M32.5 37.5h-9v25h9L53.6 77V23L32.5 37.5M71.9 50c0 6.8-3.7 12.7-9.1 15.8l2.8 4.9c7.1-4.1 11.9-11.8 11.9-20.7 0-8.8-4.8-16.6-11.9-20.7l-2.8 4.9c5.4 3.1 9.1 9 9.1 15.8z",
      "M62.1 50c0 3.2-1.7 5.9-4.3 7.4l2.7 4.7c4.2-2.4 7-6.9 7-12.1 0-5.2-2.8-9.7-7-12.1l-2.7 4.7c2.6 1.5 4.3 4.2 4.3 7.4z"
    ],
    "#039"
  ),
  video: new g(
    [
      "M21 26.4v47.1h58V26.4H21zm10.9 43.5h-7.2v-7.2h7.2v7.2zm0-10.8h-7.2v-7.2h7.2v7.2zm0-10.9h-7.2V41h7.2v7.2zm0-10.9h-7.2v-7.2h7.2v7.2zm10.9 25.4V37.3L60.9 50 42.8 62.7zm32.6 7.2h-7.2v-7.2h7.2v7.2zm0-10.8h-7.2v-7.2h7.2v7.2zm0-10.9h-7.2V41h7.2v7.2zm0-10.9h-7.2v-7.2h7.2v7.2z"
    ],
    "#ef6f2e"
  ),
  "audio-playable": new g(ee, "#039", "0 0 48 48"),
  "video-playable": new g(ee, "#ef6f2e", "0 0 48 48"),
  archive: new g(
    [
      "M72.4 38.5h-7.9v-7.9l7.9 7.9zm-21.3-7.9v28.8h21.4v-19h-9.9v-9.9H51.1zm3.3-7.6H30.8v5.6h9.3l-5.9 4.5v4.8l8.6-6.6v-2.7h30.1v-2.3L54.4 23zM42.9 35.1l-8.6 6.6v4.8l8.6-6.6v-4.8zm-8.7 20l8.6-6.6v-4.8l-8.6 6.6v4.8zm8.7 2v-4.8l-8.6 6.6v2.6h-3.4v5.6h5.3v3.8H33c-.6-1-1.6-1.6-2.8-1.6-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1.2 0 2.2-.6 2.8-1.6h3.1V77h4.8v-2.9H44c.6 1 1.6 1.6 2.8 1.6 1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2c-1.2 0-2.2.6-2.8 1.6h-3.1v-3.8h13.5l18.5-3.3v-2.3H37.1l5.8-4.4z"
    ],
    "#ba8322"
  ),
  system: new g(
    [
      "M73.6 54.8c-2.1-.7-3.4-2.6-3.4-4.8s1.4-4.1 3.4-4.8c.6-.2 1-.9.8-1.5-.6-2.3-1.5-4.4-2.7-6.5-.3-.6-1.1-.8-1.7-.5-.7.4-1.6.6-2.4.6-2.8 0-5-2.3-5-5 0-.8.2-1.7.6-2.4.3-.6.1-1.3-.5-1.7-2-1.2-4.2-2.1-6.5-2.7-.6-.2-1.3.2-1.5.8-.7 2.1-2.6 3.4-4.8 3.4-2.2 0-4.1-1.4-4.8-3.4-.2-.6-.9-1-1.5-.8-2.3.6-4.4 1.5-6.5 2.7-.6.3-.8 1.1-.5 1.7.4.7.6 1.6.6 2.4 0 2.8-2.3 5-5 5-.8 0-1.7-.2-2.4-.6-.6-.3-1.3-.1-1.7.5-1.2 2-2.1 4.2-2.7 6.5-.2.6.2 1.3.8 1.5 2.1.7 3.4 2.6 3.4 4.8s-1.4 4.1-3.4 4.8c-.6.2-1 .9-.8 1.5.6 2.3 1.5 4.4 2.7 6.5.3.6 1.1.8 1.7.5.7-.4 1.6-.6 2.4-.6 2.8 0 5 2.3 5 5 0 .8-.2 1.7-.6 2.4-.3.6-.1 1.3.5 1.7 2 1.2 4.2 2.1 6.5 2.7h.3c.5 0 1-.3 1.2-.9.7-2.1 2.6-3.4 4.8-3.4 2.2 0 4.1 1.4 4.8 3.4.2.6.9 1 1.5.8 2.3-.6 4.4-1.5 6.5-2.7.6-.3.8-1.1.5-1.7-.4-.7-.6-1.6-.6-2.4 0-2.8 2.3-5 5-5 .8 0 1.7.2 2.4.6.6.3 1.3.1 1.7-.5 1.2-2 2.1-4.2 2.7-6.5.2-.5-.1-1.2-.8-1.4zM50 57.6c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6 4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6z"
    ],
    "#999"
  ),
  image: new g(
    [
      "m 40.400002,35 a 8,8 0 0 1 -8,8 8,8 0 0 1 -8,-8 8,8 0 0 1 8,-8 8,8 0 0 1 8,8 z",
      "M78.9 47.3l-9.7-9.6L50 57l-9.6-9.7-19.3 19.3V73h57.8z"
    ],
    "#5b2d8d"
  ),
  doc: new g(
    [
      "M29.6 53l-5.9-18.2c-.2-.7-.4-1-.5-1-.1-.1-.2-.1-.4-.2l-2.1-.6-.1-2.6h11l.2 2.6-2.1.6v.2c0 .2.1.7.4 1.2l2.2 7 3.9-11.7 3-.1 3.6 11.7 2.5-7c.1-.5.4-1 .4-1.2v-.1l-1.8-.5-.1-2.7h8.6l.2 2.6-2.3.7c-.1 0-.2.1-.4.1 0 .1-.2.2-.4.9L43 52.8l-3.1.2-3.3-11.2-3.9 11-3.1.2z",
      "M57.8 30.2h21.7v3.4H57.8zm0 9.2h21.7v3.4H57.8zm0 9.4h21.7v3.4H57.8zm-36.2 9.6h57.9v3.4H21.6zm0 9.4h57.9v3.4H21.6z"
    ],
    "#2372ba"
  ),
  executable: new g(
    ["M33.1 29.8l-6.6 6.6L37.2 47 26.5 57.6l6.6 6.6L50.2 47zm18.8 31.1h22.6v9.2H51.9z"],
    "#333"
  ),
  ebook: new g(
    [
      "M75.8 45.7c-.3-.6-.7-1.2-1.3-1.6-.1.5-.3 1-.6 1.5L58.3 69.8c-.6.9-1.9 1.1-2.9.8l-25-7c-1.5-.4-3.3-1.3-3.4-3 0-.6 0-.9.4-1.1.3-.3.8-.2 1.1-.1L52 66c3.4 1 4.4.2 6.9-3.5l14.4-22.2c.7-1.2.9-2.5.5-3.6s-1.4-2-2.7-2.4l-20.6-5.7c-.5-.1-1-.1-1.5-.1v-.1c-3.2-1.9-4.4 1.7-6 3-.6.5-1.4.8-1.7 1.3-.2.5-.1 1-.3 1.4-.6 1.4-2.4 3.6-3.3 4.3-.6.4-1.2.5-1.6 1.1-.3.4-.2 1.1-.4 1.6-.5 1.2-2.1 3.3-3.2 4.4-.4.4-1 .6-1.3 1.1-.3.4-.2 1.1-.4 1.6-.7 1.3-2.2 3.2-3.4 4.3-.6.6-1.3.9-1.6 1.5-.1.3 0 .7-.2 1.1-.2.6-.5 1.1-.7 1.7-.7.9-1 2.1-.9 3.4.2 3.1 2.5 6 5.3 6.8l25 7c2.3.6 5.2-.5 6.6-2.5l14.4-22.2c.7-1.1.9-2.4.5-3.6zm-28.9-7.9l1.1-1.6c.3-.4.9-.7 1.4-.5l16.5 4.6c.5.1.7.6.4 1l-1.1 1.6c-.3.4-.9.7-1.4.5l-16.5-4.6c-.5-.2-.7-.6-.4-1zM42.7 44l1.1-1.6c.3-.4.9-.7 1.4-.5l16.5 4.6c.5.1.7.6.4 1L60.9 49c-.3.4-.9.7-1.4.5L43.1 45c-.5-.1-.7-.6-.4-1z"
    ],
    "#963"
  ),
  markup: new g(
    [
      "M21.5 48.3l16.2-14v7.1l-11 9.2v.1l11 9.2V67L21.5 53v-4.7zm30.6-17.6h4.3L48 71.3h-4.2l8.3-40.6zM62.3 60l11-9.2v-.1l-11-9.2v-7.1l16.2 14v4.9l-16.2 14V60z"
    ]
  ),
  script: new g(
    [
      "M42.3 44.2h15.4V48H42.3v-3.8zm0 7.7h15.4v3.8H42.3v-3.8zm0 7.7h15.4v3.8H42.3v-3.8zM69.2 25H38.5c-4.2 0-7.7 3.4-7.7 7.7v34.6h-7.7c0 4.2 3.4 7.7 7.7 7.7h30.8c4.2 0 7.7-3.4 7.7-7.7V36.5H77v-3.8c-.1-4.3-3.5-7.7-7.8-7.7zm-3.8 41.6c0 2.5-2 4.5-4.5 4.5H32.7c1.9-1.3 1.9-3.8 1.9-3.8V32.7c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8v3.8h23.1v30.1zM46.2 32.7v-3.8h23.1c3.5 0 3.8 2.2 3.8 3.8H46.2z"
    ]
  ),
  disc: new g(
    [
      "M46.9 50c0 .8.3 1.6.9 2.2 1.2 1.2 3.2 1.2 4.4 0 .6-.6.9-1.4.9-2.2 0-.8-.3-1.6-.9-2.2-.6-.6-1.4-.9-2.2-.9-.8 0-1.6.3-2.2.9-.6.6-.9 1.4-.9 2.2z",
      "M32.3 32.3c-9.8 9.8-9.8 25.6 0 35.4 9.8 9.8 25.6 9.8 35.4 0 9.8-9.8 9.8-25.6 0-35.4-9.8-9.7-25.6-9.7-35.4 0zm37 28.2c-.9 1.7-2.1 3.2-3.5 4.6-1.4 1.4-3 2.6-4.6 3.5l-5.8-11.1s.5-.2 1.6-1.2c1.1-1.1 1.3-1.6 1.3-1.6l11 5.8zM54.4 45.6c1.2 1.2 1.8 2.8 1.8 4.4 0 1.6-.6 3.2-1.8 4.4-2.4 2.4-6.4 2.4-8.8 0-1.2-1.2-1.8-2.8-1.8-4.4 0-1.6.6-3.2 1.8-4.4a6.1 6.1 0 0 1 8.8 0zm-8.5-4.4s-1.2.7-2.2 1.8c-.9 1-1 1.2-1.3 1.7l-11-5.9c.9-1.7 2.1-3.2 3.5-4.6 1.4-1.4 3-2.6 4.6-3.5l6.4 10.5z"
    ],
    "#c96"
  ),
  text: new g(
    ["M69.4 28.6v5.5H21.5v-5.5M30.6 41h47.9v5.6H30.6zm-9.1 12.4h47.9V59H21.5zm9.1 12.5h47.9v5.6H30.6z"],
    "#6b533b"
  ),
  database: new g(
    [
      "M48.1 75.5c-6.5-.3-12.3-2.3-15.4-5.4-.9-.9-1.8-2.1-2.2-2.9l-.3-.5v-6.1c0-6 0-6.1.1-5.6.3 1.3 1.1 2.7 2.3 3.7.8.7 2.5 1.8 3.8 2.5 2.4 1.2 5.2 2 8.4 2.5 1.9.3 2.6.3 5.3.3s3.4 0 5.3-.3c3.1-.5 6-1.3 8.3-2.5 1.4-.7 3-1.7 3.8-2.5 1.1-1 2-2.5 2.3-3.8.1-.5.1-.4.1 5.5v6l-.3.6c-1 1.9-2.6 3.6-4.7 4.8-4.3 2.7-10.5 4-16.8 3.7z",
      "M48.1 60.4c-5.7-.3-11-1.9-14.3-4.4-.7-.6-1.8-1.6-2.3-2.2-.4-.6-.8-1.2-1.1-1.8l-.3-.5v-6c0-5.9 0-6 .1-5.5.2.9.7 2 1.5 2.9.4.5 1.1 1.2 1.5 1.4.1.1.5.3.7.5 2.7 1.9 6.5 3.3 10.8 3.9 1.9.3 2.6.3 5.3.3s3.4 0 5.3-.3c3.1-.5 6-1.3 8.4-2.5 1.4-.7 3-1.8 3.9-2.5 1.1-1 2-2.4 2.2-3.7.1-.5.1-.4.1 5.5v5.9l-.4.8c-.7 1.2-1.1 1.8-1.9 2.7-.8.8-1.6 1.5-2.7 2.1-4.3 2.4-10.5 3.7-16.8 3.4z",
      "M47.7 45.4c-3.8-.3-6.8-.9-9.6-2-3.4-1.3-5.8-3.1-7.1-5.2-.3-.4-.5-1-.7-1.6-.2-.6-.3-2-.1-2.7.9-4.3 6.6-7.9 14.5-9 1.9-.3 2.6-.3 5.3-.3s3.4 0 5.3.3c3.1.5 6 1.3 8.4 2.5 3.5 1.7 5.6 4 6.1 6.5.1.7.1 2.1-.1 2.7-.4 1.3-1 2.2-2 3.2-2.8 2.9-7.9 4.9-14.1 5.6-.9-.1-5.1 0-5.9 0z"
    ],
    "#a03537"
  ),
  pdf: new g(
    [
      "M46.2 21.8c-3.5 0-6.3 2.9-6.3 6.3 0 4.3 2.4 9.6 4.9 14.7-2 6.1-4.1 12.7-7 18.2-5.8 2.3-11 4-14 6.6l-.2.2c-1.1 1.2-1.8 2.7-1.8 4.4 0 3.5 2.9 6.3 6.3 6.3 1.7 0 3.4-.6 4.4-1.8 0 0 .2 0 .2-.2 2.3-2.7 5-7.8 7.5-12.2 5.5-2.1 11.5-4.4 16.9-5.8 4.1 3.4 10.1 5.5 15 5.5 3.5 0 6.3-2.9 6.3-6.3 0-3.5-2.9-6.3-6.3-6.3-4 0-9.6 1.4-13.9 2.9-3.5-3.4-6.7-7.5-9.2-11.9C50.6 37 52.6 32 52.6 28c-.2-3.5-2.9-6.2-6.4-6.2zm0 3.6c1.4 0 2.4 1.1 2.4 2.4 0 1.8-1.1 5.3-2.1 9-1.5-3.7-2.9-7.2-2.9-9 .1-1.2 1.2-2.4 2.6-2.4zm1.1 21.5c1.8 3.1 4.1 5.8 6.6 8.2-3.7 1.1-7.3 2.3-11 3.7 1.8-3.8 3.1-7.9 4.4-11.9zM72 55c1.4 0 2.4 1.1 2.4 2.4 0 1.4-1.1 2.4-2.4 2.4-2.9 0-6.9-1.2-10.1-3.1C65.6 56 69.7 55 72 55zM34.6 66.2c-1.8 3.2-3.5 6.1-4.7 7.6-.5.5-.9.6-1.7.6-1.4 0-2.4-1.1-2.4-2.4 0-.6.3-1.4.6-1.7 1.3-1.2 4.5-2.6 8.2-4.1z"
    ],
    "#c11e07"
  ),
  sheet: new g(
    [
      "M62.1 30.9h14.1v9.4H62.1zm0 14.5h14.1v9.4H62.1zm0 14.3h14.1v9.4H62.1zm-19.2 0H57v9.4H42.9zm-19 0H38v9.4H23.9zm19.2-14.2h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9zm19.2-14.6h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9z"
    ],
    "#30723f"
  ),
  presentation: new g(
    [
      "M 73.319289,26.32707 H 26.61477 c -2.335226,0 -4.258353,1.917194 -4.258353,4.245215 v 29.853446 c 0,2.328021 1.923127,4.245215 4.258353,4.245215 h 19.506006 l -1.923128,7.257947 h -2.197859 c -0.961564,0 -1.648395,0.684712 -1.648395,1.643309 0,0.958597 0.686831,1.643309 1.648395,1.643309 h 15.797117 c 0.961563,0 1.648394,-0.684712 1.648394,-1.643309 0,-0.958597 -0.686831,-1.643309 -1.648394,-1.643309 H 55.46168 l -1.923128,-7.39489 h 19.780737 c 2.335226,0 4.258353,-1.917193 4.258353,-4.245214 V 30.572285 c 0,-2.328021 -1.923127,-4.245215 -4.258353,-4.245215 z m 0.412099,34.372546 H 26.202672 V 30.2984 h 47.39135 z",
      "m 38.428266,48.511741 h 3.846255 v 7.668775 h -3.846255 z m 6.456214,-2.464963 h 3.846254 V 56.180516 H 44.88448 Z m 6.318846,-2.601906 h 3.846255 v 12.735644 h -3.846255 z m 6.318847,-2.464964 h 3.846255 v 15.200608 h -3.846255 z m -0.274732,-5.614639 -6.730946,3.697445 -4.945184,-1.643308 -8.379341,4.519099 1.236296,1.369424 7.417777,-3.834387 4.945185,1.643309 7.692509,-4.245215 1.236296,1.369424 2.88469,-4.792984 -6.593578,0.410827 z"
    ],
    "#c24f32"
  ),
  font: new g(
    [
      "M40.4 56.2H28.7l-1.4 3.1c-.5 1-.7 1.9-.7 2.6 0 .9.4 1.6 1.1 2 .4.3 1.5.4 3.2.6v.9H20v-.9c1.2-.2 2.2-.6 2.9-1.4.8-.8 1.7-2.4 2.8-4.8l11.8-25.6h.5l12 26.2c1.1 2.5 2.1 4.1 2.8 4.7.6.5 1.3.8 2.3.9v.9h-16v-.9h.7c1.3 0 2.2-.2 2.7-.5.4-.3.5-.6.5-1.1 0-.3 0-.6-.1-.9 0-.1-.3-.7-.7-1.8l-1.8-4zm-.8-1.8l-4.9-11-5.1 11h10z",
      "M80 44.2l-4.7 15.7-.5 1.9c0 .2-.1.4-.1.5 0 .2.1.4.2.5.1.2.3.2.4.2.3 0 .8-.3 1.4-.8.2-.2.8-.9 1.8-2.2l.9.4c-1.2 2-2.4 3.5-3.7 4.5-1.3.9-2.7 1.4-4.2 1.4-.9 0-1.6-.2-2.1-.7-.5-.5-.7-1-.7-1.8 0-.6.3-1.8.8-3.4l.6-1.9c-1.9 3.1-3.7 5.4-5.4 6.7-1 .8-2.1 1.1-3.2 1.1-1.5 0-2.6-.6-3.2-1.8-.7-1.2-1-2.5-1-4 0-2.2.7-4.8 2.1-7.6 1.4-2.9 3.2-5.2 5.5-6.9 1.9-1.4 3.6-2.2 5.3-2.2.9 0 1.6.3 2.2.8.6.5 1 1.4 1.2 2.8l.9-2.9 5.5-.3zm-7.8 4.5c0-1.3-.2-2.2-.6-2.8-.3-.4-.7-.6-1.2-.6s-1 .2-1.6.7c-1.1 1-2.3 3-3.5 5.9-1.3 3-1.9 5.6-1.9 7.7 0 .8.1 1.4.4 1.8.3.4.6.6.9.6.7 0 1.5-.4 2.2-1.2 1.1-1.2 2-2.6 2.9-4.3 1.6-2.9 2.4-5.5 2.4-7.8z"
    ],
    "#7291a1"
  ),
  vue: new g(
    [
      "M 66.425365,28.281905 H 56.751974 L 49.707631,39.427061 43.669624,28.281905 H 21.530262 L 49.707631,76.54823 77.885006,28.281905 Z m -37.888497,4.025337 h 6.767604 L 49.707631,57.239179 64.098226,32.307242 h 6.767597 L 49.707631,68.560446 Z"
    ],
    "#41B883"
  ),
  other: new g(
    [
      "M71 36.3L57.8 23.1c-.4-.4-.9-.6-1.4-.6h-26c-1.1 0-2 .9-2 2v51.1c0 1.1.9 2 2 2h39.3c1.1 0 2-.9 2-2V37.7c-.1-.5-.3-1-.7-1.4zm-3.9 2.3H55.5V27l11.6 11.6zm.1 34.5H32.8V26.9h18.5v13.3c0 1.4 1.2 2.6 2.6 2.6h13.3v30.3z"
    ]
  ),
  "system-close": new g(
    ["M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"],
    void 0,
    "0 0 24 24"
  ),
  "system-file-preview-new": new g(
    [
      "M745,353c-5.6,0-11.3,0.2-17.2,0.7C687.4,237.3,577.8,157,451,157c-162.1,0-294,131.9-294,294c0,2.1,0,4.1,0,6.2C72.6,479,10,555.8,10,647c0,108.1,87.9,196,196,196h245V618.3l-63.4,63.4c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4c-19.2-19.2-19.2-50.1,0-69.3l147-147c4.6-4.6,9.9-8.1,16-10.6c12-4.9,25.5-4.9,37.4,0c6,2.5,11.4,6.1,16,10.6l147,147c19.2,19.2,19.2,50.1,0,69.3c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4L549,618.3V843h196c135.1,0,245-109.9,245-245S880.1,353,745,353z"
    ],
    void 0,
    "0 0 1000 1000"
  ),
  "system-sortable-handle": new g(["M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"], void 0, "0 0 24 24"),
  "system-file-av-play": new g(
    ["M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"],
    void 0,
    "0 0 48 48"
  ),
  "system-file-name-edit": new g(
    [
      "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    ],
    void 0,
    "0 0 24 24"
  )
};
for (const e in U)
  U.hasOwnProperty(e) && (U[e].category = e);
const de = {};
for (const e in q)
  if (q.hasOwnProperty(e))
    for (const t of q[e])
      de[t] = e;
function ue(e) {
  return U[e] || U.other;
}
function fe(e) {
  e = e.toLowerCase();
  const t = de[e];
  return ue(t);
}
const be = /* @__PURE__ */ S({
  name: "VueFileIcon",
  props: {
    ext: { type: String, required: !1 },
    name: { type: String, required: !1 },
    viewBox: { type: String, required: !1 }
  },
  computed: {
    viewBoxComputed() {
      return !this.viewBox && this.icon && this.icon.viewBox ? this.icon.viewBox : this.viewBox ? this.viewBox : "0 0 100 100";
    },
    icon() {
      return this.name ? ue(this.name) : fe(this.ext ? this.ext : "");
    }
  }
}), O = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [s, r] of t)
    i[s] = r;
  return i;
}, Re = ["viewBox"], xe = ["d"];
function Ce(e, t, i, s, r, n) {
  return v(), y("svg", { viewBox: e.viewBoxComputed }, [
    (v(!0), y(W, null, he(e.icon.paths, (o, l) => (v(), y(W, null, [
      o ? (v(), y("path", {
        key: l,
        d: o
      }, null, 8, xe)) : x("", !0)
    ], 64))), 256))
  ], 8, Re);
}
const J = /* @__PURE__ */ O(be, [["render", Ce]]);
function ze(e) {
  return new Promise((t) => {
    if (!Se(e))
      return t(e.files);
    const i = [], s = [];
    for (let r = 0; r < e.items.length; r++) {
      const n = e.items[r];
      if (n.kind !== "file")
        continue;
      const o = D(n);
      if (o)
        s.push(o);
      else {
        const l = n.getAsFile();
        l && i.push(l);
      }
    }
    Promise.all(s).then((r) => {
      t(i.concat(...r));
    });
  });
}
function D(e) {
  if (e.getAsEntry)
    return D(e.getAsEntry());
  if (e.webkitGetAsEntry)
    return D(e.webkitGetAsEntry());
  if (!e.getAsFile)
    return new Promise((t) => {
      if (e.isFile) {
        e.file((i) => t([i]));
        return;
      }
      if (e.isDirectory) {
        const i = [], s = e.createReader(), r = () => {
          s.readEntries((n) => {
            const o = (l) => {
              if (!n[l] && l === 0)
                return t(i);
              if (!n[l])
                return r();
              D(n[l]).then((a) => {
                i.push(...a), o(l + 1);
              });
            };
            o(0);
          });
        };
        r();
      }
      !e.isFile && !e.isDirectory && t([]);
    });
}
function Se(e) {
  if (!e.files.length)
    return !0;
  for (const i of e.items)
    if (i.webkitGetAsEntry != null) {
      const s = i.webkitGetAsEntry();
      if (s && s.isDirectory)
        return !0;
    }
  const t = e.files;
  for (let i = 0; i < t.length; i++)
    if (!t[i].type && t[i].size % 4096 === 0)
      return !0;
  return !1;
}
class Ie {
  arrayMove(t, i, s) {
    const r = t.slice(0);
    if (s >= r.length) {
      let n = s - r.length;
      for (; n-- + 1; )
        r.push(void 0);
    }
    return r.splice(s, 0, r.splice(i, 1)[0]), r;
  }
  getAverageColor(t) {
    const s = t.length;
    if (s < 4)
      return;
    const r = 5, n = s - s % 4, o = r * 4;
    let l = 0, a = 0, d = 0, h = 0, f = 0;
    for (let u = 0; u < n; u += o) {
      const c = t[u + 3], p = t[u] * c, b = t[u + 1] * c, E = t[u + 2] * c;
      l += p, a += b, d += E, h += c, f++;
    }
    return h ? [
      Math.round(l / h),
      Math.round(a / h),
      Math.round(d / h),
      Math.round(h / f)
    ] : [0, 0, 0, 0];
  }
  createVideoThumbnail(t, i, s, r, n) {
    return t.setAttribute("crossOrigin", n ? "use-credentials" : "anonymous"), new Promise((o, l) => {
      let a = !1, d = !1;
      const h = () => {
        if (!(a && d))
          return;
        const f = i.getContext("2d");
        f.drawImage(t, 0, 0, i.width, i.height);
        let u;
        if (r) {
          const p = f.getImageData(0, 0, i.width, i.height);
          u = this.getAverageColor(p.data);
        }
        const c = i.toDataURL();
        o({
          url: c,
          color: u,
          width: t.videoWidth,
          height: t.videoHeight
        });
      };
      t.addEventListener("loadedmetadata", () => {
        i.width = s, i.height = i.width / t.videoWidth * t.videoHeight, t.currentTime = 1, a = !0, h();
      }), t.addEventListener("loadeddata", () => {
        d = !0, h();
      });
    });
  }
  getDataURL(t) {
    return new Promise((i, s) => {
      const r = new FileReader();
      r.onload = (n) => {
        if (!(n.target && n.target.result))
          return i("");
        i(n.target.result);
      }, r.readAsDataURL(t);
    });
  }
  getImageOrientationFromArrayBuffer(t) {
    const i = new DataView(t);
    if (i.getUint16(0, !1) !== 65496)
      return -2;
    const s = i.byteLength;
    let r = 2;
    for (; r < s; ) {
      if (i.getUint16(r + 2, !1) <= 8)
        return -1;
      const n = i.getUint16(r, !1);
      if (r += 2, n === 65505) {
        if (i.getUint32(r += 2, !1) !== 1165519206)
          return -1;
        const o = i.getUint16(r += 6, !1) === 18761;
        r += i.getUint32(r + 4, o);
        const l = i.getUint16(r, o);
        r += 2;
        for (let a = 0; a < l; a++)
          if (i.getUint16(r + a * 12, o) === 274)
            return i.getUint16(r + a * 12 + 8, o);
      } else {
        if ((n & 65280) !== 65280)
          break;
        r += i.getUint16(r, !1);
      }
    }
    return -1;
  }
  getImageOrientation(t) {
    return new Promise((i, s) => {
      const r = new FileReader();
      if (!r.readAsArrayBuffer)
        return i(-3);
      r.onload = (n) => {
        if (!(n.target && n.target.result))
          return i(-3);
        i(this.getImageOrientationFromArrayBuffer(n.target.result));
      }, r.readAsArrayBuffer(t.slice(0, 65536));
    });
  }
  rotateCanvas(t, i, s, r, n) {
    switch (4 < t && t < 9 ? (i.width = n, i.height = r) : (i.width = r, i.height = n), t) {
      case 2:
        s.transform(-1, 0, 0, 1, r, 0);
        break;
      case 3:
        s.transform(-1, 0, 0, -1, r, n);
        break;
      case 4:
        s.transform(1, 0, 0, -1, 0, n);
        break;
      case 5:
        s.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        s.transform(0, 1, -1, 0, n, 0);
        break;
      case 7:
        s.transform(0, -1, -1, 0, n, r);
        break;
      case 8:
        s.transform(0, -1, 1, 0, 0, r);
        break;
    }
  }
  getImageResized(t, i, s, r, n) {
    let o = t.width, l = t.height;
    const a = i;
    i && s ? (o = i, l = s) : o > l ? o > a && (l *= a / o, o = a) : l > a && (o *= a / l, l = a), o = Math.floor(o), l = Math.floor(l);
    const d = document.createElement("canvas"), h = d.getContext("2d");
    if (!h)
      return null;
    d.width = o, d.height = l, r !== void 0 && this.rotateCanvas(r, d, h, o, l), h.drawImage(t, 0, 0, o, l);
    let f = null;
    try {
      let u;
      if (n) {
        const c = h.getImageData(0, 0, o, l);
        u = this.getAverageColor(c.data);
      }
      u && (f = u);
    } catch {
    }
    return {
      image: t,
      url: d.toDataURL("image/png"),
      color: f
    };
  }
  resizeImageUrl(t, i, s, r) {
    return new Promise((n, o) => {
      t.onload = () => {
        if (!r) {
          n({
            image: t,
            url: i,
            color: void 0
          });
          return;
        }
        const l = this.getImageResized(t, s, void 0, void 0, r);
        l && (l.url = i), n(l);
      }, t.onerror = () => {
        o("Image loading failed: " + i);
      }, t.src = i;
    });
  }
  resizeImageFile(t, i, s, r) {
    return new Promise((n, o) => {
      if (i.type.indexOf("image") === -1) {
        o(new Error("Not an image"));
        return;
      }
      const l = (window.URL || window.webkitURL || {}).createObjectURL, a = (window.URL || window.webkitURL || {}).revokeObjectURL;
      let d = !1;
      const h = this.getImageOrientation(i);
      if (t.onload = () => {
        h.then((f) => {
          const u = this.getImageResized(t, s, void 0, f, r);
          d && a(t.src), n(u);
        });
      }, !(i instanceof File))
        return o("Invalid file object. Use url or a valid instance of File class");
      if (typeof l == "function" && typeof a == "function") {
        d = !0, t.src = l(i);
        return;
      }
      this.getDataURL(i).then((f) => {
        t.src = f;
      });
    });
  }
  resizeImage(t, i, s, r, n) {
    const o = new Image();
    return o.setAttribute("crossOrigin", n ? "use-credentials" : "anonymous"), s ? this.resizeImageUrl(o, s, t, r) : this.resizeImageFile(o, i, t, r);
  }
  getSizeFormatted(t) {
    const i = ["B", "KB", "MB", "GB", "TB"];
    if (t === 0)
      return "0 B";
    let s = Math.floor(Math.log(t) / Math.log(1024));
    return s = parseInt("" + s, 10), Math.round(t / Math.pow(1024, s)) + " " + i[s];
  }
  getSizeParsed(t) {
    t = ("" + t).toUpperCase();
    const i = t.match(/([\d|.]+?)\s*?([A-Z]+)/), s = ["B", "KB", "MB", "GB", "TB"];
    if (!i)
      return parseFloat(t);
    const r = s.indexOf(i[2]);
    return r === -1 ? parseFloat(t) : parseFloat(i[1]) * Math.pow(1024, r);
  }
  getColorForText(t) {
    return ((r) => {
      const n = r % 360, o = r % 100, l = 50;
      return "hsl(" + n + "," + o + "%," + l + "%, 0.75)";
    })(((r) => {
      let n = 0;
      if (r.length === 0)
        return n;
      for (let o = 0; o < r.length; o++)
        n = r.charCodeAt(o) + ((n << 5) - n), n = n & n;
      return n;
    })(t.toLowerCase()));
  }
  validateType(t, i) {
    if (!i)
      return !0;
    const s = i.split(","), r = t.type, n = r.replace(/\/.*$/, "");
    for (let o of s)
      if (o = o.trim(), o.charAt(0) === ".") {
        if (t.name.toLowerCase().indexOf(o.toLowerCase(), t.name.length - o.length) !== -1)
          return !0;
      } else if (/\/\*$/.test(o)) {
        if (n === o.replace(/\/.*$/, ""))
          return !0;
      } else if (r === o)
        return !0;
    return !1;
  }
  validateSize(t, i) {
    if (!i)
      return !0;
    const s = this.getSizeParsed(i);
    return t.size <= s;
  }
  getFilesFromDroppedItems(t) {
    return ze(t);
  }
}
const z = new Ie(), Te = /* @__PURE__ */ S({
  name: "VueFilePreview",
  components: {
    VueFileIcon: J
  },
  props: {
    averageColor: Boolean,
    deletable: Boolean,
    disabled: Boolean,
    editable: Boolean,
    errorText: {
      type: Object,
      required: !1
    },
    linkable: Boolean,
    thumbnailSize: Number,
    fileRecord: {
      type: Object,
      required: !0
    },
    withCredentials: Boolean
  },
  emits: ["dismisserror", "remove", "rename"],
  data() {
    return {
      isEditInputFocused: !1,
      isEditCancelable: !0
    };
  },
  computed: {
    hasLinkableUrl() {
      return this.linkable ? !!this.fileRecord.url() && !this.fileRecord.isPlayableVideo() && !this.fileRecord.isPlayableAudio() : !1;
    }
  },
  watch: {
    fileRecord: {
      handler() {
        this.$forceUpdate();
      },
      deep: !0
    }
  },
  methods: {
    createThumbnail(e, t) {
      if (e.videoThumbnail) {
        t.poster = e.src();
        return;
      }
      const i = document.createElement("canvas");
      z.createVideoThumbnail(
        t,
        i,
        this.fileRecord.thumbnailSize,
        this.averageColor !== !1,
        this.withCredentials === !0
      ).then((s) => {
        e.imageColor = s.color, e.videoThumbnail = s.url, e.dimensions.width = s.width, e.dimensions.height = s.height, t.poster = e.src();
      });
    },
    playAv(e) {
      if (e.stopAv) {
        e.stopAv();
        return;
      }
      const { createObjectURL: t } = window.URL || window.webkitURL || {}, { revokeObjectURL: i } = window.URL || window.webkitURL || {}, s = this.$refs.wrapper, r = document.createElement(e.isAudio() ? "audio" : "video");
      r instanceof HTMLVideoElement && e.isPlayableVideo() && this.createThumbnail(e, r), r.controls = !0, s.appendChild(r);
      const n = e.url() || t(e.file);
      r.src = n, r.play(), e.isPlayingAv = !0, e.stopAv = () => {
        r.src = "", s.removeChild(r), i(n), e.isPlayingAv = !1, e.stopAv = null;
      };
    },
    removeFileRecord(e) {
      this.clearFilename() || this.disabled !== !0 && this.$emit("remove", e);
    },
    editFileName() {
      this.editable === !0 && (!this.$refs.input || this.$refs.input.focus());
    },
    editInputFocused() {
      this.isEditInputFocused = !0, this.isEditCancelable = !0;
    },
    editInputBlured() {
      const { fileRecord: e } = this;
      e.oldFileName = this.fileRecord.name();
      const t = this.fileRecord.name(!0), { value: i } = this.$refs.input;
      e.customName = i, this.fileRecord.name(!0) !== t && (e.oldCustomName = t, this.$emit("rename", e));
      const r = 100;
      window.setTimeout(() => {
        this.$nextTick(() => {
          !this.isEditCancelable || (this.isEditInputFocused = !1);
        });
      }, r);
    },
    filenameChanged(e) {
      e && this.$refs.input.blur(), e === !1 && this.clearFilename();
    },
    filenameClearPressed() {
      !(this.editable === !0 && this.isEditInputFocused) || (this.isEditCancelable = !1);
    },
    clearFilename() {
      return this.editable === !0 && this.isEditInputFocused ? (this.$refs.input.value = "", this.isEditCancelable = !0, this.editInputBlured(), !0) : !1;
    },
    dismissError() {
      this.fileRecord.error && (this.fileRecord.error.size || this.fileRecord.error.type) || this.$emit("dismisserror", this.fileRecord);
    }
  }
}), $e = {
  key: 0,
  ref: "wrapper",
  class: "file-av-wrapper"
}, Fe = { class: "file-av-stop" }, Me = { class: "file-av-play" }, Ee = { class: "file-error-message file-error-message-client" }, Pe = /* @__PURE__ */ w("span", { class: "file-preview-overlay" }, null, -1), ke = {
  key: 1,
  class: "thumbnail",
  style: { position: "absolute", top: "0", right: "0", bottom: "0", left: "0", overflow: "hidden" }
}, Ue = ["href", "title"], Le = ["src"], Oe = ["src"], Ve = { class: "file-ext" }, He = { class: "file-size" }, Ae = ["disabled", "value"], De = {
  key: 1,
  class: "file-name-edit-icon"
}, Be = { class: "file-name-text" }, Ne = {
  key: 3,
  class: "image-dimension"
}, qe = { class: "image-dimension-width" }, je = { class: "image-dimension-height" }, Ge = { class: "file-icon" }, We = ["href", "title"];
function Ke(e, t, i, s, r, n) {
  const o = K("VueFileIcon");
  return v(), y("div", {
    class: M([
      "file-preview-wrapper-" + e.fileRecord.ext(),
      e.fileRecord.isImage() ? "file-preview-wrapper-image" : "file-preview-wrapper-other",
      "file-category-" + e.fileRecord.icon().category,
      { "file-is-playing-av": e.fileRecord.isPlayingAv },
      { "is-deletable": e.deletable === !0 },
      { "is-editable": e.editable === !0 },
      { "is-edit-input-focused": e.isEditInputFocused },
      { "has-error": e.fileRecord.error }
    ])
  }, [
    e.fileRecord.isPlayableAudio() || e.fileRecord.isPlayableVideo() ? (v(), y("div", $e, [
      w("div", {
        class: "file-av-action",
        onClick: t[0] || (t[0] = (l) => e.playAv(e.fileRecord))
      }, [
        w("span", Fe, [
          T(o, { name: "system-close" })
        ]),
        w("span", Me, [
          T(o, { name: "system-file-av-play" })
        ])
      ])
    ], 512)) : x("", !0),
    w("span", {
      class: M(["file-preview", {
        "image-preview": e.fileRecord.isImage(),
        "other-preview": !e.fileRecord.isImage(),
        "dark-content": e.fileRecord.isImage() && e.fileRecord.isDarkColor()
      }]),
      style: B({
        "background-color": e.fileRecord.color()
      })
    }, [
      e.fileRecord.error ? (v(), y("span", {
        key: 0,
        class: "file-error-wrapper",
        onClick: t[1] || (t[1] = (l) => e.dismissError())
      }, [
        w("span", Ee, $(e.fileRecord.getErrorMessage(e.errorText)), 1)
      ])) : x("", !0),
      Pe,
      e.fileRecord.isImage() || e.fileRecord.isPlayableVideo() ? (v(), y("span", ke, [
        e.hasLinkableUrl ? (v(), y("a", {
          key: 0,
          href: e.fileRecord.url(),
          target: "_blank",
          title: e.fileRecord.name()
        }, [
          w("img", {
            class: "file-preview-img",
            src: e.fileRecord.src()
          }, null, 8, Le)
        ], 8, Ue)) : (v(), y("img", {
          key: 1,
          class: "file-preview-img",
          src: e.fileRecord.src()
        }, null, 8, Oe))
      ])) : x("", !0),
      w("span", Ve, $(e.fileRecord.ext()), 1),
      w("span", He, $(e.fileRecord.size()), 1),
      e.deletable ? (v(), y("span", {
        key: 2,
        class: "file-delete",
        onClick: t[2] || (t[2] = (l) => e.removeFileRecord(e.fileRecord)),
        onTouchstart: t[3] || (t[3] = (l) => e.filenameClearPressed()),
        onMousedown: t[4] || (t[4] = (l) => e.filenameClearPressed())
      }, [
        T(o, { name: "system-close" })
      ], 32)) : x("", !0),
      w("span", {
        class: "file-name",
        onClick: t[11] || (t[11] = (l) => e.editFileName())
      }, [
        e.editable === !0 ? (v(), y("input", {
          key: 0,
          ref: "input",
          class: "file-name-input",
          disabled: e.disabled === !0,
          type: "text",
          value: e.fileRecord.name(!0),
          onFocus: t[5] || (t[5] = (l) => e.editInputFocused()),
          onBlur: t[6] || (t[6] = (l) => e.editInputBlured()),
          onChange: t[7] || (t[7] = (l) => e.filenameChanged()),
          onInput: t[8] || (t[8] = (l) => e.filenameChanged()),
          onKeyup: [
            t[9] || (t[9] = Z((l) => e.filenameChanged(!0), ["enter"])),
            t[10] || (t[10] = Z((l) => e.filenameChanged(!1), ["esc"]))
          ]
        }, null, 40, Ae)) : x("", !0),
        e.editable === !0 ? (v(), y("span", De, [
          T(o, { name: "system-file-name-edit" })
        ])) : x("", !0),
        w("span", Be, $(e.fileRecord.name(!0)), 1)
      ]),
      e.fileRecord.dimensions.width && e.fileRecord.dimensions.height ? (v(), y("span", Ne, [
        w("span", qe, $(e.fileRecord.dimensions.width), 1),
        w("span", je, $(e.fileRecord.dimensions.height), 1)
      ])) : x("", !0),
      e.fileRecord.hasProgress() ? (v(), y("span", {
        key: 4,
        class: M(["file-progress", {
          "file-progress-full": e.fileRecord.progress() >= 99.9999,
          "file-progress-done": e.fileRecord.progress() >= 100,
          "has-file-progress": e.fileRecord.progress() > 0
        }])
      }, [
        w("span", {
          class: "file-progress-bar",
          style: B({ width: e.fileRecord.progress() + "%" })
        }, null, 4)
      ], 2)) : x("", !0),
      w("span", Ge, [
        e.hasLinkableUrl ? (v(), y("a", {
          key: 0,
          href: e.fileRecord.url(),
          target: "_blank",
          title: e.fileRecord.name()
        }, [
          T(o, {
            ext: e.fileRecord.ext()
          }, null, 8, ["ext"])
        ], 8, We)) : (v(), Y(o, {
          key: 1,
          ext: e.fileRecord.ext()
        }, null, 8, ["ext"]))
      ])
    ], 6)
  ], 2);
}
const ce = /* @__PURE__ */ O(Te, [["render", Ke]]), Ye = /* @__PURE__ */ S({
  name: "VueFileList",
  props: {
    list: { type: Array, required: !0 },
    axis: { type: String, required: !0 },
    appendTo: { type: String, required: !0 }
  }
});
function Qe(e, t, i, s, r, n) {
  return v(), y("div", null, [
    C(e.$slots, "default")
  ]);
}
const pe = /* @__PURE__ */ O(Ye, [["render", Qe]]), Xe = /* @__PURE__ */ S({
  name: "VueFileListItem",
  props: {
    index: Number
  }
});
function Je(e, t, i, s, r, n) {
  return v(), y("div", null, [
    C(e.$slots, "default")
  ]);
}
const me = /* @__PURE__ */ O(Xe, [["render", Je]]), Ze = S({
  inject: ["manager"],
  props: {
    index: {
      type: Number,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {};
  },
  watch: {
    index(e) {
      this.$el && this.$el.sortableInfo && (this.$el.sortableInfo.index = e);
    },
    disabled(e) {
      e ? this.removeDraggable() : this.setDraggable(this.index);
    }
  },
  mounted() {
    const { disabled: e, index: t } = this.$props;
    e || this.setDraggable(t);
  },
  beforeUnmount() {
    this.disabled || this.removeDraggable();
  },
  methods: {
    setDraggable(e) {
      const t = this.$el;
      t.sortableInfo = {
        index: e,
        manager: this.manager
      }, this.ref = { node: t }, this.manager.add(this.ref);
    },
    removeDraggable() {
      this.manager.remove(this.ref);
    }
  }
});
class _e {
  constructor() {
    this.refs = [], this.active = null;
  }
  add(t) {
    this.refs || (this.refs = []), this.refs.push(t);
  }
  remove(t) {
    const i = this.getIndex(t);
    i !== -1 && this.refs.splice(i, 1);
  }
  isActive() {
    return !!this.active;
  }
  getActive() {
    return this.refs.find(({ node: t }) => {
      var i, s;
      return ((i = t == null ? void 0 : t.sortableInfo) === null || i === void 0 ? void 0 : i.index) == ((s = this === null || this === void 0 ? void 0 : this.active) === null || s === void 0 ? void 0 : s.index);
    }) || null;
  }
  getIndex(t) {
    return this.refs.indexOf(t);
  }
  getRefs() {
    return this.refs;
  }
  getOrderedRefs() {
    return this.refs.sort((t, i) => t.node.sortableInfo.index - i.node.sortableInfo.index);
  }
}
const L = (e) => e.touches != null;
function Q(e, t) {
  return !!e && Object.prototype.hasOwnProperty.call(e, t);
}
function et(e, t, i) {
  const s = e.slice(0);
  if (i >= s.length) {
    let r = i - s.length;
    for (; r-- + 1; )
      s.push(void 0);
  }
  return s.splice(i, 0, s.splice(t, 1)[0]), s;
}
function tt(e, t) {
  const i = e.slice(0);
  return t >= i.length || i.splice(t, 1), i;
}
function it(e, t, i) {
  const s = e.slice(0);
  return t === s.length ? s.push(i) : s.splice(t, 0, i), s;
}
const I = {
  start: ["touchstart", "mousedown"],
  move: ["touchmove", "mousemove"],
  end: ["touchend", "mouseup"],
  cancel: ["touchcancel", "keyup"]
};
function te(e, t) {
  for (; e; ) {
    if (t(e))
      return e;
    e = e.parentNode;
  }
}
function ie(e, t, i) {
  return i < e ? e : i > t ? t : i;
}
function V(e) {
  return e.substr(-2) === "px" ? parseFloat(e) : 0;
}
function se(e) {
  const t = window.getComputedStyle(e);
  return {
    top: V(t.marginTop),
    right: V(t.marginRight),
    bottom: V(t.marginBottom),
    left: V(t.marginLeft)
  };
}
function H(e, t = "page") {
  const i = `${t}X`, s = `${t}Y`;
  return {
    x: L(e) ? e.touches[0][i] : e[i],
    y: L(e) ? e.touches[0][s] : e[s]
  };
}
function re(e) {
  const t = [e];
  for (; e; e = e.offsetParent)
    t.unshift(e);
  return t;
}
function st(e, t) {
  const i = re(e), s = re(t);
  if (i[0] != s[0])
    throw "No common ancestor!";
  for (let r = 0; r < i.length; r++)
    if (i[r] != s[r])
      return i[r - 1];
}
function F(e, t, i = { top: 0, left: 0 }) {
  if (e) {
    const s = {
      top: i.top + e.offsetTop,
      left: i.left + e.offsetLeft
    };
    return e.offsetParent !== t.offsetParent ? F(e.offsetParent, t, s) : s;
  }
  return { top: 0, left: 0 };
}
function ne(e) {
  const t = e.querySelectorAll("input, textarea, select"), i = e.cloneNode(!0);
  return [...i.querySelectorAll("input, textarea, select")].forEach((r, n) => {
    r.type !== "file" && t[n] && (r.value = t[n].value);
  }), i;
}
function rt(e, t, i) {
  if (typeof e == "string" && (e = +e), Array.isArray(e) || (e = [e, e]), e.length !== 2)
    throw new Error(`lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given ${e}`);
  const [s, r] = e;
  return [oe(s, t, i), oe(r, t, i)];
}
function oe(e, t, i) {
  let s = e, r = e, n = "px";
  if (typeof e == "string") {
    const o = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(e);
    if (o === null)
      throw new Error(`lockOffset value should be a number or a string of a number followed by "px" or "%". Given ${e}`);
    s = r = parseFloat(e), n = o[1];
  }
  if (!isFinite(s) || !isFinite(r))
    throw new Error(`lockOffset value should be a finite. Given ${e}`);
  return n === "%" && (s = s * t / 100, r = r * i / 100), {
    x: s,
    y: r
  };
}
function le(e = []) {
  for (let t = 0, i = e.length; t < i; t++) {
    const s = e[t], r = s.node;
    if (!r)
      return;
    s.edgeOffset = null, X(r);
  }
}
function X(e, t = "", i = "") {
  !e || (e.style.transform = t, e.style.transitionDuration = i);
}
const j = setTimeout, nt = S({
  inject: {
    SlicksortHub: {
      from: "SlicksortHub",
      default: null
    }
  },
  provide() {
    return {
      manager: this.manager
    };
  },
  props: {
    list: { type: Array, required: !0 },
    axis: { type: String, default: "y" },
    distance: { type: Number, default: 0 },
    pressDelay: { type: Number, default: 0 },
    pressThreshold: { type: Number, default: 5 },
    useDragHandle: { type: Boolean, default: !1 },
    useWindowAsScrollContainer: { type: Boolean, default: !1 },
    hideSortableGhost: { type: Boolean, default: !0 },
    lockToContainerEdges: { type: Boolean, default: !1 },
    lockOffset: { type: [String, Number, Array], default: "50%" },
    transitionDuration: { type: Number, default: 300 },
    appendTo: { type: String, default: "body" },
    draggedSettlingDuration: { type: Number, default: null },
    group: { type: String, default: "" },
    accept: { type: [Boolean, Array, Function], default: null },
    cancelKey: { type: String, default: "Escape" },
    block: { type: Array, default: () => [] },
    lockAxis: { type: String, default: "" },
    helperClass: { type: String, default: "" },
    contentWindow: { type: Object, default: null },
    shouldCancelStart: {
      type: Function,
      default: (e) => ["input", "textarea", "select", "option", "button"].indexOf(e.target.tagName.toLowerCase()) !== -1
    },
    getHelperDimensions: {
      type: Function,
      default: ({ node: e }) => ({
        width: e.offsetWidth,
        height: e.offsetHeight
      })
    }
  },
  emits: ["sort-start", "sort-move", "sort-end", "sort-cancel", "sort-insert", "sort-remove", "update:list"],
  data() {
    let e = !1;
    if (this.group) {
      if (this.SlicksortHub)
        e = !0;
      else if (process.env.NODE_ENV !== "production")
        throw new Error('Slicksort plugin required to use "group" prop');
    }
    return {
      sorting: !1,
      hub: e ? this.SlicksortHub : null,
      manager: new _e()
    };
  },
  mounted() {
    this.hub && (this.id = this.hub.getId()), this.container = this.$el, this.document = this.container.ownerDocument || document, this._window = this.contentWindow || window, this.scrollContainer = this.useWindowAsScrollContainer ? { scrollLeft: 0, scrollTop: 0 } : this.container, this.events = {
      start: this.handleStart,
      move: this.handleMove,
      end: this.handleEnd
    };
    for (const e in this.events)
      Q(this.events, e) && I[e].forEach((t) => this.container.addEventListener(t, this.events[e]));
    this.hub && this.hub.addContainer(this);
  },
  beforeUnmount() {
    for (const e in this.events)
      Q(this.events, e) && I[e].forEach((t) => this.container.removeEventListener(t, this.events[e]));
    this.hub && this.hub.removeContainer(this), this.dragendTimer && clearTimeout(this.dragendTimer), this.cancelTimer && clearTimeout(this.cancelTimer), this.pressTimer && clearTimeout(this.pressTimer), this.autoscrollInterval && clearInterval(this.autoscrollInterval);
  },
  methods: {
    handleStart(e) {
      const { distance: t, shouldCancelStart: i } = this.$props;
      if (!L(e) && e.button === 2 || i(e))
        return !1;
      this._touched = !0, this._pos = H(e);
      const s = e.target, r = te(s, (n) => n.sortableInfo != null);
      if (r && r.sortableInfo && this.nodeIsChild(r) && !this.sorting) {
        const { useDragHandle: n } = this.$props, { index: o } = r.sortableInfo;
        if (n && !te(s, (l) => l.sortableHandle != null))
          return;
        this.manager.active = { index: o }, s.tagName.toLowerCase() === "a" && e.preventDefault(), t || (this.pressDelay === 0 ? this.handlePress(e) : this.pressTimer = j(() => this.handlePress(e), this.pressDelay));
      }
    },
    nodeIsChild(e) {
      return e.sortableInfo.manager === this.manager;
    },
    handleMove(e) {
      const { distance: t, pressThreshold: i } = this.$props;
      if (!this.sorting && this._touched) {
        const s = H(e);
        this._delta = {
          x: this._pos.x - s.x,
          y: this._pos.y - s.y
        };
        const r = Math.abs(this._delta.x) + Math.abs(this._delta.y);
        !t && (!i || i && r >= i) ? (this.cancelTimer && clearTimeout(this.cancelTimer), this.cancelTimer = j(this.cancel, 0)) : t && r >= t && this.manager.isActive() && this.handlePress(e);
      }
    },
    handleEnd() {
      if (!this._touched)
        return;
      const { distance: e } = this.$props;
      this._touched = !1, e || this.cancel();
    },
    cancel() {
      this.sorting || (this.pressTimer && clearTimeout(this.pressTimer), this.manager.active = null, this.hub && this.hub.cancel());
    },
    handleSortCancel(e) {
      (L(e) || e.key === this.cancelKey) && (this.newIndex = this.index, this.canceling = !0, this.translate = { x: 0, y: 0 }, this.animateNodes(), this.handleSortEnd(e));
    },
    handlePress(e) {
      e.stopPropagation();
      const t = this.manager.getActive();
      if (t) {
        const { getHelperDimensions: i, helperClass: s, hideSortableGhost: r, appendTo: n } = this.$props, { node: o } = t, { index: l } = o.sortableInfo, a = se(o), d = this.container.getBoundingClientRect(), h = i({ index: l, node: o });
        this.node = o, this.margin = a, this.width = h.width, this.height = h.height, this.marginOffset = {
          x: this.margin.left + this.margin.right,
          y: Math.max(this.margin.top, this.margin.bottom)
        }, this.boundingClientRect = o.getBoundingClientRect(), this.containerBoundingRect = d, this.index = l, this.newIndex = l;
        const f = ne(o);
        this.helper = this.document.querySelector(n).appendChild(f), this.helper.style.position = "fixed", this.helper.style.top = `${this.boundingClientRect.top - a.top}px`, this.helper.style.left = `${this.boundingClientRect.left - a.left}px`, this.helper.style.width = `${this.width}px`, this.helper.style.height = `${this.height}px`, this.helper.style.boxSizing = "border-box", this.helper.style.pointerEvents = "none", r && (this.sortableGhost = o, o.style.visibility = "hidden", o.style.opacity = "0"), this.hub && (this.hub.sortStart(this), this.hub.helper = this.helper, this.hub.ghost = this.sortableGhost), this.intializeOffsets(e, this.boundingClientRect), this.offsetEdge = F(o, this.container), s && this.helper.classList.add(...s.split(" ")), this.listenerNode = L(e) ? o : this._window, I.move.forEach((u) => this.listenerNode.addEventListener(u, this.handleSortMove)), I.end.forEach((u) => this.listenerNode.addEventListener(u, this.handleSortEnd)), I.cancel.forEach((u) => this.listenerNode.addEventListener(u, this.handleSortCancel)), this.sorting = !0, this.$emit("sort-start", { event: e, node: o, index: l });
      }
    },
    handleSortMove(e) {
      if (e.preventDefault(), this.updatePosition(e), this.hub) {
        const t = this.list[this.index];
        this.hub.handleSortMove(e, t);
      }
      (!this.hub || this.hub.isDest(this)) && (this.animateNodes(), this.autoscroll()), this.$emit("sort-move", { event: e });
    },
    handleDropOut() {
      const e = this.list[this.index], t = tt(this.list, this.index);
      return this.$emit("sort-remove", {
        oldIndex: this.index
      }), this.$emit("update:list", t), e;
    },
    handleDropIn(e) {
      const t = it(this.list, this.newIndex, e);
      this.$emit("sort-insert", {
        newIndex: this.newIndex,
        value: e
      }), this.$emit("update:list", t), this.handleDragEnd();
    },
    handleDragOut() {
      this.autoscrollInterval && (clearInterval(this.autoscrollInterval), this.autoscrollInterval = null), this.hub.isSource(this) ? (this.translate = {
        x: 1e4,
        y: 1e4
      }, this.animateNodes()) : (this.manager.getRefs().forEach((e) => {
        e.node.style.transform = "";
      }), this.dragendTimer = j(this.handleDragEnd, this.transitionDuration || 0));
    },
    handleDragEnd() {
      this.autoscrollInterval && (clearInterval(this.autoscrollInterval), this.autoscrollInterval = null), le(this.manager.getRefs()), this.sortableGhost && (this.sortableGhost.remove(), this.sortableGhost = null), this.dragendTimer && (clearTimeout(this.dragendTimer), this.dragendTimer = null), this.manager.active = null, this._touched = !1, this.sorting = !1;
    },
    intializeOffsets(e, t) {
      const { useWindowAsScrollContainer: i, containerBoundingRect: s, _window: r } = this;
      this.marginOffset = {
        x: this.margin.left + this.margin.right,
        y: Math.max(this.margin.top, this.margin.bottom)
      }, this._axis = {
        x: this.axis.indexOf("x") >= 0,
        y: this.axis.indexOf("y") >= 0
      }, this.initialOffset = H(e), this.initialScroll = {
        top: this.scrollContainer.scrollTop,
        left: this.scrollContainer.scrollLeft
      }, this.initialWindowScroll = {
        top: window.pageYOffset,
        left: window.pageXOffset
      }, this.translate = { x: 0, y: 0 }, this.minTranslate = {}, this.maxTranslate = {}, this._axis.x && (this.minTranslate.x = (i ? 0 : s.left) - t.left - this.width / 2, this.maxTranslate.x = (i ? r.innerWidth : s.left + s.width) - t.left - this.width / 2), this._axis.y && (this.minTranslate.y = (i ? 0 : s.top) - t.top - this.height / 2, this.maxTranslate.y = (i ? r.innerHeight : s.top + s.height) - t.top - this.height / 2);
    },
    handleDragIn(e, t, i) {
      if (this.hub.isSource(this))
        return;
      this.dragendTimer && (this.handleDragEnd(), clearTimeout(this.dragendTimer), this.dragendTimer = null);
      const s = this.manager.getRefs();
      this.index = s.length, this.manager.active = { index: this.index };
      const r = this.container.getBoundingClientRect(), n = i.getBoundingClientRect();
      this.containerBoundingRect = r, this.sortableGhost = ne(t), this.container.appendChild(this.sortableGhost);
      const o = this.sortableGhost.getBoundingClientRect();
      this.boundingClientRect = o, this.margin = se(this.sortableGhost), this.width = o.width, this.height = o.height, this.offsetEdge = F(this.sortableGhost, this.container), this.intializeOffsets(e, o), this.initialOffset.x += o.x - n.x, this.initialOffset.y += o.y - n.y, this.sorting = !0;
    },
    handleSortEnd(e) {
      this.listenerNode && (I.move.forEach((s) => this.listenerNode.removeEventListener(s, this.handleSortMove)), I.end.forEach((s) => this.listenerNode.removeEventListener(s, this.handleSortEnd)), I.cancel.forEach((s) => this.listenerNode.removeEventListener(s, this.handleSortCancel)));
      const t = this.manager.getRefs();
      this.helper && this.helperClass && this.helper.classList.remove(...this.helperClass.split(" ")), this.autoscrollInterval && clearInterval(this.autoscrollInterval), this.autoscrollInterval = null;
      const i = () => {
        this.helper && (this.helper.remove(), this.helper = null), this.hideSortableGhost && this.sortableGhost && (this.sortableGhost.style.visibility = "", this.sortableGhost.style.opacity = ""), le(t), this.hub && !this.hub.isDest(this) ? this.canceling ? this.hub.cancel() : this.hub.handleSortEnd() : this.canceling ? this.$emit("sort-cancel", { event: e }) : (this.$emit("sort-end", {
          event: e,
          oldIndex: this.index,
          newIndex: this.newIndex
        }), this.$emit("update:list", et(this.list, this.index, this.newIndex))), this.manager.active = null, this._touched = !1, this.canceling = !1, this.sorting = !1;
      };
      this.transitionDuration || this.draggedSettlingDuration ? this.transitionHelperIntoPlace(t, i) : i();
    },
    transitionHelperIntoPlace(e, t) {
      if (this.draggedSettlingDuration === 0 || e.length === 0 || !this.helper)
        return Promise.resolve();
      const i = e[this.index].node;
      let s = 0, r = 0;
      const n = {
        top: window.pageYOffset - this.initialWindowScroll.top,
        left: window.pageXOffset - this.initialWindowScroll.left
      };
      if (this.hub && !this.hub.isDest(this) && !this.canceling) {
        const d = this.hub.getDest();
        if (!d)
          return;
        const h = d.newIndex, f = d.manager.getOrderedRefs(), u = h < f.length ? f[h].node : d.sortableGhost, c = st(i, u), p = F(i, c), b = F(u, c);
        s = b.left - p.left - n.left, r = b.top - p.top - n.top;
      } else {
        const d = e[this.newIndex].node, h = {
          left: this.scrollContainer.scrollLeft - this.initialScroll.left + n.left,
          top: this.scrollContainer.scrollTop - this.initialScroll.top + n.top
        };
        s = -h.left, this.translate && this.translate.x > 0 ? s += d.offsetLeft + d.offsetWidth - (i.offsetLeft + i.offsetWidth) : s += d.offsetLeft - i.offsetLeft, r = -h.top, this.translate && this.translate.y > 0 ? r += d.offsetTop + d.offsetHeight - (i.offsetTop + i.offsetHeight) : r += d.offsetTop - i.offsetTop;
      }
      const o = this.draggedSettlingDuration !== null ? this.draggedSettlingDuration : this.transitionDuration;
      X(this.helper, `translate3d(${s}px,${r}px, 0)`, `${o}ms`);
      const l = (d) => {
        (!d || d.propertyName === "transform") && (clearTimeout(a), X(this.helper), t());
      }, a = setTimeout(l, o + 10);
      this.helper.addEventListener("transitionend", l);
    },
    updatePosition(e) {
      const { lockAxis: t, lockToContainerEdges: i } = this.$props, s = H(e), r = {
        x: s.x - this.initialOffset.x,
        y: s.y - this.initialOffset.y
      };
      if (r.y -= window.pageYOffset - this.initialWindowScroll.top, r.x -= window.pageXOffset - this.initialWindowScroll.left, this.translate = r, i) {
        const [n, o] = rt(this.lockOffset, this.height, this.width), l = {
          x: this.width / 2 - n.x,
          y: this.height / 2 - n.y
        }, a = {
          x: this.width / 2 - o.x,
          y: this.height / 2 - o.y
        };
        this.minTranslate.x && this.maxTranslate.x && (r.x = ie(this.minTranslate.x + l.x, this.maxTranslate.x - a.x, r.x)), this.minTranslate.y && this.maxTranslate.y && (r.y = ie(this.minTranslate.y + l.y, this.maxTranslate.y - a.y, r.y));
      }
      t === "x" ? r.y = 0 : t === "y" && (r.x = 0), this.helper && (this.helper.style.transform = `translate3d(${r.x}px,${r.y}px, 0)`);
    },
    animateNodes() {
      const { transitionDuration: e, hideSortableGhost: t } = this.$props, i = this.manager.getOrderedRefs(), s = {
        left: this.scrollContainer.scrollLeft - this.initialScroll.left,
        top: this.scrollContainer.scrollTop - this.initialScroll.top
      }, r = {
        left: this.offsetEdge.left + this.translate.x + s.left,
        top: this.offsetEdge.top + this.translate.y + s.top
      }, n = {
        top: window.pageYOffset - this.initialWindowScroll.top,
        left: window.pageXOffset - this.initialWindowScroll.left
      };
      this.newIndex = null;
      for (let o = 0, l = i.length; o < l; o++) {
        const { node: a } = i[o], d = a.sortableInfo.index, h = a.offsetWidth, f = a.offsetHeight, u = {
          width: this.width > h ? h / 2 : this.width / 2,
          height: this.height > f ? f / 2 : this.height / 2
        }, c = {
          x: 0,
          y: 0
        };
        let { edgeOffset: p } = i[o];
        p || (i[o].edgeOffset = p = F(a, this.container));
        const b = o < i.length - 1 && i[o + 1], E = o > 0 && i[o - 1];
        if (b && !b.edgeOffset && (b.edgeOffset = F(b.node, this.container)), d === this.index) {
          t && (this.sortableGhost = a, a.style.visibility = "hidden", a.style.opacity = "0");
          continue;
        }
        e && (a.style.transitionDuration = `${e}ms`), this._axis.x ? this._axis.y ? d < this.index && (r.left + n.left - u.width <= p.left && r.top + n.top <= p.top + u.height || r.top + n.top + u.height <= p.top) ? (c.x = this.width + this.marginOffset.x, p.left + c.x > this.containerBoundingRect.width - u.width && b && (c.x = b.edgeOffset.left - p.left, c.y = b.edgeOffset.top - p.top), this.newIndex === null && (this.newIndex = d)) : d > this.index && (r.left + n.left + u.width >= p.left && r.top + n.top + u.height >= p.top || r.top + n.top + u.height >= p.top + f) && (c.x = -(this.width + this.marginOffset.x), p.left + c.x < this.containerBoundingRect.left + u.width && E && (c.x = E.edgeOffset.left - p.left, c.y = E.edgeOffset.top - p.top), this.newIndex = d) : d > this.index && r.left + n.left + u.width >= p.left ? (c.x = -(this.width + this.marginOffset.x), this.newIndex = d) : d < this.index && r.left + n.left <= p.left + u.width && (c.x = this.width + this.marginOffset.x, this.newIndex == null && (this.newIndex = d)) : this._axis.y && (d > this.index && r.top + n.top + u.height >= p.top ? (c.y = -(this.height + this.marginOffset.y), this.newIndex = d) : d < this.index && r.top + n.top <= p.top + u.height && (c.y = this.height + this.marginOffset.y, this.newIndex == null && (this.newIndex = d))), a.style.transform = `translate3d(${c.x}px,${c.y}px,0)`;
      }
      this.newIndex == null && (this.newIndex = this.index);
    },
    autoscroll() {
      const e = this.translate, t = {
        x: 0,
        y: 0
      }, i = {
        x: 1,
        y: 1
      }, s = {
        x: 10,
        y: 10
      };
      e.y >= this.maxTranslate.y - this.height / 2 ? (t.y = 1, i.y = s.y * Math.abs((this.maxTranslate.y - this.height / 2 - e.y) / this.height)) : e.x >= this.maxTranslate.x - this.width / 2 ? (t.x = 1, i.x = s.x * Math.abs((this.maxTranslate.x - this.width / 2 - e.x) / this.width)) : e.y <= this.minTranslate.y + this.height / 2 ? (t.y = -1, i.y = s.y * Math.abs((e.y - this.height / 2 - this.minTranslate.y) / this.height)) : e.x <= this.minTranslate.x + this.width / 2 && (t.x = -1, i.x = s.x * Math.abs((e.x - this.width / 2 - this.minTranslate.x) / this.width)), this.autoscrollInterval && (clearInterval(this.autoscrollInterval), this.autoscrollInterval = null), (t.x !== 0 || t.y !== 0) && (this.autoscrollInterval = window.setInterval(() => {
        const r = {
          left: 1 * i.x * t.x,
          top: 1 * i.y * t.y
        };
        this.useWindowAsScrollContainer ? this._window.scrollBy(r.left, r.top) : (this.scrollContainer.scrollTop += r.top, this.scrollContainer.scrollLeft += r.left), this.translate.x += r.left, this.translate.y += r.top, this.animateNodes();
      }, 5));
    }
  }
}), ge = S({
  name: "SlickItem",
  mixins: [Ze],
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  render() {
    var e, t;
    return k(this.tag, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
  }
}), ot = S({
  name: "SlickList",
  mixins: [nt],
  props: {
    tag: {
      type: String,
      default: "div"
    },
    itemKey: {
      type: [String, Function],
      default: "id"
    }
  },
  render() {
    var e, t;
    return this.$slots.item ? k(this.tag, this.list.map((i, s) => {
      let r;
      if (i != null) {
        if (typeof this.itemKey == "function")
          r = this.itemKey(i);
        else if (typeof i == "object" && Q(i, this.itemKey) && typeof i[this.itemKey] == "string")
          r = i[this.itemKey];
        else if (typeof i == "string")
          r = i;
        else
          throw new Error("Cannot find key for item, use the item-key prop and pass a function or string");
        return k(ge, {
          key: r,
          index: s
        }, {
          default: () => {
            var n, o;
            return (o = (n = this.$slots).item) === null || o === void 0 ? void 0 : o.call(n, { item: i, index: s });
          }
        });
      }
    })) : k(this.tag, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
  }
});
S({
  props: {
    tag: {
      type: String,
      default: "span"
    }
  },
  mounted() {
    this.$el.sortableHandle = !0;
  },
  render() {
    var e, t;
    return k(this.tag, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
  }
});
class R {
  constructor(t, i) {
    m(this, "urlValue", null);
    m(this, "urlResized", null);
    m(this, "image", {});
    m(this, "isPlayingAv", !1);
    m(this, "oldFileName", null);
    m(this, "oldCustomName", null);
    m(this, "upload", { data: null, error: !1 });
    m(this, "raw");
    m(this, "progressInternal");
    m(this, "accept");
    m(this, "dimensions");
    m(this, "error");
    m(this, "file");
    m(this, "height");
    m(this, "width");
    m(this, "id");
    m(this, "imageColor");
    m(this, "lastKnownSrc");
    m(this, "maxSize");
    m(this, "options");
    m(this, "read");
    m(this, "thumbnailSize");
    m(this, "videoThumbnail");
    m(this, "customName");
    m(this, "xhr");
    m(this, "xhrQueue");
    m(this, "stopAv");
    m(this, "tusUpload");
    m(this, "calculateAverageColor");
    this.urlValue = null, this.urlResized = null, this.lastKnownSrc = null, this.image = {}, this.isPlayingAv = !1, this.oldFileName = null, this.oldCustomName = null, this.raw = t, this.file = t.file instanceof File ? t.file : this.createDummyFile(t), this.progressInternal = isNaN(t.progress) ? 0 : t.progress, this.thumbnailSize = i.thumbnailSize || 360, this.read = !!i.read, this.dimensions = t.dimensions || { width: 0, height: 0 }, this.dimensions.width = this.dimensions.width || 0, this.dimensions.height = this.dimensions.height || 0, this.error = t.error || !1, this.options = i, this.maxSize = i.maxSize, this.accept = i.accept, this.id = Math.random() + ":" + new Date().getTime(), this.videoThumbnail = t.videoThumbnail, this.imageColor = t.imageColor, this.customName = t.customName, this.calculateAverageColor = i.averageColor !== void 0 ? i.averageColor : !0, this.validate();
  }
  static getFromRaw(t, i, s) {
    const r = new R(t, i), n = r.setUrl(t.url);
    return s ? r : n;
  }
  static fromRaw(t, i) {
    return R.getFromRaw(t, i, !1);
  }
  static fromRawSync(t, i) {
    return R.getFromRaw(t, i, !0);
  }
  static fromRawArray(t, i) {
    const s = [];
    for (const r of t)
      s.push(R.fromRaw(r, i));
    return Promise.all(s);
  }
  static fromRawArraySync(t, i) {
    const s = [];
    for (const r of t)
      s.push(R.fromRawSync(r, i));
    return s;
  }
  static toRawArray(t) {
    const i = [];
    for (const s of t)
      i.push(s.toRaw());
    return i;
  }
  static readFile(t) {
    return new Promise((i, s) => {
      if (!t.read) {
        t.setUrl(null).then(
          () => {
            i(t);
          },
          (r) => {
            i(t);
          }
        );
        return;
      }
      z.getDataURL(t.file).then((r) => {
        t.setUrl(r).then(() => {
          i(t);
        }, s);
      }, s);
    });
  }
  static readFiles(t) {
    const i = [];
    for (const s of t)
      i.push(R.readFile(s));
    return Promise.all(i);
  }
  createDummyFile(t) {
    const i = {};
    i.lastModified = t.lastModified;
    const s = new Date();
    return i.lastModified && s.setTime(i.lastModified), i.lastModifiedDate = s, i.name = t.name, i.size = t.size, i.type = t.type, i;
  }
  hasProgress() {
    return !isNaN(this.progressInternal);
  }
  progress(t) {
    if (t !== void 0) {
      this.progressInternal = t;
      return;
    }
    return this.progressInternal;
  }
  url(t) {
    return t !== void 0 ? this.setUrl(t) : this.urlValue || void 0;
  }
  src() {
    return this.isImage() ? this.urlResized || this.urlValue || this.file.url : this.isPlayableVideo() && this.videoThumbnail || "";
  }
  size() {
    return this.file ? z.getSizeFormatted(this.file.size) : "";
  }
  ext() {
    return this.file && this.file.name.indexOf(".") !== -1 ? this.file.name.split(".").pop() : "?";
  }
  name(t) {
    const i = this.ext();
    if (this.customName)
      return this.customName + (t ? "" : i !== "?" ? "." + i : "");
    const s = this.file && this.file.name;
    return t && i !== "?" ? s.substr(0, s.length - (i.length + 1)) : s;
  }
  isDarkColor() {
    if (this.imageColor) {
      const t = this.imageColor, i = 20;
      return t[0] <= i && t[1] <= i && t[2] <= i;
    }
    return !1;
  }
  color() {
    if (this.imageColor) {
      const s = this.imageColor;
      return "rgb(" + s[0] + ", " + s[1] + ", " + s[2] + ")";
    }
    if (this.isImage())
      return "transparent";
    const t = this.ext(), i = this.icon();
    return i.color ? i.color : z.getColorForText(t);
  }
  isImage() {
    return this.file && this.file.type !== "image/x-wmf" && !!this.file.type.match(/image((?!vnd).)*$/i);
  }
  isVideo() {
    return this.file && this.file.type.indexOf("video") !== -1;
  }
  isPlayableVideo() {
    return this.icon().category === "video-playable";
  }
  isAudio() {
    return this.file && this.file.type.indexOf("audio") !== -1;
  }
  isPlayableAudio() {
    return this.icon().category === "audio-playable";
  }
  isText() {
    return this.file && this.file.type.indexOf("text") !== -1;
  }
  setUrl(t) {
    return this.urlValue = t, new Promise((i, s) => {
      if (this.isImage()) {
        this.resizeImage().then(
          () => {
            i(this);
          },
          (r) => {
            i(this);
          }
        );
        return;
      }
      i(this);
    });
  }
  imageResized(t) {
    !t || (this.urlResized = t.url, this.image = t.image, t.image && t.image.width && t.image.height && (this.dimensions.width = t.image.width, this.dimensions.height = t.image.height), this.lastKnownSrc = this.urlResized, this.imageColor = t.color);
  }
  resizeImage() {
    return new Promise((t, i) => {
      z.resizeImage(this.thumbnailSize, this.file, this.urlValue, this.calculateAverageColor).then((s) => {
        this.imageResized(s), t(this);
      }).catch(i);
    });
  }
  icon() {
    const t = this.ext();
    return fe(t);
  }
  getErrorMessage(t) {
    const i = this.error;
    return i ? (t = t || {}, t = {
      common: t.common || "Invalid file.",
      type: t.type || "Invalid file type.",
      size: t.size || "Files should not exceed " + this.maxSize + " in size"
    }, i.type ? t.type : i.size ? t.size : i.upload ? this.upload.error ? this.upload.error : i.upload : t.common) : "";
  }
  toRaw() {
    const t = this.raw || {};
    return t.url = this.url(), t.urlResized = this.urlResized, t.src = this.src(), t.name = this.name(), t.lastModified = this.file.lastModified, t.sizeText = this.size(), t.size = this.file.size, t.type = this.file.type, t.ext = this.ext(), t.color = this.color(), t.file = this.file, t.progress = this.progress(), t.upload = this.upload, "error" in t || Object.defineProperty(t, "error", {
      get: () => this.error
    }), t.dimensions = this.dimensions, t;
  }
  validate() {
    const t = z.validateType(this.file, this.accept), i = z.validateSize(this.file, this.maxSize);
    !t || !i ? this.error = {
      type: !t,
      size: !i
    } : this.error = !1;
  }
}
class lt {
  createError(t, i, s, r) {
    const n = new Error(t);
    return n.error = !0, i && (n.code = i), n.request = s, n.response = r, n;
  }
  settle(t, i, s) {
    const r = (n) => n >= 200 && n < 300;
    !s.status || !r || r(s.status) ? t(s) : i(this.createError("Request failed with status code " + s.status, null, s.request, s));
  }
  request(t, i, s = null, r) {
    return new Promise((n, o) => {
      let l = new XMLHttpRequest();
      const a = "onreadystatechange";
      l.open(t, i, !0), l[a] = () => {
        if (!l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0))
          return;
        const d = l.getAllResponseHeaders();
        let h = l.responseText;
        const f = l.getResponseHeader("Content-Type");
        if (f && f.indexOf("application/json") !== -1)
          h = JSON.parse(h);
        else
          try {
            h = JSON.parse(h);
          } catch {
          }
        const u = {
          data: h,
          status: l.status === 1223 ? 204 : l.status,
          statusText: l.status === 1223 ? "No Content" : l.statusText,
          headers: d,
          request: l
        };
        this.settle(n, o, u), l = null;
      }, l.onabort = () => {
        !l || (o(this.createError("Request aborted", "ECONNABORTED", l)), l = null);
      }, l.onerror = () => {
        o(this.createError("Network Error", null, l)), l = null;
      }, l.ontimeout = () => {
        o(this.createError("timeout exceeded", "ECONNABORTED", l)), l = null;
      }, typeof r == "function" && r(l), l.send(s);
    });
  }
  post(t, i, s) {
    return this.request("POST", t, i, s);
  }
  delete(t, i, s) {
    return this.request("DELETE", t, i, s);
  }
  put(t, i, s) {
    return this.request("PUT", t, i, s);
  }
}
const G = new lt();
class at {
  addHeaders(t, i) {
    if (t.setRequestHeader("Accept", "application/json"), i)
      for (const s in i)
        i.hasOwnProperty(s) && t.setRequestHeader(s, i[s]);
    return t;
  }
  doUpload(t, i, s, r, n) {
    return G.post(t, s, (o) => {
      this.addHeaders(o, i), o.upload.addEventListener("progress", r, !1), typeof n == "function" && n(o);
    });
  }
  doDeleteUpload(t, i, s, r) {
    return typeof s != "string" && (s = JSON.stringify(s)), G.delete(t, s, (n) => {
      n.setRequestHeader("Content-Type", "application/json"), this.addHeaders(n, i), typeof r == "function" && r(n);
    });
  }
  doUpdateUpload(t, i, s, r) {
    return typeof s != "string" && (s = JSON.stringify(s)), G.put(t, s, (n) => {
      n.setRequestHeader("Content-Type", "application/json"), this.addHeaders(n, i), typeof r == "function" && r(n);
    });
  }
  prepareUploadError(t, i, s) {
    let r = i.message;
    if (i.response && i.response.data)
      try {
        r = i.response.data.error || JSON.parse(i.response.data).error;
      } catch {
      }
    t.error || (t.error = {}), t.error.upload = r, t.upload.data = void 0, t.upload.error = r, s && window.setTimeout(() => {
      t.error || (t.error = {}), t.error.upload = !1, !t.error.size && !t.error.type && (t.error = !1);
    }, s);
  }
  upload(t, i, s, r, n, o) {
    let l = () => {
    };
    n && (l = () => {
      let h = 0;
      for (const f of s)
        h += f.progress();
      n(h / s.length);
    });
    const a = [];
    let d = 0;
    for (const h of s) {
      let f;
      typeof r == "function" ? f = r(h) : (f = new FormData(), f.append("file", h.file), f.append("filename", h.name()));
      const u = this.doUpload(
        t,
        i,
        f,
        (c) => {
          const p = c.loaded * 100 / c.total;
          h.progress(p >= 100 ? 99.9999 : p), l();
        },
        (c) => {
          h.xhr = c, typeof o == "function" && o(c);
        }
      );
      a.push(
        new Promise((c, p) => {
          u.then(
            (b) => {
              delete h.xhr, h.upload.data = b.data, h.upload.error = !1, h.progress(100), h.xhrQueue && (h.xhrQueue(), delete h.xhrQueue), c(b);
            },
            (b) => {
              this.prepareUploadError(h, b), c(b), d++;
            }
          );
        })
      );
    }
    return new Promise((h, f) => {
      Promise.all(a).then((u) => {
        if (d === a.length) {
          f(u);
          return;
        }
        h(u);
      }, f);
    });
  }
  deleteUpload(t, i, s, r, n) {
    return new Promise((o, l) => {
      s.xhr && s.xhr.abort(), r === void 0 && (r = s.upload.data), r && this.doDeleteUpload(t, i, r, (a) => {
        typeof n == "function" && n(a);
      }).then(
        (a) => {
          o(a);
        },
        (a) => {
          this.prepareUploadError(s, a), l(a);
        }
      );
    });
  }
  updateUpload(t, i, s, r, n) {
    return new Promise((o, l) => {
      if (s.xhr)
        return s.xhrQueue = () => {
          this.updateUpload(t, i, s, r);
        }, o(void 0);
      r === void 0 && (r = s.upload.data || {}, r.old_filename = s.oldFileName, r.filename = s.name()), r && this.doUpdateUpload(t, i, r, (a) => {
        typeof n == "function" && n(a);
      }).then(
        (a) => {
          s.upload.data = a.data, s.upload.error = !1, o(a);
        },
        (a) => {
          this.prepareUploadError(s, a), l(a);
        }
      );
    });
  }
  doTusUpload(t, i, s, r, n, o, l) {
    const a = o ? o(s) : {};
    return new Promise((d, h) => {
      if (!t)
        return h(new Error("tus required. Please install tus-js-client"));
      const f = s.file, u = new t.Upload(f, {
        endpoint: i,
        headers: r,
        retryDelays: a.retryDelays ? a.retryDelays : [0, 3e3, 5e3, 1e4, 2e4],
        metadata: a.metadata ? a.metadata : {
          filename: f.name,
          filetype: f.type
        },
        onError(c) {
          h(c);
        },
        onProgress(c, p) {
          n({ loaded: c, total: p });
        },
        onSuccess() {
          d(u);
        },
        onBeforeRequest: function(c) {
          const p = c.getUnderlyingObject();
          p.withCredentials = l === !0;
        }
      });
      s.tusUpload = u, u.start();
    });
  }
  tusUpload(t, i, s, r, n, o, l) {
    let a = () => {
    };
    n && (a = () => {
      let h = 0;
      for (const f of r)
        h += f.progress();
      n(h / r.length);
    });
    const d = [];
    for (const h of r) {
      const f = this.doTusUpload(
        t,
        i,
        h,
        s,
        (u) => {
          const c = u.loaded * 100 / u.total;
          h.progress(c >= 100 ? 99.9999 : c), a();
        },
        o,
        l
      );
      f.then(
        (u) => {
          h.progress(100);
        },
        (u) => {
          this.prepareUploadError(h, u);
        }
      ), d.push(f);
    }
    return Promise.all(d);
  }
  tusDeleteUpload(t, i, s, r) {
    return new Promise((n, o) => {
      if (!t)
        return o("tus required");
      if (!r.tusUpload)
        return n(void 0);
      const l = (a) => new Promise((d, h) => {
        r.tusUpload.abort(a, (f) => {
          if (f) {
            this.prepareUploadError(r, f), h(f);
            return;
          }
          d(void 0);
        });
      });
      l(!1).then(() => {
        window.setTimeout(() => {
          l(!0).then(n, o);
        }, 1e3);
      });
    });
  }
}
const P = new at();
var ae = {
  tus: null
};
let A = 0;
const ht = /* @__PURE__ */ S({
  name: "VueFileAgent",
  components: {
    VueFileIcon: J,
    VueFilePreview: ce,
    VueFileList: pe,
    VueFileListItem: me,
    SlickList: ot,
    SlickItem: ge
  },
  directives: {
    vfaSortableHandle: {
      beforeMount(e) {
        e.sortableHandle = !0;
      }
    }
  },
  props: {
    accept: String,
    auto: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    averageColor: Boolean,
    capture: {
      type: String,
      required: !1
    },
    compact: Boolean,
    deletable: Boolean,
    disabled: Boolean,
    editable: Boolean,
    errorText: {
      type: Object,
      required: !1
    },
    helpText: String,
    linkable: Boolean,
    maxFiles: Number,
    maxSize: String,
    meta: {
      type: Boolean,
      default: !0
    },
    multiple: Boolean,
    read: Boolean,
    readonly: Boolean,
    resumable: Boolean,
    sortable: {
      type: [String, Boolean]
    },
    theme: String,
    thumbnailSize: Number,
    uploadConfig: {
      type: Function,
      required: !1
    },
    uploadHeaders: {
      type: Object
    },
    uploadUrl: String,
    uploadWithCredentials: Boolean,
    rawModelValue: Array
  },
  emits: [
    "beforedelete",
    "change",
    "delete",
    "drop",
    "rename",
    "select",
    "sort",
    "upload",
    "upload:error",
    "upload:delete",
    "upload:delete:error",
    "upload:update",
    "upload:update:error",
    "update:modelValue",
    "update:rawModelValue"
  ],
  data() {
    return {
      fileRecords: [],
      rawFileRecords: [],
      isDragging: !1,
      isSorting: !1,
      isSortingActive: !1,
      transitionDuration: 300,
      overallProgress: 0,
      uniqueId: "",
      sortTimeout: 0
    };
  },
  computed: {
    withCredentials() {
      return this.uploadWithCredentials;
    },
    canAddMore() {
      return this.hasMultiple ? this.maxFiles ? this.fileRecords.length < this.maxFiles : !0 : this.fileRecords.length === 0;
    },
    helpTextComputed() {
      return this.helpText ? this.helpText : `Choose ${this.hasMultiple ? "files" : "file"} or drag & drop here`;
    },
    isDeletable() {
      return typeof this.deletable == "string" ? this.deletable !== "false" : !!this.deletable;
    },
    isSortable() {
      return !!this.sortable;
    },
    hasMultiple() {
      return typeof this.multiple == "string" ? this.multiple !== "false" : this.multiple === void 0 ? Array.isArray(this.fileRecords) : !!this.multiple;
    },
    shouldRead() {
      return this.read;
    },
    dragOptions() {
      return {
        animation: this.transitionDuration,
        group: this.uniqueId,
        disabled: this.isSortable,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    rawModelValue: {
      handler() {
        this.checkValue();
      },
      deep: !0
    }
  },
  created() {
    this.uniqueId = new Date().getTime().toString(36) + Math.random().toString(36).slice(2), this.checkValue();
  },
  methods: {
    createThumbnail(e, t) {
      return new Promise((i, s) => {
        const r = document.createElement("canvas");
        z.createVideoThumbnail(
          t,
          r,
          e.thumbnailSize,
          this.averageColor !== !1,
          this.withCredentials
        ).then((n) => {
          e.imageColor = n.color, e.videoThumbnail = n.url, e.dimensions.width = n.width, e.dimensions.height = n.height, i();
        }, s);
      });
    },
    initVideo(e) {
      if (!e.isPlayableVideo())
        return;
      const { createObjectURL: t } = window.URL || window.webkitURL || {}, { revokeObjectURL: i } = window.URL || window.webkitURL || {}, s = document.createElement("video");
      s.src = t(e.file), this.createThumbnail(e, s).then(() => {
        i(s.src);
      }), s.load();
    },
    getFileRecordOrRawInstance(e, t) {
      let i;
      return e instanceof R ? i = this.fileRecords.indexOf(e) : i = this.rawFileRecords.indexOf(e), i === -1 ? e : t ? this.rawFileRecords[i] : this.fileRecords[i];
    },
    getFileRecordRawInstance(e) {
      return this.getFileRecordOrRawInstance(e, !0);
    },
    getFileRecordInstance(e) {
      return this.getFileRecordOrRawInstance(e, !1);
    },
    prepareConfigureFn(e) {
      const t = this.uploadWithCredentials;
      return t !== !0 && t !== !1 ? e : (i) => {
        i.withCredentials = t, typeof e == "function" && e(i);
      };
    },
    upload(e, t, i, s, r) {
      const n = [], o = [];
      for (const l of i) {
        const a = this.getFileRecordInstance(l);
        a.error || (n.push(a), o.push(this.getFileRecordRawInstance(a)));
      }
      return this.resumable ? P.tusUpload(
        ae.tus,
        e,
        t,
        n,
        (l) => {
          this.overallProgress = l;
        },
        this.resumable === !0 ? void 0 : this.resumable,
        this.uploadWithCredentials
      ) : new Promise((l, a) => {
        P.upload(
          e,
          t,
          n,
          s,
          (d) => {
            this.overallProgress = d;
          },
          this.prepareConfigureFn(r)
        ).then(
          (d) => {
            for (let h = 0; h < d.length; h++)
              d[h].fileRecord = o[h];
            this.$emit("upload", d), l(d);
          },
          (d) => {
            for (let h = 0; h < d.length; h++)
              d[h].fileRecord = o[h];
            this.$emit("upload:error", d), a(d);
          }
        );
      });
    },
    deleteUpload(e, t, i, s, r) {
      this.fileRecords.length < 1 && (this.overallProgress = 0);
      const n = this.getFileRecordInstance(i), o = this.getFileRecordRawInstance(i);
      return this.resumable ? P.tusDeleteUpload(ae.tus, e, t, n) : new Promise((l, a) => {
        P.deleteUpload(
          e,
          t,
          n,
          s,
          this.prepareConfigureFn(r)
        ).then(
          (d) => {
            d.fileRecord = o, this.$emit("upload:delete", d), l(d);
          },
          (d) => {
            d.fileRecord = o, this.$emit("upload:delete:error", d), a(d);
          }
        );
      });
    },
    updateUpload(e, t, i, s, r) {
      i = this.getFileRecordInstance(i);
      const n = this.getFileRecordRawInstance(i);
      return new Promise((o, l) => {
        P.updateUpload(
          e,
          t,
          i,
          s,
          this.prepareConfigureFn(r)
        ).then(
          (a) => {
            a.fileRecords = n, this.$emit("upload:update", a), o(a);
          },
          (a) => {
            a.fileRecords = n, this.$emit("upload:update:error", a), l(a);
          }
        );
      });
    },
    autoUpload(e) {
      return !this.uploadUrl || this.auto === !1 ? Promise.resolve(!1) : this.upload(
        this.uploadUrl,
        this.uploadHeaders,
        e,
        this.uploadConfig
      );
    },
    autoDeleteUpload(e) {
      return !this.uploadUrl || this.auto === !1 ? Promise.resolve(!1) : this.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        e,
        this.uploadConfig
      );
    },
    autoUpdateUpload(e) {
      return !this.uploadUrl || this.auto === !1 ? Promise.resolve(!1) : this.updateUpload(
        this.uploadUrl,
        this.uploadHeaders,
        e,
        this.uploadConfig
      );
    },
    equalFiles(e, t) {
      return e.name === t.name && e.size === t.size && e.type === t.type && e.lastModified === t.lastModified;
    },
    isFileAddedAlready(e) {
      for (const t of this.fileRecords)
        if (this.equalFiles(e, t.file))
          return !0;
      return !1;
    },
    handleFiles(e) {
      if (this.disabled === !0 || this.readonly === !0 || this.hasMultiple && !this.canAddMore)
        return;
      const t = [], i = [];
      for (let s = 0; s < e.length; s++)
        this.hasMultiple && this.isFileAddedAlready(e[s]) || i.push(e[s]);
      e = i, this.hasMultiple && this.maxFiles && e.length > this.maxFiles - this.fileRecords.length && (e = e.slice(0, this.maxFiles - this.fileRecords.length));
      for (const s of e)
        t.push(
          new R(
            {
              file: s
            },
            {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
              averageColor: this.averageColor,
              withCredentials: this.withCredentials
            }
          )
        );
      for (const s of t)
        s.file.size <= 20 * 1024 * 1024 && this.initVideo(s);
      this.hasMultiple ? this.fileRecords.splice(this.fileRecords.length, 0, ...t) : this.fileRecords = t, R.readFiles(t).then((s) => {
        const r = R.toRawArray(this.fileRecords);
        this.rawFileRecords = r, this.$emit("update:rawModelValue", this.rawFileRecords), this.$emit("select", s);
      }), this.autoUpload(t);
    },
    filesChanged(e) {
      let t = e.target.files;
      this.$emit("change", e), t[0] && (this.hasMultiple || (t = [t[0]]), this.handleFiles(t), this.$refs.fileInput && (this.$refs.fileInput.value = null));
    },
    drop(e) {
      e.stopPropagation(), e.preventDefault(), A = 0, this.isDragging = !1, !(this.disabled === !0 || this.readonly === !0) && (!e.dataTransfer || z.getFilesFromDroppedItems(e.dataTransfer).then((t) => {
        this.$emit("drop", e), !(!t || !t[0]) && (this.hasMultiple || (t = [t[0]]), this.handleFiles(t));
      }));
    },
    dragEnter(e) {
      !e.dataTransfer || (this.isDragging = !0, e.stopPropagation(), e.preventDefault(), A++, e.dataTransfer.dropEffect = "copy");
    },
    dragOver(e) {
      !e.dataTransfer || (this.isDragging = !0, e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy");
    },
    dragLeave(e) {
      !e.dataTransfer || (A--, A === 0 && (this.isDragging = !1));
    },
    removeFileRecord(e) {
      if (this.$emit("beforedelete", e), !this.uploadUrl || this.auto === !1) {
        const t = this.fileRecords.indexOf(e);
        t !== -1 && (this.fileRecords.splice(t, 1)[0], this.rawFileRecords.splice(t, 1)[0], this.$emit("update:rawModelValue", this.rawFileRecords));
        return;
      }
      this.deleteFileRecord(e);
    },
    dismissError(e) {
      const t = this.fileRecords.indexOf(e);
      t !== -1 && (this.fileRecords[t].error = !1, this.rawFileRecords[t].error = !1, this.$emit("update:rawModelValue", this.rawFileRecords));
    },
    deleteFileRecord(e) {
      const t = this.fileRecords.indexOf(e);
      let i = this.fileRecords[t], s = this.rawFileRecords[t];
      this.$emit("update:rawModelValue", this.rawFileRecords), this.$emit("delete", i), i = this.fileRecords.splice(t, 1)[0], s = this.rawFileRecords.splice(t, 1)[0], this.autoDeleteUpload(i).then(
        () => {
        },
        () => {
          this.fileRecords.splice(t, 0, i), this.rawFileRecords.splice(t, 0, s);
        }
      );
    },
    filenameChanged(e) {
      const t = this.fileRecords.indexOf(e);
      this.fileRecords[t] = e, this.rawFileRecords[t] = e.toRaw(), this.$emit("update:rawModelValue", this.rawFileRecords), this.$emit("rename", e), this.autoUpdateUpload(e).then(
        () => {
        },
        () => {
          e.customName = e.oldCustomName, this.rawFileRecords[t] = e.toRaw(), this.$emit("update:rawModelValue", this.rawFileRecords);
        }
      );
    },
    checkValue() {
      if (this.rawFileRecords === this.rawModelValue) {
        this.$emit("update:modelValue", this.fileRecords);
        return;
      }
      let e = this.rawModelValue || [];
      e = Array.isArray(e) ? e : [e];
      const t = [], i = [];
      for (let s = 0; s < e.length; s++) {
        const r = this.rawFileRecords.indexOf(e[s]);
        r !== -1 ? (t.push(
          R.fromRaw(e[s], {
            read: this.shouldRead,
            maxSize: this.maxSize,
            accept: this.accept,
            thumbnailSize: this.thumbnailSize,
            averageColor: this.averageColor,
            withCredentials: this.withCredentials
          })
        ), i[s] = this.rawFileRecords[r]) : (t.push(
          R.fromRaw(e[s], {
            read: this.shouldRead,
            maxSize: this.maxSize,
            accept: this.accept,
            thumbnailSize: this.thumbnailSize,
            averageColor: this.averageColor,
            withCredentials: this.withCredentials
          })
        ), i.push(e[s]));
      }
      this.rawFileRecords = i, Promise.all(t).then((s) => {
        this.fileRecords = s, this.$emit("update:modelValue", this.fileRecords), this.$emit("update:rawModelValue", this.rawFileRecords);
      });
    },
    sortStart() {
      this.sortTimeout && window.clearTimeout(this.sortTimeout), this.isSorting = !0, this.isSortingActive = !0;
    },
    sortEnd(e) {
      this.isSortingActive = !1, this.sortTimeout && clearTimeout(this.sortTimeout), this.sortTimeout = window.setTimeout(() => {
        this.isSorting = !1;
      }, this.transitionDuration + 100), this.sort(e.oldIndex, e.newIndex);
    },
    sort(e, t) {
      if (e !== t) {
        const i = z.arrayMove(this.rawFileRecords, e, t);
        this.$nextTick(() => {
          this.$emit("update:rawModelValue", i), this.$emit(
            "sort",
            {
              oldIndex: e,
              newIndex: t
            },
            i
          );
        });
      }
    }
  }
});
const dt = ["id"], ut = {
  ref: "thumbnailCanvas",
  style: { position: "fixed", visibility: "hidden", "z-index": "-3" }
}, ft = {
  key: "new",
  class: "file-preview-wrapper grid-box-item grid-block file-preview-new"
}, ct = { class: "file-preview" }, pt = { style: { position: "absolute", top: "0", right: "0", bottom: "0", left: "0" } }, mt = { class: "help-text" }, gt = ["disabled", "multiple", "accept", "capture"];
function vt(e, t, i, s, r, n) {
  const o = K("VueFilePreview"), l = K("VueFileIcon");
  return v(), y("div", {
    id: "vfa-" + e.uniqueId,
    class: M([
      "is-sortable-" + (e.isSortable ? "enabled" : "disabled"),
      {
        "is-sortable-hold": e.sortable === "hold",
        "is-sortable-handle": e.sortable === "handle",
        "is-sortable-immediately": e.sortable === !0,
        "is-sorting": e.isSorting,
        "is-sorting-active": e.isSortingActive,
        "is-drag-over": e.isDragging,
        "is-disabled": e.disabled === !0,
        "is-readonly": e.readonly === !0,
        "is-drag-valid": !(e.disabled === !0 || e.readonly === !0 || e.hasMultiple && !e.canAddMore)
      },
      "theme-" + e.theme
    ]),
    onDragover: t[7] || (t[7] = (...a) => e.dragOver && e.dragOver(...a)),
    onDragenter: t[8] || (t[8] = (...a) => e.dragEnter && e.dragEnter(...a)),
    onDragleave: t[9] || (t[9] = (...a) => e.dragLeave && e.dragLeave(...a)),
    onDrop: t[10] || (t[10] = (...a) => e.drop && e.drop(...a))
  }, [
    C(e.$slots, "before-outer"),
    w("div", {
      class: M(["grid-block-wrapper vue-file-agent file-input-wrapper", {
        "is-compact": !!e.compact,
        "is-single": !e.hasMultiple,
        "has-multiple": e.hasMultiple,
        "no-meta": e.meta === !1
      }])
    }, [
      C(e.$slots, "before-inner"),
      w("canvas", ut, null, 512),
      e.overallProgress ? (v(), y("div", {
        key: 0,
        class: M(["overall-progress", { "overall-progress-full": e.overallProgress >= 100 }])
      }, [
        w("div", {
          class: "overall-progress-bar",
          style: B({ width: e.overallProgress + "%" })
        }, null, 4),
        w("div", {
          class: "overall-progress-left",
          style: B({ width: 100 - e.overallProgress + "%" })
        }, null, 4)
      ], 2)) : x("", !0),
      (v(), Y(_(e.isSortable ? "SlickList" : "VueFileList"), {
        list: e.fileRecords,
        "onUpdate:list": t[3] || (t[3] = (a) => e.fileRecords = a),
        axis: e.theme == "list" ? "y" : "xy",
        "append-to": "#vfa-" + e.uniqueId + " .vue-file-agent",
        "transition-duration": e.transitionDuration,
        "press-delay": e.sortable === "hold" ? 200 : 0,
        "use-drag-handle": e.sortable === "handle",
        "helper-class": "active-sorting-item",
        onSortStart: t[4] || (t[4] = (a) => e.sortStart()),
        onSortEnd: t[5] || (t[5] = (a) => e.sortEnd(a))
      }, {
        default: N(() => [
          T(ye, {
            name: "grid-box",
            tag: "div",
            class: ""
          }, {
            default: N(() => [
              (v(!0), y(W, null, he(e.fileRecords, (a, d) => (v(), Y(_(e.isSortable ? "SlickItem" : "VueFileListItem"), {
                key: a.id,
                class: "file-preview-wrapper grid-box-item grid-block",
                index: d
              }, {
                default: N(() => [
                  C(e.$slots, "file-preview-before", {
                    fileRecord: a,
                    fileData: a
                  }),
                  C(e.$slots, "file-preview", {
                    fileRecord: a,
                    fileData: a
                  }, () => [
                    T(o, {
                      "average-color": e.averageColor,
                      "file-record": a,
                      deletable: e.isDeletable,
                      editable: e.editable === !0,
                      linkable: e.linkable === !0,
                      "error-text": e.errorText,
                      disabled: e.disabled,
                      "thumbnail-size": e.thumbnailSize,
                      "with-credentials": e.withCredentials,
                      class: "",
                      onRemove: t[0] || (t[0] = (h) => e.removeFileRecord(h)),
                      onRename: t[1] || (t[1] = (h) => e.filenameChanged(h)),
                      onDismisserror: t[2] || (t[2] = (h) => e.dismissError(h))
                    }, null, 8, ["average-color", "file-record", "deletable", "editable", "linkable", "error-text", "disabled", "thumbnail-size", "with-credentials"])
                  ]),
                  C(e.$slots, "file-preview-after", {
                    fileRecord: a,
                    fileData: a
                  })
                ]),
                _: 2
              }, 1032, ["index"]))), 128)),
              e.canAddMore && e.readonly !== !0 ? C(e.$slots, "file-preview-new", { key: 0 }, () => [
                w("div", ft, [
                  w("span", ct, [
                    w("span", pt, [
                      T(l, { name: "system-file-preview-new" }),
                      w("span", mt, $(e.helpTextComputed), 1)
                    ])
                  ])
                ])
              ]) : x("", !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 40, ["list", "axis", "append-to", "transition-duration", "press-delay", "use-drag-handle"])),
      e.readonly !== !0 ? (v(), y("input", {
        key: 1,
        ref: "fileInput",
        title: "",
        disabled: e.disabled === !0 || e.hasMultiple && !e.canAddMore,
        type: "file",
        multiple: e.hasMultiple,
        class: "file-input",
        accept: e.accept || "*",
        capture: e.capture,
        onChange: t[6] || (t[6] = (...a) => e.filesChanged && e.filesChanged(...a))
      }, null, 40, gt)) : x("", !0),
      C(e.$slots, "after-inner")
    ], 2),
    C(e.$slots, "after-outer")
  ], 42, dt);
}
const wt = /* @__PURE__ */ O(ht, [["render", vt]]), yt = {
  VueFileIcon: J,
  VueFilePreview: ce,
  VueFileList: pe,
  VueFileListItem: me,
  VueFileAgent: wt
};
const xt = {
  install(e) {
    Object.entries(yt).forEach(([t, i]) => {
      e.component(t, i);
    });
  }
};
export {
  wt as VueFileAgent,
  xt as VueFileAgentNext,
  J as VueFileIcon,
  pe as VueFileList,
  me as VueFileListItem,
  ce as VueFilePreview,
  xt as default,
  ae as plugins
};
