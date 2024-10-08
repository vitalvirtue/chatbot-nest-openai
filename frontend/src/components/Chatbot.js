import React, { useState, useEffect, useRef } from 'react';
import AnswerInput from './AnswerInput';
import { saveAnswer, getQuestions } from '../services/chat.service';

const Chatbot = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userId] = useState('user1');
  const chatContainerRef = useRef(null);
  const [chatEnded, setChatEnded] = useState(false); // Chat'in bitip bitmediğini kontrol eden state

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
      // İlk soruyu hemen göster
      if (fetchedQuestions.length > 0) {
        setMessages([{ type: 'question', text: fetchedQuestions[0] }]);  // .text yerine doğrudan fetchedQuestions[0] kullanılıyor
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNext = async (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
  
    await saveAnswer(userId, currentQuestion, answer);  // currentQuestion.text yerine currentQuestion gönderiyoruz
  
    setMessages([...messages, { type: 'answer', text: answer }]);
  
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'question', text: questions[nextQuestionIndex] },  // .text yerine doğrudan string kullanıyoruz
      ]);
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setChatEnded(true);  // Sorular bittiğinde chat'i kapat
    }
  };

  if (chatEnded) {
    return <p>Chatbot kapandı. Teşekkürler!</p>; // Chat kapandığında gösterilecek mesaj
  }

  return (
    <div className="chatbot-container" ref={chatContainerRef}>
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          {message.text}
        </div>
      ))}

      {/* Sorular bitince input alanını gizle */}
      {currentQuestionIndex < questions.length ? (
        <AnswerInput onSubmit={handleNext} />
      ) : (
        <p>Konuşma sona erdi. Teşekkürler!</p>
      )}
    </div>
  );
};

export default Chatbot;
