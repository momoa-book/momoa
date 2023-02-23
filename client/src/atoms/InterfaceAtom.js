import { atom } from 'recoil';

export const isClickedAtom = atom({
  key: 'isClicked',
  default: false,
});

export const showModalAtom = atom({
  key: 'isShow',
  default: false,
});
