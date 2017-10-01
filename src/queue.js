const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap();
		this.length = 0;
	}

	push(data, priority) {
		if(this.length === this.maxSize)
			throw new Error();
		this.heap.push(data, priority);
		this.length++;
	}

	shift() {
		if(this.length == 0)
			throw new Error();
		this.length--;
		return this.heap.pop();
		
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return this.length === 0 ? true : false;
	}
}

module.exports = PriorityQueue;