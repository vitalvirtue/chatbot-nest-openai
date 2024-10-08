import React, { useState } from 'react';

const AnswerInput = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer) {
      onSubmit(answer);
      setAnswer('');  // Cevabı gönderdikten sonra inputu temizle
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AnswerInput;
