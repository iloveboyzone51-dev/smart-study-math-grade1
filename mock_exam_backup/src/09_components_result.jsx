function ResultScreen({ data, onHome }) {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    // Subject Chart
    if (chartRef1.current) {
      const ctx = chartRef1.current.getContext('2d');
      const subjects = Object.keys(data.by_subject);
      const rates = subjects.map(s => Math.round(data.by_subject[s].rate * 100));
      
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: subjects,
          datasets: [{
            label: '정답률 (%)',
            data: rates,
            backgroundColor: '#1a3a6b',
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { min: 0, max: 100 } }
        }
      });
    }

    // Difficulty Chart
    if (chartRef2.current) {
      const ctx = chartRef2.current.getContext('2d');
      const diffs = ['하', '중', '상'];
      const correct = diffs.map(d => data.by_difficulty[d].correct);
      const incorrect = diffs.map(d => data.by_difficulty[d].total - data.by_difficulty[d].correct);

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: diffs,
          datasets: [
            { data: correct, backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'] }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      .then(() => alert('클립보드에 복사되었습니다! 안티그래비티에게 전달해주세요.'))
      .catch(() => alert('복사에 실패했습니다.'));
  };

  return (
    <div className="content-area" style={{ overflowY: 'auto' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <i className="fa-solid fa-trophy" style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '1rem' }}></i>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>학습 평가 결과</h1>
          <p style={{ color: 'var(--text-muted)' }}>최종 정답률: {Math.round(data.summary.final_correct_rate * 100)}%</p>
        </div>

        <div className="grid-2">
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>과목별 정답률</h3>
            <div style={{ height: '200px' }}><canvas ref={chartRef1}></canvas></div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>난이도별 정답수</h3>
            <div style={{ height: '200px' }}><canvas ref={chartRef2}></canvas></div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>오답노트 학습 효과</h3>
          <ul style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            <li>본시험 정답: {data.summary.exam_correct}개</li>
            <li>오답노트 1회차 추가 정답: {data.summary.review1_correct}개</li>
            <li>오답노트 2회차 추가 정답: {data.summary.review2_correct}개</li>
            <li>끝까지 틀린 문제: {data.summary.total_questions - data.summary.final_correct}개</li>
            <li>힌트 사용 횟수: {data.summary.hint_used}회</li>
          </ul>
        </div>

        {data.ai_feedback && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <h3 style={{ marginBottom: '1rem', color: '#166534' }}><i className="fa-solid fa-robot"></i> AI 종합 피드백</h3>
            <p style={{ lineHeight: '1.6' }}>{data.ai_feedback}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', paddingBottom: '2rem' }}>
          <button className="btn btn-outline" onClick={copyToClipboard}>
            <i className="fa-regular fa-copy"></i> 클립보드 복사
          </button>
          <button className="btn btn-primary" onClick={onHome}>
            <i className="fa-solid fa-house"></i> 홈으로
          </button>
        </div>

      </div>
    </div>
  );
}
