const utils = (module.exports = {});

utils.isEmpty = function (val) {
  return (
    val === null ||
    val === undefined ||
    (typeof val === "object" && Object.keys(val).length === 0)
  );
};

utils.isEmptyString = function (str) {
  return str === "" || str === null || str === undefined;
};

utils.isEmptyNumber = function (num) {
  return typeof num !== "number" || isNaN(num);
};

utils.isEmptyObject = function (obj) {
  return (
    obj === null ||
    obj === undefined ||
    (typeof obj === "object" && Object.keys(obj).length === 0)
  );
};

utils.isEmptyArray = function (arr) {
  return !Array.isArray(arr) || arr.length === 0;
};

utils.isArray = function (arr) {
  return Array.isArray(arr);
};

utils.isEmail = function (email) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regex) ? true : false;
};
