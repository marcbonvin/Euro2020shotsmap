let holder = d3.select("body")
      .append("svg")           // append an SVG element to the div
      .attr("width", 750)      
      .attr("height", 467);   


// draw a rectangle - pitch
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 0)          // position the top of the rectangle
    .attr("height", 467)    // set the height
    .attr("width", 750)    // set the width
    .style("stroke-width", 0)    // set the stroke width
    .style("fill", "#80B280");    // set the fill colour 


// draw penalty area 
holder.append("rect")        // attach a rectangle
    .attr("x", 135)         // position the left of the rectangle
    .attr("y", 90)          // position the top of the rectangle
    .attr("height", 125)    // set the height
    .attr("width", 480)    // set the width
    .style("stroke-width", 4)    // set the stroke width
    .style("stroke", "white")    // set the line colour
     .style("fill", "#80B280");    // set the fill colour 


// // draw a six yard box
 holder.append("rect")        // attach a rectangle
    .attr("x", 252)         // position the left of the rectangle
    .attr("y", 90)          // position the top of the rectangle
    .attr("height", 47)    // set the height
    .attr("width", 246)    // set the width
    .style("stroke-width", 4)    // set the stroke width
    .style("stroke", "white")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 


// // draw a circle - penalty spot 1
holder.append("circle")        // attach a circle
    .attr("cx", 375)           // position the x-centre
    .attr("cy", 171)           // position the y-centre
    .attr("r", 3)             // set the radius
    .style("fill", "white");     // set the fill colour



// // penalty box semi-circle 1
var arc = d3.svg.arc()
    .innerRadius(68)
    .outerRadius(72)
    .startAngle(2.25) //radians
    .endAngle(4.05) //just radians
    
    holder.append("path")
    .attr("d", arc)
    .attr("fill", "white")
    .attr("transform", "translate(375,171)");

// center circle
var arc1 = d3.svg.arc()
    .innerRadius(70)
    .outerRadius(74)
    .startAngle(6) //radians
    .endAngle(-1) //just radians
    
    holder.append("path")
    .attr("d", arc1)
    .attr("fill", "white")
    .attr("transform", "translate(375,465)");


// // add goal
 holder.append("rect")        // attach a rectangle
    .attr("x", 333)         // position the left of the rectangle
    .attr("y", 57)          // position the top of the rectangle
    .attr("height", 33)    // set the height
    .attr("width", 84)    // set the width
    .style("stroke-width", 4)    // set the stroke width
    .style("stroke", "#EEEEEE")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 

// draw goal line 
holder.append("line")
    .attr("x1", 0)
    .attr("y1", 90)
    .attr("x2", 750)
    .attr("y2", 90)
    .style("stroke-width", 4)    // set the stroke width
    .style("stroke", "white")    // set the line colour


// draw half way line 
holder.append("line")
    .attr("x1", 0)
    .attr("y1", 465)
    .attr("x2", 750)
    .attr("y2", 465)
    .style("stroke-width", 4)    // set the stroke width
    .style("stroke", "white")    // set the line colour
    
// TOOLTIP SETUP

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Opponent:</strong> <span style='color:red'>" + d.opp + "</span>" + "<br>" + 
    "<strong>Venue:</strong> <span style='color:lime'>" + d.ha + "</span>" + "<br>" + 
    "<strong>Time:</strong> <span style='color:orange'>" + d.time  + "</span>"
    ;
  })

holder.call(tip);


// colors of dots
var color = d3.scale.ordinal()
.range(["blue", "red", "yellow", "lightgray", "peru"]);



// add points  
d3.csv("shots.txt", function(error, dots) {



  holder.append("g")
      .selectAll("circle")
      .data(dots)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return +d.d3x; })
      .attr("cy", function(d) { return +d.d3y; })
      .style("stroke-width", 2)    // set the stroke width
      .style("stroke", "black")    // set the line colour
      .style("fill", function(d) { return color(d.event)})
      .style("opacity", 0)    // set the initialopacity
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .transition()
      .delay(function(d,i){return  i * 200})
      .duration(200)
      .style("opacity", 1)    // set the opacity           
            ;

});



// Legend 1
var dataset = [
              {x: 600, y: 15, r: 4, color: "yellow", txt: "Goal"},
              {x: 600, y: 30, r: 4, color: "red", txt: "On-Target"},
              {x: 600, y: 45, r: 4, color: "blue", txt: "Off-Target"},
              {x: 600, y: 60, r: 4, color: "peru", txt: "Hit Woodwork"},
              {x: 600, y: 75, r: 4, color: "lightgray", txt: "Blocked"}
                       ];

      holder.append("g")
         .selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", function(d) { return d.x; })
         .attr("cy", function(d) { return d.y; })
         .attr("r", function(d) { return d.r; })
         .style("stroke-width", 2)    // set the stroke width
         .style("stroke", "black")    // set the line colour
         .style("fill", function(d) {return d.color;})
   ;

var text = holder.append("g").selectAll("text")
                        .data(dataset)
                        .enter()
                        .append("text");

var textLabels = text
                 .attr("x", function(d) { return d.x +7; })
                 .attr("y", function(d) { return d.y +3; })
                 .text( function (d) { return d.txt; })
                 .attr("font-family", 'Arial')
                 .attr("font-size", "10px")
                 .attr("fill", "black");



// Plot Title
var dataset1 = [
              {x: 25, y: 25, fs: "18px", txt: "Loïc Rémy"},
              {x: 25, y: 45, fs: "14px", txt: "Newcastle United"},
              {x: 25, y: 60, fs: "12px", txt: "2013/14"}
                       ];
var text1 = holder.append("g").selectAll("text")
                        .data(dataset1)
                        .enter()
                        .append("text");

var textLabels1 = text1
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .text( function (d) { return d.txt; })
                 .attr("font-family", 'Arial')
                 .attr("font-size", function (d) { return d.fs; })
                 .attr("fill", "black");