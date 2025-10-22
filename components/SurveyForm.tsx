import React, { useState, useEffect } from 'react';
import { surveyQuestions } from '../services/questions';
import { genres } from '../services/genres';
import { Question } from '../types';

interface SurveyFormProps {
  onComplete: (scores: { [key: string]: number }, genres: string[], mood: string) => void;
}

const moods = [
  { name: 'Relaxamento', colors: 'from-green-400/80 to-emerald-600/80', shadow: 'shadow-emerald-500/30' },
  { name: 'Tensão', colors: 'from-red-500/80 to-rose-700/80', shadow: 'shadow-rose-500/30' },
  { name: 'Alegria', colors: 'from-amber-400/80 to-orange-600/80', shadow: 'shadow-orange-500/30' },
  { name: 'Tristeza', colors: 'from-blue-500/80 to-indigo-700/80', shadow: 'shadow-indigo-500/30' },
  { name: 'Curiosidade', colors: 'from-purple-500/80 to-pink-600/80', shadow: 'shadow-pink-500/30' },
];

const waitingMessages = [
  "Analisando sua personalidade...",
  "Cruzando dados com nosso acervo de filmes...",
  "Considerando seu humor atual...",
  "Encontrando as joias escondidas...",
  "Ajustando os últimos detalhes...",
  "Pronto! Preparando para exibir...",
];

// --- STEP COMPONENTS (Defined externally to prevent re-creation on re-render) ---

interface SurveyStepProps {
  currentQuestion: Question;
  totalQuestions: number;
  currentQuestionIndex: number;
  isAnimatingOut: boolean;
  onAnswerSelect: (value: number) => void;
}

const SurveyStep: React.FC<SurveyStepProps> = ({ currentQuestion, totalQuestions, currentQuestionIndex, isAnimatingOut, onAnswerSelect }) => {
  const options = [
    { text: currentQuestion.first_alternative, value: currentQuestion.first_alternative_value },
    { text: currentQuestion.second_alternative, value: currentQuestion.second_alternative_value },
    { text: currentQuestion.third_alternative, value: currentQuestion.third_alternative_value },
  ];

  return (
    <div className={isAnimatingOut ? 'animate-fadeOut' : 'animate-fadeIn'}>
      <div className="text-center text-text-primary mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">Queremos te conhecer melhor!</h1>
        <p className="mt-2 text-text-secondary max-w-xl mx-auto">Responda às perguntas a seguir com a opção que mais se aproxima do seu jeito de ser.</p>
      </div>
      
      <div className="w-full max-w-md mx-auto mb-4">
        <div className="w-full bg-black/30 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-brand-primary-start to-brand-primary-end h-1 rounded-full transition-all duration-500 ease-apple"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-xs text-text-secondary mt-2 tracking-wider">
          PERGUNTA {currentQuestionIndex + 1} DE {totalQuestions}
        </p>
      </div>

      <div className="text-center mb-8 min-h-[96px] flex items-center justify-center px-4">
        <h2 className="text-lg md:text-xl font-semibold text-text-primary leading-relaxed">
          {currentQuestion.description}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8 max-w-md mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option.value)}
            className="w-full p-4 rounded-xl text-left font-medium transition-all duration-300 ease-apple shadow-lg text-text-primary bg-glass-bg backdrop-blur-lg border border-glass-border hover:bg-white/10 hover:border-white/20 transform hover:scale-[1.02]"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

interface GenreStepProps {
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
  onNext: () => void;
}

const GenreStep: React.FC<GenreStepProps> = ({ selectedGenres, onGenreToggle, onNext }) => (
  <div className="animate-fadeIn">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
        Quais seus gêneros favoritos?
      </h2>
      <p className="text-text-secondary mt-2">Escolha um ou mais, ou pule para uma seleção mais ampla.</p>
    </div>

    <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto">
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => onGenreToggle(genre)}
          className={`
            py-2 px-5 rounded-full font-semibold transition-all duration-300 ease-apple border transform hover:scale-105
            ${selectedGenres.includes(genre)
              ? 'bg-gradient-to-br from-brand-primary-start to-brand-primary-end text-white shadow-lg shadow-brand-primary-start/20 border-transparent scale-105'
              : 'bg-glass-bg backdrop-blur-lg border-glass-border hover:bg-white/10 text-text-primary'
            }
          `}
        >
          {genre}
        </button>
      ))}
    </div>
    <div className="text-center mt-12">
      <button
        onClick={onNext}
        className="py-3 px-8 font-bold text-white bg-gradient-to-br from-brand-primary-start to-brand-primary-end rounded-xl shadow-lg hover:shadow-brand-primary-start/30 transform hover:scale-105 transition-all duration-300 ease-apple"
      >
        Próximo
      </button>
    </div>
  </div>
);

interface MoodStepProps {
  onMoodSelect: (mood: string) => void;
  moodStage: 'initial' | 'orbs';
  setMoodStage: (stage: 'initial' | 'orbs') => void;
}

const MoodStep: React.FC<MoodStepProps> = ({ onMoodSelect, moodStage, setMoodStage }) => {
  const isOrbsVisible = moodStage === 'orbs';
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] overflow-hidden animate-fadeIn">
       <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
          Como você está se sentindo agora?
        </h2>
        <p className="text-text-secondary mt-2">Clique no centro para revelar as emoções.</p>
      </div>
      <div
        className="relative flex justify-center items-center cursor-pointer w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]"
        onClick={() => setMoodStage(moodStage === 'orbs' ? 'initial' : 'orbs')}
      >
        <div
          className={`transition-all duration-500 ease-apple ${isOrbsVisible ? 'scale-90 opacity-30' : 'scale-100 opacity-100'}`}
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-start to-brand-accent-start rounded-full blur-2xl opacity-60 animate-pulse-slow"></div>
            <div className="relative z-10 w-full h-full p-2">
              <img 
                src="https://img.freepik.com/vetores-premium/vector-design-deep-learning-icon-style-estilo-de-icone-de-aprendizagem-profunda_1134108-9582.jpg" 
                alt="Ícone de Cérebro (Deep Learning)" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {moods.map((mood, index) => {
          const angle = (index / moods.length) * 2 * Math.PI - Math.PI / 2;
          const radius = isOrbsVisible ? (window.innerWidth < 640 ? 110 : 150) : 0;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <button
              key={mood.name}
              onClick={(e) => { e.stopPropagation(); onMoodSelect(mood.name); }}
              className={`absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center text-center font-bold text-white
                          transition-all duration-700 ease-apple
                          bg-gradient-to-br ${mood.colors}
                          shadow-xl ${mood.shadow} backdrop-blur-3xl border-2 border-white/25
                          hover:border-white/40 transform
                          animate-liquid-gradient`}
              style={{
                transform: isOrbsVisible ? `translate(${x}px, ${y}px) scale(1)` : 'translate(0px, 0px) scale(0)',
                opacity: isOrbsVisible ? 1 : 0,
                transitionDelay: isOrbsVisible ? `${index * 100}ms` : '0ms',
                backgroundSize: '400% 400%',
              }}
            >
              {mood.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const WaitingStep: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % waitingMessages.length);
    }, 1100); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fadeIn">
      <div className="w-full max-w-md bg-glass-bg backdrop-blur-3xl border border-glass-border rounded-3xl p-8 text-center shadow-2xl">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4">
          Criando sua lista...
        </h2>
        <div className="text-text-secondary mt-2 min-h-[24px] mb-8" key={messageIndex}>
          <span className="inline-block animate-fadeIn">
            {waitingMessages[messageIndex]}
          </span>
        </div>

        <div className="w-full bg-black/30 rounded-full h-3 border border-glass-border p-0.5 shadow-inner overflow-hidden">
          <div className="bg-gradient-to-r from-brand-primary-start to-brand-primary-end h-full rounded-full animate-fill-bar shadow-[0_0_15px_theme(colors.brand-primary-start)]"></div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
const SurveyForm: React.FC<SurveyFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'survey' | 'genres' | 'mood' | 'waiting'>('survey');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodStage, setMoodStage] = useState<'initial' | 'orbs'>('initial');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (step === 'waiting' && selectedMood) {
      const timer = setTimeout(() => {
        handleSubmit(selectedMood);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [step, selectedMood]);

  const handleAnswerSelect = (value: number) => {
    setIsAnimatingOut(true);
    setTimeout(() => {
        const newAnswers = { ...answers, [surveyQuestions[currentQuestionIndex].id]: value };
        setAnswers(newAnswers);
        if (currentQuestionIndex < surveyQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStep('genres');
        }
        setIsAnimatingOut(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (step === 'mood') {
        setMoodStage('initial');
        setStep('genres');
    } else if (step === 'genres') {
      setStep('survey');
    } else if (step === 'survey' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };
  
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setStep('waiting');
  };

  const handleSubmit = (mood: string) => {
    const scores: { [key: string]: number } = {
      extraversion: 0,
      neuroticism: 0,
      conscientiousness: 0,
      agreeableness: 0,
      openness: 0,
    };

    Object.keys(answers).forEach(questionId => {
      const question = surveyQuestions.find(q => q.id === questionId);
      if (question) {
        scores[question.attribute] += answers[questionId];
      }
    });
    
    onComplete(scores, selectedGenres, mood);
  };

  const renderStep = () => {
    switch (step) {
      case 'survey':
        return <SurveyStep 
          currentQuestion={surveyQuestions[currentQuestionIndex]}
          totalQuestions={surveyQuestions.length}
          currentQuestionIndex={currentQuestionIndex}
          isAnimatingOut={isAnimatingOut}
          onAnswerSelect={handleAnswerSelect}
        />;
      case 'genres':
        return <GenreStep 
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          onNext={() => setStep('mood')}
        />;
      case 'mood':
        return <MoodStep 
          onMoodSelect={handleMoodSelect}
          moodStage={moodStage}
          setMoodStage={setMoodStage}
        />;
      case 'waiting':
        return <WaitingStep />;
      default:
        return <SurveyStep
          currentQuestion={surveyQuestions[currentQuestionIndex]}
          totalQuestions={surveyQuestions.length}
          currentQuestionIndex={currentQuestionIndex}
          isAnimatingOut={isAnimatingOut}
          onAnswerSelect={handleAnswerSelect}
        />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {renderStep()}
      {(step !== 'survey' || currentQuestionIndex > 0) && step !== 'waiting' && (
         <div className="text-center mt-12">
            <button
                onClick={handlePrevious}
                className="py-2 px-6 font-semibold text-text-primary bg-glass-bg backdrop-blur-lg border border-glass-border rounded-xl hover:bg-white/10 transition-colors duration-300 ease-apple"
            >
                Voltar
            </button>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;