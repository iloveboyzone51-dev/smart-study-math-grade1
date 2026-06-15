function useTimer(initialSeconds, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete();
      return;
    }
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const format = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  return { seconds, format };
}

function ExamScreen({ questions, onSubmit, title = "본시험", mode = "exam" }) {
  // mode: "exam" | "review1" | "review2"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [warningMsg, setWarningMsg] = useState('');
  const [showTutor, setShowTutor] = useState(false);
  
  // Overall exam timer (80 min)
  const examTimer = useTimer(80 * 60, () => handleSubmit());

  const q = questions[currentIndex];
  
  // Min time logic
  const getMinTime = (difficulty) => {
    if (difficulty === '하') return 15;
    if (difficulty === '중') return 25;
    if (difficulty === '상') return 35;
    return 15;
  };
  
  const minTime = getMinTime(q?.difficulty);
  const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
  const remainingWait = Math.max(0, minTime - elapsed);

  // Force re-render every second to update remaining wait time
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    const isSubjective = q.type !== 'multiple_choice';
    const ans = answers[q.id];

    if (isSubjective && (!ans || ans.trim().length < 2)) {
      setWarningMsg("정답을 2글자 이상 입력해주세요. 모르면 최대한 써보세요!");
      setTimeout(() => setWarningMsg(''), 3000);
      return;
    }

    if (remainingWait > 0) {
      setWarningMsg(`이 문제를 조금 더 살펴보세요! (${remainingWait}초 후 넘어갈 수 있습니다)`);
      setTimeout(() => setWarningMsg(''), 3000);
      return;
    }

    // Move next or submit
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setQuestionStartTime(Date.now());
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setQuestionStartTime(Date.now()); 
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const handleAnswerSelect = (val) => {
    if (answers[q.id] && q.isLocked) return; 
    
    if (q.type === 'multiple_choice') {
      if (answers[q.id] === val) {
        if (remainingWait <= 0) {
          const newAns = {...answers};
          delete newAns[q.id];
          setAnswers(newAns);
        }
      } else {
        setAnswers({ ...answers, [q.id]: val });
      }
    } else {
      setAnswers({ ...answers, [q.id]: val });
    }
  };

  const canvasRef = useRef(null);
  useEffect(() => {
    if (q?.chart_data && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (canvasRef.current.chartInstance) {
        canvasRef.current.chartInstance.destroy();
      }
      
      const chartConfig = {
        type: q.chart_data.type || 'line',
        data: q.chart_data.data || q.chart_data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...(q.chart_data.options || {})
        }
      };
      canvasRef.current.chartInstance = new Chart(ctx, chartConfig);
    }
  }, [q]);

  if (!q) return null;

  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {showTutor && (
        <TutorModal question={q} onClose={() => setShowTutor(false)} />
      )}
      <div className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>{title}</h1>
          <div className={`badge badge-${q.difficulty}`}>{q.difficulty} 난이도</div>
          <div style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
            {q.subject} - {q.chapter}
          </div>
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: examTimer.seconds < 300 ? 'var(--danger)' : examTimer.seconds < 600 ? 'var(--warning)' : 'inherit' }}>
          ⏱ {examTimer.format}
        </div>
      </div>
      
      <div className="progress-container" style={{ borderRadius: 0 }}>
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="exam-layout exam-mode">
        {/* Left Sidebar: OMR and Mini-map */}
        <div className="omr-sidebar">
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>문제 {currentIndex + 1} / {questions.length}</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{progressPercent}% 완료</div>
          </div>
          
          <div className="omr-container">
            <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
              답안 입력
            </h4>
            
            {q.type === 'multiple_choice' ? (
              <div className="omr-options">
                {['①', '②', '③', '④', '⑤'].map((val, idx) => (
                  <button 
                    key={idx}
                    className={`omr-btn ${answers[q.id] === val ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input 
                  type="text" 
                  placeholder="주관식 정답 입력" 
                  value={answers[q.id] || ''}
                  onChange={e => handleAnswerSelect(e.target.value)}
                  style={{ fontSize: '1.2rem', textAlign: 'center' }}
                />
              </div>
            )}
          </div>
          
          <button 
            className="btn btn-accent" 
            style={{ width: '100%', marginBottom: '1rem', background: '#e74c3c' }} 
            onClick={() => setShowTutor(true)}
          >
            🆘 원장님 호출
          </button>
          
          <h4 style={{ fontSize: '0.9rem', margin: '1rem 0 0.5rem', color: 'var(--text-muted)' }}>전체 문항</h4>
          <div className="omr-grid-overview">
            {questions.map((qItem, idx) => (
              <div 
                key={qItem.id} 
                className={`omr-mini-dot ${answers[qItem.id] ? 'filled' : ''} ${idx === currentIndex ? 'current' : ''}`}
                onClick={() => {
                  if (idx <= currentIndex || !qItem.isLocked) { // basic jump logic
                    setCurrentIndex(idx);
                  }
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area: Question Display */}
        <div className="exam-body">
          {warningMsg && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem', animation: 'fadeIn 0.3s' }}>
              <i className="fa-solid fa-circle-exclamation"></i> {warningMsg}
            </div>
          )}

          <div className="exam-question-box">
            <div dangerouslySetInnerHTML={renderMath(q.question_text)} />
            
            {q.question_svg && (
              <div style={{ marginTop: '1.5rem', textAlign: 'center', maxWidth: '400px', margin: '1.5rem auto 0' }}>
                 <div dangerouslySetInnerHTML={{ __html: q.question_svg }} />
              </div>
            )}
            
            {q.chart_data && (
              <div style={{ marginTop: '1.5rem', height: '250px', width: '100%', position: 'relative' }}>
                 <canvas ref={canvasRef}></canvas>
              </div>
            )}
            
            {q.type === 'multiple_choice' && (
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {q.options.map((opt, idx) => (
                  <div key={idx} style={{ padding: '0.8rem', fontSize: '1.1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span dangerouslySetInnerHTML={renderMath(opt)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-outline" onClick={handlePrev} disabled={currentIndex === 0}>
              <i className="fa-solid fa-arrow-left"></i> 이전 문제
            </button>
            
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              style={{ minWidth: '150px' }}
            >
              {isLast ? '제출하기' : '다음 문제'} <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
