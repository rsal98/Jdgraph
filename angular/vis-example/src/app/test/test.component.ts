import { Component, OnInit } from '@angular/core';
import * as vis from 'vis';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

   nodes = new vis.DataSet([
    {'uid': '1x2', 'label': 'Node 1'},
    {'uid': 2, 'label': 'Node 2'},
    {'uid': 3, 'label': 'Node 3'},
    {'uid': 4, 'label': 'Node 4'},
    {'uid': 5, 'label': 'Node 5'}
  ]);
 
  // create an array with edges
   edges = new vis.DataSet([
    {'from': '1x2', "to": 3},
    {'from': '1x2', "to": 2},
    {'from': '2', "to": 4},
    {'from': '2', "to": 5}
  ]);

func(){

 
  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: this.nodes,
    edges: this.edges
  };
  var options = {nodes: {
    shape: "dot",
    size: 16
  },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18
    },
    maxVelocity: 146,
    solver: "forceAtlas2Based",
    timestep: 0.35,
    stabilization: { iterations: 150 }
  }};
  var network = new vis.Network(container, data, options);
}

  ngOnInit() {
  }

}
