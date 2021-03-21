const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    containsMeat: {
      type: Boolean,
      required: true,
    },
    allergens: {
      type: String,
      required: true,
    },
    collectBy: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("post", PostSchema);
