export interface Tech {
  name: string;
  categories: ('backend' | 'frontend' | 'devops' | 'languages')[];
  icon: string;
  level: 'professional' | 'academic';
}
