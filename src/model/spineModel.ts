import { atom } from "recoil";

export const spinefileList = atom({
    key: 'spinefileList',
    default: [] as { [key: string]: string }[],
});


export const spinefileIndex = atom({
    key: 'spinefileIndex',
    default: 0,
});

export const spinefileLoading = atom({
    key: 'spinefileLoading',
    default: false,
});
