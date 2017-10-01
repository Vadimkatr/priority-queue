class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(node === null)
			return false;
		if(this.left === null){
            this.left = node;
            node.parent = this;
			return true;
		}
		else if(this.right === null){
			this.right = node;
			node.parent = this;
			return true;
		}
		return false;
	}

	removeChild(node) {
		let key = '';

		if (node.data == this.left.data && node.priority == this.left.priority)
			key = 'left';
		else if (node.data == this.right.data && node.priority == this.right.priority)
			key = 'right';
		else throw new Error();

		this[key] = null;
		node.parent = null;
		return true;

	}

	remove() {
		this.parent !== null ? this.parent.removeChild(this) : {};
	}

	removeBothChild(){
		this.left = this.right = null;
	}

	swapWithParent() {
		if(this.parent !== null){
			let key = this.whichSon();
			let pp = this.parent.parent;
			let child = this;
			let lChild = this.left;
			let rChild = this.right;
			this.removeBothChild();
			let parent = this.parent;
			let plChild = this.parent.left;
			let prChild = this.parent.right;
			this.parent.removeBothChild();
			parent.appendChild(lChild);
			parent.appendChild(rChild);
			if(key == 'left'){
				this.appendChild(parent);
				this.appendChild(prChild);
			}
			else{
				this.appendChild(plChild);
				this.appendChild(parent);
			}
			if(pp!==null){
				pp.removeChild(parent);
				pp.appendChild(this);
			}
			this.parent = pp;
			return true;
		}
		return false;
	}
	
	whichSon(){
		return this.parent !== null ? ( this.parent.left === this ? 'left' : 'rigth') :  false;
	}

	isParent(parent){
		return this.parent === parent ? true : false;
	}
}

module.exports = Node;