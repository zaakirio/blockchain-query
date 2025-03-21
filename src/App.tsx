import { useState } from 'react';
import SettingsTab from './components/SettingsTab';
import VerificationTab from './components/VerificationTab';
import TabBar from './components/TabBar';

type TabType = 'settings' | 'verification';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('settings');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Verification App</h1>
      </header>
      
      <main className="flex-1 p-4">
        {activeTab === 'settings' ? <SettingsTab /> : <VerificationTab />}
      </main>
      
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;