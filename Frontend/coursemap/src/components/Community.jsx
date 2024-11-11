import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answers, setAnswers] = useState({});
  const [newAnswer, setNewAnswer] = useState('');
  const [showAnswerInput, setShowAnswerInput] = useState(null); // Track which question's input is visible

  // Fetch questions and answers
  useEffect(() => {
    axios.get('http://localhost:3001/api/questions')
      .then(response => {
        setQuestions(response.data);
        // Now fetch answers for each question
        response.data.forEach((question) => {
          axios.get(`http://localhost:3001/api/questions/${question.id}/answers`)
            .then(answerResponse => {
              setAnswers(prevAnswers => ({
                ...prevAnswers,
                [question.id]: answerResponse.data
              }));
            })
            .catch(error => console.error(`Error fetching answers for question ${question.id}:`, error));
        });
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // Handle question submission
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/questions', { title: newQuestion })
      .then(response => {
        setQuestions([...questions, response.data]);
        setNewQuestion('');
        // After adding the new question, fetch its answers as well
        axios.get(`http://localhost:3001/api/questions/${response.data.id}/answers`)
          .then(answerResponse => {
            setAnswers(prevAnswers => ({
              ...prevAnswers,
              [response.data.id]: answerResponse.data
            }));
          })
          .catch(error => console.error('Error fetching answers for new question:', error));
      })
      .catch(error => console.error('Error submitting question:', error));
  };

  // Handle answer submission
  const handleAnswerSubmit = (e, questionId) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/api/questions/${questionId}/answers`, { content: newAnswer })
      .then(response => {
        setAnswers({
          ...answers,
          [questionId]: [...(answers[questionId] || []), response.data]
        });
        setNewAnswer('');
        setShowAnswerInput(null); // Hide the answer input after submitting
      })
      .catch(error => console.error('Error submitting answer:', error));
  };

  // Handle question deletion
  const handleDeleteQuestion = (questionId) => {
    axios.delete(`http://localhost:3001/api/questions/${questionId}`)
      .then(() => {
        setQuestions(questions.filter(question => question.id !== questionId));
        setAnswers(prevAnswers => {
          const newAnswers = { ...prevAnswers };
          delete newAnswers[questionId];
          return newAnswers;
        });
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  // Handle answer deletion
  const handleDeleteAnswer = (questionId, answerId) => {
    axios.delete(`http://localhost:3001/api/questions/${questionId}/answers/${answerId}`)
      .then(() => {
        setAnswers({
          ...answers,
          [questionId]: answers[questionId].filter(answer => answer.id !== answerId)
        });
      })
      .catch(error => console.error('Error deleting answer:', error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Community Q&A</h1>

        <div className="mb-8 text-black">
          <form onSubmit={handleQuestionSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Ask a New Question</h2>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
              placeholder="What is your question?"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Post Question?
            </button>
          </form>
        </div>

        <div className="questions-list space-y-6 border-2 p-5 h-96 overflow-y-scroll">
          {questions.map(question => (
            <div key={question.id} className="question-card bg-white p-6 rounded-xl shadow-lg">
              <div className='flex justify-evenly'>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Q. {question.title}</h2>

              {/* Delete question button */}
              <button
                onClick={() => handleDeleteQuestion(question.id)}
                className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition mb-4"
              >
                Delete Question
              </button></div>

              <div className="answers mt-4 text-black">
                <div className='h-36 overflow-y-scroll'>
                  <h3 className="font-semibold text-gray-800">Answers</h3>
                  <div className="answer-list space-y-4">
                    {answers[question.id]?.map((answer, index) => (
                      <div key={answer.id} className="answer-card bg-gray-100 p-4 rounded-lg shadow-sm border-yellow-400 border-2">
                        <div className='flex justify-between'> <p>{answer.content}</p>

                        {/* Delete answer button */}
                        <button
                          onClick={() => handleDeleteAnswer(question.id, answer.id)}
                          className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition mt-2"
                        >
                          Delete Answer
                        </button></div>
                       
                      </div>
                    ))}
                  </div>
                </div>

                {/* Display reply button */}
                {showAnswerInput === question.id ? (
                  <div className="mt-4">
                    <textarea
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                      placeholder="Write your answer here..."
                    />
                    <button
                      onClick={(e) => handleAnswerSubmit(e, question.id)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Submit Answer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAnswerInput(question.id)}
                    className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
