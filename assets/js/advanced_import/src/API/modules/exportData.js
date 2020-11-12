import {objectToUrlSearchParams} from '../Utils'

export default {
    actions: {   
        download(context, settings) {
            const {$api} = context
            const getFileName = (settings, extension='csv') => {
                let file_name = 'form'
                const {event_id='',form_name=''} = settings
                if(event_id) file_name += `-${event_id}`
                if(form_name) file_name += `-${form_name}`
                file_name += `.${extension}`
                return file_name
            }

            const getExportUrl = (settings) => {
                const redcap_params = $api.getRedCapQueryParams()
                const params = {...redcap_params,route: 'export',...settings,}
                let search_params = objectToUrlSearchParams(params)
                
                const exportURL = `${$api.baseURL}?`+search_params.toString()
                return exportURL
            }

            const triggerDownload = (url, file_name) => {
                const anchor = document.createElement('a')
                anchor.setAttribute("download", file_name)
                anchor.setAttribute("target", '_SELF')
                anchor.setAttribute("href", url)
                anchor.innerText = 'download'
                // temporarily add the anchor to the DOM, click and remove it
                document.body.appendChild(anchor) // required for firefox
                anchor.click()
                anchor.remove()
            }

            const exportURL = getExportUrl(settings)
            const file_name = getFileName(settings)

            triggerDownload(exportURL, file_name)
        },
        
        
    }
}