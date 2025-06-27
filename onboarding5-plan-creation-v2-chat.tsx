import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Rocket,
  CheckCircle,
  Target,
  Monitor,
  Calendar,
  Users,
  Code,
  TrendingUp,
  Star,
  Settings,
  Play,
  Sparkles,
  Brain,
  Heart,
  Zap,
  Shield,
  Award,
  BookOpen,
  MessageCircle,
  Briefcase,
  Clock,
  Bot,
  User,
  Send,
  History
} from 'lucide-react';

const OnboardingPlanCreation = () => {
  // Данные пользователя (из предыдущих экранов)
  const [userName] = useState("Андрей");
  const [userGoal] = useState("Стать топовым Product Manager и найти работу в американском стартапе с зп от 5000$ в месяц");
  
  // Выбранная профессия (из предыдущего экрана)
  const [selectedProfession] = useState({
    name: "Product Manager",
    match: 92,
    icon: Monitor,
    color: "from-blue-500 to-purple-600"
  });

  // Сильные стороны пользователя
  const [userStrengths] = useState([
    { name: "Стратегическое мышление", icon: Brain },
    { name: "Работа с людьми", icon: Heart },
    { name: "Быстрое обучение", icon: Zap },
    { name: "Решение проблем", icon: Shield }
  ]);

  // Состояние для анимаций и модификаций плана
  const [isVisible, setIsVisible] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [planModifications, setPlanModifications] = useState([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Состояние для чата с Jess
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Базовый план развития
  const [developmentPlan, setDevelopmentPlan] = useState([
    {
      id: 1,
      title: "Обновить профиль LinkedIn",
      description: "Создать профессиональный профиль с акцентом на Product Management",
      duration: "1 неделя",
      priority: "high",
      tasks: [
        "Написать цепляющий заголовок",
        "Обновить описание опыта работы", 
        "Добавить ключевые навыки PM",
        "Загрузить профессиональное фото"
      ],
      category: "personal_brand"
    },
    {
      id: 2,
      title: "Изучить основы Product Management",
      description: "Освоить ключевые навыки и инструменты Product Manager",
      duration: "2 месяца",
      priority: "high",
      tasks: [
        "Пройти курс 'Product Management Fundamentals'",
        "Изучить методологии RICE, ICE, Kano",
        "Освоить основы SQL для работы с данными",
        "Понять основы UX/UI дизайна"
      ],
      category: "skills"
    },
    {
      id: 3,
      title: "Создать пет-проект",
      description: "Разработать собственный продукт для демонстрации навыков",
      duration: "1.5 месяца",
      priority: "medium",
      tasks: [
        "Выбрать идею для мобильного приложения",
        "Провести пользовательские интервью",
        "Создать MVP с командой разработчиков",
        "Запустить и проанализировать метрики"
      ],
      category: "experience"
    },
    {
      id: 4,
      title: "Подать заявки в стартапы",
      description: "Найти и получить работу Product Manager в американском стартапе",
      duration: "2 месяца",
      priority: "high",
      tasks: [
        "Найти 50 подходящих вакансий",
        "Персонализировать резюме и cover letter",
        "Подготовиться к case interview",
        "Пройти собеседования и получить оффер"
      ],
      category: "job_search"
    }
  ]);

  // Опции корректировки плана
  const modificationOptions = [
    {
      id: "technical",
      title: "Больше фокуса на техническом развитии",
      description: "Добавить изучение SQL, API, основ программирования",
      icon: Code,
      modifications: ["Углубленное изучение SQL", "Основы Python для аналитики", "Понимание REST API"]
    },
    {
      id: "networking",
      title: "Добавить больше нетворкинга",
      description: "Включить активности для построения профессиональных связей",
      icon: Users,
      modifications: ["Участие в Product meetups", "Менторство от senior PM", "Активность в PM сообществах"]
    },
    {
      id: "job_search",
      title: "Ускорить поиск работы",
      description: "Интенсифицировать процесс поиска и подачи заявок",
      icon: Briefcase,
      modifications: ["Ежедневная подача заявок", "Работа с рекрутерами", "Подготовка к интервью"]
    }
  ];

  // Анимации
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowPlan(true), 1000);
    
    // Инициализация чата
    setChatMessages([
      {
        id: 1,
        type: 'ai',
        content: `Привет, ${userName}! Поздравляю с завершением планирования! 🎉\n\nГотов обсудить твой план развития? Могу ответить на любые вопросы о профессии ${selectedProfession.name} или помочь с корректировкой плана.`,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Скролл чата
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Функции для модификации плана
  const toggleModification = (optionId) => {
    if (planModifications.includes(optionId)) {
      setPlanModifications(prev => prev.filter(id => id !== optionId));
    } else {
      setPlanModifications(prev => [...prev, optionId]);
    }
  };

  const regeneratePlan = () => {
    setIsGeneratingPlan(true);
    
    // Имитация генерации плана
    setTimeout(() => {
      // Здесь будет логика обновления плана на основе выбранных модификаций
      console.log('План обновлен с модификациями:', planModifications);
      setIsGeneratingPlan(false);
    }, 2000);
  };

  const startJourney = () => {
    console.log('Начало путешествия!', {
      user: userName,
      profession: selectedProfession.name,
      goal: userGoal,
      plan: developmentPlan,
      modifications: planModifications
    });
    // Здесь будет переход к главному дашборду
  };

  const goBack = () => {
    console.log('Возврат к изучению профессий');
  };

  // Функция отправки сообщения в чат
  const sendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Симуляция ответа ИИ
    setTimeout(() => {
      let aiResponse = '';
      
      if (message.toLowerCase().includes('план') || message.toLowerCase().includes('этап')) {
        aiResponse = `Твой план отлично структурирован! 4 этапа логично ведут к цели:\n\n1️⃣ LinkedIn (1 неделя) - создание бренда\n2️⃣ Обучение PM (2 месяца) - навыки\n3️⃣ Пет-проект (1.5 месяца) - опыт\n4️⃣ Поиск работы (2 месяца) - результат\n\nХочешь что-то скорректировать?`;
      } else if (message.toLowerCase().includes('сложн') || message.toLowerCase().includes('трудн')) {
        aiResponse = `Понимаю твои сомнения! Путь к ${selectedProfession.name} требует усилий, но ты готов:\n\n✅ ${selectedProfession.match}% соответствие твоим способностям\n✅ Структурированный план\n✅ Поддержка Jess 24/7\n\nГлавное - последовательность. Начни с LinkedIn, остальное пойдет легче!`;
      } else if (message.toLowerCase().includes('время') || message.toLowerCase().includes('долго')) {
        aiResponse = `По времени план реалистичный:\n\n⏱️ Общий срок: ~5.5 месяцев\n⏱️ Параллельные задачи: обучение + проект\n⏱️ Можно ускорить: добавь модификацию "Ускорить поиск работы"\n\nДля карьерного перехода это нормальный темп. Качество важнее скорости!`;
      } else if (message.toLowerCase().includes('модифик') || message.toLowerCase().includes('измен')) {
        aiResponse = `Отличная идея корректировать план! Рекомендую:\n\n🔧 **Техническое развитие** - если хочешь глубже в аналитику\n👥 **Нетворкинг** - для связей в индустрии\n💼 **Ускорение поиска** - если готов интенсивно искать\n\nВыбери нужные модификации выше и нажми "Обновить план"`;
      } else {
        aiResponse = `Отлично, что задаешь вопросы! План к ${selectedProfession.name} персонализирован под тебя.\n\nОсновные преимущества:\n• Твои сильные стороны учтены\n• Пошаговая структура\n• Конкретные временные рамки\n• Возможность корректировки\n\nЧто еще интересует о плане развития?`;
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'personal_brand': return Users;
      case 'skills': return BookOpen;
      case 'experience': return Star;
      case 'job_search': return Briefcase;
      default: return Target;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Прогресс бар */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Создание плана</span>
            <span>5 из 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Основной контент с чатом */}
      <div className="grid grid-cols-12 h-screen">
        
        {/* Левая колонка - основной контент (2/3) */}
        <div className="col-span-8 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Заголовок */}
            <div className={`text-center transition-all duration-1000 ${
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
              
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Создаем твой персональный план, {userName}! 🚀
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                На основе твоих ответов и выбранной профессии Jess составила план достижения цели
              </p>
            </div>

        {/* Резюме выбора */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Резюме твоего выбора</h2>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              
              {/* Выбранная профессия */}
              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedProfession.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <selectedProfession.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Выбранная профессия</h3>
                <p className="text-gray-600">{selectedProfession.name}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-semibold">{selectedProfession.match}% соответствие</span>
                </div>
              </div>

              {/* Сильные стороны */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Твои сильные стороны</h3>
                <div className="space-y-1">
                  {userStrengths.map((strength, index) => (
                    <div key={index} className="flex items-center justify-center gap-2 text-gray-600">
                      <strength.icon className="w-4 h-4" />
                      <span className="text-sm">{strength.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Цель */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Твоя цель</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{userGoal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* План развития */}
        <div className={`transition-all duration-1000 delay-500 ${
          showPlan ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Твой персональный план развития</h2>
            <p className="text-lg text-gray-600">4 ключевых этапа для достижения цели</p>
          </div>

          <div className="space-y-6">
            {developmentPlan.map((milestone, index) => {
              const CategoryIcon = getCategoryIcon(milestone.category);
              return (
                <div 
                  key={milestone.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-xl ${
                    showPlan ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <div className="flex items-start gap-6">
                    
                    {/* Номер этапа */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Основная информация */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 mb-3">{milestone.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-600">{milestone.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CategoryIcon className="w-4 h-4 text-purple-500" />
                              <span className="text-gray-600 capitalize">{milestone.category.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(milestone.priority)}`}>
                          {milestone.priority === 'high' ? 'Высокий приоритет' : 
                           milestone.priority === 'medium' ? 'Средний приоритет' : 'Низкий приоритет'}
                        </div>
                      </div>

                      {/* Задачи */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Ключевые задачи:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {milestone.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Опции корректировки */}
        <div className={`transition-all duration-1000 delay-700 ${
          showPlan ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                Хочешь скорректировать план?
              </h2>
              <p className="text-gray-600">Выбери дополнительные фокусы для персонализации</p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              {modificationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleModification(option.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    planModifications.includes(option.id)
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      planModifications.includes(option.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                      
                      {planModifications.includes(option.id) && (
                        <div className="space-y-1">
                          {option.modifications.map((mod, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-blue-700">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {mod}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {planModifications.includes(option.id) && (
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {planModifications.length > 0 && (
              <div className="text-center">
                <button
                  onClick={regeneratePlan}
                  disabled={isGeneratingPlan}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  {isGeneratingPlan ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Обновляем план...
                    </>
                  ) : (
                    <>
                      <Settings className="w-4 h-4" />
                      Обновить план
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Финальная кнопка */}
        <div className={`transition-all duration-1000 delay-900 ${
          showPlan ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Готов начать свое путешествие?</h2>
              <p className="text-gray-600 mb-8">
                Твой персональный план развития готов! Jess будет сопровождать тебя на каждом этапе, 
                предлагать задания и отслеживать прогресс к цели.
              </p>
              
              <button
                onClick={startJourney}
                className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="w-6 h-6" />
                Начать путешествие!
                <Rocket className="w-6 h-6" />
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-emerald-500" />
                  Персональный план
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  Поддержка Jess 24/7
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  Отслеживание прогресса
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        </div>

        {/* Правая колонка - Чат с Jess (1/3) */}
        <div className="col-span-4 border-l border-gray-200">
          <div className="bg-white h-full flex flex-col">
            {/* Заголовок чата */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Jess - ИИ Наставник</h3>
                  <p className="text-sm text-gray-500">Готов обсудить план развития</p>
                </div>
              </div>
            </div>

            {/* История сообщений */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage(inputMessage);
                    }
                  }}
                  placeholder="Обсудить план с Jess..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Быстрые вопросы */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => sendMessage("Сложно ли будет выполнить план?")}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Сложность плана
                </button>
                <button
                  onClick={() => sendMessage("Сколько времени займет весь план?")}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Время выполнения
                </button>
                <button
                  onClick={() => sendMessage("Какие модификации лучше выбрать?")}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Модификации
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnboardingPlanCreation;