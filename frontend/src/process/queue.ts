interface queueEl {
  item: string;
  priority: number;
  counter: number;
}

export class BiQueue {
  queue: queueEl[];
  counter: number;

  constructor() {
    this.queue = [];
    this.counter = 0;
  }

  enqueue(item: string, priority: number) {
    const object: queueEl = {
      item: item,
      priority: priority,
      counter: this.counter,
    };
    this.queue.push(object);
    this.counter += 1;
  }

  dequeue(mode: string) {
    if (mode === "oldest") return this.queue.shift();
    else if (mode === "newest") return this.queue.pop();
    else if (mode === "highest") {
      let prIndex = 0;

      this.queue.forEach((el, i) => {
        if (el.priority > this.queue[prIndex].priority) {
          prIndex = i;
        }
      });

      const delEl = this.queue.splice(prIndex, 1);
      return delEl[0];
    } else if (mode === "lowest") {
      let prIndex = 0;

      this.queue.forEach((el, i) => {
        if (el.priority < this.queue[prIndex].priority) {
          prIndex = i;
        }
      });

      const delEl = this.queue.splice(prIndex, 1);
      return delEl[0];
    }
  }

  peek(mode: string) {
    if (mode === "oldest") return this.queue[0];
    else if (mode === "newest") return this.queue[this.queue.length - 1];
    else if (mode === "highest") {
      let prIndex = 0;

      this.queue.forEach((el, i) => {
        if (el.priority > this.queue[prIndex].priority) {
          prIndex = i;
        }
      });

      return this.queue[prIndex];
    } else if (mode === "lowest") {
      let prIndex = 0;

      this.queue.forEach((el, i) => {
        if (el.priority < this.queue[prIndex].priority) {
          prIndex = i;
        }
      });

      return this.queue[prIndex];
    }
  }
}
