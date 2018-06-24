const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: Schema.Types.String,
  user_id: Schema.Types.ObjectId,
  settings: {
    total_questions: Schema.Types.Number,
    show_answer: Schema.Types.Boolean
  }
});
const model = mongoose.model("exams", ExamSchema);
module.exports = model;
