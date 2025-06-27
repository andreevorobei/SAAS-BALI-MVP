import React, { useState, useEffect } from 'react';
import { Compass, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';

const OnboardingWelcome = () => {
  const [name, setName] = useState('');
  const [goals, setGoals] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [logoRotating, setLogoRotating] = useState(false);

  // Анимация появления элементов
  useEffect(() => {
    setIsVisible(true);
    
    // Анимация логотипа
    const logoInterval = setInterval(() => {
      setLogoRotating(true);
      setTimeout(() => setLogoRotating(false), 1000);
    }, 4000);

    return () => clearInterval(logoInterval);
  }, []);

  // Проверка валидности формы
  const isFormValid = name.trim().length >= 2 && goals.trim().length >= 10;

  // Обработчик продолжения
  const handleContinue = () => {
    if (isFormValid) {
      console.log('Переход к следующему экрану:', { name, goals });
      // Здесь будет переход к следующему экрану
    }
  };

  // Примеры для placeholder
  const placeholderExamples = [
    "Хочу стать Product Manager в крупной IT-компании, развивать навыки управления продуктом и командой",
    "Мечтаю работать в сфере UX/UI дизайна, создавать красивые и удобные интерфейсы",
    "Планирую перейти в Data Science, изучить машинное обучение и аналитику данных",
    "Хочу развиваться как Frontend разработчик и работать в международной команде"
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholderExamples.length);
    }, 3000);

    return () => clearInterval(placeholderInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Прогресс бар */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Знакомство</span>
            <span>1 из 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className={`w-full max-w-2xl transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Логотип и заголовок */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 transition-transform duration-1000 ${
              logoRotating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
            }`}>
              <Compass className="w-10 h-10 text-white" />
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Найди свой карьерный путь<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                с Jess
              </span>
            </h1>
            
            <p className={`text-xl text-gray-600 leading-relaxed max-w-lg mx-auto transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Расскажи Jess о своих целях, и она поможет построить персональный план развития 🚀
            </p>
          </div>

          {/* Форма */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-700 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* Поле имени */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Как тебя зовут?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введи свое имя"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                maxLength={50}
              />
              {name.length > 0 && name.length < 2 && (
                <p className="text-red-500 text-sm mt-1">Имя должно содержать минимум 2 символа</p>
              )}
            </div>

            {/* Поле целей */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Расскажи о своих карьерных целях и мечтах
              </label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder={placeholderExamples[currentPlaceholder]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg resize-none"
                rows={4}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">
                  {goals.length > 0 && goals.length < 10 && (
                    <span className="text-red-500">Минимум 10 символов для качественного анализа</span>
                  )}
                  {goals.length >= 10 && (
                    <span className="text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Отлично! Этого достаточно для анализа
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400">{goals.length}/1000</span>
              </div>
            </div>

            {/* Мотивационные элементы */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Что тебя ждет с Jess:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Jess оценит твои суперсилы и способности</li>
                    <li>• Подберет идеальные профессии на основе анализа</li>
                    <li>• Создаст персональный план развития</li>
                    <li>• Предложит ежедневные квесты и задания для роста</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Кнопка продолжения */}
            <button
              onClick={handleContinue}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Продолжить
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                isFormValid ? 'group-hover:translate-x-1' : ''
              }`} />
            </button>

            {/* Дополнительная информация */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Займет всего 3-5 минут • Полный анализ от Jess • Никакого спама
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Конфиденциально
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  ИИ-анализ от Jess
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Персонализация
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Фоновые декоративные элементы */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;