(function() {

	// Inspired by http://informationandvisualization.de/blog/box-plot
	d3.box = function() {
		var width = 1, height = 1, duration = 0, domain = null, value = Number, whiskers = boxWhiskers, quartiles = boxQuartiles, tickFormat = null;
		// For each small multiple�
		function box(g) {
			// alert(g);
			g
					.each(function(d, i) {
						// alert(d);
						d = d.map(value).sort(d3.ascending);
						// alert(d);
						var g = d3.select(this), n = d.length, min = d[0], max = d[n - 1];

						// Compute quartiles. Must return exactly 3 elements.
						var quartileData = d.quartiles = quartiles(d);

						// Compute whiskers. Must return exactly 2 elements, or
						// null.
						var whiskerIndices = whiskers
								&& whiskers.call(this, d, i), whiskerData = whiskerIndices
								&& whiskerIndices.map(function(i) {
									return d[i];
								});
						// Compute outliers. If no whiskers are specified, all
						// data are "outliers".
						// We compute the outliers as indices, so that we can
						// join across transitions!
						var outlierIndices = whiskerIndices ? d3.range(0,
								whiskerIndices[0]).concat(
								d3.range(whiskerIndices[1] + 1, n)) : d3
								.range(n);

						var xScale = d3.scale.linear().domain([ 0, 0 ]).range(
								[ 0, width * 4 ]);

						var yScale = d3.scale.linear().domain(
								[ 0, Math.ceil(d3.max(d, function(d) {
									return d;
								})) ]).range([ height + 5, 0 ]);

						var xAxis = d3.svg.axis().scale(xScale)
								.orient("bottom").ticks(0);

						var yAxis = d3.svg.axis().scale(yScale).orient("left")
								.ticks(5);

						// Compute the new x-scale.
						var x1 = d3.scale.linear().domain([ min, Math.ceil(max) ]).range(
								[ height, 0 ]);

						// Retrieve the old x-scale, if this is an update.
						var x0 = d3.scale.linear().domain([ 0, Infinity ])
								.range(x1.range());

						// Stash the new scale.
						this.__chart__ = x1;

						// Note: the box, median, and box tick elements are
						// fixed in number,
						// so we only have to handle enter and update. In
						// contrast, the outliers
						// and other elements are variable, so we need to exit
						// them! Variable
						// elements also fade in and out.

						// Update center line: the vertical line spanning the
						// whiskers.
						var center = g.selectAll("line.center").data(
								whiskerData ? [ whiskerData ] : []);

						center.enter().insert("line", "rect").attr("class",
								"center").attr("x1", width / 2).attr("y1",
								function(d) {
									return x1(d[0]);
								}).attr("x2", width / 2).attr("y2",
								function(d) {
									return x1(d[1]);
								}).style("opacity", 1e-6).style("stroke-width",
								"1px").style("stroke", "#000");

						center.transition().duration(duration).style("opacity",
								1).attr("y1", function(d) {
							return x1(d[0]);
						}).attr("y2", function(d) {
							return x1(d[1]);
						});

						center.exit().transition().duration(duration).style(
								"opacity", 1e-6).attr("y1", function(d) {
							return x1(d[0]);
						}).attr("y2", function(d) {
							return x1(d[1]);
						}).remove();

						// Update innerquartile box.
						var box = g.selectAll("rect.box")
								.data([ quartileData ]);

						box.enter().append("rect").attr("class", "box").attr(
								"x", 0).attr("y", function(d) {
							return x0(d[2]);
						}).attr("width", width).attr("height", function(d) {
							return x1(d[0]) - x1(d[2]);
						}).style("fill", "#4b749b").style("stroke",
								"#000").style("stroke-width", "1.5px");

						box.transition().duration(duration).attr("y",
								function(d) {
									return x1(d[2]);
								}).attr("height", function(d) {
							return x1(d[0]) - x1(d[2]);
						});

						// Update median line.
						var medianLine = g.selectAll("line.median").data(
								[ quartileData[1] ]);

						medianLine.enter().append("line").attr("class",
								"median").attr("x1", 0).attr("y1", x1).attr(
								"x2", width).attr("y2", x1).style("stroke",
								"#000").style("stroke-width", "1.5px").style(
								"fill", "#fff");

						medianLine.transition().duration(duration).attr("y1",
								x1).attr("y2", x1);

						// Update whiskers.
						var whisker = g.selectAll("line.whisker").data(
								whiskerData || []);

						whisker.enter().insert("line", "circle, text").attr(
								"class", "whisker").attr("x1", 0)
								.attr("y1", x1).attr("x2", width)
								.attr("y2", x1).style("opacity", 1).style(
										"stroke", "#000").style("stroke-width",
										"1.5px").style("fill", "#fff");

						whisker.transition().duration(duration).attr("y1", x1)
								.attr("y2", x1).style("opacity", 1);

						whisker.exit().transition().duration(duration).attr(
								"y1", x1).attr("y2", x1).style("opacity", 1e-6)
								.remove();

						g.append("g").attr("class", "axis").attr("transform",
								"translate(-20, -1)").style('fill', 'none')
								.style('stroke', 'black').style('stroke-width',
										'1px').call(yAxis);

						g.append("g").attr("class", "axis").attr("transform",
								"translate(-20, 224)").style('fill', 'none')
								.style('stroke', 'black').style('stroke-width',
										'1px').call(xAxis);

						g.append('text').text('Impact Factor').attr(
								'transform',
								"rotate (-90, -55, 0) translate(-200)");

						g.append('text').text(categoryName).attr('transform',
								"translate(-10, 240)");

						// Compute the tick format.
						var format = tickFormat || x1.tickFormat(8);

						// Update box ticks.
						var boxTick = g.selectAll("text.box")
								.data(quartileData);
					});
			// d3.timer.flush();
		}

		box.width = function(x) {
			if (!arguments.length)
				return width;
			width = x;
			return box;
		};

		box.height = function(x) {
			if (!arguments.length)
				return height;
			height = x;
			return box;
		};

		box.tickFormat = function(x) {
			if (!arguments.length)
				return tickFormat;
			tickFormat = x;
			return box;
		};

		box.duration = function(x) {
			if (!arguments.length)
				return duration;
			duration = x;
			return box;
		};

		box.domain = function(x) {
			if (!arguments.length)
				return domain;
			domain = x == null ? x : d3.functor(x);
			return box;
		};

		box.value = function(x) {
			if (!arguments.length)
				return value;
			value = x;
			return box;
		};

		box.whiskers = function(x) {
			if (!arguments.length)
				return whiskers;
			whiskers = x;
			return box;
		};

		box.quartiles = function(x) {
			if (!arguments.length)
				return quartiles;
			quartiles = x;
			return box;
		};

		return box;
	};

	function boxWhiskers(d) {
		alert(d);
		alert(d.length - 1);
		return [ 0, d.length - 1 ];
	}

	function boxQuartiles(d) {
		return [ d3.quantile(d, .25), d3.quantile(d, .5), d3.quantile(d, .75) ];
	}

})();
