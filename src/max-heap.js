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
		if(typeof(detached.data)==='undefined')
			return;
		if(this.parentNodes.length>0)
		{
			this.root=this.parentNodes.pop();
			if(this.root.parent!=null && this.root.parent !== detached &&this.root.parent.right!=null&&this.root.parent.left!=null)
				this.parentNodes.unshift(this.root.parent);
			this.root.remove();
			this.root.appendChild(detached.left)
			this.root.appendChild(detached.right)
			if(this.root.left==null||this.root.right==null)
				this.parentNodes.unshift(this.root);
		}
		else
			this.root=null;
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