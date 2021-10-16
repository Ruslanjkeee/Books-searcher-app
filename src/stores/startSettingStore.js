import { makeAutoObservable } from 'mobx';

function StartSettingStore () {
    return makeAutoObservable({
        isStartApp: true,
        pagStep: 30,
        setIsStartApp (boolean) {
            this.isStartApp = boolean;
        }
    })
}

const startSettingStore = new StartSettingStore();
export default startSettingStore;