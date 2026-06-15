// Setup Component
// Setup Component
function SetupScreen({ onStart }) {
  const [selectedSubjects, setSelectedSubjects] = useState(() => {
    // Select all subjects by default
    const init = {};
    Object.keys(CURRICULUM).forEach(subj => {
      init[subj] = true;
    });
    return init;
  });
  const [error, setError] = useState('');

  const handleToggleSubject = (subj) => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subj]: !prev[subj]
    }));
  };

  const handleSelectAll = (isAll) => {
    const next = {};
    Object.keys(CURRICULUM).forEach(subj => {
      next[subj] = isAll;
    });
    setSelectedSubjects(next);
  };

  const calculateQuestions = () => {
    // Static DB has 5 questions per subject
    return Object.keys(selectedSubjects).filter(s => selectedSubjects[s]).length * 5;
  };

  const startExam = () => {
    const selected = Object.keys(selectedSubjects).filter(s => selectedSubjects[s]);
    if (selected.length === 0) {
      setError("최소 1개 이상의 과목을 선택해야 합니다.");
      return;
    }
    // Pass array of selected subject names
    onStart(selected);
  };

  return (
    <div className="content-area">
      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          <i className="fa-solid fa-gear"></i> 시험 설정 (모의고사)
        </h2>
        
        {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>과목 선택</h3>
        
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} onClick={() => handleSelectAll(true)}>전체 선택</button>
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} onClick={() => handleSelectAll(false)}>전체 해제</button>
        </div>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {Object.keys(CURRICULUM).map(subj => {
            const isSelected = selectedSubjects[subj];

            return (
              <label key={subj} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem', background: isSelected ? 'var(--primary)' : '#f8fafc', color: isSelected ? 'white' : 'var(--text-main)', borderRadius: '8px', border: '1px solid var(--border)', transition: 'all 0.2s' }}>
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={() => handleToggleSubject(subj)}
                  style={{ width: '1.2rem', height: '1.2rem' }}
                />
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{subj}</div>
              </label>
            );
          })}
        </div>

        <div style={{ background: '#fffbeb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', marginBottom: '2rem', border: '1px solid #fde68a' }}>
          <h4 style={{ color: '#b45309', margin: 0 }}>출제 문항 수: <strong style={{ fontSize: '1.5rem' }}>{calculateQuestions()}</strong> 문제</h4>
          <p style={{ fontSize: '0.9rem', color: '#b45309', marginTop: '0.5rem' }}>내장된 고품질 모의고사 문항으로 즉시 시험이 시작됩니다.</p>
        </div>

        <button className="btn btn-primary w-full" style={{ padding: '1rem', fontSize: '1.2rem' }} onClick={startExam}>
          <i className="fa-solid fa-play"></i> 시험 시작하기
        </button>
      </div>
    </div>
  );
}
