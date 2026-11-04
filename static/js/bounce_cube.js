// Three.js Multi-Size & Vertical Moving 3D Cubes
const canvas = document.getElementById('threeCanvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colorPalette = [0x8a2be2, 0xff007f, 0xff416c, 0x00d2ff, 0xffffff, 0x00e676];
    const cubesCount = 40;
    const cubes = [];

    for (let i = 0; i < cubesCount; i++) {
        const randomSize = 0.6 + Math.random() * 2.2; 
        const geometry = new THREE.BoxGeometry(randomSize, randomSize, randomSize);
        const selectedColor = colorPalette[i % colorPalette.length];

        const material = new THREE.MeshStandardMaterial({
            color: selectedColor,
            roughness: 0.2,
            metalness: 0.85,
            transparent: true,
            opacity: selectedColor === 0xffffff ? 0.35 : 0.28
        });

        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.x = (Math.random() - 0.5) * 35;
        cube.position.y = (Math.random() - 0.5) * 30;
        cube.position.z = (Math.random() - 0.5) * 25 - 5;

        const moveDirection = i % 2 === 0 ? 1 : -1;

        cube.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.015,
            rotSpeedY: (Math.random() - 0.5) * 0.015,
            speedY: (0.015 + Math.random() * 0.03) * moveDirection,
            boundY: 18
        };

        scene.add(cube);
        cubes.push(cube);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d2ff, 3, 70);
    pointLight1.position.set(15, 20, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff007f, 3, 70);
    pointLight2.position.set(-15, -20, 15);
    scene.add(pointLight2);

    camera.position.z = 16;

    function animate() {
        requestAnimationFrame(animate);

        cubes.forEach((cube) => {
            cube.rotation.x += cube.userData.rotSpeedX;
            cube.rotation.y += cube.userData.rotSpeedY;
            cube.position.y += cube.userData.speedY;

            if (cube.position.y > cube.userData.boundY) {
                cube.position.y = -cube.userData.boundY;
            } else if (cube.position.y < -cube.userData.boundY) {
                cube.position.y = cube.userData.boundY;
            }
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}