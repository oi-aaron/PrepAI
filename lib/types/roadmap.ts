export interface RoadmapTask {
    title: string;
    description: string;
    category: string;
    completed: boolean;
  }
  
  export interface RoadmapWeek {
    week: number;
    title: string;
    goal: string;
    tasks: RoadmapTask[];
  }
  
  export interface RoadmapContent {
    title: string;
    overview: string;
    estimatedDuration: string;
    weeks: RoadmapWeek[];
  }