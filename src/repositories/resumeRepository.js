const Resume = require('../models/Resume');
const mongoose = require('mongoose');

class ResumeRepository {
    async createResume(resumeData) {
        try {
          const resume = new Resume(resumeData);
          await resume.save();
          return resume;
        } catch (error) {
          console.log('Error in createResume:', error);
          throw error; // Ensure errors are thrown so they can be caught in the route handler
        }
    }

  async findResumesByUserId(userId) {
    try {
      return await Resume.find({ userId });
    } catch (error) {
      console.log(error);
    }
  }

  async findResumeById(id) {
    try {
      return await Resume.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async updateResume(id, resumeData) {
    try {
      return await Resume.findByIdAndUpdate(id, resumeData, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteResume(id) {
    try {
      return await Resume.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ResumeRepository();
