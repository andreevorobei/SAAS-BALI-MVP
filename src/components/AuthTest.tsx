import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

export function AuthTest() {
  const { user, loading, signUp, signIn, signOut } = useAuth()
  const { profile, createProfile, updateProfile } = useProfile()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [goals, setGoals] = useState('')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      {!user ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Тест Supabase</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => signIn(email, password)}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Войти
            </button>
            <button
              onClick={() => signUp(email, password)}
              className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Регистрация
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center">✅ Подключено!</h1>
          <p><strong>Email:</strong> {user.email}</p>
          
          {profile ? (
            <div>
              <p><strong>Имя:</strong> {profile.name}</p>
              <p><strong>Цели:</strong> {profile.goals || 'Не указаны'}</p>
              <p><strong>Прогресс:</strong> {profile.overall_progress}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-orange-600">Профиль не создан</p>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Ваши карьерные цели"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
              />
              <button
                onClick={() => createProfile(name, goals)}
                className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Создать профиль
              </button>
            </div>
          )}
          
          <button
            onClick={signOut}
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  )
}