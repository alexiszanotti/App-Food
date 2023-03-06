const { Schema, model } = require("mongoose");

const RecipesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  healthScore: {
    type: Number,
    required: true,
  },
  steps: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

RecipesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Recipe", RecipesSchema);
