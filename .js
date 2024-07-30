// Inicializa la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Carga el archivo MTL
const mtlLoader = new THREE.MTLLoader();
mtlLoader.load('https://raw.githubusercontent.com/USERNAME/REPOSITORY/BRANCH/PATH_TO_FILE.mtl', (materials) => {
    materials.preload();
    
    // Carga el archivo OBJ
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('https://raw.githubusercontent.com/USERNAME/REPOSITORY/BRANCH/PATH_TO_FILE.obj', (object) => {
        scene.add(object);
        object.position.set(0, 0, 0); // Ajusta la posición si es necesario
    }, undefined, (error) => {
        console.error('Error cargando el archivo OBJ:', error);
    });
}, undefined, (error) => {
    console.error('Error cargando el archivo MTL:', error);
});

// Ajusta la cámara
camera.position.z = 5;

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajusta el tamaño del renderizador cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
