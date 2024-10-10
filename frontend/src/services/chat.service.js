export const getQuestions = async () => {
  try {
    const response = await fetch("http://localhost:3000/chat/questions"); // Backend API
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

export const saveAnswer = async (userId, question, answer) => {
  try {
    const response = await fetch(
      `http://localhost:3000/chat/${userId}/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }), // Verilerin doğru formatta gönderildiğinden emin ol
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error saving answer:", error);
  }
};
