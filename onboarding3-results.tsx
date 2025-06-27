import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star, 
  Sparkles,
  Brain,
  Heart,
  Zap,
  Shield,
  Rocket,
  Monitor,
  PieChart,
  Palette,
  Code,
  BarChart3,
  Eye,
  ChevronRight
} from 'lucide-react';

const OnboardingResults = () => {
  // Данные пользователя (из предыдущих экранов)
  const [userName] = useState("Андрей");
  
  // Состояние анимаций
  const [isVisible, setIsVisible] = useState(false);
  const [showStrengths, setShowStrengths] = useState(false);
  const [showProfessions, setShowProfessions] = useState(false);

  // Анимация появления элементов
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowStrengths(true), 800);
    setTimeout(() => setShowProfessions(true), 1400);
  }, []);

  // Сильные стороны на основе анализа
  const strengths = [
    {
      id: 1,
      name: "Стратегическое мышление",
      description: "Умение видеть большую картину и планировать",
      icon: Brain,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Работа с людьми",
      description: "Отличные коммуникативные навыки",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      id: 3,
      name: "Быстрое обучение",
      description: "Легко осваиваете новые технологии",
      icon: Zap,
      color: "bg-purple-500"
    },
    {
      id: 4,
      name: "Решение проблем",
      description: "Аналитический подход к сложным задачам",
      icon: Shield,
      color: "bg-green-500"
    },
    {
      id: 5,
      name: "Инновационность",
      description: "Любите создавать что-то новое",
      icon: Rocket,
      color: "bg-orange-500"
    }
  ];

  // Подходящие профессии
  const professions = [
    {
      id: 1,
      name: "Product Manager",
      match: 92,
      description: "Управление продуктом от идеи до запуска, работа с командой и стратегическое планирование",
      salary: "$4,500 - $8,000",
      demand: "Очень высокая",
      icon: Monitor,
      color: "from-blue-500 to-purple-600",
      skills: ["Стратегия", "Аналитика", "Коммуникации", "Управление"]
    },
    {
      id: 2,
      name: "UX/UI Designer",
      match: 87,
      description: "Создание удобных и красивых интерфейсов, исследование пользователей",
      salary: "$3,200 - $6,500",
      demand: "Высокая",
      icon: Palette,
      color: "from-pink-500 to-red-600",
      skills: ["Дизайн", "Исследования", "Прототипирование", "Эмпатия"]
    },
    {
      id: 3,
      name: "Data Analyst",
      match: 78,
      description: "Анализ данных для принятия бизнес-решений, создание отчетов и дашбордов",
      salary: "$2,800 - $5,500",
      demand: "Высокая",
      icon: BarChart3,
      color: "from-green-500 to-blue-600",
      skills: ["Аналитика", "SQL", "Визуализация", "Статистика"]
    },
    {
      id: 4,
      name: "Frontend Developer",
      match: 74,
      description: "Разработка пользовательских интерфейсов веб-приложений",
      salary: "$3,500 - $7,000",
      demand: "Очень высокая",
      icon: Code,
      color: "from-purple-500 to-indigo-600",
      skills: ["JavaScript", "React", "HTML/CSS", "Логика"]
    }
  ];

  // Навигация
  const goBack = () => {
    console.log('Возврат к экрану оценки');
  };

  const proceedToDetails = () => {
    console.log('Переход к детальному изучению профессий');
  };

  const learnMore = (profession) => {
    console.log(`Узнать больше о профессии: ${profession.name}`);
  };

  const showAllProfessions = () => {
    console.log('Показать все профессии');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Прогресс бар */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Результаты анализа</span>
            <span>3 из 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Заголовок */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goBack}
              className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1"></div>
          </div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Твои идеальные профессии готовы, {userName}! 🎯
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jess проанализировала твои ответы и нашла профессии, которые идеально подходят твоим способностям
          </p>
        </div>

        {/* Сильные стороны */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${
          showStrengths ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Твои сильные стороны</h2>
            <p className="text-lg text-gray-600">На основе анализа твоих ответов</p>
          </div>
          
          {/* Горизонтальный ряд карточек */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max px-4">
              {strengths.map((strength, index) => (
                <div 
                  key={strength.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 flex-shrink-0 w-64 ${
                    showStrengths ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className={`w-14 h-14 ${strength.color} rounded-xl flex items-center justify-center mb-4`}>
                    <strength.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{strength.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{strength.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Индикатор прокрутки на мобильных */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex gap-2">
              {strengths.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Профессии */}
        <div className={`transition-all duration-1000 delay-500 ${
          showProfessions ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Подходящие профессии</h2>
            <p className="text-lg text-gray-600">Отсортированы по степени соответствия</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {professions.map((profession, index) => (
              <div 
                key={profession.id}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
                  showProfessions ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                {/* Заголовок профессии */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${profession.color} rounded-2xl flex items-center justify-center`}>
                      <profession.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{profession.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-semibold">{profession.match}% соответствие</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Процент соответствия */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{profession.match}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${profession.match}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {profession.description}
                </p>

                {/* Навыки */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Ключевые навыки:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profession.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Зарплата и спрос */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Зарплата</span>
                    </div>
                    <div className="font-bold text-green-900">{profession.salary}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Спрос</span>
                    </div>
                    <div className="font-bold text-blue-900">{profession.demand}</div>
                  </div>
                </div>

                {/* Кнопка "Узнать больше" */}
                <button
                  onClick={() => learnMore(profession)}
                  className={`w-full py-3 px-6 bg-gradient-to-r ${profession.color} text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 group`}
                >
                  <Eye className="w-5 h-5" />
                  Узнать больше
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Кнопки навигации */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={showAllProfessions}
              className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              Показать все профессии
            </button>
            
            <button
              onClick={proceedToDetails}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Изучить подробнее
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Мотивирующий блок */}
          <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Отличный результат!</h3>
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Твои ответы показали высокую совместимость с топовыми IT-профессиями. 
              Следующий шаг — изучить детали и выбрать направление для развития. 
              Jess поможет составить персональный план! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingResults;