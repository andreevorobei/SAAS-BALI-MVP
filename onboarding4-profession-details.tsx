import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  TrendingUp,
  DollarSign,
  BookOpen,
  ExternalLink,
  Monitor,
  Palette,
  BarChart3,
  Code,
  Bot,
  User,
  Send,
  CheckCircle,
  Target,
  Users,
  Clock
} from 'lucide-react';

const OnboardingProfessionDetails = () => {
  // Данные пользователя
  const [userName] = useState("Андрей");
  
  // Детальные данные профессий
  const professions = [
    {
      id: 1,
      name: "Product Manager",
      match: 92,
      icon: Monitor,
      color: "from-blue-500 to-purple-600",
      description: "Product Manager отвечает за создание и развитие цифровых продуктов от идеи до запуска. Это стратегическая роль, которая требует понимания бизнеса, пользователей и технологий.",
      responsibilities: [
        "Определение стратегии и roadmap продукта",
        "Анализ пользователей и их потребностей", 
        "Работа с командой разработки и дизайна",
        "Планирование и приоритизация функций",
        "Анализ метрик и A/B тестирование"
      ],
      skills: [
        { name: "Стратегическое мышление", importance: 5, learned: false },
        { name: "Аналитические навыки", importance: 5, learned: true },
        { name: "Коммуникации", importance: 4, learned: true },
        { name: "UX/UI понимание", importance: 4, learned: false },
        { name: "Основы SQL", importance: 3, learned: false },
        { name: "Agile/Scrum", importance: 4, learned: true },
        { name: "Работа с данными", importance: 4, learned: false }
      ],
      careerPath: [
        { level: "Junior PM", salary: "$2,500 - $4,000", experience: "0-2 года", description: "Помощь senior PM, работа с небольшими фичами" },
        { level: "Product Manager", salary: "$4,000 - $6,500", experience: "2-4 года", description: "Самостоятельное управление продуктом или его частью" },
        { level: "Senior PM", salary: "$6,500 - $9,000", experience: "4-7 лет", description: "Управление крупными продуктами, менторинг junior" },
        { level: "Head of Product", salary: "$9,000+", experience: "7+ лет", description: "Стратегическое управление всей продуктовой линейкой" }
      ],
      locations: ["США", "Европа", "Израиль", "Удаленно", "Украина"],
      resources: [
        { name: "Product School", type: "Курс", url: "#" },
        { name: "The Lean Startup", type: "Книга", url: "#" },
        { name: "Mind the Product", type: "Блог", url: "#" },
        { name: "Product Hunt", type: "Сообщество", url: "#" }
      ]
    },
    {
      id: 2,
      name: "UX/UI Designer",
      match: 87,
      icon: Palette,
      color: "from-pink-500 to-red-600",
      description: "UX/UI Designer создает удобные и красивые интерфейсы, проводит исследования пользователей и проектирует пользовательский опыт для цифровых продуктов.",
      responsibilities: [
        "Исследование потребностей пользователей",
        "Создание wireframes и прототипов",
        "Дизайн пользовательских интерфейсов",
        "Проведение usability тестирования",
        "Работа с дизайн-системами"
      ],
      skills: [
        { name: "Figma/Sketch", importance: 5, learned: false },
        { name: "User Research", importance: 5, learned: false },
        { name: "Прототипирование", importance: 4, learned: false },
        { name: "Типографика", importance: 4, learned: false },
        { name: "Цветовая теория", importance: 3, learned: true },
        { name: "HTML/CSS основы", importance: 3, learned: false },
        { name: "Психология пользователей", importance: 4, learned: true }
      ],
      careerPath: [
        { level: "Junior Designer", salary: "$2,000 - $3,500", experience: "0-2 года", description: "Работа под руководством senior, простые задачи" },
        { level: "UX/UI Designer", salary: "$3,500 - $5,500", experience: "2-4 года", description: "Самостоятельная работа над проектами" },
        { level: "Senior Designer", salary: "$5,500 - $8,000", experience: "4-6 лет", description: "Ведение крупных проектов, менторинг" },
        { level: "Design Lead", salary: "$8,000+", experience: "6+ лет", description: "Управление дизайн-командой и процессами" }
      ],
      locations: ["США", "Европа", "Канада", "Удаленно", "Австралия"],
      resources: [
        { name: "Google UX Certificate", type: "Курс", url: "#" },
        { name: "Don't Make Me Think", type: "Книга", url: "#" },
        { name: "Dribbble", type: "Портфолио", url: "#" },
        { name: "UX Mastery", type: "Блог", url: "#" }
      ]
    },
    {
      id: 3,
      name: "Data Analyst",
      match: 78,
      icon: BarChart3,
      color: "from-green-500 to-blue-600",
      description: "Data Analyst работает с данными для поиска инсайтов, создания отчетов и поддержки принятия бизнес-решений. Превращает сырые данные в понятную информацию.",
      responsibilities: [
        "Сбор и очистка данных",
        "Создание SQL-запросов", 
        "Построение дашбордов и отчетов",
        "Статистический анализ данных",
        "Презентация результатов стейкхолдерам"
      ],
      skills: [
        { name: "SQL", importance: 5, learned: false },
        { name: "Excel/Google Sheets", importance: 4, learned: true },
        { name: "Python/R", importance: 4, learned: false },
        { name: "Tableau/Power BI", importance: 4, learned: false },
        { name: "Статистика", importance: 3, learned: false },
        { name: "Бизнес-понимание", importance: 4, learned: true },
        { name: "Визуализация данных", importance: 4, learned: false }
      ],
      careerPath: [
        { level: "Junior Analyst", salary: "$2,000 - $3,200", experience: "0-2 года", description: "Простые запросы, базовые отчеты" },
        { level: "Data Analyst", salary: "$3,200 - $5,000", experience: "2-4 года", description: "Сложная аналитика, самостоятельные проекты" },
        { level: "Senior Analyst", salary: "$5,000 - $7,500", experience: "4-6 лет", description: "Ведение аналитических проектов" },
        { level: "Analytics Manager", salary: "$7,500+", experience: "6+ лет", description: "Управление командой аналитиков" }
      ],
      locations: ["США", "Европа", "Удаленно", "Сингапур", "Канада"],
      resources: [
        { name: "SQL for Data Science", type: "Курс", url: "#" },
        { name: "Storytelling with Data", type: "Книга", url: "#" },
        { name: "Kaggle", type: "Практика", url: "#" },
        { name: "Mode Analytics", type: "Блог", url: "#" }
      ]
    },
    {
      id: 4,
      name: "Frontend Developer",
      match: 74,
      icon: Code,
      color: "from-purple-500 to-indigo-600",
      description: "Frontend Developer создает пользовательские интерфейсы веб-приложений, превращая дизайн в функциональный код. Работает с современными технологиями и фреймворками.",
      responsibilities: [
        "Разработка пользовательских интерфейсов",
        "Интеграция с backend API",
        "Оптимизация производительности",
        "Тестирование кроссбраузерности",
        "Поддержка и рефакторинг кода"
      ],
      skills: [
        { name: "JavaScript", importance: 5, learned: false },
        { name: "React/Vue/Angular", importance: 5, learned: false },
        { name: "HTML/CSS", importance: 4, learned: true },
        { name: "TypeScript", importance: 4, learned: false },
        { name: "Git", importance: 3, learned: false },
        { name: "REST API", importance: 4, learned: false },
        { name: "Responsive Design", importance: 4, learned: true }
      ],
      careerPath: [
        { level: "Junior Developer", salary: "$2,200 - $3,800", experience: "0-2 года", description: "Простые компоненты под руководством" },
        { level: "Frontend Developer", salary: "$3,800 - $6,000", experience: "2-4 года", description: "Самостоятельная разработка фич" },
        { level: "Senior Developer", salary: "$6,000 - $9,000", experience: "4-6 лет", description: "Архитектурные решения, менторинг" },
        { level: "Tech Lead", salary: "$9,000+", experience: "6+ лет", description: "Техническое лидерство команды" }
      ],
      locations: ["США", "Европа", "Удаленно", "Канада", "Израиль"],
      resources: [
        { name: "FreeCodeCamp", type: "Курс", url: "#" },
        { name: "You Don't Know JS", type: "Книга", url: "#" },
        { name: "JavaScript.info", type: "Учебник", url: "#" },
        { name: "CSS-Tricks", type: "Блог", url: "#" }
      ]
    }
  ];

  // Состояние
  const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const currentProfession = professions[currentProfessionIndex];

  // Инициализация чата
  useEffect(() => {
    setChatMessages([
      {
        id: 1,
        type: 'ai',
        content: `Привет, ${userName}! Готов обсудить профессию "${currentProfession.name}"? Задавай любые вопросы! 🤖`,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentProfessionIndex, userName]);

  // Скролл чата
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Навигация между профессиями
  const goToPrevious = () => {
    if (currentProfessionIndex > 0) {
      setCurrentProfessionIndex(currentProfessionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentProfessionIndex < professions.length - 1) {
      setCurrentProfessionIndex(currentProfessionIndex + 1);
    }
  };

  const selectProfession = (index) => {
    setCurrentProfessionIndex(index);
  };

  // Чат с ИИ
  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Симуляция ответа ИИ
    setTimeout(() => {
      let aiResponse = '';
      
      if (inputMessage.toLowerCase().includes('зарплат')) {
        aiResponse = `По профессии ${currentProfession.name} зарплаты зависят от опыта:\n\n${currentProfession.careerPath.map(level => `${level.level}: ${level.salary}`).join('\n')}\n\nВ США и Европе зарплаты обычно выше на 30-50%. Удаленная работа тоже хорошо оплачивается!`;
      } else if (inputMessage.toLowerCase().includes('навык') || inputMessage.toLowerCase().includes('изуч')) {
        aiResponse = `Для ${currentProfession.name} я рекомендую начать с самых важных навыков:\n\n${currentProfession.skills.filter(s => s.importance >= 4).map(s => `• ${s.name} (важность: ${s.importance}/5)`).join('\n')}\n\nЭти навыки дадут тебе хорошую базу для старта!`;
      } else if (inputMessage.toLowerCase().includes('трудн') || inputMessage.toLowerCase().includes('сложн')) {
        aiResponse = `${currentProfession.name} - это интересная профессия! Основные вызовы:\n\n• Нужно постоянно изучать новое\n• Важно уметь работать в команде\n• Требуется понимание бизнеса\n\nНо твои сильные стороны (${currentProfession.match}% соответствие) говорят, что ты справишься! 💪`;
      } else {
        aiResponse = `Отличный вопрос о ${currentProfession.name}! Эта профессия подходит тебе на ${currentProfession.match}%.\n\nОсновные плюсы:\n• Высокий спрос на рынке\n• Хорошие зарплаты\n• Возможность удаленной работы\n• Творческие задачи\n\nЧто еще интересует?`;
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

  // Основные действия
  const chooseProfession = () => {
    console.log(`Выбрана профессия: ${currentProfession.name}`);
    // Переход к экрану создания плана
  };

  const seeOtherOptions = () => {
    console.log('Возврат к списку профессий');
    // Возврат к экрану результатов
  };

  const goBack = () => {
    console.log('Возврат к результатам');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Прогресс бар */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Изучение профессий</span>
            <span>4 из 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '80%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Заголовок с навигацией */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goBack}
            className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Изучаем профессии детально</h1>
            <p className="text-gray-600">Выбери профессию для подробного изучения</p>
          </div>
          
          <div className="w-12"></div>
        </div>

        {/* Табы профессий */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2">
              {professions.map((profession, index) => (
                <button
                  key={profession.id}
                  onClick={() => selectProfession(index)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                    index === currentProfessionIndex
                      ? `bg-gradient-to-r ${profession.color} text-white shadow-md`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <profession.icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{profession.name}</span>
                  {index === currentProfessionIndex && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {profession.match}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Основной контент - grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Левая колонка - детальная информация */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Заголовок профессии */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${currentProfession.color} rounded-2xl flex items-center justify-center`}>
                    <currentProfession.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{currentProfession.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-green-600 font-semibold">{currentProfession.match}% соответствие</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">Для тебя, {userName}</span>
                    </div>
                  </div>
                </div>
                
                {/* Навигация стрелками */}
                <div className="flex gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentProfessionIndex === 0}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentProfessionIndex === professions.length - 1}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{currentProfession.description}</p>
            </div>

            {/* Обязанности */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Основные обязанности
              </h3>
              <div className="space-y-3">
                {currentProfession.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{responsibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Навыки */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Необходимые навыки</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProfession.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${skill.learned ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < skill.importance ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карьерный путь */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Карьерный путь
              </h3>
              <div className="space-y-4">
                {currentProfession.careerPath.map((level, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-bold text-gray-900">{level.level}</h4>
                        <span className="text-green-600 font-semibold">{level.salary}</span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {level.experience}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{level.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Локации и ресурсы */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Локации */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Востребованные регионы
                </h3>
                <div className="space-y-2">
                  {currentProfession.locations.map((location, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {location}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ресурсы */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Ресурсы для изучения
                </h3>
                <div className="space-y-3">
                  {currentProfession.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{resource.name}</div>
                        <div className="text-sm text-gray-500">{resource.type}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={chooseProfession}
                className={`flex-1 py-4 px-6 bg-gradient-to-r ${currentProfession.color} text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                <CheckCircle className="w-5 h-5" />
                Выбрать эту профессию
              </button>
              
              <button
                onClick={seeOtherOptions}
                className="flex-1 py-4 px-6 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Посмотреть другие варианты
              </button>
            </div>
          </div>

          {/* Правая колонка - чат с ИИ */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col h-fit lg:sticky lg:top-8">
            {/* Заголовок чата */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Jess</h3>
                  <p className="text-sm text-gray-500">Твой ИИ-консультант</p>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 p-6 max-h-96 overflow-y-auto space-y-4">
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
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Спроси о профессии..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Быстрые вопросы */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setInputMessage("Какая зарплата?")}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Зарплата
                </button>
                <button
                  onClick={() => setInputMessage("Сложно ли изучить?")}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Сложность
                </button>
                <button
                  onClick={() => setInputMessage("Какие навыки важнее?")}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Навыки
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingProfessionDetails;