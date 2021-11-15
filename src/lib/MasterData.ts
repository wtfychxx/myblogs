import create from 'zustand';

type masterDataState = {
    typeMaster: string;
    setTypeMaster: (typeMaster: string) => void;
}

export const useStoreMaster = create<masterDataState>((set) => ({
    typeMaster: "",
    setTypeMaster: (typeMaster) => set(() => ({typeMaster}))
}))
