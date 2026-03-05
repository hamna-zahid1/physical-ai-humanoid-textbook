import React from 'react';
import ChatBot from '../components/ChatBot';
export default function Root({children}) {
  return <>{children}<ChatBot /></>;
}