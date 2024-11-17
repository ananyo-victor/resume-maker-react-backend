import mongoose from "mongoose";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const basicDetailSchema = new mongoose.Schema({
  id: { type: Number },
  Fname: { type: String },
  Mname: { type: String },
  Lname: { type: String },
  Proffession: { type: String },
  Country: { type: String },
  City: { type: String },
  Address: { type: String },
  PhoneNumber: { type: Number },
  Email: { type: String }
});
// basicDetailSchema.plugin(AutoIncrement, { inc_field: 'bas_id' });

const workSchema = new mongoose.Schema({
  id: { type: Number },
  Position: { type: String },
  Company: { type: String },
  StartDate: { type: Date },
  EndDate: { type: Date },
  Current: { type: Boolean }
});
// workSchema.plugin(AutoIncrement, { inc_field: 'wok_id' });

const skillSchema = new mongoose.Schema({
  id: { type: Number },
  Skill: { type: String },
  Level: { type: String }
});
// skillSchema.plugin(AutoIncrement, { inc_field: 'ski_id' });

const summarySchema = new mongoose.Schema({
  id: { type: Number },
  Strength: { type: String }
});
// summarySchema.plugin(AutoIncrement, { inc_field: 'sum_id' });

const achievementSchema = new mongoose.Schema({
  id: { type: Number },
  Achievement: { type: String }
});
// achievementSchema.plugin(AutoIncrement, { inc_field: 'ach_id' });

const hobbieSchema = new mongoose.Schema({
  id: { type: Number },
  Hobbies: { type: String }
});
// hobbieSchema.plugin(AutoIncrement, { inc_field: 'hob_id' });

const certificateSchema = new mongoose.Schema({
  id: { type: Number },
  Certificate: { type: String }
});
// certificateSchema.plugin(AutoIncrement, { inc_field: 'cer_id' });

const projectSchema = new mongoose.Schema({
  id: { type: Number },
  Project: { type: String }
});
// projectSchema.plugin(AutoIncrement, { inc_field: 'pro_id' });

const educationSchema = new mongoose.Schema({
  id: { type: Number },
  EName: { type: String },
  ECity: { type: String },
  EState: { type: String },
  EDegree: { type: String },
  EField: { type: String },
  EPassingYear: { type: String },
});
// educationSchema.plugin(AutoIncrement, { inc_field: 'edu_id' });

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
  users: basicDetailSchema,
  workExperience: [workSchema],
  educations: [educationSchema],
  strength: [summarySchema],
  skills: [skillSchema],
  achievement: [achievementSchema],
  hobbie: [hobbieSchema],
  certificate: [certificateSchema],
  projects: [projectSchema],
});

const ResumeModel = mongoose.model("Resume", resumeSchema);

export default ResumeModel;
