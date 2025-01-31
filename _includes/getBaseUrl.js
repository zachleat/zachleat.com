// no # hash or ? query params
export default function getBaseUrl(url) {
  let hashSplit = url.split("#");
  let queryparamSplit = hashSplit[0].split("?");
  return queryparamSplit[0];
};
