			
			
			var container = document.getElementById('threedcontainer');//
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, container.clientWidth/container.clientHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(container.clientWidth, container.clientHeight);
			container.appendChild(renderer.domElement);
			
		

			var geometry = new THREE.BoxGeometry( 3, 2, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			var edges = new THREE.EdgesGeometry( geometry );
			var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
			scene.add( line );
			scene.add( cube );

			camera.position.z = 5;

			renderer.render( scene, camera );
	
			function updateRotation(rx,ry,rz){
				cube.rotation.x = rx * 0.01745329251; //degree to radians (pi/180)
				cube.rotation.y = ry * 0.01745329251;
				cube.rotation.z = rz * 0.01745329251;
				renderer.render( scene, camera );
				
			}
			
			
			
			/**
			var animate = function () {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
			**/