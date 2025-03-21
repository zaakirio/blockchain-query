import { FC, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsTab: FC = () => {
  const { settings, updateSettings } = useSettings();
  const [rpcUrl, setRpcUrl] = useState(settings.rpcUrl);
  const [expectedQrFormat, setExpectedQrFormat] = useState(settings.expectedQrFormat);

  const handleSave = () => {
    updateSettings({
      rpcUrl,
      expectedQrFormat
    });
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 pb-16">
      <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Solana RPC URL
          </label>
          <input
            type="text"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://api.mainnet-beta.solana.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected QR Format
          </label>
          <textarea
            value={expectedQrFormat}
            onChange={(e) => setExpectedQrFormat(e.target.value)}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder='{"type":"verification","key":"value"}'
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the expected JSON structure for QR code validation
          </p>
        </div>
      </div>
      
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsTab;