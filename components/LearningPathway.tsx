
import React from 'react';
import { LearnerProfile, LearningPathwayData, PathwayStep } from '../types';
import { CourseIcon, CertificationIcon, ProjectIcon, OJTIcon, AssessmentIcon } from './icons/StepIcons';


const StepTypeIcon: React.FC<{ type: PathwayStep['stepType'] }> = ({ type }) => {
    const iconClass = "h-8 w-8 text-white";
    switch (type) {
        case 'Course':
        case 'Micro-credential':
            return <CourseIcon className={iconClass} />;
        case 'Certification':
            return <CertificationIcon className={iconClass} />;
        case 'Project':
            return <ProjectIcon className={iconClass} />;
        case 'On-the-Job Training':
            return <OJTIcon className={iconClass} />;
        case 'Assessment':
            return <AssessmentIcon className={iconClass} />;
        default:
            return <CourseIcon className={iconClass} />;
    }
};

interface Props {
  pathway: LearningPathwayData;
  profile: LearnerProfile;
  onReset: () => void;
}

const LearningPathway: React.FC<Props> = ({ pathway, profile, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{pathway.pathwayTitle}</h1>
            <p className="text-indigo-600 font-semibold mt-1">A Personalized Pathway for {profile.name}</p>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{pathway.summary}</p>
        </div>

        <div className="space-y-12">
            {pathway.phases.map((phase, phaseIndex) => (
                <div key={phaseIndex}>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">{phase.phaseTitle}</h2>
                        <p className="text-gray-500 mt-1">{phase.phaseDescription}</p>
                    </div>
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 -ml-0.5 w-1 bg-indigo-200 h-full hidden md:block" aria-hidden="true"></div>

                        {phase.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className={`mb-8 flex md:items-center w-full ${stepIndex % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="hidden md:block w-1/2"></div>
                                <div className="hidden md:block w-fit z-10">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 shadow-lg">
                                        <StepTypeIcon type={step.stepType} />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 shadow-lg md:hidden">
                                           <StepTypeIcon type={step.stepType} />
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">
                                                {step.stepType}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                                        <span className="font-semibold bg-gray-100 px-2 py-1 rounded">NSQF Level: {step.nsqfLevel}</span>
                                        <span className="font-semibold bg-gray-100 px-2 py-1 rounded">Duration: {step.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-12">
            <button
              onClick={onReset}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Create Another Pathway
            </button>
        </div>
    </div>
  );
};

export default LearningPathway;
