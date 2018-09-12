const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: Number,
    eth: Number,
    driverIdCard: Number,
    driverAddr: String,
    custumerIdCard: Number,
    // {
    //     type: Number,
    //     ref: 'User',
    //     localField: 'custumerIdCard',
    //     foreignField: 'name',
    // },
    custumerAddr: String,
    transactionHash: String,
    driverName: String,
    status: Number,
});
// orderSchema.virtual('members', {
//     ref: 'UserSession',
//     localField: 'driverIdCard',
//     foreignField: 'id',
// });


module.exports = mongoose.model('Orders', orderSchema);