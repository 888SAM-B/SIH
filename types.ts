
export interface LearnerProfile {
  name: string;
  location: string;
  education: string;
  skills: string;
  aspiration: string;
  language: string;
}

export interface PathwayStep {
  stepType: 'Course' | 'Micro-credential' | 'Certification' | 'On-the-Job Training' | 'Project' | 'Assessment';
  title: string;
  description: string;
  nsqfLevel: string;
  duration: string;
}

export interface PathwayPhase {
  phaseTitle: string;
  phaseDescription: string;
  steps: PathwayStep[];
}

export interface LearningPathwayData {
  pathwayTitle: string;
  summary: string;
  phases: PathwayPhase[];
}
