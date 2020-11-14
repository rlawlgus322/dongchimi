const serverUrl = "https://k3a409.p.ssafy.io";

export function getServerImageUrl(path) {
  return serverUrl + path;
}

export function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}