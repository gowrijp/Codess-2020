const states = Object.freeze({
  canvas: $("#graph-canvas"),
  rowCountInput: $("#row-count"),
  columnCountInput: $("#column-count"),
  boxSizeInput: $("#box-size"),
  toolModeInput: $("input[name=selectionMode]:radio"),
  clearGraphBtn: $("#clear-graph-btn"),
  resetGraphBtn: $("#reset-graph-btn"),
  startStopBtn: $(".start-stop-btn"),
  width: $("#graph-canvas").width(),
  height: $("#graph-canvas").height(),
  actionPanel: $(".action-panel"),
  //stationsCheck: $(".stations-check"),
  algoSelection: $(".algo-selection"),
  /*speedSelection: $(".speed-selection"),*/
  /*randomWallGenerator: $(".random-wall-generator"),*/
  algoNameDisplay: $("#selected-algo-name"),
  speedNameDisplay: $("#selected-speed-name"),
  runnerDuration: $("#runner-duration"),
  /*enableStations: $("#enable-stations"),*/
  currentPathSpeed: 6,
  /*nextStepBtn: $(".next-step"),*/
  /*admissibleValue: $("#admissible-value"),
  admissibleValueDisplay: $("#admissibleValueDisplay"),*/
  WEIGHTS_VALUE: Object.freeze({
    weight1: 3,
    weight2: 5,
    weight3: 10,
  
  }),

  DEFAULT_WEIGHT: 3,
  MAX_STATIONS: 6,
  MAX_END_NODE_COUNT: 3,
  MAX_FIXED_FRAME_COUNT: 400,
  DEFAULT_BOX_SIZE: window.innerWidth > 600 ? 30 : 30,
  COLORS: Object.freeze({
    BOX_BORDER_COLOR: "rgba(150,150,150,0.8)",
    BOX_TYPE_BLOCK_COLORS: ["#2b2b2b", "#1c1c1c"],
    BOX_TYPE_CLEAR_COLOR: "rgb(255,255,255)",
    BOX_TYPE_STATION_COLORS: ["#00c6ff", "#0072ff"],
    BOX_TYPE_START_NODE_COLORS: ["#238c00", "#006b19"],
    BOX_TYPE_END_NODE_COLORS: ["#fa021b", "#bf0013"],
    BOX_TYPE_TRAVERSED_NODE_COLORS: ["#134E5E", "lightgreen"],
    BOX_TYPE_PATH_NODE_COLORS: ["#FF8008", "#FFC837"],
    BOX_TYPE_ERROR_NODE_COLOR: "#6c757d",
    BOX_TYPE_WEIGHT_COLORS: ["#ffa703","#b37400"]
  }),
  DEFAULT_POS: Object.freeze({
    START_X:15,
    START_Y:10,
    END_X:30,
    END_Y:10
  }),
  TOOL_MODE: Object.freeze({
    START_NODE: 0,
    TARGET_NODE: 1,
    WALL_NODES: 2,
    STATION_NODES: 3,
    WEIGHT_NODES: 4
  }),
  BOX_TYPES: Object.freeze({
    BLOCK: 0,
    CLEAR: 1,
    START_NODE: 2,
    END_NODE: 3,
    WEIGHT_NODE: 4,
    STATION_NODE: 5,
    ERROR_NODE: 6,
  }),
  RunnerSpeeds: Object.freeze({
    Fast: 0,
    Medium: 128,
    Slow: 256,
    Step: null
  }),
  Runners: Object.freeze({
    aStar: AStar,
    idAStar: IDAStar,
    bfs: BreadthFirstSearch,
    idDepthFirst: IDDepthFirstSearch,
    bestFirst: AStar,
    dijkstra: AStar,
    //bellman: BellmanFord,
    /*jps: JumpPointSearch,
    orthoJps: JumpPointSearch,*/
    travelSales: TravelingSalesman,
    multiStop: MultipleStops,
    biBFS: BiBreadthFirstSearch,
    biAStar: BiAStar,
    biBestFirst: BiAStar,
    biDijkstra: BiAStar
  }),
  Context: {
    ActiveGrid: null,
    Runner:null,
    //searchQueue: null,
    //pathQueue: null,
    FREE: true, /*keeps track of whether the runner is free or running*/
    //AdmissibleValue: 1
    weight:null,
  }
});