import { Middleware, AnyAction } from 'redux'

class Listener {
  count: number = 0

  get actionType(): any {
    return this._actionType
  }

  constructor(
    private _actionType: string,
    private _onDispatch: (result: any) => void,
    private _maxCount: number = 1
  ) {
  }

  notifyDispatch(result: any): boolean {
    if (this._onDispatch) {
      this._onDispatch(result)
    }
    return ++this.count > this._maxCount - 1
  }
}

export class Stethoscope {
	private _listeners: Array<Listener>
  private _error: Error|undefined
  private _heartBeat: number = 50
  
  constructor() {
    this._listeners = []
  }

  set heartBeat(heartBeat: number) {
    if (heartBeat <= 0) {
      throw new Error("heartBeat of Stethoscope should be set to more than 0 millisecond.")
    }
    this._heartBeat = heartBeat
  }

	asMiddleware<T>() : Middleware<{}, T> {
		return state => dispatch => action => {
      const result = dispatch(action)
      this._listeners = this._listeners.filter(listener => {
        let isAllNotified = false
        if (listener.actionType === action.type) {
          try {
            isAllNotified = listener.notifyDispatch(result)
          } catch (e) {
            if (!this._error) {
              this._error = e
            }
          }
        }
        return !isAllNotified
      })
			return result
		}
	}

  subscribe(
    _actionType: string,
    _onDispatch: (result: any) => void,
    maxCount?: number
  ): {(): void} {
    let listener = new Listener(_actionType, _onDispatch, typeof maxCount === 'undefined' ? 1 : maxCount)
    this._listeners.push(listener)

    const unsubscribe = () => {
      this._listeners = this._listeners.filter(l => !Object.is(l, listener))
    }
    return unsubscribe;
  }

	refresh() {
		this._listeners = []
	}

	async listen(timeout: number = 2000) {
    var dueTime = Date.now() + timeout

		while (Object.keys(this._listeners).length > 0) {
      if (Date.now() > dueTime) {
        let list = [ '', ...this._listeners.map(l => l.actionType) ]
          .reduce((a, b) => `${a}\n  * ${b}`)
        throw new Error(`The actions subscribed to Stethoscope were not all dispatched for ${timeout / 1000} seconds.\nRemaining subscribed actions:${list}`)
      }
			await new Promise(r => setTimeout(r, this._heartBeat))
    }
    
		if (this._error) {
			throw(this._error)
		}
	}
}

export default Stethoscope
