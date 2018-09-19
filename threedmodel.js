			
			
			var container = document.getElementById('threedcontainer');//
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, container.clientWidth/container.clientHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(container.clientWidth, container.clientHeight);
			container.appendChild(renderer.domElement);
			
		

			var geometry = new THREE.BoxGeometry( 3, 2, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			
	
			function updateRotation(rx,ry,rz){
				cube.rotation.x = rx * Math.PI / 180; //degree to radians
				cube.rotation.y = ry * Math.PI / 180;
				cube.rotation.z = rz * Math.PI / 180;
				
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