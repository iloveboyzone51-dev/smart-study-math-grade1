// API Service for Gemini
const GEMINI_CONFIG = {
  models: ["gemini-3.1-flash-lite", "gemini-3.5-flash", "gemini-3.1-pro-preview"], // Tutor prioritizes flash-lite
  apiKey: atob("QVEuQWI4Uk42S3diZ3EtMV8tRGVjZWwwXzFFMVcwZ25kdms1T2Z4NzBhTURBYkpVak1SdUE="), // Hardcoded for internal use
};

// Custom text API caller for Deep Dive & Tutor Chat
async function callGeminiTextAPI(systemPrompt, userPrompt, preferredModel = null) {
  const modelsToTry = preferredModel ? [preferredModel, ...GEMINI_CONFIG.models.filter(m => m !== preferredModel)] : GEMINI_CONFIG.models;
  
  for (const model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userPrompt }] }],
        })
      });
      if (!response.ok) {
        console.warn(`[${model}] 호출 실패, 다음 모델 시도...`);
        continue;
      }
      const data = await response.json();
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) continue;
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      console.warn(`[${model}] 네트워크 에러, 다음 모델 시도...`);
    }
  }
  throw new Error("모든 텍스트 API 모델 호출이 실패했습니다.");
}
