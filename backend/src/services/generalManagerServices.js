import Center from "../models/Center";

const createNewCenter = async (data) => {
  try {
    const result = await Center.create({ ...data });
    return {
      errorCode: 0,
      data: result,
      message: "Create new center successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: "Something's wrong",
    };
  }
};

export { createNewCenter };
