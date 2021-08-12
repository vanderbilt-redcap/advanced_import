export default class Mapping {
    properties = {
        primaryKey: false,
        form: null, // REDCap form name
        field: null, // REDCap field
        type: null, // REDCap field type
        label: null, // label of the REDCap field
        dynamic: false, // considered dynamic when looking for existing data
        columns: [],
    }

    constructor(params={}) {
        for(let[key,value] of Object.entries(params)) {
            if(!(key in this.properties)) continue
            this[key] = value
        }
    }

    get form() { return this.properties['form'] }
    set form(value) { this.properties['form'] = value }
    
    get field() { return this.properties['field'] }
    set field(value) { this.properties['field'] = value }
    
    get type() { return this.properties['type'] }
    set type(value) { this.properties['type'] = value }

    get label() { return this.properties['label'] }
    set label(value) { this.properties['label'] = value }
    
    get dynamic() { return this.properties['dynamic'] }
    set dynamic(value) { this.properties['dynamic'] = Boolean(value) }

    get primaryKey() { return this.properties['primaryKey'] }
    set primaryKey(value) { this.properties['primaryKey'] = Boolean(value) }


    get columns() { return this.properties['columns'] }
    set columns(value) { this.properties['columns'] = Array.isArray(value) ? value : [] }

    hasColumn(index) { return this.columns.indexOf(index)>=0 }

    /**
     * set the columns property
     * @param {Integer} index 
     * @param {Boolean} add 
     */
    setColumn(index, add=false) {
        if(this.type==='checkbox') {
            this.setMultiColumn(index, add)
            return
        }
        if(add) this.columns = [index]
        else this.columns = []
    }

    /**
     * manage columns selection for types that support it (e.g. checkbox)
     * @param {Integer} index 
     * @param {Boolean} add 
     */
    setMultiColumn(index, add=false) {
        const columns = [...this.columns]
        const position = columns.indexOf(index)
        if(add&& position<0) columns.push(index)
        if(!add && position>=0) columns.splice(position, 1)
        this.columns = columns
    }

    toJSON() {
        return {
            form: this.form,
            field: this.field,
            type: this.type,
            label: this.label,
            dynamic: this.dynamic,
            columns: this.columns,
            primaryKey: this.primaryKey,
        }
    }


}