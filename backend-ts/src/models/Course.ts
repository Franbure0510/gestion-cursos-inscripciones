import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  price: number;
  maxStudents: number;
  currentStudents: number;
  image?: string;
  syllabus: string[];
  isActive: boolean;
  createdAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [200, "El título no puede exceder 200 caracteres"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      maxlength: [2000, "La descripción no puede exceder 2000 caracteres"],
    },
    instructor: {
      type: String,
      required: [true, "El instructor es obligatorio"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      trim: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: {
      type: String,
      required: [true, "La duración es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    maxStudents: {
      type: Number,
      required: [true, "El cupo máximo es obligatorio"],
      min: [1, "Debe haber al menos 1 cupo"],
    },
    currentStudents: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    syllabus: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ title: "text", description: "text", category: "text" });
courseSchema.index({ category: 1 });
courseSchema.index({ level: 1 });

export default mongoose.model<ICourse>("Course", courseSchema);
