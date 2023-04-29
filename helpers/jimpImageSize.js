const Jimp = require("jimp");

const jimpImageSize = async (path) => {
  try {
    const img = await Jimp.read(path);
    await img.contain(250, 250);
    await img.resize(250, 250);
    await img.writeAsync(path);
  } catch (error) {
    console.log(error);
  }
};
module.exports = jimpImageSize;
