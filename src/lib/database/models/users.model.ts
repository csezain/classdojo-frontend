import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  google_id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    index: {
      unique: true,
    },
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
    enum: ["google", "credentials"],
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "parent", "school-leader"],
    default: "student",
  },
});
export type User = InferSchemaType<typeof userSchema>;

const Users = mongoose.models.user || model("user", userSchema);
export default Users;
