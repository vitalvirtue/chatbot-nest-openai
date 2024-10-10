// Kullanıcı için yeni oturum başlat
export const createSession = async (userId) => {
  const response = await fetch("http://localhost:3000/sessions/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return await response.json();
};

// Kullanıcının oturum geçmişini al
export const getUserSessions = async (userId) => {
  const response = await fetch(`http://localhost:3000/sessions/user/${userId}`);
  const data = await response.json();
  return Array.isArray(data) ? data : []; // Dönen veriyi bir array'e çeviriyoruz
};

// Belirli bir oturumun tüm mesajlarını getir
export const getSessionById = async (sessionId) => {
  const response = await fetch(`http://localhost:3000/sessions/${sessionId}`);
  return await response.json();
};

// Oturuma yeni mesaj ekle
export const addMessageToSession = async (sessionId, type, text) => {
  const response = await fetch(
    `http://localhost:3000/sessions/${sessionId}/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, text }),
    },
  );
  return await response.json();
};
