import { FC, useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';

interface QrScannerProps {
  onScan: (data: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

const QrScanner: FC<QrScannerProps> = ({ onScan, onError, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startScanner = async () => {
      try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true'); // required for iOS
          
          // Mock QR code detection after 3 seconds (in a real app, use a library like jsQR)
          setTimeout(() => {
            const mockQrData = JSON.stringify({
              type: "verification",
              publicKey: "8xdJLaYAYEhvjwLKEkT1ojy6PoVcK1wKrBLXQF5Yotsh",
              timestamp: Date.now(),
              signature: "2vCjz1zJfQmZ4HrEZDpRgLXNvBTj6fVi9rnpmyZV9rg5FzX7fkXST9rCyqFbwZCQFCPGxvmcY8CecqiP6VHbqMBj"
            });
            onScan(mockQrData);
          }, 3000);
        }
      } catch (error) {
        onError('Unable to access camera. Please grant permission and try again.');
      }
    };
    
    startScanner();
    
    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onScan, onError]);
  
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg aspect-square">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 border-2 border-white rounded-lg"></div>
        
        {/* Scanner overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 h-2/3 border-2 border-blue-500 rounded-lg">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCancel}
        className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        <XIcon size={24} />
      </button>
      
      <p className="text-center mt-3 text-gray-600">
        Position QR code within the frame
      </p>
    </div>
  );
};

export default QrScanner;