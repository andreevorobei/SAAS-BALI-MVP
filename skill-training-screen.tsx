import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, CheckCircle, User, Bot, History, ArrowLeft, Search, Filter } from 'lucide-react';

const SkillTrainingScreen = () => {
  // Данные навыка (обычно приходят из API/базы данных)
  const [skillData] = useState({
    name: "Приоритизация",
    description: "Умение определять важность задач и проектов, эффективно распределять ресурсы и время для достижения целей",
    currentLevel: 36,
    subtopics: [
      { id: 1, name: "RICE методология", progress: 23, status: "learning" },
      { id: 2, name: "Матрица Эйзенхауэра", progress: 0, status: "not_started" },
      { id: 3, name: "Kano модель", progress: 67, status: "completed" },
      { id: 4, name: "ICE скоринг", progress: 0, status: "not_started" },
      { id: 5, name: "Value vs Effort", progress: 45, status: "learning" }
    ]
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Привет! Я Jess, твой ИИ-наставник по навыку "Приоритизация". Готов изучать новые методы и подходы?',
      timestamp: '10:30'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('subtopics'); // 'subtopics' или 'history'
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('all');
  const messagesEndRef = useRef(null);

  // История чатов (обычно загружается из API)
  const [chatHistory] = useState([
    {
      id: 1,
      title: "Изучение RICE методологии",
      date: "2024-06-26",
      time: "14:30",
      topic: "RICE методология",
      messageCount: 12,
      lastMessage: "Отлично! Теперь вы понимаете как применять RICE..."
    },
    {
      id: 2,
      title: "Вопросы по Матрице Эйзенхауэра",
      date: "2024-06-25",
      time: "16:45",
      topic: "Матрица Эйзенхауэра",
      messageCount: 8,
      lastMessage: "Главное - правильно определить срочность и важность..."
    },
    {
      id: 3,
      title: "Практические примеры Kano модели",
      date: "2024-06-24",
      time: "11:20",
      topic: "Kano модель",
      messageCount: 15,
      lastMessage: "Попробуйте применить эту модель к вашему проекту..."
    },
    {
      id: 4,
      title: "Общие вопросы по приоритизации",
      date: "2024-06-23",
      time: "09:15",
      topic: "Общее",
      messageCount: 6,
      lastMessage: "Приоритизация - это основа эффективного управления..."
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message, isSystemCommand = false) => {
    if (!message.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Симуляция ответа ИИ
    setTimeout(() => {
      let aiResponse = '';
      
      if (message.includes('Хочу изучить')) {
        const topic = message.replace('Хочу изучить ', '');
        aiResponse = `Отлично! Давайте изучим ${topic}. Это методология для приоритизации задач на основе 4 критериев: Reach (охват), Impact (влияние), Confidence (уверенность) и Effort (усилия). 

Хотите начать с теории или сразу перейдем к практическому примеру?`;
      } else if (message.includes('сдать тему')) {
        const topic = message.replace('сдать тему ', '');
        aiResponse = `Начинаем тестирование по теме "${topic}"! 

**Вопрос 1 из 5:**
Что означает буква "R" в методологии RICE?

А) Resources (ресурсы)
Б) Reach (охват) 
В) Risk (риск)
Г) Revenue (доход)

Выберите правильный ответ.`;
      } else if (message.includes('реальный пример')) {
        aiResponse = `Вот реальные примеры применения трех методологий:

**RICE:**
Задача: Добавить push-уведомления
- Reach: 10,000 пользователей
- Impact: +15% удержания
- Confidence: 80%
- Effort: 2 недели
Оценка: (10000 × 0.15 × 0.8) / 2 = 600

**Матрица Эйзенхауэра:**
- Срочно + Важно: Исправить критический баг
- Важно + Не срочно: Рефакторинг кода
- Срочно + Не важно: Ответить на email
- Не важно + Не срочно: Изучить новый фреймворк

**Kano модель:**
Для мобильного приложения:
- Базовые: Быстрая загрузка, стабильность
- Производительные: Больше функций, настройки
- Восхитительные: Персонализация, геймификация`;
      } else {
        aiResponse = `Понял ваш вопрос о приоритизации! Готов помочь углубиться в эту тему. Какой именно аспект вас интересует больше всего?`;
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleLearnTopic = (topicName) => {
    sendMessage(`Хочу изучить ${topicName}`, true);
  };

  const handleTestTopic = (topicName) => {
    sendMessage(`сдать тему ${topicName}`, true);
  };

  const loadChatHistory = (historyItem) => {
    // Здесь будет загрузка истории из API
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: `Продолжаем изучение темы "${historyItem.topic}". ${historyItem.lastMessage}`,
        timestamp: historyItem.time
      }
    ]);
    setActiveTab('subtopics'); // Возвращаемся к подтемам после загрузки истории
  };

  const filteredHistory = chatHistory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(historySearch.toLowerCase()) ||
                         item.topic.toLowerCase().includes(historySearch.toLowerCase());
    const matchesFilter = historyFilter === 'all' || item.topic === historyFilter;
    return matchesSearch && matchesFilter;
  });

  const uniqueTopics = [...new Set(chatHistory.map(item => item.topic))];

  const getProgressColor = (progress) => {
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 30) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'completed': { text: 'Завершено', color: 'bg-green-100 text-green-800' },
      'learning': { text: 'Изучается', color: 'bg-orange-100 text-orange-800' },
      'not_started': { text: 'Не начато', color: 'bg-gray-100 text-gray-600' }
    };
    
    const badge = badges[status] || badges.not_started;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Левая панель - Информация о навыке */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Заголовок */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Тренировка навыка</h1>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-blue-600">{skillData.name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{skillData.description}</p>
            
            {/* Общий прогресс */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Общий прогресс</span>
                <span className="text-sm font-bold text-blue-600">{skillData.currentLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${skillData.currentLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Подтемы и История */}
        <div className="flex-1 overflow-y-auto">
          {/* Табы */}
          <div className="px-6 pt-4 border-b border-gray-200">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('subtopics')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'subtopics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Подтемы
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                История
              </button>
            </div>
          </div>

          {/* Содержимое табов */}
          <div className="p-6">
            {activeTab === 'subtopics' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Подтемы навыка</h3>
                {skillData.subtopics.map((topic) => (
                  <div key={topic.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{topic.name}</h4>
                      {getStatusBadge(topic.status)}
                    </div>
                    
                    {/* Прогресс подтемы */}
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Прогресс</span>
                        <span className="text-xs font-medium text-gray-700">{topic.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(topic.progress)}`}
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLearnTopic(topic.name)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        <BookOpen className="w-4 h-4" />
                        Изучить
                      </button>
                      <button
                        onClick={() => handleTestTopic(topic.name)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                        disabled={topic.progress < 20}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Сдать тему
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">История чатов</h3>
                  <p className="text-sm text-gray-500">Предыдущие сессии изучения навыка</p>
                </div>
                
                {/* Поиск */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск по истории..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Фильтр по темам */}
                <div>
                  <select
                    value={historyFilter}
                    onChange={(e) => setHistoryFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Все темы</option>
                    {uniqueTopics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                {/* Список истории */}
                <div className="space-y-3">
                  {filteredHistory.map((historyItem) => (
                    <div 
                      key={historyItem.id}
                      onClick={() => loadChatHistory(historyItem)}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors border hover:border-blue-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">{historyItem.title}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{historyItem.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {historyItem.topic}
                        </span>
                        <span className="text-xs text-gray-500">
                          {historyItem.messageCount} сообщений
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {historyItem.lastMessage}
                      </p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">{historyItem.date}</span>
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Продолжить
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Пустое состояние для поиска */}
                  {filteredHistory.length === 0 && (historySearch || historyFilter !== 'all') && (
                    <div className="text-center py-8">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Ничего не найдено</p>
                      <p className="text-gray-400 text-xs mt-1">Попробуйте изменить критерии поиска</p>
                    </div>
                  )}
                  
                  {/* Пустое состояние, если истории нет */}
                  {chatHistory.length === 0 && (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">История чатов пуста</p>
                      <p className="text-gray-400 text-xs mt-1">Начните диалог с Jess</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Правая панель - Чат */}
      <div className="flex-1 flex flex-col">
        {/* Заголовок чата */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Jess - ИИ Наставник</h3>
              <p className="text-sm text-gray-500">Готов помочь с изучением навыка</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button 
                onClick={() => setActiveTab('history')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === 'history' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <History className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* История сообщений */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-lg px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}>
                <div className="whitespace-pre-wrap">{message.content}</div>
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
        <div className="bg-white border-t border-gray-200 p-4">
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
                placeholder="Задайте вопрос о навыке приоритизации..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
            </div>
            <button
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Быстрые действия */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => sendMessage("приведи реальный пример по всем трём методологиям")}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Примеры методологий
            </button>
            <button
              onClick={() => sendMessage("какие ошибки часто допускают в приоритизации?")}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Частые ошибки
            </button>
            <button
              onClick={() => sendMessage("дай практическое задание")}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Практика
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTrainingScreen;