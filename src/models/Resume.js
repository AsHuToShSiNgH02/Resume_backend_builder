const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
  },
  workExperience: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  skills: [String],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String },
    },
  ],
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
  },
});

const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;
