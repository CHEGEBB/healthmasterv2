'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext<{
  user: {} | null;
  setUser: (user: {}) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = UserContext.Provider;

export default UserContext;