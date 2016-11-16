function Paginator(per_page, length) {
	if (!(this instanceof Paginator)) {
		return new Paginator(per_page, length);
	}

	this.per_page = per_page || 20;
	this.length = length || 10;
}

Paginator.prototype.build = function(total_results, current_page) {

	var total_pages = Math.ceil(total_results / this.per_page);

	if (current_page < 1) { current_page = 1; }

	if (current_page > total_pages) { current_page = total_pages; }

	var first_page = Math.max(1, current_page - Math.floor(this.length / 2));

	var last_page = Math.min(total_pages, current_page + Math.floor(this.length / 2));

if (last_page - first_page + 1 < this.length) {
		if (current_page < (total_pages / 2)) {
			last_page = Math.min(total_pages, last_page + (this.length - (last_page - first_page)));
		} else {
			first_page = Math.max(1, first_page - (this.length - (last_page - first_page)));
		}
	}

if (last_page - first_page + 1 > this.length) {
		if (current_page > (total_pages / 2)) {
			first_page++;
		} else {
			last_page--;
		}
	}

var first_result = this.per_page * (current_page - 1);
	if (first_result < 0) { first_result = 0; }

var last_result = (this.per_page * current_page) - 1;
	if (last_result < 0) { last_result = 0; }
	if (last_result > Math.max(total_results - 1, 0)) { last_result = Math.max(total_results - 1, 0); }

return {
		total_pages: total_pages,
		pages: Math.min(last_page - first_page + 1, total_pages),
		current_page: current_page,
		first_page: first_page,
		last_page: last_page,
		previous_page: current_page - 1,
		next_page: current_page + 1,
		has_previous_page: current_page > 1,
		has_next_page: current_page < total_pages,
		total_results: total_results,
		results: Math.min(last_result - first_result + 1, total_results),
		first_result: first_result,
		last_result: last_result,
	};
};

module.exports = Paginator;