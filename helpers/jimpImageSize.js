const Jimp = require("jimp");


const jimpImageSize = async (path) => {
    try {
        const img = await Jimp.read(path);
        await img.resize(250, 250);

    } catch (error) {
        console.log(error);
    }
   
}
module.exports = jimpImageSize