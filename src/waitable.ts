/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
import EventEmitter from 'events';

export class Waiter<T> {
  protected em: EventEmitter;

  constructor(em: EventEmitter) {
    this.em = em;
  }

  call(prom: Promise<T>) {
    prom
      .catch(
        (err: Error) => this.em.emit('error', err)
      )
      .finally(
        () => this.em.emit('done')
      );
  }

  catch(fn: (err: Error) => void) {
    return this.on('error', fn);
  }

  done(fn: () => void) {
    return this.on('done', fn);
  }

  emit(eventName: string, ...args: any): Waiter<T> {
    this.em.emit(eventName, ...args);

    return this;
  }

  on<Arg = void>(eventName: string, callback: (arg: Arg) => void): Waiter<T> {
    this.em.on(eventName, callback);

    return this;
  }
}

export class Waitable<T> {
  protected waiter: Waiter<T>;

  protected prom: Promise<T>;

  constructor(protected _p: (w: Waiter<T>) => Promise<T>) {
    this.waiter = new Waiter(new EventEmitter());
    this.prom = this._p(this.waiter);
    this.waiter.call(this.prom);
  }

  promise(swallowError?: boolean): Promise<T> {
    if (swallowError) {
      this.prom.catch(console.warn);
    }
    return this.prom;
  }

  wait(): Waiter<T> {
    return this.waiter;
  }
}
