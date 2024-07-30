const express = require('express');
const router = express.Router();
const { createResume, findResumesByUserId, findResumeById, updateResume, deleteResume } = require('../repositories/resumeRepository');
const authMiddleware = require('../middleware/authMiddleware');

// Create Resume
router.post('/', authMiddleware, async (req, res) => {
  const { userId, personalInfo, workExperience, education, skills, projects, socialLinks } = req.body;
  try {
    const resume = await createResume({ userId, personalInfo, workExperience, education, skills, projects, socialLinks });
    res.json(resume);
  } catch (error) {
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

module.exports = router;
