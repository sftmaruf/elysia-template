import AppError from ".";

const AlreadyExist = new AppError("User already exists");
const NotFound = new AppError("User doesn't exist");
const CreationFailed = new AppError("User doesn't exist");

const UserErrors = {
  AlreadyExist,
  NotFound,
  CreationFailed
};

export default UserErrors;
