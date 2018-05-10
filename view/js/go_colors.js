var genres = new Array("pop", "rock", "electronic", "hiphop", "jazz", "indie", "soundtrack", "classical", "chillout", "ambient", "folk", "metal", "latina", "rnb", "reggae", "punk", "country", "house", "blues");
var top_tags = new Array(
  "Electronic",
  "Rock",
  "Pop",
  "World",
  "Metal",
  "Ambient",
  "Soundtrack",
  "Experimental",
  "Jazz",
  "hiphop"
);
var index = 0;

$(document).ready(function() {
  // Go.js
  if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
  var $ = go.GraphObject.make; // for conciseness in defining templates

  var blues = ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'];

  var myDiagram =
    $(go.Diagram, "myDiagramDiv", {
      initialAutoScale: go.Diagram.UniformToFill,
      contentAlignment: go.Spot.Center,
      layout: $(go.ForceDirectedLayout),
      // moving and copying nodes also moves and copies their subtrees
      "commandHandler.copiesTree": false, // for the copy command
      "commandHandler.deletesTree": false, // for the delete command
      "draggingTool.dragsTree": false, // dragging for both move and copy
      "undoManager.isEnabled": false
    });

  var myModel = $(go.Model);
  myDiagram.model = myModel;

  // Define the Node template.
  // This uses a Spot Panel to position a button relative
  // to the ellipse surrounding the text.
  myDiagram.nodeTemplate =
    $(go.Node, "Spot", {
        selectionObjectName: "PANEL",
        isTreeExpanded: false,
        isTreeLeaf: false
      },
      // the node's outer shape, which will surround the text
      $(go.Panel, "Auto", {
          name: "PANEL"
        },
        $(go.Shape, "Circle", {
            // width: 50,
            // height: 50,
            fill: "whitesmoke",
            stroke: "black"
          },
          new go.Binding("fill", "rootdistance", function(dist) {
            dist = Math.min(blues.length - 1, dist);
            return blues[dist];
          })),
        $(go.TextBlock, {
            font: "12pt Fira Mono",
            margin: 10
          },
          new go.Binding("text", "key"))
      ),
      // the expand/collapse button, at the center corner
      $("TreeExpanderButton", {
        name: 'TREEBUTTON',
        width: 40,
        height: 40,
        alignment: go.Spot.Center,
        alignmentFocus: go.Spot.Center,
        opacity: 0,
        // customize the expander behavior to
        // create children if the node has never been expanded
        click: function(e, obj) { // OBJ is the Button

          // console.log(e);
          // console.log(obj);
          var node = obj.part; // get the Node containing this Button
          key = node.data.key;
          console.log(node.data.key);
          //console.log(node);
          if (node === null) return;
          e.handled = true;
          if (key == 0) {
            expandNode(node);
          } else {
            getTracks(new Array(key));
          }
        }
      }) // end TreeExpanderButton
    ); // end Node

  // create the model with a root node data
  key = 0;
  var mainColor = randomColor({
    luminosity: 'light',
    count: 1
  });
  console.log(mainColor[0]);
  myDiagram.model = new go.TreeModel([{
    key: 0,
    id: key,
    color: mainColor[0],
    everExpanded: false
  }]);

  function expandNode(node) {
    var diagram = node.diagram;
    diagram.startTransaction("CollapseExpandTree");
    // this behavior is specific to this incrementalTree sample:
    var data = node.data;
    // console.log(data);
    if (!data.everExpanded) {
      // only create children once per node
      diagram.model.setDataProperty(data, "everExpanded", true);
      // console.log(data);
      var numchildren = createSubTree(data);
      // console.log(numchildren);
      if (numchildren === 0) { // now known no children: don't need Button!
        node.findObject('TREEBUTTON').visible = false;
      }
    }
    // this behavior is generic for most expand/collapse tree buttons:
    if (node.isTreeExpanded) {
      diagram.commandHandler.collapseTree(node);
    } else {
      diagram.commandHandler.expandTree(node);
    }
    diagram.commitTransaction("CollapseExpandTree");
    // myDiagram.zoomToFit();
  }



  // This dynamically creates the immediate children for a node.
  // The sample assumes that we have no idea of whether there are any children
  // for a node until we look for them the first time, which happens
  // upon the first tree-expand of a node.
  function createSubTree(parentdata) {
    var numchildren = top_tags.length - 1;
    // console.log(numchildren);
    if (myDiagram.nodes.count <= 1) {
      numchildren += 1; // make sure the root node has at least one child
    }
    // create several node data objects and add them to the model
    var model = myDiagram.model;
    var parent = myDiagram.findNodeForData(parentdata);

    var degrees = 1;
    var grandparent = parent.findTreeParentNode();
    while (grandparent) {
      degrees++;
      grandparent = grandparent.findTreeParentNode();
    }

    for (var i = 0; i < numchildren; i++) {
      var childdata = {
        key: top_tags[index],
        parent: parentdata.key,
        rootdistance: degrees
      };
      index++;
      // add to model.nodeDataArray and create a Node
      model.addNodeData(childdata);
      // position the new child node close to the parent
      var child = myDiagram.findNodeForData(childdata);
      child.location = parent.location;
    }
    return numchildren;
  }

});
