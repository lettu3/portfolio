import { Tech } from '../models/tech.model';

export const TECH_STACK: Tech[] = [
  { name: $localize`Java`, categories: ['backend', 'languages'], icon: 'assets/icons/java.svg', level: 'professional' },
  { name: $localize`Spring Boot`, categories: ['backend'], icon: 'assets/icons/spring.svg', level: 'professional' },
  { name: $localize`PostgreSQL`, categories: ['backend'], icon: 'assets/icons/postgresql.svg', level: 'professional' },
  { name: $localize`React`, categories: ['frontend'], icon: 'assets/icons/react.svg', level: 'professional' },
  { name: $localize`TypeScript`, categories: ['frontend', 'languages'], icon: 'assets/icons/typescript.svg', level: 'professional' },
  { name: $localize`Angular`, categories: ['frontend'], icon: 'assets/icons/angular.svg', level: 'professional' },
  { name: $localize`PlayCanvas`, categories: ['frontend'], icon: 'assets/icons/playcanvas.svg', level: 'professional' },
  { name: $localize`Redux`, categories: ['frontend'], icon: 'assets/icons/redux.svg', level: 'professional' },
  { name: $localize`Docker`, categories: ['devops'], icon: 'assets/icons/docker.svg', level: 'professional' },
  { name: $localize`C/C++`, categories: ['languages'], icon: 'assets/icons/c.svg', level: 'academic' },
  { name: $localize`Haskell`, categories: ['languages'], icon: 'assets/icons/haskell.svg', level: 'academic' },
  { name: $localize`Python`, categories: ['languages', 'backend'], icon: 'assets/icons/python.svg', level: 'academic' },
  { name: $localize`SQLite`, categories: ['backend'], icon: 'assets/icons/sqlite.svg', level: 'academic' }
];
