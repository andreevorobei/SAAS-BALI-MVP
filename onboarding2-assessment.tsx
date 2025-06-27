import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Bot, User, Send, SkipForward, Sparkles, Target, Brain, Heart, Zap } from 'lucide-react';

const OnboardingAssessment = () => {
  // Данные пользователя (обычно приходят из предыдущего экрана)
  const [userName] = useState("Андрей");
  
  // Вопросы для оценки
  const questions = [
    {
      id: 1,
      text: "Привет, Андрей! Я Jess, твой ИИ-наставник. Давай узнаем твои суперсилы! ✨\n\nРасскажи о ситуации, когда ты гордился своим результатом на работе или в учебе?",
      category: "achievements",
      isWelcome: true
    },
    {
      id: 2,
      text: "Отлично! А теперь скажи, что тебе нравится делать больше всего в работе? Что приносит тебе наибольшее удовольствие?",
      category: "preferences"
    },
    {
      id: 3,
      text: "Интересно! А как ты предпочитаешь решать сложные проблемы? Действуешь быстро по интуиции или тщательно анализируешь все детали?",
      category: "problem_solving"
    },
    {
      id: 4,
      text: "Понятно! Что для тебя важнее: работать с людьми, выстраивать отношения и коммуникации, или работать с данными, системами и аналитикой?",
      category: "work_style"
    },
    {
      id: 5,
      text: "Хорошо! Опиши свой идеальный рабочий день. Как бы ты хотел проводить время на работе?",
      category: "ideal_day"
    },
    {
      id: 6,
      text: "Отлично! Что тебя больше мотивирует: создавать что-то новое с нуля или улучшать существующие процессы и системы?",
      category: "motivation"
    },
    {
      id: 7,
      text: "Последний вопрос! Как ты относишься к риску и неопределенности? Ты готов рисковать ради большого результата или предпочитаешь стабильность?",
      category: "risk_tolerance"
    }
  ];

  // Состояние чата
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  
  const messagesEndRef = useRef(null);

  // Прокрутка к концу чата
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Инициализация первого вопроса
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addJessMessage(questions[0].text, questions[0].isWelcome);
      }, 1000);
    }
  }, []);

  // Добавление сообщения от Jess
  const addJessMessage = (content, isWelcome = false) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        type: 'ai',
        content: content,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        isWelcome: isWelcome
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Отправка ответа пользователя
  const sendAnswer = (message) => {
    if (!message.trim()) return;

    // Добавляем ответ пользователя
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Сохраняем ответ
    const currentAnswer = {
      questionId: questions[currentQuestionIndex].id,
      question: questions[currentQuestionIndex].text,
      answer: message,
      category: questions[currentQuestionIndex].category
    };
    
    setUserAnswers(prev => [...prev, currentAnswer]);

    // Переходим к следующему вопросу
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  // Пропуск вопроса
  const skipQuestion = () => {
    const skipAnswer = {
      questionId: questions[currentQuestionIndex].id,
      question: questions[currentQuestionIndex].text,
      answer: "Пропущен",
      category: questions[currentQuestionIndex].category,
      skipped: true
    };
    
    setUserAnswers(prev => [...prev, skipAnswer]);
    nextQuestion();
  };

  // Переход к следующему вопросу
  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => {
        addJessMessage(questions[nextIndex].text);
      }, 500);
    } else {
      // Завершение оценки
      setTimeout(() => {
        addJessMessage("Отлично! Я проанализировала твои ответы и готова показать результаты. Давай посмотрим, какие у тебя суперсилы! 🚀");
        setIsCompleted(true);
      }, 500);
    }
  };

  // Переход к следующему экрану
  const proceedToResults = () => {
    console.log('Переход к результатам с ответами:', userAnswers);
    // Здесь будет переход к экрану результатов
  };

  // Возврат к предыдущему экрану
  const goBack = () => {
    console.log('Возврат к предыдущему экрану');
    // Здесь будет возврат к экрану приветствия
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      {/* Хедер с прогресс-баром - зафиксирован */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        {/* Прогресс бар */}
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Оценка способностей</span>
            <span>2 из 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '40%' }}
            ></div>
          </div>
        </div>
        
        {/* Заголовок */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Давай узнаем твои суперсилы, {userName}!
                </h1>
                <p className="text-sm text-gray-600">Jess задаст несколько вопросов для анализа</p>
              </div>
            </div>
            
            {/* Индикатор вопросов */}
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">
                Вопрос {Math.min(currentQuestionIndex + 1, questions.length)} из {questions.length}
              </div>
              <div className="flex gap-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index < currentQuestionIndex
                        ? 'bg-green-500'
                        : index === currentQuestionIndex
                        ? 'bg-purple-500'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Чат - только сообщения с прокруткой */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: '160px' }}>
        <div className="max-w-4xl mx-auto p-6 space-y-6 pb-48">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'ai' && (
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className={`${message.type === 'user' ? 'max-w-lg' : 'max-w-2xl'}`}>
                <div className={`px-6 py-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white' 
                    : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
                
                {/* Иконки суперсил для приветственного сообщения */}
                {message.isWelcome && (
                  <div className="flex items-center gap-2 mt-3 pl-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <Brain className="w-4 h-4 text-blue-500" />
                    <Heart className="w-4 h-4 text-red-500" />
                    <Zap className="w-4 h-4 text-purple-500" />
                    <Target className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {/* Индикатор печати */}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Поле ввода - зафиксировано внизу */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 py-8 px-6 shadow-xl z-30">
        <div className="max-w-4xl mx-auto">
          {!isCompleted ? (
            <div className="space-y-4">
              {/* Основное поле ввода */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendAnswer(inputMessage);
                      }
                    }}
                    placeholder="Поделись своими мыслями..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-500 transition-colors text-lg"
                    rows="3"
                    disabled={isTyping}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => sendAnswer(inputMessage)}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    Ответить
                  </button>
                  <button
                    onClick={skipQuestion}
                    disabled={isTyping}
                    className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
                  >
                    <SkipForward className="w-4 h-4" />
                    Пропустить
                  </button>
                </div>
              </div>

              {/* Подсказки */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Будь честным - это поможет в анализе
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Можно пропустить сложные вопросы
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Нет правильных или неправильных ответов
                </div>
              </div>
            </div>
          ) : (
            /* Кнопка завершения */
            <div className="text-center">
              <button
                onClick={proceedToResults}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 mx-auto font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Посмотреть мои суперсилы
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Jess проанализировала {userAnswers.length} из {questions.length} ответов
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Прогресс по вопросам (мобильная версия) */}
      <div className="md:hidden bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-purple-500" />
            <span className="text-gray-600">Jess</span>
          </div>
          <div className="text-gray-500">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingAssessment;