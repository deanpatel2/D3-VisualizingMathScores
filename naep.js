//MCAS Vis
const data= d3.json('naep.json').then(data=> {
 
    var margin = { top:100, right: 100, bottom: 50, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  
  // append svg object to the body of the page
  var container1 = d3
    .select("#charts")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Line Chart 1 (12th Grade) ---------------------------------------------
    {

    let parseDate = d3.timeParse("%Y")
    data.forEach(function (d) {
        d.year = parseDate(d.year);
      });

  
  // Add x-axis
  var x1 = d3.scaleTime()
                    .domain(d3.extent(data,d=>d.year))
                    .rangeRound([0,width])
      container1
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x1))
        .call((g) =>
          g
            .append("text")
            .attr("x", width)
            .attr("y", margin.bottom - 4)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr('font-size','11px')
            .attr('font-weight','bold')
            .text('Year')
        );
  
      //Add Y axis
      //var formatPercent = d3.format(".0%");
      var y1 = d3.scaleLinear()
                   .domain([0,90])
                   .rangeRound([height,0])
      //var axis = axisBottom(y1).tickFormat(format('~%'))
      
      container1
        .append("g")
        .call(d3.axisLeft(y1))
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr('font-size','11px')
            .attr('font-weight','bold')
            .text('% at or above Proficiency (12th Grade)')
          .attr('y',-25)
          .attr('x',-80)
        );


 
// Add the White line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#d4caa5")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["White"]) })
)

// Annotation White
container1.append('text')
         .attr('x', 410)
         .attr('y',200)
         .attr('font-size','13px')
         .text("White")

// Add Asian line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#f0c62e")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["Asian"]) })
)

// Annotation Asian
container1.append('text')
         .attr('x', 410)
         .attr('y',125)
         .attr('font-size','13px')
         .text("Asian")

// Add Hispanic line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#b02e07")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["Hispanic/Latino"])})
)

// Annotation Hispanic
container1.append('text')
         .attr('x', 410)
         .attr('y',260)
         .attr('font-size','13px')
         .text("Hispanic/Latino")

// Add Black line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#1f1a19")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["Black"])})
)

// Annotation Black
container1.append('text')
         .attr('x', 410)
         .attr('y',280)
         .attr('font-size','13px')
         .text("Black")

// Add State Average line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#97bdc9")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["National Average"])})
)

// Annotation Black
container1.append('text')
         .attr('x', 410)
         .attr('y',220)
         .attr('font-size','13px')
         .text("National Average")

//Overall Title
d3.select("svg").append('text')
.attr('x',300)
.attr('y',20)
.attr('font-size','18px')
.attr('font-weight','bold')
.attr('text-anchor','middle')
.text("NAEP Math Scores By Demographic (Available years: 2005-2019)")


    }

 
});



// ==================================================================================================================
