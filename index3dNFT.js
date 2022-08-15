import * as THREE from 'https://orvillechomer.github.io/miscJsFiles/THREEJS/build/three.module.js';
import { TrackballControls } from 'https://orvillechomer.github.io/miscJsFiles/THREEJS/r120/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'https://orvillechomer.github.io/miscJsFiles/THREEJS/r120/jsm/renderers/CSS3DRenderer.js';
// -----------------------------------------------------------------


import blockchain from "./Web3.js";
import abi from "./abi/abi.json" assert {type: "json"};
import { smart_contract_address } from "./contractparams.js";


//----------------------------------------------------------------
/*

   


 */
var camera, scene, renderer;
			var controls;
			var Element = function ( id, x, y, z, ry ) {
				var div = document.createElement( 'div' );
				div.style.width = '480px';
				div.style.height = '360px';
				div.style.backgroundColor = '#000';
				var iframe = document.createElement( 'iframe' );
				iframe.style.width = '480px';
				iframe.style.height = '360px';
				iframe.style.border = '0px';
				iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0&autoplay=1&mute=1' ].join( '' );
				div.appendChild( iframe );
				var object = new CSS3DObject( div );
				object.position.set( x, y, z );
				object.rotation.y = ry;
				return object;
      };
// https://www.youtube.com/embed/TlLijkYQjlw
init();
			animate();

			function init() {

				var container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.set( 500, 350, 750 );

				scene = new THREE.Scene();

				renderer = new CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				var group = new THREE.Group();
				group.add( new Element( 'RRBWMCG9y6w', 0, 0, 240, 0 ) );
				group.add( new Element( 'kGjFTzRTH3Q', 240, 0, 0, Math.PI / 2 ) );
				group.add( new Element( 'Vi3njP7iSwA', 0, 0, - 240, Math.PI ) );
				group.add( new Element( 'nF7cd1AWnpo', - 240, 0, 0, - Math.PI / 2 ) );
				scene.add( group );

				controls = new TrackballControls( camera, renderer.domElement );
				controls.rotateSpeed = 4;

				window.addEventListener( 'resize', onWindowResize, false );

				// Block iframe events when dragging camera

				var blocker = document.getElementById( 'blocker' );
				blocker.style.display = 'none';

				document.addEventListener( 'mousedown', function () {

					blocker.style.display = '';

				} );
				document.addEventListener( 'mouseup', function () {

					blocker.style.display = 'none';

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				controls.update();
				renderer.render( scene, camera );

			}
// -------------------------copier de la version NFT OK
// New NFT
const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', mintNFT);

function mintNFT() {
    // Parameters to create a NFT in the Metaverse
    var nft_name = document.getElementById("nft_name").value;
    var nft_width = document.getElementById("nft_width").value;
    var nft_height = document.getElementById("nft_height").value;
    var nft_depth = document.getElementById("nft_depth").value;
    var nft_x = document.getElementById("nft_x").value;
    var nft_y = document.getElementById("nft_y").value;
    var nft_z = document.getElementById("nft_z").value;

    // If Metamask is not available
    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it!");
    }

    // Web3 Instance 
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, smart_contract_address);

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.cost().call().then((cost_nft) => {
            contract.methods.mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z).send({ from: accounts[0], value: parseInt(cost_nft) }).then((data) => {
                alert("NFT available in the Metaverse!");
            });
        });
    });
};