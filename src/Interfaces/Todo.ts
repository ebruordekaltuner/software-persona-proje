export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline?: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek';
}