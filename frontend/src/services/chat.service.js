export const saveAnswer = async (userId, question, answer) => {
  try {
    const response = await fetch('http://localhost:5000/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        question,
        answer
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving answer:', error);
  }
};

export const getQuestions = async () => {
  try {
    const response = await fetch('http://localhost:5000/questions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
