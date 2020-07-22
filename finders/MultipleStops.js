class MultipleStops
{
    constructor(options)
    {
        options = options || {};

        this.allowDiagonal = options.allowDiagonal;
        this.dontCrossCorners = options.dontCrossCorners;
        this.heuristic = !options.allowDiagonal ? 
                         (options.heuristic || Heuristic.Manhattan) : 
                         (options.heuristic || Heuristic.Octile);
        this.searchAlgo = new AStar({'allowDiagonal' : this.allowDiagonal,
                                      'dontCrossCorners' : this.dontCrossCorners,
                                      'heuristic' : this.heuristic});
        this.maxCost = options.maxCost || 100;
        this.w = 0.6;
    }

    pathFinder(startX, startY, endX, endY, grid, lines)
    {
        var graph = grid.graph,
            arrayOfInter = grid.arrayOfInter,
            start = graph.getNodeAt(startX, startY),
            end = graph.getNodeAt(endX, endY),
            i, j;

        /*
            algo has been split into different sections for ease of understanding
        */
    
        var route = [];
        /*
            arrayOfInter is an array of intermediate coordinates [x,y]
        */

        route.push(start);
        start.id = 0;

        for(i = 0; i < arrayOfInter.length; i++)
        {
            var interNode = graph.getNodeAt(arrayOfInter[i].x, arrayOfInter[i].y);
            route.push(interNode);
            route[i + 1].id = i + 1;
        }

        route.push(end);
        route[i + 1].id = i + 1;

        var l = route.length,
            adjacencyMatrix = [];
      
        for(i = 0; i < l; i++)
        {
            var temp = [];
            for(j = 0; j < l; j++)
            {
                if(i == j)
                {
                    temp.push(0);
                }
                else
                {
                    temp.push(Infinity);
                }
            }
            adjacencyMatrix.push(temp);
        }

        for(i = 0; i < l; i++)
        {
            for(j = i + 1; j < l; j++)
            {
                grid.fixGrid();
                var path = this.searchAlgo.pathFinder(route[i].x, route[i].y, route[j].x, route[j].y, 
                                                        graph, 'a-star', true);
                if(path.length)
                {
                    adjacencyMatrix[i][j] = adjacencyMatrix[j][i] = this.searchAlgo.pathCost;
                }
            }
        }        
        
        
        /*
            g = distance from start to the current node covering all previous stations in the
                route.
            h = distance from the current node to end (no stations in between)
            f = g + h
        */
        start.g = 0;
        end.h = 0;
        end.g = end.f = start.h = start.f = adjacencyMatrix[0][l - 1];
   
        for(i = 1; i < l - 1; i++)
        {
            for(j = i; j < l - 1; j++)
            {
                route[j].g = adjacencyMatrix[route[i - 1].id][route[j].id] + route[i - 1].g;
                route[j].h = adjacencyMatrix[route[j].id][route[l - 1].id];
                route[j].f = this.w * route[j].g + (1 - this.w) * route[j].h;

                if(route[j].f < route[i].f)
                {
                    var temp = route[i];
                    route[i] = route[j];
                    route[j] = temp;
                }
            }
        }

        var lastInter = -1, path = [];
  
        for(var i = l - 2; i >= 0; i--)
        {
            if(route[i].f <= this.maxCost)
            {
                lastInter = i;
                break;
            }
        }

        if(lastInter == -1)
        {
            alert("Sorry... No way to cover all nodes 😢. Maybe the maximum cost is too low.");
            return [];
        }

        for(i = 0; i <= lastInter; i++)
        {  
            var node = grid.graph.getNodeAt(route[i].x, route[i].y);  //HERE
            node.changeText(i);  // HERE

            grid.graph.resetVisited();

            if(i == lastInter)
            {
                var node = grid.graph.getNodeAt(route[l - 1].x, route[l - 1].y);  //HERE
                node.changeText(i + 1);  // HERE
                path = this.searchAlgo.pathFinder(route[i].x, route[i].y, route[l - 1].x, route[l - 1].y,
                                                    graph, 'a-star', false);
            }

            else
            {
                path = this.searchAlgo.pathFinder(route[i].x, route[i].y, route[i + 1].x, route[i + 1].y,
                                                    graph, 'a-star', false);
            }
                   
            if(path.length - 2 > 0)
            {
                var prevPoint = [path[0][0], path[0][1]];
            
                for(j = 1; j < path.length - 1; j++)
                {
                    var box = graph.getNodeAt(path[j][0], path[j][1]);
                    box.setAsPath();
                    lines.drawLine(prevPoint[0], prevPoint[1], box.x, box.y);
                    prevPoint = [box.x, box.y];
                }
            
                lines.drawLine(prevPoint[0], prevPoint[1], path[path.length - 1][0], path[path.length - 1][1]);
            }
        }
        return [];
    }
};

