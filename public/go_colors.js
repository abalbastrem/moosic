var genres = new Array("pop", "rock", "electronic", "hiphop", "jazz", "indie", "soundtrack", "classical", "chillout", "ambient", "folk", "metal", "latina", "rnb", "reggae", "punk", "country", "house", "blues");
var index = 0;
var tags;
var moosics;
var path_tags;
var arrayColors = [];

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
            // width: 60,
            // height: 60,
            fill: "whitesmoke",
            // $(go.Brush, "Pattern", {
              // pattern: "https://i.ebayimg.com/images/g/6vcAAOxyq15SOOyM/s-l1600.jpg"
              // pattern: "public/cow_patter_50px.jpg"
            // }),
            stroke: "rgba(16,16,16,0.65)",
            strokeWidth: 4
          },
          new go.Binding("fill", "fill", function(col) {
            // console.log("::::: COLOR INIT: " + col);
            var color = [];
            color.push(col);
            // console.log("::::: COLOR INIT: " + color[0]);
            for (let i = 0; i < 100; i++) {
              // console.log("::::: COLOR ITER: " + i + " " + color[0]);
              color = randomColor({
                hue: color[0],
                luminosity: 'light',
                count: 1
              });
            }
            return color[0];
          }),
          new go.Binding("stroke", "fill", function(col) {
            // dist = Math.min(blues.length - 1, dist);
            // return blues[dist];
            // console.log("::::: FILL: " + color);
            var color = [];
            color.push(col);
            // console.log("::::: COLOR INIT: " + color[0]);
            for (let i = 0; i < 100; i++) {
              // console.log("::::: COLOR ITER: " + i + " " + color[0]);
              color = randomColor({
                hue: color[0],
                luminosity: 'light',
                count: 1
              });
            }
            return color[0];
          })
        ),
        // $(go.Picture, {
        //     stretch: go.GraphObject.Fill,
        //     imageStretch: go.GraphObject.UniformToFill
        //   },
        //   new go.Binding("source", "src")
        // ),
        $(go.TextBlock, {
            font: "12pt Roboto",
            stroke: "rgba(0,0,0,0.90)",
            margin: 10
          },
          new go.Binding("text", "name"))
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
        click: async function(e, obj) { // OBJ is the Button
          var node = obj.part; // get the Node containing this Button
          key = node.data.key;
          if (node === null) return;
          e.handled = true;
          console.log(node);

          if (key == 0) {
            expandNode(node);
            // console.log(arrayColors);
          } else {
            createPathTags(key, node);
            moosics = await getTracks(path_tags);
            console.log(moosics);
            tags = await getTags(path_tags);
            tags = tags.data.slice(0, 10);
            expandNodeTag(node);
          }
        }
      }) // end TreeExpanderButton
    ); // end Node

  // create the model with a root node data
  key = 0;
  myDiagram.model = new go.TreeModel([{
    key: 0,
    name: "moosic",
    id: key,
    // color: blues[0],
    everExpanded: false
  }]);

  function createPathTags(key, data) {

    key = key.replace(/[0-9]/g, '');


    var next_tag;
    var rootdistance = data.data.rootdistance;
    // var key_tag = "";
    path_tags = new Array();
    // path_tags.push(name);
    path_tags.push(key);

    next_tag = data.findTreeParentNode();
    while (rootdistance > 1) {

      path_tags.push((next_tag.data.key).replace(/[0-9]/g, ''));
      next_tag = next_tag.findTreeParentNode();
      // console.log(next_tag);
      // console.log(next_tag.name);

      rootdistance--;
    }
  }

  function expandNode(node) {
    var diagram = node.diagram;
    diagram.startTransaction("CollapseExpandTree");
    // this behavior is specific to this incrementalTree sample:
    var data = node.data;
    if (!data.everExpanded) {
      // only create children once per node
      diagram.model.setDataProperty(data, "everExpanded", true);
      var numchildren = createSubTree(data);
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
    console.log("::::: PARENTDATA: " + parentdata);
    var numchildren = top_tags.length - 1;
    if (myDiagram.nodes.count <= 1) {
      numchildren += 1; // make sure the root node has at least one child
    }
    // create several node data objects and add them to the model
    var model = myDiagram.model;
    var parent = myDiagram.findNodeForData(parentdata);
    console.log("::::: PARENT:");
    console.log(parent);

    var degrees = 1;
    var grandparent = parent.findTreeParentNode();
    while (grandparent) {
      degrees++;
      grandparent = grandparent.findTreeParentNode();
    }

    for (var i = 0; i < numchildren; i++) {
      mainColor = randomColor({
        luminosity: 'light',
        count: 1
      });
      // console.log("::::: REG: " + mainColor);
      // console.log(parent.shape.fill);
      var childdata = {
        fill: mainColor[0],
        stroke: "green",
        key: top_tags[index],
        name: top_tags[index].toLowerCase(),
        parent: parentdata.key,
        // colorcode: ,
        rootdistance: degrees
      };
      index++;
      // add to model.nodeDataArray and create a Node
      model.addNodeData(childdata);
      // position the new child node close to the parent
      var child = myDiagram.findNodeForData(childdata);
      child.fill = "red";
      child.location = parent.location;
    }
    index = 0;
    return numchildren;
  }

  function expandNodeTag(node) {
    var diagram = node.diagram;
    diagram.startTransaction("CollapseExpandTree");
    // this behavior is specific to this incrementalTree sample:
    var data = node.data;
    if (!data.everExpanded) {
      // only create children once per node
      diagram.model.setDataProperty(data, "everExpanded", true);
      // console.log(data);
      // path_tags.push(data.key);
      var numchildren = createSubTreeTags(data);

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

  function createSubTreeTags(parentdata) {
    var numchildren = tags.length;

    if (myDiagram.nodes.count <= 1) {
      numchildren += 1; // make sure the root node has at least one child
    }
    // create several node data objects and add them to the model
    var model = myDiagram.model;
    var parent = myDiagram.findNodeForData(parentdata);
    // console.log(parent.data.__gohashid);
    console.log("::::: INSIDE CREATESUBTREETAGS:");
    console.log(parent);


    var degrees = 1;
    var grandparent = parent.findTreeParentNode();
    while (grandparent) {
      degrees++;
      grandparent = grandparent.findTreeParentNode();
    }
    // path_tags.push(parentdata.key);
    for (var i = 0; i < numchildren; i++) {
      mainColor = randomColor({
        hue: parent.data.fill,
        luminosity: 'light',
        count: 1
      });
      var childdata = {
        fill: mainColor[0],
        key: tags[index].tag,
        id: tags[index].tag,
        name: (tags[index].tag).toLowerCase(),
        parent: parentdata.key,
        // colorcode: myDiagram.findNodeForKey(parentdata.key).style.color,
        tags: path_tags,
        rootdistance: degrees
      };
      index++;
      // add to model.nodeDataArray and create a Node
      model.addNodeData(childdata);
      // position the new child node close to the parent
      var child = myDiagram.findNodeForData(childdata);
      child.location = parent.location;
    }
    index = 0;
    return numchildren;
  }

});
