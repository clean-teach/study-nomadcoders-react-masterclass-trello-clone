import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IBoards } from '../types/types';

const { persistAtom } = recoilPersist({
  key: 'trelloCloneTodos',
  storage: localStorage,
});

export const toDoBoardState = atom<IBoards>({
  key: 'board',
  default: {
    boards: [
      {
        id: 1,
        title: 'To Do',
        todos: [],
      },
      {
        id: 2,
        title: 'Doing',
        todos: [],
      },
      {
        id: 3,
        title: 'Done',
        todos: [],
      },
      {
        id: 4,
        title: 'Do Later',
        todos: [],
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});
