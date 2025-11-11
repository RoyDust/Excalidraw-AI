'use client';

import { useState } from 'react';
import ExcalidrawCanvas from '@/components/ExcalidrawCanvas';
import Chat from '@/components/Chat';

export default function Home() {
  const [aiModelName] = useState('GPT-4o');

  return (
    <div className="workspace">
      <ExcalidrawCanvas />
      <Chat aiModelName={aiModelName} />
    </div>
  );
}
