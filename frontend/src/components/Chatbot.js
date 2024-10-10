import React, { useState, useEffect, useRef } from "react";
import AnswerInput from "./AnswerInput";
import { saveAnswer, getQuestions } from "../services/chat.service";
import SessionList from "./SessionList";
import {
  getSessionById,
  createSession,
  addMessageToSession,
} from "../services/session.service";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userId] = useState("user1");
  const [sessionId, setSessionId] = useState(null);
  const [shouldRefreshSessions, setShouldRefreshSessions] = useState(false);
  const chatContainerRef = useRef(null);

  // Yeni oturum başlatma
  const startNewSession = async () => {
    const newSession = await createSession(userId);
    setSessionId(newSession._id);
    setMessages([]);
    setCurrentQuestionIndex(0);
  
    const fetchedQuestions = await getQuestions();
    setQuestions(fetchedQuestions);
    if (fetchedQuestions.length > 0) {
      setMessages([{ type: 'question', text: fetchedQuestions[0] }]);
    }
  
    // Yeni oturum başlatıldığında sohbet geçmişini güncelle
    setShouldRefreshSessions(true); // Sohbet geçmişini yeniden tetikle
  };

  const handleSelectSession = async (sessionId) => {
    const session = await getSessionById(sessionId);
    setSessionId(sessionId);
    setMessages(session.messages);

    // Eğer eski oturuma geri dönüyorsak, yeni soruları sıfırlıyoruz
    if (session.messages.length > 0) {
      const lastQuestionIndex = session.messages.reduce((index, message, i) => {
        return message.type === "question" ? i : index;
      }, -1);
      setCurrentQuestionIndex(lastQuestionIndex + 1); // En son cevaplanan sorudan devam et
    }
  };

  const handleNext = async (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Cevabı kaydet ve oturuma ekle
    if (currentQuestion) {
      // Sadece sorular kaldığında cevap ekle
      await saveAnswer(userId, currentQuestion, answer);
      await addMessageToSession(sessionId, "answer", answer);

      setMessages([...messages, { type: "answer", text: answer }]);

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        const nextQuestion = questions[nextQuestionIndex];
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "question", text: nextQuestion },
        ]);
        setCurrentQuestionIndex(nextQuestionIndex);

        // Yeni soruyu oturuma ekle
        await addMessageToSession(sessionId, "question", nextQuestion);
      }
    }
  };

  return (
    <div className="chatbot-wrapper">
      <SessionList
        userId={userId}
        shouldRefresh={shouldRefreshSessions} // Anlık güncelleme için tetikleyici
        onSessionSelected={handleSelectSession}
      />
      <div className="chatbot-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
        <AnswerInput onSubmit={handleNext} />
      </div>
      <button onClick={startNewSession}>Yeni Oturum Başlat</button>
    </div>
  );
};

export default Chatbot;
