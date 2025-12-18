export const startNewQuiz = () => {
  const newUserId = crypto.randomUUID();
  localStorage.setItem("quiz_user_id", newUserId);
  return newUserId;
};
