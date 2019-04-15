/* eslint-disable no-console, no-unused-vars */
/* global $, cytoscape, options, cy */

var cy, defaultSty, options;

(function(){
  defaultSty  = cytoscape.stylesheet()

      .selector('node')
        .style({
          'label': 'data(label)',
          'background-color': 'green',
        })

      .selector('edge')
        .style({
            'width': '3px',
            'opacity': 0.8,
        })
  ;

  options = {
    container: $('#cytoscape'),

    renderer: {
      name: 'canvas',
      showFps: true
    },

    layout: {
      name: 'preset',
      cols: 3
    },

    style: defaultSty,

    elements: {
      nodes: [
        // { data: { id: 'a', weight: 50 } },
        // { data: { id: 'b', weight: 30 } },
        // { data: { id: 'c', weight: 20 } },
        // { data: { id: 'd', weight: 10 } },
        // { data: { id: 'e', weight: 75 } },
        // { data: { id: 'f', weight: 100 } }
      ],

      edges: [
        // { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
        // { data: { id: 'aa', weight: 2, source: 'a', target: 'a' } },
        // { data: { id: 'aa2', weight: 2, source: 'a', target: 'a' } },
        // { data: { id: 'aa3', weight: 2, source: 'a', target: 'a' } },
        // { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
        // { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
        // { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
        // { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
        // { data: { id: 'ce2', weight: 6, source: 'c', target: 'e' } },
        // { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
        // { data: { id: 'de', weight: 7, source: 'd', target: 'e' } },
        // { data: { id: 'de2', weight: 7, source: 'd', target: 'e' } },
        // { data: { id: 'de3', weight: 7, source: 'd', target: 'e' } },
        // { data: { id: 'de4', weight: 7, source: 'd', target: 'e' } },
        // { data: { id: 'de5', weight: 7, source: 'd', target: 'e' } },
        // { data: { id: 'bf', weight: 3, source: 'b', target: 'f' } }
      ]
    }
  };

  cy = cytoscape(options);
})();
