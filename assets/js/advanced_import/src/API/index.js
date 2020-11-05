import API from './API'
import settings from '@/API/modules/settings'
import logs from '@/API/modules/logs'
import importData from '@/API/modules/importData'
import exportData from '@/API/modules/exportData'
import upload from '@/API/modules/upload'

export {default as plugin} from './plugin'

const api = new API({
    modules: {
        settings,
        logs,
        importData,
        exportData,
        upload,
    }
})

export default api
