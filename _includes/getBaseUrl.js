// no # hash or ? query params
module.exports = function getBaseUrl(url) {
  let hashSplit = url.split("#");
  let queryparamSplit = hashSplit[0].split("?");
  return queryparamSplit[0];
};