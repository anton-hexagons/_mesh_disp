///// Mesh Disp by hexagons.se


//// setup

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setViewport(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

canvas = renderer.domElement;
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
document.body.appendChild(canvas);
document.body.style.margin = 0;

var scene = new THREE.Scene();

var ratio = window.innerWidth / window.innerHeight;
var cam = new THREE.PerspectiveCamera(60.0, ratio, 0.01, 10);
cam.position.y = 0.25



//// img

canvas__img_import = document.getElementById("img_import__canvas");
canvas_context__img_import = canvas__img_import.getContext('2d');
img_import = document.getElementById("img_import__img");
canvas__img_import.width = img_import.width;
canvas__img_import.height = img_import.height;
canvas_context__img_import.drawImage(img_import, 0, 0);



//// geo

let res = 512
let luma = 0.05

var geo = new THREE.PlaneGeometry(1, 1, res, res);

for (var i = 0; i < geo.vertices.length; i++) {
	var vert = geo.vertices[i];
	let x = (vert.x + 0.5) * (res - 1),
		y = (vert.y + 0.5) * (res - 1);
	let img_x = (x + 0.5) * (canvas__img_import.width / res),
		img_y = (y + 0.5) * (canvas__img_import.height / res);
	let pix = canvas_context__img_import.getImageData(img_x, img_y, 1, 1).data;
	vert.z = pix[0] / 255 / 10
}
geo.verticesNeedUpdate = true;

let mat = new THREE.MeshBasicMaterial({color: new THREE.Color(luma, luma, luma), wireframe: true});

mat.transparent = true;
mat.blending = THREE["CustomBlending"];
mat.blendSrc = THREE["OneFactor"];
mat.blendDst = THREE["OneFactor"];
mat.blendEquation = THREE.AddEquation;

let mesh = new THREE.Mesh(geo, mat);

mesh.rotation.x = -Math.PI / 2;

scene.add(mesh)



//// render

var i = 0;
var render = function() {
	requestAnimationFrame(render);

	var speed = 200;
	var dist = 1;
	cam.position.x = Math.cos(i / speed) * dist;
	cam.position.z = Math.sin(i / speed) * dist;
	cam.rotation.y = -i / speed + Math.PI / 2;

	renderer.render(scene, cam);
	i++;
}
render();
