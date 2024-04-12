import mongoose, { Document, Types } from "mongoose";
import { Maybe } from "@repo/types";

export interface Todo extends Document {
  title: string;
  description: string;
  isDone: boolean;
  completedAt: Date;
  _id: Types.ObjectId;
}

type TodoDocument = Maybe<Document> & Todo;

const TodoSchema = new mongoose.Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    description: {
      type: String,
      required: true,
    },
    isDone: {
      required: false,
      type: Boolean,
    },
  },

  {
    collection: "Todos",
    timestamps: true,
  },
);

export const TodoModel = mongoose.model<TodoDocument>("Todos", TodoSchema);

export type { TodoDocument };
