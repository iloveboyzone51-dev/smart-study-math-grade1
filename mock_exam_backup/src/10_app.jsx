// Main App Component
function App() {
  const [status, setStatus] = useState('SETUP'); // SETUP, EXAM, REVIEW1, REVIEW2, RESULT
  const [examQuestions, setExamQuestions] = useState([]);
  const [review1Questions, setReview1Questions] = useState([]);
  const [review2Questions, setReview2Questions] = useState([]);
  const [examResults, setExamResults] = useState(null);
  const [review1Results, setReview1Results] = useState(null);
  const [review2Results, setReview2Results] = useState(null);
  
  const [selectedSubjects, setSelectedSubjects] = useState({});

  const handleStartExam = (selected) => {
    setSelectedSubjects(selected);
    
    // selected is an array of subject names now, e.g. ["국어", "수학"]
    const newQuestions = window.STATIC_QUESTIONS.filter(q => 
      selected.includes(q.subject)
    );

    if (newQuestions.length === 0) {
      alert("선택된 과목의 문제가 없습니다.");
      return;
    }

    setExamQuestions(newQuestions);
    setStatus('EXAM');
  };

  const handleExamSubmit = (answers) => {
    let score = 0;
    const wrong = [];
    
    examQuestions.forEach(q => {
      const userAns = answers[q.id];
      if (!userAns) {
        wrong.push(q);
        return;
      }
      
      let isCorrect = false;
      if (q.type === 'multiple_choice') {
        const correctText = q.options[q.correct_index];
        isCorrect = correctText.startsWith(userAns) || userAns === q.correct_answer;
      } else {
        isCorrect = userAns.trim() === q.correct_answer.trim();
      }
      
      if (isCorrect) score += 100 / examQuestions.length;
      else wrong.push(q);
    });

    setExamResults({ score: Math.round(score), total: examQuestions.length, wrongCount: wrong.length });
    
    if (wrong.length > 0) {
      setReview1Questions(wrong);
      setStatus('REVIEW1');
    } else {
      setStatus('RESULT');
    }
  };

  const handleReview1Complete = (evalResults) => {
    const wrongAgain = [];
    review1Questions.forEach(q => {
      const result = evalResults[q.id];
      if (!result || !result.correct) {
        wrongAgain.push(q);
      }
    });

    setReview1Results({
      total: review1Questions.length,
      solved: review1Questions.length - wrongAgain.length,
      wrongAgainCount: wrongAgain.length
    });

    if (wrongAgain.length > 0) {
      setReview2Questions(wrongAgain);
      setStatus('REVIEW2');
    } else {
      setStatus('RESULT');
    }
  };

  const handleReview2Complete = (evalResults) => {
    const wrongAgain = [];
    review2Questions.forEach(q => {
      const result = evalResults[q.id];
      if (!result || !result.correct) {
        wrongAgain.push(q);
      }
    });

    setReview2Results({
      total: review2Questions.length,
      solved: review2Questions.length - wrongAgain.length,
      wrongAgainCount: wrongAgain.length
    });

    setStatus('RESULT');
  };

  const handleRestart = () => {
    setStatus('SETUP');
    setExamQuestions([]);
    setReview1Questions([]);
    setReview2Questions([]);
    setExamResults(null);
    setReview1Results(null);
    setReview2Results(null);
  };

  return (
    <div className="app-container">
      {status === 'SETUP' && (
        <SetupScreen onStart={handleStartExam} />
      )}
      
      {status === 'EXAM' && (
        <ExamScreen 
          questions={examQuestions} 
          onSubmit={handleExamSubmit} 
        />
      )}

      {status === 'REVIEW1' && (
        <ReviewScreen 
          questions={review1Questions} 
          onComplete={handleReview1Complete} 
          isSecondRound={false}
        />
      )}

      {status === 'REVIEW2' && (
        <ReviewScreen 
          questions={review2Questions} 
          onComplete={handleReview2Complete} 
          isSecondRound={true}
        />
      )}

      {status === 'RESULT' && (
        <ResultScreen 
          examResults={examResults}
          review1Results={review1Results}
          review2Results={review2Results}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
