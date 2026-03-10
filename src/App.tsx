/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Download, Brain, Zap, Target, Loader2, ArrowRight, Printer } from 'lucide-react';
import Markdown from 'react-markdown';
import { generateEbookContent } from './services/gemini';

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadingMessages = [
    "Analisando padrões de foco...",
    "Estruturando capítulos do curso...",
    "Consultando neurociência aplicada...",
    "Redigindo exercícios práticos...",
    "Finalizando seu ebook personalizado..."
  ];

  useEffect(() => {
    handleGenerate();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const text = await generateEbookContent();
      if (text) {
        setContent(text);
      } else {
        setError("Não foi possível gerar o conteúdo. Tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao conectar com a IA. Verifique sua conexão.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 print:hidden">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600" />
            <span className="font-sans italic text-xl font-semibold tracking-tight">Foco Mental</span>
          </div>
          {content && (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-xs text-stone-400 italic">Dica: Selecione 'Salvar como PDF' no destino da impressão</span>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Salvar como PDF
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-16">
        <AnimatePresence mode="wait">
          {!content ? (
            <motion.section
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto px-6 py-20 md:py-32 text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-8"
              >
                <Zap className="w-3 h-3" />
                Curso Exclusivo
              </motion.div>
              
              <h1 className="font-sans text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                Reconstrua seu <br />
                <span className="italic text-emerald-600">Foco Mental</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Um guia definitivo para recuperar sua concentração, eliminar distrações e dominar sua produtividade na era digital.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl text-lg font-medium min-w-[300px]">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={loadingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm"
                      >
                        {loadingMessages[loadingStep]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ) : error ? (
                  <button
                    onClick={handleGenerate}
                    className="group relative px-8 py-4 bg-red-600 text-white rounded-2xl text-lg font-medium overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] min-w-[300px]"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Tentar Novamente
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                ) : null}
              </div>

              {error && (
                <p className="mt-6 text-red-500 text-sm font-medium">{error}</p>
              )}

              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-black/5 pt-16">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Foco Inabalável</h3>
                  <p className="text-stone-500 leading-relaxed">Aprenda técnicas de Deep Work para entrar em estado de fluxo rapidamente.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Neurociência</h3>
                  <p className="text-stone-500 leading-relaxed">Entenda como seu cérebro funciona e como reprogramá-lo para a atenção.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Plano Prático</h3>
                  <p className="text-stone-500 leading-relaxed">Um roteiro de 21 dias com exercícios diários para consolidar novos hábitos.</p>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto px-6 py-12 md:py-24"
            >
              <div className="print:block">
                <div className="mb-16 text-center print:mb-24">
                  <p className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">Ebook Digital</p>
                  <h1 className="font-sans text-4xl md:text-6xl font-bold mb-6">Reconstrução do Foco Mental</h1>
                  <div className="h-px w-24 bg-emerald-600 mx-auto mb-6"></div>
                  <p className="text-stone-500 italic">Um curso prático para a mente moderna</p>
                </div>

                <div className="prose prose-stone prose-lg max-w-none 
                  prose-headings:font-sans prose-headings:font-bold
                  prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:pb-4
                  prose-p:leading-relaxed prose-p:text-stone-700
                  prose-strong:text-emerald-700 prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:pl-6
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-200 prose-blockquote:italic prose-blockquote:bg-emerald-50/30 prose-blockquote:p-6 prose-blockquote:rounded-r-xl
                ">
                  <Markdown>{content}</Markdown>
                </div>

                <div className="mt-24 pt-12 border-t border-black/5 text-center text-stone-400 text-sm print:mt-12">
                  <p>© {new Date().getFullYear()} Foco Mental - Todos os direitos reservados.</p>
                </div>
              </div>

              <div className="mt-12 flex justify-center print:hidden">
                <button
                  onClick={() => setContent(null)}
                  className="text-stone-400 hover:text-stone-600 transition-colors text-sm font-medium"
                >
                  ← Voltar ao início
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            margin: 2cm;
          }
          body {
            background: white;
            color: black;
          }
          .prose {
            max-width: none;
          }
          h2 {
            page-break-before: always;
          }
        }
      `}} />
    </div>
  );
}
