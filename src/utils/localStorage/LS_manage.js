class LS_manage {
    constructor() {
        this.storage = window.localStorage
        this.time = new Date()
        this.requestTime = 60 * 1000
    }

    getItem(key) {
        return JSON.parse(this.storage.getItem(key))
    }

    getData_Local(key, time = this.requestTime) {
        const data = JSON.parse(this.storage.getItem(key))
        const dataTime = JSON.parse(this.storage.getItem(key + "Time"))
        if (data && dataTime) {
            if (time && Date.parse(new Date()) - dataTime > time) {
                this.removeItem(key)
                this.removeItem(key + "Time")
                return null
            }
            return data
        }
        return null
    }

    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value))
        this.storage.setItem(
            key + "Time",
            JSON.stringify(Date.parse(new Date()))
        )
    }
    removeItem(key) {
        this.storage.removeItem(key)
    }
    clear() {
        this.storage.clear()
    }
}

export default new LS_manage()
