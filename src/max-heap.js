const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.nextNode = null;
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.root != null){
			let detached = this.detachRoot();
			if(this.parentNodes.length != 0){
				this.restoreRootFromLastInsertedNode(detached);
				this.shiftNodeDown(this.root);
			}
			this.heapSize--;
			return detached.data;
		}
		return;
	}

	detachRoot() {
		if(this.root === null)
			return;
		let node = this.root;
		this.root = null;
		if(this.parentNodes[0] === node)
			this.parentNodes.shift();
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length != 0){
			 this.root = this.parentNodes.pop();
			 this.root.parent = null;
			 this.root.left = detached.left;
			 if (detached.left !== null && detached.left !== undefined && detached.left != this.root) // undefined ???????? зачем??
				 detached.left.parent = this.root;
			 else this.root.left = null;
			 this.root.right = detached.right;
			 if (detached.right !== null && detached.right !== undefined && detached.right != this.root)
				 detached.right.parent = this.root;
			 else this.root.right = null;
			 if (this.root.hasChild() != "both" && this.root.hasChild() != "no") {
				 this.parentNodes.unshift(this.root);
			 }
		}
		else return {};
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.heapSize == 0 ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		this.heapSize++;
		this.parentNodes.push(node);
		
		if(this.root === null){
			this.root = this.parentNodes[0];		
			
			return;
		}
		this.parentNodes[0].appendChild(node);
		if(this.parentNodes[0].left != null &&
			this.parentNodes[0].right != null)
			this.parentNodes.shift();
			
	}

	shiftNodeUp(node) {
		if (node.parent == null){
			this.root = node;
			return;
		}
		if (node.parent.priority < node.priority)
		{	
			let parent = node.parent;
			if(this.parentNodes.indexOf(parent) != -1){
				let tmp = this.parentNodes[this.parentNodes.length - 1];
				this.parentNodes[this.parentNodes.length - 1] = this.parentNodes[0];
				this.parentNodes[0] = tmp;
			}
			else if(this.parentNodes.indexOf(node) != -1){
				let i = this.parentNodes.indexOf(node);
				this.parentNodes[i] = parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {

		function swapInParentNodes(node, nodeChild){
			let nodeIndex = this.parentNodes.indexOf(node);
			let childIndex = this.parentNodes.indexOf(nodeChild);
			if(nodeIndex == -1 && childIndex != -1){
				this.parentNodes[childIndex] = node;
			}
			else if(nodeIndex != -1 && childIndex != -1){
				let tmp = this.parentNodes[nodeIndex];
				this.parentNodes[nodeIndex] = this.parentNodes[childIndex];
				this.parentNodes[childIndex] = tmp;
			}
		}

		if (node.hasChild() == "both") {
			if (node.priority < node.left.priority || node.priority < node.left.priority){
				if (node.left.priority > node.right.priority) {
					if (this.root == node)
						this.root = node.left;
					swapInParentNodes.call(this, node, node.left);
					node.left.swapWithParent();
				}
				else {
					if (this.root == node)
						this.root = node.right;
					swapInParentNodes.call(this, node, node.right);
					node.right.swapWithParent();
				}
					this.shiftNodeDown(node);
			}
			else return;
		}
		else if(node.hasChild() == "left"){
			if(node.priority < node.left.priority){
				if (this.root == node)
					this.root = node.left;
				swapInParentNodes.call(this, node, node.left);
				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
			else return;
		}
		else if(node.hasChild() == "right"){
			if (node.priority < node.right.priority) {
				if (this.root == node)
					this.root = node.right;
				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
			else return;
		}
		else return;
	}
}

module.exports = MaxHeap;
const h = new MaxHeap();
console.log(h.size() === 0);

h.push(15, 42);
h.push(13, 0);
console.log(h.size() === 2);

h.push(14, 100);
console.log(h.size() === 3);

h.pop();
h.pop();
console.log(h.size() === 1);

h.clear();
console.log(h.size() === 0);