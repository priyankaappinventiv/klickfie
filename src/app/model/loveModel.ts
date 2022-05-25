import mongoose from "mongoose";
import { Schema} from "mongoose";
import { createQ } from "../interface/loveInterface";

const Model_Name = "askQuestion";

const createQSchema = new Schema<createQ>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
    },
    question: {
        type:String,
        require: true,
    }
  },

{ timestamps: true }
);

const askQuestion = mongoose.model<createQ>(Model_Name, createQSchema);

export default askQuestion;    