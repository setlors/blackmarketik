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
  }
}
