const axios = require('axios');
const config = require('config');

const apiKey = config.get('openAI.apiKey');
const baseURL = 'https://api.openai.com/v1/completions'; // Update with the correct endpoint if different

const generateContent = async (prompt) => {
  try {
    const response = await axios.post(baseURL, {
      model: 'text-davinci-003', // Choose the model according to your needs
      prompt,
      max_tokens: 150, // Adjust based on your requirements
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error('Error generating content from AI');
  }
};

const generateATSContent = async (content) => {
    const atsPrompt = `Optimize the following resume content for ATS: ${content}`;
    return await generateContent(atsPrompt);
};
  
module.exports = { generateContent, generateATSContent };