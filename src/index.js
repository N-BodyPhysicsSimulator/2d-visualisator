var actions = {
    'UP': 1,
    'DOWN': 2,
    'LEFT': 3,
    'RIGHT': 4
};

var keyToAction = {
    'ArrowLeft': actions.LEFT,
    'ArrowRight': actions.RIGHT,
    'ArrowDown': actions.DOWN,
    'ArrowUp': actions.UP,

    'a': actions.LEFT,
    'd': actions.RIGHT,
    's': actions.DOWN,
    'w': actions.UP,
};

var canvas = document.createElement('canvas');
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize($(window).width(), $(window).height());
document.body.appendChild(canvas);

window.addEventListener("resize", function(e) {
    var width = $(window).width(), height = $(window).height();

    window.cam.aspect = width / height;
    window.cam.updateProjectionMatrix();

    renderer.setSize(width, height);
});

var scene = new THREE.Scene();

window.cam = new THREE.PerspectiveCamera(75, renderer.context.canvas.width / renderer.context.canvas.height, 0.1, 1000);
window.cam.position.set(0,0,30);

var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
scene.add(sphere);

window.sphere2 = new THREE.Mesh(new THREE.SphereGeometry(10, 100, 10), new THREE.MeshNormalMaterial());
scene.add(window.sphere2);

renderer.render(scene, window.cam);

window.camera = { z: 100, x: 0, y: 0 };

function renderScene() {
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.001;

    window.sphere2.position.x += 0.1
    window.sphere2.position.z += 0.1
    window.sphere2.position.y += 0.1
    
    window.cam.position.set(window.camera.x, window.camera.y, window.camera.z);
    
    renderer.render(scene, cam);
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(callback){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//rendering ausführen
(function animloop(){
  requestAnimFrame(animloop);
  renderScene();
})();

window.addEventListener('mousewheel', function(e){
    window.camera.z -= (e.wheelDelta / 10);
});

$("canvas").mousedown(function() {
   $(this).mousemove(function(e) {
     var x = e.originalEvent.movementX / 3.25;
     var y = e.originalEvent.movementY / 3.25;
     
     window.camera.x -= x * (window.camera.z / 100);
     window.camera.y += y * (window.camera.z / 100);
   });
}).mouseup(function() {
  $(this).unbind('mousemove');
}).mouseout(function() {
  $(this).unbind('mousemove');
});

document.addEventListener('keydown', function(event) {
    var action = keyToAction[event.key];

    switch (action) {
    case actions.UP:
	// Key up (Arrow or w)
	break;
    case actions.DOWN:
	// Key down (Arrow or s)
	break;
    case actions.LEFT:
	// Key left (Arrow or a)
	break;
    case actions.RIGHT:
	// Key right (Arrow or d)
	break;
    }
});
