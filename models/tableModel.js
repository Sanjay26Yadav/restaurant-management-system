const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const tableSchema = new Schema({
 TableNo: {
  type: Number,
  required: true
 },
 Capacity: {
  type: Number,
  required: true
 },
 TableStatus: {
  type: String,
  default: 'Open'
 },
 Waiter: {
    type: String,
    default: 'Not Assigned '
   },
Order: {
      type: String,
      default: 'No Order'
 },
 Bill: {
      type: Number,
      default: 000
 }
});
 


module.exports = mongoose.model('Table', tableSchema);
