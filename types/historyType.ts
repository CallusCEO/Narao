export type HistoryType = {
   role: 'user' | 'model';
   parts: {
    text: string;
   }[];
};