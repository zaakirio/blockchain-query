import { FC, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import QrScanner from './QrScanner';


const VerificationTab: FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { settings } = useSettings();

  const handleScan = async (data: string) => {
    setScanning(false);
    setScanResult(data);
    setVerificationStatus('validating');
    
    try {
      // Validate QR code against expected format
      const scannedData = JSON.parse(data);
      const expectedData = JSON.parse(settings.expectedQrFormat);
      
      // Simple schema validation - check if all expected keys exist
      const isValid = Object.keys(expectedData).every(key => 
        scannedData.hasOwnProperty(key) && 
        typeof scannedData[key] === typeof expectedData[key]
      );
      
      if (!isValid) {
        throw new Error('QR code format does not match expected structure');
      }
      
      // Query Solana blockchain
      // This is a placeholder for the actual Solana blockchain query
      await querySolanaBlockchain(scannedData);
      
      setVerificationStatus('success');
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const querySolanaBlockchain = async (data: any) => {
    // Placeholder for Solana blockchain query
    // In a real implementation, you would:
    // 1. Use @solana/web3.js to connect to the Solana network
    // 2. Query the blockchain based on data from QR code
    // 3. Validate the response
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, randomly succeed or fail
    if (Math.random() > 0.3) {
      return true;
    } else {
      throw new Error('Blockchain verification failed');
    }
  };

  const resetVerification = () => {
    setScanResult(null);
    setVerificationStatus('idle');
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6 pb-16">
      <h2 className="text-lg font-semibold text-gray-800">Verification</h2>
      
      {!scanning && verificationStatus === 'idle' && (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <button
            onClick={() => setScanning(true)}
            className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Begin Verification
          </button>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Click to scan a QR code for verification
          </p>
        </div>
      )}
      
      {scanning && (
        <QrScanner
          onScan={handleScan}
          onError={(error) => {
            setScanning(false);
            setVerificationStatus('error');
            setErrorMessage(error);
          }}
          onCancel={() => setScanning(false)}
        />
      )}
      
      {scanResult && (
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          <h3 className="font-medium text-gray-800">Scan Result</h3>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-xs">
            {scanResult}
          </pre>
        </div>
      )}
      
      {verificationStatus === 'validating' && (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Validating with blockchain...</p>
        </div>
      )}
      
      {verificationStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Success!</strong>
          <p className="block sm:inline">Verification completed successfully.</p>
          <button 
            onClick={resetVerification}
            className="mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors w-full"
          >
            Verify Another
          </button>
        </div>
      )}
      
      {verificationStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <p className="block sm:inline">{errorMessage || 'An error occurred during verification.'}</p>
          <button 
            onClick={resetVerification}
            className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors w-full"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationTab;