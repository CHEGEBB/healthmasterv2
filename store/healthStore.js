import create from 'zustand';

const useHealthStore = create((set) => ({
  userCondition: null,
  userData: null,
  wearableData: null,
  setUserCondition: (condition) => set({ userCondition: condition }),
  setUserData: (data) => set({ userData: data }),
  setWearableData: (data) => set({ wearableData: data }),
  updateWearableData: (newData) => set((state) => ({
    wearableData: { ...state.wearableData, ...newData }
  })),
}));

export default useHealthStore;