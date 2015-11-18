function Queue() {
	this.first = 0;
	this.last = -1;
	this.q = [];
	this.length =  function() {
		return this.last - this.first + 1;
	};
	this.enqueue = function(val) {
		this.q[++this.last] = val;
		return this.length();
	},
	this.dequeue = function() {
		if (this.first > this.last) {
			return void 0;
		}
		var val = this.q[first];
		delete this.q[first];
		this.first++;
		return val;
	}
};
