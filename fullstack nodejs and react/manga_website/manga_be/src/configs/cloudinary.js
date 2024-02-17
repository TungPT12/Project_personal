const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//     cloud_name: 'duotqxfvn',
//     api_key: '849929252588936',
//     api_secret: 'Jzib0LSz_uSqGLofMtbPGSCML4w'
// });
cloudinary.config().cloud_name; 

const uploadImageCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        return cloudinary.uploader.upload_stream({}, (error, uploadResult) => {
            if (error) {
                return reject('looix')
            } else {
                return resolve(uploadResult)
            }
        }).end(buffer);
    })
    // return cloudinary.uploader.upload_stream((error, uploadResult) => {
    //     if (error) {
    //         return PromiseRejectionEvent
    //     } else {
    //         return resolve(uploadResult);
    //     }
    // }).end(buffer);
}

module.exports = uploadImageCloudinary;