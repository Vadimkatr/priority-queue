class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left != null){
			this.left = node;
			return true;
		}
		else if(this.right != null){
			this.right = node;
			return true;
		}
		return false;
	}

	removeChild(node) {
		if(node.data == this.left.data && node.priority == this.left.priority){
			
		}
	}

	remove() {

	}

	swapWithParent() {
		
	}
}

module.exports = Node;
