const express = require('express');
const router = express.Router();
const { createResume, findResumesByUserId, findResumeById, updateResume, deleteResume } = require('../repositories/resumeRepository');
const authMiddleware = require('../middleware/authMiddleware');
const { generateContent, generateATSContent } = require('../services/aiService');

// Create Resume
router.post('/', authMiddleware, async (req, res) => {
    const { userId, personalInfo, workExperience, education, skills, projects, socialLinks } = req.body;
    try {
      const resume = await createResume({ userId, personalInfo, workExperience, education, skills, projects, socialLinks });
      res.json(resume);
    } catch (error) {
      console.error('Create Resume Error:', error.message);
      res.status(500).send('Server error');
    }
});
  

// Get Resumes by User ID
router.get('/', authMiddleware, async (req, res) => {
  try {
    const resumes = await findResumesByUserId(req.user.id);
    res.json(resumes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get Resume by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const resume = await findResumeById(req.params.id);
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update Resume
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const resume = await updateResume(req.params.id, req.body);
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete Resume
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await deleteResume(req.params.id);
    res.json({ msg: 'Resume deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create Resume with AI-generated content
router.post('/generate', authMiddleware, async (req, res) => {
  const { userId, personalInfo, workExperience, education, skills, projects, socialLinks } = req.body;
  try {
    const personalInfoPrompt = `Generate a professional summary for a resume based on the following personal information: ${personalInfo}`;
    const workExperiencePrompt = `Generate detailed work experience descriptions based on the following: ${workExperience}`;
    const educationPrompt = `Generate education section content based on the following details: ${education}`;
    const skillsPrompt = `Generate skills section content based on the following skills: ${skills}`;
    const projectsPrompt = `Generate project descriptions based on the following details: ${projects}`;

    const generatedPersonalInfo = await generateContent(personalInfoPrompt);
    const optimizedPersonalInfo = await generateATSContent(generatedPersonalInfo);

    const generatedWorkExperience = await generateContent(workExperiencePrompt);
    const optimizedWorkExperience = await generateATSContent(generatedWorkExperience);

    const generatedEducation = await generateContent(educationPrompt);
    const optimizedEducation = await generateATSContent(generatedEducation);

    const generatedSkills = await generateContent(skillsPrompt);
    const optimizedSkills = await generateATSContent(generatedSkills);

    const generatedProjects = await generateContent(projectsPrompt);
    const optimizedProjects = await generateATSContent(generatedProjects);

    const resume = await createResume({
      userId,
      personalInfo: optimizedPersonalInfo,
      workExperience: optimizedWorkExperience,
      education: optimizedEducation,
      skills: optimizedSkills,
      projects: optimizedProjects,
      socialLinks
    });
    res.json(resume);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
