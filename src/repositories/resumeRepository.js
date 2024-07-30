const Resume = require('../models/Resume');

class resumeRepository {
    async createResume(resumeData) {
        try {
            const resume = new Resume(resumeData);
            await resume.save();
            return resume; 
        } catch (error) {
            console.log(error);
        }
    }

    async findResumeByUserId(userId) {
        try {
            return await Resume.find({userId}) 
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
            return await Resume.findByIdAndUpdate(id, resumeData, {new: true});
        } catch (error) {
            console.log(error);
        }
    }

    async updateResume(id) {
        try {
            return Resume.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = resumeRepository;