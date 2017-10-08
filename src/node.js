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
		}
		else if(this.right === null){
			this.right = node;
			node.parent = this;
		}
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
		if(this.parent!==null)
		{
			let parent=this.parent;
			let nextParent=this.parent.parent;
			let left=parent.left;
			let right=parent.right;
			let l=this.left;
			let r=this.right;
			let f=false;
			if(this.parent.left==this)
				f=true;
			this.remove();
			parent.remove();
			if(nextParent!==null)
				nextParent.appendChild(this);
			parent.left=null;
			parent.right=null;
			parent.appendChild(this.left);
			parent.appendChild(this.right);
			this.left=null;
			this.right=null;
			if(f)
			{
				this.appendChild(parent);
				this.appendChild(right);
			}
			else
			{
				this.appendChild(left);
				this.appendChild(parent);
			}

			
		}
	}
	
	whichSon(){
		return this.parent !== null ? ( this.parent.left === this ? 'left' : 'rigth') :  false;
	}
	
	isParent(parent){
		return this.parent === parent ? true : false;
	}

	hasChild(){
		return this.left != null && this.right != null ? "both" :
			this.left == null && this.right != null ? "right" :
			this.left != null && this.right == null ? "left" : "no";
	}
}

module.exports = Node;