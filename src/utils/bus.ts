type BusCallback = (...args: unknown[]) => void

type BusClass<T> = {
  emit: (name: T, ...args: unknown[]) => void
  on: (name: T, callback: BusCallback) => void
  off: (name: T, callback?: BusCallback) => void
}

type BusParams = string | number | symbol

type List = {
  [key: BusParams]: BusCallback[]
}

class Bus<T extends BusParams> implements BusClass<T> {
  list: List

  constructor() {
    this.list = {}
  }

  emit(name: T, ...args: unknown[]): void {
    const eventName: BusCallback[] = this.list[name]
    if (eventName) {
      eventName.forEach(ev => {
        ev.apply(this, args)
      })
    }
  }

  on(name: T, callback: BusCallback): void {
    const fn: BusCallback[] = this.list[name] || []
    fn.push(callback)
    this.list[name] = fn
  }

  off(name: T, callback?: BusCallback): void {
    const eventName: BusCallback[] = this.list[name]
    if (eventName) {
      if (callback) {
        this.list[name] = eventName.filter(fnItem => fnItem !== callback)
      } else {
        this.list[name] = []
      }
    }
  }
}

export default new Bus<string>()
