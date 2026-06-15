function MathDeepDiveModal({ question, onClose, trackResult }) {
  const [step, setStep] = useState(1);
  const [conceptData, setConceptData] = useState(null);
  const [similarQuestion, setSimilarQuestion] = useState(null);
  const [userAns, setUserAns] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load concept explanation on mount
    loadConcept();
  }, []);

  const loadConcept = async (type = "concept") => {
    setLoading(true);
    try {
      if (type === "similar") {
        const q = await generateMathDeepDive(question, null, "similar");
        setSimilarQuestion(q);
        setStep(3);
      } else {
        const text = await callGeminiTextAPI(
          "너는 아주 친절한 중1 수학 선생님이다.", 
          type === "concept" ? 
            `학생이 다음 문제를 틀렸습니다.\n문제: ${question.question_text}\n핵심 원리를 차근차근 매우 쉽게 설명해주세요. LaTeX 수식을 활용하세요.` :
            `이전 설명을 학생이 조금 어려워합니다. 더 쉬운 비유와 예시로 다시 짧게 설명해주세요.`
        );
        setConceptData(text);
      }
    } catch (e) {
      alert("데이터를 불러오는데 실패했습니다.");
    }
    setLoading(false);
  };

  const handleUnderstand = () => {
    setStep(2);
  };

  const handleNotUnderstand = () => {
    loadConcept("different");
  };

  const handleStartSimilar = () => {
    loadConcept("similar");
  };

  const submitSimilar = () => {
    if (!userAns) return;
    const isCorrect = userAns === similarQuestion.correct_answer || 
      (similarQuestion.type === 'multiple_choice' && "①②③④⑤".indexOf(userAns) === similarQuestion.correct_index);
    
    if (isCorrect) {
      setFeedback("🎉 완벽해요! 정답입니다.");
      trackResult(true);
      setTimeout(onClose, 2000);
    } else {
      setFeedback("아쉽네요, 다시 한번 생각해볼까요?");
      trackResult(false);
    }
  };

  useEffect(() => {
    if (similarQuestion?.chart_data && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (canvasRef.current.chartInstance) canvasRef.current.chartInstance.destroy();
      canvasRef.current.chartInstance = new Chart(ctx, {
        type: similarQuestion.chart_data.type || 'line',
        data: similarQuestion.chart_data.data || similarQuestion.chart_data,
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }, [similarQuestion]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fa-solid fa-chalkboard-user"></i> 개념 심화 학습
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>선생님이 설명을 준비하고 있어요...</p>
          </div>
        ) : (
          <>
            {step === 1 && conceptData && (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  <div dangerouslySetInnerHTML={renderMath(conceptData)} />
                </div>
                
                <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>설명이 잘 이해되나요?</p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={handleUnderstand}>네, 이해했어요!</button>
                    <button className="btn btn-outline" onClick={handleNotUnderstand}>다시 설명해 주세요</button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ animation: 'fadeIn 0.5s', textAlign: 'center', padding: '2rem' }}>
                <i className="fa-solid fa-thumbs-up" style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '1rem' }}></i>
                <h3 style={{ marginBottom: '1rem' }}>좋아요! 이제 원리를 알았군요.</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>제대로 이해했는지 비슷한 문제를 하나 풀어볼까요?</p>
                <button className="btn btn-accent" onClick={handleStartSimilar}>유사문제 풀기</button>
              </div>
            )}

            {step === 3 && similarQuestion && (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <div className="exam-question-box">
                  <div dangerouslySetInnerHTML={renderMath(similarQuestion.question_text)} />
                  {similarQuestion.chart_data && (
                    <div style={{ marginTop: '1.5rem', height: '250px', width: '100%', position: 'relative' }}>
                       <canvas ref={canvasRef}></canvas>
                    </div>
                  )}
                  {similarQuestion.type === 'multiple_choice' && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {similarQuestion.options.map((opt, idx) => (
                        <div key={idx} dangerouslySetInnerHTML={renderMath(opt)} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="omr-container">
                  {similarQuestion.type === 'multiple_choice' ? (
                    <div className="omr-options">
                      {['①', '②', '③', '④', '⑤'].map((val) => (
                        <button 
                          key={val}
                          className={`omr-btn ${userAns === val ? 'selected' : ''}`}
                          onClick={() => setUserAns(val)}
                        >
                          {val[0]}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      value={userAns} 
                      onChange={e => setUserAns(e.target.value)} 
                      placeholder="정답" 
                      style={{ textAlign: 'center' }}
                    />
                  )}
                  <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button className="btn btn-primary" onClick={submitSimilar}>정답 확인</button>
                  </div>
                  {feedback && (
                    <div style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold', color: feedback.includes('완벽해요') ? 'var(--success)' : 'var(--danger)' }}>
                      {feedback}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ReviewScreen handles both Exam-like UI for retrying and checking answers.
// To save space, we just render ExamScreen for retrying, but we need hint UI.
// So let's wrap ExamScreen or implement a simplified one for review.
// Spec says: Review is basically the same as Exam but with Hint button.
// For simplicity and matching spec exactly, let's create a custom ReviewScreen UI.
// TutorModal Component for AI Help
function TutorModal({ question, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "원장님입니다. 이 문제가 어렵나요? 어떤 부분이 헷갈리는지 편하게 말해주세요." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const prompt = `학생이 질문했습니다: "${userMsg}"\n\n현재 풀고 있는 문제 정보:\n과목: ${question.subject}\n단원: ${question.chapter}\n문제 텍스트: ${question.question_text}\n보기: ${question.options ? question.options.join(', ') : '없음'}\n정답: ${question.correct_answer}\n해설: ${question.explanation}\n\n너는 친절하고 위트있는 중학교 종합학원 원장님이다. 정답을 바로 알려주지 말고, 학생이 스스로 생각할 수 있도록 힌트를 주거나, 친절하게 단계별로 설명해라. 존댓말을 사용하고, 격려해라.`;
      
      const responseText = await callGeminiTextAPI("너는 친절한 학원 원장님이다.", prompt, "gemini-3.1-flash-lite");
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: "미안해요, 지금 원장님이 조금 바쁘네요. 잠시 후 다시 질문해주겠어요?" }]);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', height: '80vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: 'var(--primary)', margin: 0 }}>
            <i className="fa-solid fa-user-tie"></i> 원장님 호출 (AI 도우미)
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role === 'user' ? 'user' : 'ai'}`}>
                {m.role === 'assistant' && <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>원장님</div>}
                <div dangerouslySetInnerHTML={renderMath(m.text)} />
              </div>
            ))}
            {loading && (
              <div className="chat-bubble ai">
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="질문을 입력하세요..." 
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={loading || !input.trim()}>
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({ questions, onComplete, isSecondRound }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hintCount, setHintCount] = useState(Math.floor(questions.length * 0.3) || 1);
  const [showHint, setShowHint] = useState(false);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [showTutor, setShowTutor] = useState(false);
  
  // Evaluation state: null -> answering -> checked
  const [evalState, setEvalState] = useState({}); 

  const q = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowHint(false);
    } else {
      onComplete(evalState); // Pass evaluation results back
    }
  };

  const handleUseHint = () => {
    if (hintCount > 0 && !showHint) {
      setHintCount(h => h - 1);
      setShowHint(true);
    }
  };

  const handleCheckAnswer = () => {
    const userAns = answers[q.id];
    if (!userAns) return;

    let isCorrect = false;
    if (q.type === 'multiple_choice') {
      const correctText = q.options[q.correct_index];
      isCorrect = correctText.startsWith(userAns) || userAns === q.correct_answer;
    } else {
      isCorrect = userAns.trim() === q.correct_answer.trim();
    }

    setEvalState(prev => ({
      ...prev,
      [q.id]: {
        correct: isCorrect,
        usedHint: showHint
      }
    }));

    // If second round and wrong and it's Math, trigger deep dive
    if (!isCorrect && isSecondRound && q.subject === '수학') {
      setShowDeepDive(true);
    }
  };

  const currentEval = evalState[q?.id];

  if (!q) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {showDeepDive && (
        <MathDeepDiveModal 
          question={q} 
          onClose={() => setShowDeepDive(false)} 
          trackResult={() => {}}
        />
      )}
      {showTutor && (
        <TutorModal question={q} onClose={() => setShowTutor(false)} />
      )}
      
      <div className="app-header" style={{ background: isSecondRound ? '#e74c3c' : '#f39c12' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>오답노트 {isSecondRound ? '2' : '1'}회차</h1>
          <div className="badge" style={{ background: 'rgba(0,0,0,0.2)' }}>남은 힌트: {hintCount}회</div>
        </div>
      </div>
      
      <div className="exam-layout exam-mode">
        {/* Left Sidebar */}
        <div className="omr-sidebar">
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>문제 {currentIndex + 1} / {questions.length}</span>
          </div>
          
          <div className="omr-container">
            <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
              답안 입력
            </h4>
            
            {!currentEval ? (
              q.type === 'multiple_choice' ? (
                <div className="omr-options">
                  {['①', '②', '③', '④', '⑤'].map((val) => (
                    <button 
                      key={val}
                      className={`omr-btn ${answers[q.id] === val ? 'selected' : ''}`}
                      onClick={() => setAnswers({...answers, [q.id]: val})}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              ) : (
                <input 
                  type="text" 
                  value={answers[q.id] || ''} 
                  onChange={e => setAnswers({...answers, [q.id]: e.target.value})} 
                  placeholder="정답" 
                  style={{ textAlign: 'center', width: '100%', padding: '0.5rem' }}
                />
              )
            ) : (
               <div style={{ textAlign: 'center', fontWeight: 'bold', color: currentEval.correct ? 'var(--success)' : 'var(--danger)' }}>
                 {currentEval.correct ? '정답' : '오답'}
               </div>
            )}
            
            {!currentEval && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={handleCheckAnswer} disabled={!answers[q.id]} style={{ width: '100%' }}>
                  정답 확인
                </button>
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
          
          {!currentEval && (
            <button 
              className="btn btn-outline" 
              style={{ width: '100%', marginBottom: '1rem' }} 
              onClick={handleUseHint}
              disabled={hintCount === 0 || showHint}
            >
              <i className="fa-regular fa-lightbulb"></i> 힌트 사용
            </button>
          )}

          <h4 style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: 'var(--text-muted)' }}>전체 문항</h4>
          <div className="omr-grid-overview">
            {questions.map((qItem, idx) => {
              const isEval = evalState[qItem.id];
              let bgColor = '';
              let color = '';
              if (isEval) {
                bgColor = isEval.correct ? 'var(--success)' : 'var(--danger)';
                color = 'white';
              } else if (answers[qItem.id]) {
                bgColor = 'var(--primary)';
                color = 'white';
              }

              return (
                <div 
                  key={qItem.id} 
                  className={`omr-mini-dot ${idx === currentIndex ? 'current' : ''}`}
                  style={{ background: bgColor || '#e2e8f0', color: color || '#64748b' }}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="exam-body">
          {showHint && (
            <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #fde68a', animation: 'fadeIn 0.3s' }}>
              <strong style={{ color: '#b45309' }}>💡 힌트: </strong>
              <span dangerouslySetInnerHTML={renderMath(q.hint || "힌트가 없습니다.")} />
            </div>
          )}

          <div className="exam-question-box">
            <div dangerouslySetInnerHTML={renderMath(q.question_text)} />
            {q.question_svg && (
              <div style={{ marginTop: '1.5rem', textAlign: 'center', maxWidth: '400px', margin: '1.5rem auto 0' }}>
                 <div dangerouslySetInnerHTML={{ __html: q.question_svg }} />
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

          {currentEval && (
            <div style={{ background: currentEval.correct ? '#f0fdf4' : '#fef2f2', border: `2px solid ${currentEval.correct ? '#22c55e' : '#ef4444'}`, borderRadius: '12px', padding: '1.5rem', marginTop: 'auto' }}>
              <h3 style={{ color: currentEval.correct ? '#166534' : '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                {currentEval.correct ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>}
                {currentEval.correct ? '정답입니다!' : '오답입니다.'}
              </h3>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <strong>정답: </strong> <span dangerouslySetInnerHTML={renderMath(q.correct_answer)} />
              </div>

              {q.subject === '수학' && q.math_solution_steps ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ color: 'var(--primary)' }}>단계별 풀이</h4>
                  {q.math_solution_steps.map((step, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Step {step.step}. {step.title}</div>
                      <div dangerouslySetInnerHTML={renderMath(step.content)} />
                      {step.latex && <div dangerouslySetInnerHTML={renderMath(`$$${step.latex}$$`)} />}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                  <strong>해설: </strong> <span dangerouslySetInnerHTML={renderMath(q.explanation)} />
                </div>
              )}

              <button className="btn btn-primary w-full mt-4" onClick={handleNext}>
                {currentIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
