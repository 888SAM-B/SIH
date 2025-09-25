
import React, { useState } from 'react';
import { LearnerProfile } from './types';
import { LearningPathwayData } from './types';
import Header from './components/Header';
import LearnerProfileForm from './components/LearnerProfileForm';
import LearningPathway from './components/LearningPathway';
import { generateLearningPath } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPathwayData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = async (profile: LearnerProfile) => {
    setLearnerProfile(profile);
    setIsLoading(true);
    setError(null);
    setLearningPath(null);

    try {
      const path = await generateLearningPath(profile);
      setLearningPath(path);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the learning path. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setLearnerProfile(null);
    setLearningPath(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!learningPath && !isLoading && (
          <LearnerProfileForm onSubmit={handleProfileSubmit} />
        )}
        
        {isLoading && (
          <div className="text-center p-10">
            <LoadingSpinner />
            <h2 className="text-2xl font-semibold text-gray-700 mt-6">Crafting Your Personalized Pathway...</h2>
            <p className="text-gray-500 mt-2">Our AI is analyzing your profile against millions of data points to create the perfect skilling journey for you.</p>
          </div>
        )}
        
        {error && (
           <div className="text-center p-10 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}

        {learningPath && !isLoading && (
          <LearningPathway pathway={learningPath} onReset={handleReset} profile={learnerProfile!} />
        )}
      </main>
    </div>
  );
};

export default App;
