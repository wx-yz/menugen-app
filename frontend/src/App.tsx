import React, { useState } from 'react';
import { Settings, User, Upload, Image, Camera, Folder, LogOut, LogIn } from 'lucide-react';
import { useAuthContext } from '@asgardeo/auth-react';
import { config } from './config.js';

interface MenuItemResult {
  name: string;
  description: string;
  image_url: string;
}

interface ProcessedMenu {
  items: MenuItemResult[];
}

const App: React.FC = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [openAIKey, setOpenAIKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [menuResults, setMenuResults] = useState<ProcessedMenu | null>(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (file: File) => {
    if (file.size > config.maxFileSize) {
      alert('File size exceeds 10MB limit');
      return;
    }
    
    if (!config.allowedFileTypes.includes(file.type)) {
      alert('Please select a PNG, JPG, or GIF file');
      return;
    }
    
    setUploadedFile(file);
    setShowUploadOptions(false);
  };

  const handlePhotoLibrary = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSelect(file);
    };
    input.click();
  };

  const handleTakePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSelect(file);
    };
    input.click();
  };

  const handleChooseFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/jpg,image/gif';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSelect(file);
    };
    input.click();
  };

  const processMenu = async () => {
    if (!uploadedFile || !openAIKey) {
      alert('Please add your OpenAI key in settings and select an image');
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('openaiKey', openAIKey);

      const response = await fetch(`${config.apiUrl}/api/process-menu`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process menu');
      }

      const result = await response.json();
      setMenuResults(result);
    } catch (error) {
      console.error('Error processing menu:', error);
      alert('Failed to process menu. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetApp = () => {
    setUploadedFile(null);
    setMenuResults(null);
    setShowUploadOptions(false);
  };

  const handleLogout = () => {
    signOut();
    setMenuResults(null);
    setUploadedFile(null);
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">MenuGen</h1>
            <p className="text-gray-600">Turn Menus into Magic</p>
          </div>
          <button
            onClick={() => signIn()}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600">MenuGen</h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Settings size={24} />
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={20} />
                <span>{state.username || 'User'}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-primary-50 border-b border-primary-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-medium text-primary-800 mb-2">OpenAI API Key</h3>
            <input
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              className="w-full max-w-md px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!menuResults ? (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Turn Menus into Magic
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Upload any menu and watch as AI transforms each dish into stunning, mouth watering visuals. ✨🍽️
            </p>

            {/* Upload Area */}
            <div className="max-w-2xl mx-auto">
              {!uploadedFile ? (
                <div
                  onClick={() => setShowUploadOptions(true)}
                  className="border-2 border-dashed border-primary-300 rounded-2xl p-12 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
                >
                  <Upload className="mx-auto h-16 w-16 text-primary-400 mb-4" />
                  <p className="text-lg text-gray-600">
                    Click to upload or drag and drop<br />
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Image className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Image Selected</h3>
                    <p className="text-gray-600">{uploadedFile.name}</p>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={processMenu}
                      disabled={isProcessing || !openAIKey}
                      className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white py-3 px-8 rounded-lg font-medium transition-colors"
                    >
                      {isProcessing ? 'Processing...' : 'Generate Menu'}
                    </button>
                    <button
                      onClick={resetApp}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-8 rounded-lg font-medium transition-colors"
                    >
                      Choose Different Image
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Options Modal */}
              {showUploadOptions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                      Choose Upload Method
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={handlePhotoLibrary}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Image className="w-6 h-6 text-primary-500" />
                        <span className="font-medium">Photo Library</span>
                      </button>
                      
                      <button
                        onClick={handleTakePhoto}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Camera className="w-6 h-6 text-primary-500" />
                        <span className="font-medium">Take Photo</span>
                      </button>
                      
                      <button
                        onClick={handleChooseFile}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Folder className="w-6 h-6 text-primary-500" />
                        <span className="font-medium">Choose File</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setShowUploadOptions(false)}
                      className="w-full mt-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Results Display */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Magic Menu</h2>
              <button
                onClick={resetApp}
                className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-lg font-medium transition-colors"
              >
                Upload New Menu
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuResults.items.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
