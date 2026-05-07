import {create} from 'zustand';

type PreLoadingState = {
    show: boolean,
    setShow: (show: boolean) => void
}

const usePreLoading = create<PreLoadingState>()((set) => ({
    show : false,
    setShow: (show: boolean) => set({ show }),
}))


export default usePreLoading;
