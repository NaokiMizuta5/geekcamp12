import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// ユーザーコンテキストの型定義
interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

// コンテキストの初期値
const UserContext = createContext<UserContextType | undefined>(undefined);

// useUserフックの作成
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// プロバイダーコンポーネントの型定義
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
