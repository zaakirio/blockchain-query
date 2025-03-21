import { FC } from 'react';
import { CogIcon, QrCodeIcon } from 'lucide-react';

type TabType = 'settings' | 'verification';

interface TabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabBar: FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-t border-gray-200 flex w-full fixed bottom-0 left-0">
      <button 
        className={`flex-1 py-3 flex flex-col items-center justify-center ${
          activeTab === 'settings' ? 'text-blue-600' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('settings')}
      >
        <CogIcon size={24} />
        <span className="text-xs mt-1">Settings</span>
      </button>
      
      <button 
        className={`flex-1 py-3 flex flex-col items-center justify-center ${
          activeTab === 'verification' ? 'text-blue-600' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('verification')}
      >
        <QrCodeIcon size={24} />
        <span className="text-xs mt-1">Verification</span>
      </button>
    </div>
  );
};

export default TabBar;