import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateEbookContent() {
  const prompt = `
    Crie um ebook EXTENSO, completo e estruturado em Português sobre "Reconstrução do Foco Mental".
    O ebook deve ser um curso prático dividido em EXATAMENTE 30 capítulos curtos e objetivos.
    
    Cada capítulo deve abordar um aspecto específico da reconstrução do foco, desde a biologia básica até estratégias avançadas de produtividade e manutenção a longo prazo.
    
    Estrutura sugerida para os 30 capítulos:
    - Capítulos 1-5: Fundamentos e Biologia (Neuroplasticidade, Dopamina, etc).
    - Capítulos 6-15: Identificação e Eliminação de Distrações (Digital, Social, Ambiente).
    - Capítulos 16-25: Técnicas de Treinamento e Reconstrução (Deep Work, Meditação, Pomodoro, Biohacking).
    - Capítulos 26-30: Estilo de Vida e Sustentabilidade (Sono, Nutrição, Rotinas Matinais, Revisão Semanal).

    Use Markdown para formatação. Seja detalhado, motivador e prático.
    Inclua um pequeno exercício prático ou reflexão ao final de cada um dos 30 capítulos.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw error;
  }
}
