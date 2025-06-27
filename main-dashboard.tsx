import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Circle, 
  Target, 
  Trophy, 
  Calendar,
  User,
  BarChart3,
  BookOpen,
  Settings,
  Bell,
  Check,
  ChevronRight,
  Bot,
  History,
  Send,
  X
} from 'lucide-react';

const MainDashboard = () => {
  // Данные пользователя (обычно приходят из API/контекста)
  const [userData] = useState({
    name: "Андрей",
    profession: "Product Manager",
    goal: "Стать топовым Product Manager и найти работу в американском стартапе\nс зп от 5000$ в месяц",
    overallProgress: 42 // общий прогресс к цели
  });

  // Состояние для активного чекпоинта
  const [activeCheckpoint, setActiveCheckpoint] = useState(2); // Начинаем со второго чекпоинта (первый milestone)
  const scrollContainerRef = useRef(null);
  const checkpointRefs = useRef({});

  // Состояние для боковой панели чата
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [panelWidth, setPanelWidth] = useState(() => {
    // 60% от ширины экрана, но не менее 320px и не более 800px
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      const targetWidth = Math.floor(screenWidth * 0.6);
      return Math.max(320, Math.min(800, targetWidth));
    }
    return 600; // fallback для серверного рендеринга
  });
  const messagesEndRef = useRef(null);
  
  // Для отслеживания перетаскивания
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);
  
  // Состояние для активной вкладки
  const [activeTab, setActiveTab] = useState('main'); // 'main' или 'chat'

  // Навыки пользователя
  const [skills] = useState([
    {
      id: 1,
      name: "Приоритизация",
      progress: 36,
      subtopics: ["RICE", "ICE", "Kano", "Матрица Эйзенхауэра"],
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Аналитика",
      progress: 68,
      subtopics: ["SQL", "Google Analytics", "A/B тестирование", "Метрики"],
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "UX/UI дизайн",
      progress: 23,
      subtopics: ["Wireframing", "Prototyping", "User Research", "Figma"],
      color: "bg-orange-500"
    },
    {
      id: 4,
      name: "Управление командой",
      progress: 51,
      subtopics: ["Agile", "Scrum", "Лидерство", "Коммуникации"],
      color: "bg-purple-500"
    },
    {
      id: 5,
      name: "Техническая грамотность",
      progress: 29,
      subtopics: ["API", "Базы данных", "Git", "Основы программирования"],
      color: "bg-red-500"
    },
    {
      id: 6,
      name: "Бизнес стратегия",
      progress: 15,
      subtopics: ["Unit Economics", "Go-to-Market", "Конкурентный анализ", "OKR"],
      color: "bg-indigo-500"
    }
  ]);

  // План развития с чекпоинтами
  const [developmentPlan, setPlan] = useState([
    {
      id: 1,
      title: "Старт",
      type: "start",
      completed: true,
      tasks: []
    },
    {
      id: 2,
      title: "Обновить профиль LinkedIn",
      type: "milestone",
      completed: false,
      progress: 30,
      tasks: [
        { id: 21, text: "Написать новый заголовок профиля", completed: true },
        { id: 22, text: "Обновить описание опыта работы", completed: false },
        { id: 23, text: "Добавить ключевые навыки", completed: false },
        { id: 24, text: "Загрузить профессиональное фото", completed: false }
      ]
    },
    {
      id: 3,
      title: "Сделать профессиональное резюме",
      type: "milestone",
      completed: false,
      progress: 0,
      tasks: [
        { id: 31, text: "Прислать сюда свое текущее резюме", completed: false },
        { id: 32, text: "Сгенерировать обновленный текст резюме", completed: false },
        { id: 33, text: "Оформить резюме в профессиональном дизайне", completed: false },
        { id: 34, text: "Получить обратную связь от ментора", completed: false }
      ]
    },
    {
      id: 4,
      title: "Подать 20 заявок на LinkedIn",
      type: "milestone",
      completed: false,
      progress: 0,
      tasks: [
        { id: 41, text: "Найти 20 подходящих вакансий", completed: false },
        { id: 42, text: "Персонализировать сопроводительные письма", completed: false },
        { id: 43, text: "Отправить заявки", completed: false },
        { id: 44, text: "Отследить ответы", completed: false }
      ]
    },
    {
      id: 5,
      title: "Найдена работа в американском стартапе\nс зарплатой от 5000$ в месяц",
      type: "goal",
      completed: false,
      tasks: []
    }
  ]);

  const toggleTask = (milestoneId, taskId) => {
    setPlan(prevPlan => 
      prevPlan.map(milestone => 
        milestone.id === milestoneId 
          ? {
              ...milestone,
              tasks: milestone.tasks.map(task => 
                task.id === taskId 
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : milestone
      )
    );
  };

  // Функция для скролла к определенному чекпоинту
  const scrollToCheckpoint = (checkpointId) => {
    const checkpointElement = checkpointRefs.current[checkpointId];
    if (checkpointElement && scrollContainerRef.current) {
      checkpointElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  };

  // Функция завершения чекпоинта
  const completeCheckpoint = (checkpointId) => {
    // Отмечаем чекпоинт как завершенный
    setPlan(prevPlan => 
      prevPlan.map(milestone => 
        milestone.id === checkpointId 
          ? { ...milestone, completed: true, progress: 100 }
          : milestone
      )
    );

    // Находим следующий незавершенный чекпоинт
    const nextCheckpoint = developmentPlan.find(milestone => 
      milestone.id > checkpointId && 
      milestone.type === 'milestone' && 
      !milestone.completed
    );

    if (nextCheckpoint) {
      setActiveCheckpoint(nextCheckpoint.id);
      setTimeout(() => scrollToCheckpoint(nextCheckpoint.id), 100);
    }
  };

  // Автоматический скролл к активному чекпоинту при загрузке
  useEffect(() => {
    // Находим первый незавершенный чекпоинт
    const firstIncompleteMilestone = developmentPlan.find(
      milestone => milestone.type === 'milestone' && !milestone.completed
    );
    if (firstIncompleteMilestone && firstIncompleteMilestone.id !== activeCheckpoint) {
      setActiveCheckpoint(firstIncompleteMilestone.id);
    }
    
    setTimeout(() => scrollToCheckpoint(activeCheckpoint), 500);
  }, [activeCheckpoint]);

  // Функция для открытия чата с задачей
  const openTaskChat = (task, milestone) => {
    setSelectedTask({ ...task, milestoneName: milestone.title });
    setChatMessages([
      {
        id: 1,
        type: 'ai',
        content: `С чем нужна помощь по "${task.text}", Андрей?`,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        showStepByStepButton: true
      }
    ]);
    setIsChatOpen(true);
    setActiveTab('chat');
  };

  // Функция отправки сообщения в чат
  const sendMessage = async (message) => {
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
      let aiContent = '';
      
      if (message === 'Дай пошаговый план что нужно делать') {
        aiContent = `Отлично! Вот пошаговый план для задачи "${selectedTask?.text}":

**Шаг 1:** Определите цели и требования
- Четко сформулируйте что именно нужно достичь
- Запишите все важные критерии

**Шаг 2:** Соберите необходимую информацию  
- Изучите лучшие практики в этой области
- Посмотрите примеры успешного выполнения

**Шаг 3:** Составьте конкретный план действий
- Разбейте задачу на маленькие шаги
- Установите временные рамки

**Шаг 4:** Начните выполнение
- Начните с самых важных элементов
- Регулярно проверяйте прогресс

**Шаг 5:** Получите обратную связь
- Покажите результат коллегам или экспертам
- Внесите необходимые корректировки

Какой шаг вызывает у вас вопросы?`;
      } else if (selectedTask) {
        // Ответ для чата по конкретной задаче
        aiContent = `Понимаю! По задаче "${selectedTask.text}" могу предложить следующие рекомендации:

Сначала определитесь с основными требованиями к результату. Затем составьте план действий и начните с самых важных элементов.

Есть конкретные вопросы по выполнению этой задачи?`;
      } else {
        // Ответ для общего чата
        aiContent = `Отлично! Вижу, что ты активно работаешь над своей карьерой ${userData.profession}. 

Могу помочь с:
• Анализом твоего прогресса по плану развития
• Советами по развитию конкретных навыков
• Стратегиями поиска работы
• Подготовкой к собеседованиям
• Улучшением профиля в LinkedIn

Что интересует больше всего прямо сейчас?`;
      }

      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Функция для быстрого запроса пошагового плана
  const requestStepByStep = () => {
    sendMessage('Дай пошаговый план что нужно делать');
  };

  // Функция для открытия общего чата с Jess
  const openGeneralChat = () => {
    setSelectedTask(null);
    setChatMessages([
      {
        id: 1,
        type: 'ai',
        content: `Привет, ${userData.name}! Я Jess, твой ИИ-наставник по карьерному развитию. Готов помочь тебе стать топовым ${userData.profession}! 

С чем начнем работу сегодня?`,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsChatOpen(true);
    setActiveTab('chat');
  };

  // Обработчик смены вкладок
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'chat') {
      openGeneralChat();
    } else if (tab === 'main') {
      setIsChatOpen(false);
    }
  };

  // Скролл к концу чата
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Обработчики для изменения размера панели
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = panelWidth;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    const deltaX = dragStartX.current - e.clientX;
    const newWidth = Math.max(320, Math.min(800, dragStartWidth.current + deltaX));
    setPanelWidth(newWidth);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Очистка обработчиков при размонтировании
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  const handleSkillNavigation = (skillId) => {
    console.log(`Переход к навыку ${skillId}`);
    // Здесь будет навигация к экрану тренировки навыка
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{userData.name[0]}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {getGreeting()}, {userData.name}!
                </h1>
                <p className="text-sm text-gray-600">{userData.profession}</p>
              </div>
            </div>
          </div>
          
          {/* Навигационные вкладки */}
          <div className="flex items-center">
            <button
              onClick={() => handleTabChange('main')}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'main'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏠 Главная
            </button>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <button
              onClick={() => handleTabChange('chat')}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🤖 Чат с Jess (ИИ)
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* План развития */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Персональный план развития</h2>
          
          {/* Горизонтальная линия плана */}
          <div className="relative bg-white rounded-xl p-6 border border-gray-200">
            {/* Прогресс план общий */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Прогресс плана развития</span>
                <span className="text-sm font-bold text-blue-600">{userData.overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${userData.overallProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Горизонтальный план */}
            <div className="flex">
              {/* Скроллируемая часть плана */}
              <div className="flex-1 overflow-x-auto" ref={scrollContainerRef}>
                <div className="flex items-start gap-8 min-w-max pb-4 pr-8 pt-8">
                  {developmentPlan.slice(0, -1).map((milestone, index) => (
                    <div key={milestone.id} className="flex items-start">
                      {/* Чекпоинт */}
                      <div 
                        ref={el => checkpointRefs.current[milestone.id] = el}
                        className={`flex flex-col items-center min-w-72 py-4 transition-all duration-300 ${
                          activeCheckpoint === milestone.id 
                            ? 'transform scale-105' 
                            : milestone.completed 
                            ? 'opacity-75' 
                            : 'opacity-90'
                        }`}
                      >
                        {/* Иконка чекпоинта */}
                        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                          milestone.type === 'start' 
                            ? 'bg-green-500 border-green-200' 
                            : milestone.completed 
                            ? 'bg-green-500 border-green-200' 
                            : activeCheckpoint === milestone.id
                            ? 'bg-blue-500 border-blue-300 shadow-lg ring-4 ring-blue-100'
                            : 'bg-white border-blue-200'
                        }`}>
                          {milestone.type === 'start' && (
                            <User className="w-6 h-6 text-white" />
                          )}
                          {milestone.type === 'milestone' && (
                            <div className={`w-4 h-4 rounded-full ${
                              milestone.completed ? 'bg-white' : 'bg-white'
                            }`}></div>
                          )}
                        </div>

                        {/* Активный индикатор */}
                        {activeCheckpoint === milestone.id && (
                          <div className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                            Текущий этап
                          </div>
                        )}

                        {/* Название чекпоинта */}
                        <div className="mt-4 text-center">
                          <h3 className={`text-sm font-semibold ${
                            activeCheckpoint === milestone.id 
                              ? 'text-blue-700' 
                              : milestone.completed 
                              ? 'text-green-700' 
                              : 'text-gray-900'
                          }`}>
                            {milestone.title}
                          </h3>
                          
                          {/* Прогресс чекпоинта */}
                          {milestone.type === 'milestone' && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">
                                {milestone.progress}% выполнено
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div 
                                  className={`h-1 rounded-full transition-all duration-300 ${
                                    milestone.completed 
                                      ? 'bg-green-500' 
                                      : activeCheckpoint === milestone.id 
                                      ? 'bg-blue-500' 
                                      : 'bg-blue-400'
                                  }`}
                                  style={{ width: `${milestone.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Задачи */}
                        {milestone.tasks.length > 0 && (
                          <div className="mt-4 w-full">
                            <div className={`rounded-lg p-3 space-y-2 transition-all duration-300 ${
                              activeCheckpoint === milestone.id 
                                ? 'bg-blue-50 border border-blue-200' 
                                : 'bg-gray-50'
                            }`}>
                              {milestone.tasks.map((task) => (
                                <div key={task.id} className="flex items-start gap-2">
                                  <button
                                    onClick={() => toggleTask(milestone.id, task.id)}
                                    className="mt-0.5 flex-shrink-0"
                                  >
                                    {task.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-gray-400" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => openTaskChat(task, milestone)}
                                    className={`flex-1 text-left flex items-center justify-between group hover:bg-blue-50 rounded px-2 py-1 transition-colors ${
                                      task.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                                    }`}
                                  >
                                    <span className="text-xs">
                                      {task.text}
                                    </span>
                                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                                  </button>
                                </div>
                              ))}
                              
                              {/* Кнопка "Выполнено" */}
                              {milestone.type === 'milestone' && !milestone.completed && (
                                <div className="pt-3 border-t border-gray-200">
                                  <button
                                    onClick={() => completeCheckpoint(milestone.id)}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                      activeCheckpoint === milestone.id
                                        ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                                  >
                                    <Check className="w-4 h-4" />
                                    Выполнено
                                  </button>
                                </div>
                              )}

                              {/* Индикатор завершения */}
                              {milestone.completed && (
                                <div className="pt-3 border-t border-green-200">
                                  <div className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" />
                                    Завершено
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Стрелка между чекпоинтами */}
                      {index < developmentPlan.slice(0, -1).length - 1 && (
                        <div className="flex items-center mt-6 mx-4">
                          <ArrowRight className={`w-6 h-6 transition-colors duration-300 ${
                            milestone.completed ? 'text-green-400' : 'text-gray-400'
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Финальная стрелка к цели */}
                  <div className="flex items-center mt-6 mx-4">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Зафиксированная цель справа */}
              <div className="flex-shrink-0 pl-4 border-l-2 border-dashed border-gray-200">
                <div className="flex flex-col items-center min-w-48">
                  {/* Иконка цели */}
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center border-4 bg-gradient-to-r from-yellow-400 to-yellow-600 border-yellow-200 shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>

                  {/* Название цели */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium mb-2">
                      <Target className="w-3 h-3" />
                      ВАША ЦЕЛЬ
                    </div>
                    <h3 className="text-sm font-bold text-yellow-700 leading-tight whitespace-pre-line">
                      {developmentPlan[developmentPlan.length - 1].title}
                    </h3>
                    
                    {/* Мотивирующий элемент */}
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-xs text-yellow-700 font-medium">
                        🎯 Вы на пути к успеху!
                      </div>
                      <div className="text-xs text-yellow-600 mt-1">
                        {userData.overallProgress}% от цели достигнуто
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Навыки */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваши навыки</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {skills.map((skill) => (
                <div key={skill.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all flex-shrink-0 w-80">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                  </div>
                  
                  {/* Прогресс навыка */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Владение навыком</span>
                      <span className="text-sm font-bold text-gray-900">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${skill.color}`}
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Подтемы */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Подтемы:</p>
                    <div className="flex flex-wrap gap-1">
                      {skill.subtopics.map((subtopic, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {subtopic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Кнопка перехода */}
                  <button
                    onClick={() => handleSkillNavigation(skill.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    <BookOpen className="w-4 h-4" />
                    Перейти к навыку
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Средний прогресс навыков</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Выполненных задач</h3>
                <p className="text-2xl font-bold text-green-600">
                  {developmentPlan.reduce((acc, milestone) => 
                    acc + milestone.tasks.filter(task => task.completed).length, 0
                  )} / {developmentPlan.reduce((acc, milestone) => acc + milestone.tasks.length, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Дней в плане</h3>
                <p className="text-2xl font-bold text-orange-600">127</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Боковая панель чата */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => {
              setIsChatOpen(false);
              setActiveTab('main');
            }}
          ></div>
          
          {/* Боковая панель */}
          <div 
            className="bg-white shadow-xl flex flex-col relative"
            style={{ width: `${panelWidth}px` }}
          >
            {/* Ресайзер */}
            <div
              className="absolute left-0 top-0 w-1 h-full bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-400 hover:bg-blue-600 rounded-r transition-colors">
                <div className="flex flex-col justify-center items-center h-full space-y-0.5">
                  <div className="w-0.5 h-1 bg-white rounded"></div>
                  <div className="w-0.5 h-1 bg-white rounded"></div>
                  <div className="w-0.5 h-1 bg-white rounded"></div>
                </div>
              </div>
            </div>
            {/* Заголовок чата */}
            <div className="bg-white border-b border-gray-200 p-4 pl-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Jess - ИИ Наставник</h3>
                  <p className="text-sm text-gray-500">
                    {selectedTask ? selectedTask.milestoneName : 'Общий чат по карьерному развитию'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    setActiveTab('main');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* История сообщений */}
            <div className="flex-1 overflow-y-auto p-4 pl-6 space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`${message.type === 'user' ? 'max-w-xs' : 'max-w-sm'} ${message.type === 'user' ? '' : 'space-y-3'}`}>
                    <div className={`px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </div>
                    </div>
                    
                    {/* Кнопка пошагового плана */}
                    {message.showStepByStepButton && (
                      <button
                        onClick={requestStepByStep}
                        className="w-full px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        📋 Дай пошаговый план что нужно делать
                      </button>
                    )}
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
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
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
            <div className="bg-white border-t border-gray-200 p-4 pl-6">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(inputMessage);
                      }
                    }}
                    placeholder={selectedTask ? "Задайте вопрос о задаче..." : "Спросите о карьерном развитии..."}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="2"
                  />
                </div>
                <button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainDashboard;