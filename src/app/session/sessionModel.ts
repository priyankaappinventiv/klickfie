import { Schema, Model, model, SchemaTypes } from "mongoose";
import { iSession } from "./sessionInterface";

const MODEL_NAME = "sessions";

const sesionSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    isLoggedIn: {
      type: SchemaTypes.Boolean,
      required: true,
      default: true
    },
    deviceId: {
      type: SchemaTypes.String,
      required: true,
    },
    deviceToken: {
      type: SchemaTypes.String,
      required: true,
    },
    isActive: {
      type: SchemaTypes.Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: SchemaTypes.Date,
      default: () => new Date(),
    },
  },
  {
    collection: MODEL_NAME,
    timestamps: true,
  }
);

export const SessionModel: Model<iSession> = model(MODEL_NAME, sesionSchema);
