const serialize = require("./serializer");
const Account = require("@models/schemas/Account");

const findDataById = (id) => {
  return Account.findById(id).then(serialize);
};

const findDataBy = async (params) => {
  return Account.find(params).then(serialize);
};

const addData = (dataObj) => {
  return Account.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return Account.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return Account.findByIdAndDelete(id).then(serialize);
};

// const dropAll = () => {
//   return Account.remove();
// };

module.exports = {
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
  //   dropAll,
};
