var genres = new Array("pop", "rock", "electronic", "hiphop", "jazz", "indie", "soundtrack", "classical", "chillout", "ambient", "folk", "metal", "latina", "rnb", "reggae", "punk", "country", "house", "blues");
var index = 0;
var tags;
var moosics;
var path_tags;

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
            stroke: "black"
          },
          new go.Binding("fill", "rootdistance", function(dist) {
            dist = Math.min(blues.length - 1, dist);
            return blues[dist];
          })),
        $(go.TextBlock, {
            // font: "12pt Roboto",
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
          // console.log(e);
          // console.log(obj);
          var node = obj.part; // get the Node containing this Button
          // console.log(node);
          key = node.data.key;
          // console.log(node.data.key);
          // console.log(node.data.name);
          //console.log(node);
          if (node === null) return;
          e.handled = true;
          // console.log(node.data);

          if (key == 0) {
            console.log(node);
            expandNode(node);
          } else {
            // console.log(node.data.__gohashid);

            createPathTags(key,node);
            // console.log(path_tags);
            // path_tags.push(key);
            moosics = await getTracks(path_tags);
            console.log(moosics);
            tags = await getTags(path_tags);
            tags = tags.data.slice(0,10);
            expandNodeTag(node);
          }
        }
      }) // end TreeExpanderButton
    ); // end Node

  // create the model with a root node data
  key = 0;
  myDiagram.model = new go.TreeModel([{
    key: 0,
    name: "TAGS",
    id: key,
    color: blues[0],
    everExpanded: false
  }]);

  function createPathTags(key,data) {

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
    var numchildren = top_tags.length - 1;
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
        name: top_tags[index].toLowerCase(),
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
    // console.log(parent.data);

    var degrees = 1;
    var grandparent = parent.findTreeParentNode();
    while (grandparent) {
      degrees++;
      grandparent = grandparent.findTreeParentNode();
    }
    // path_tags.push(parentdata.key);
    for (var i = 0; i < numchildren; i++) {
      var childdata = {
        key: tags[index].tag,
        id: tags[index].tag,
        name: (tags[index].tag).toLowerCase(),
        parent: parentdata.key,
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
