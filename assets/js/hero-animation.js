// Simplified Network Visualization
document.addEventListener('DOMContentLoaded', function() {
  // 1. Setup Scene
  const canvas = document.getElementById('hero-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  // 2. Create Nodes (Intelligence Sources)
  const nodes = [];
  const nodeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
  const nodeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.8
  });

  for (let i = 0; i < 25; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8
    );
    scene.add(node);
    nodes.push(node);
  }

  // 3. Create Connections (Data Flows)
  const lines = [];
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.2
  });

  nodes.forEach((nodeA, i) => {
    nodes.slice(i + 1).forEach(nodeB => {
      if (Math.random() > 0.85) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          nodeA.position,
          nodeB.position
        ]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        lines.push(line);
      }
    });
  });

  camera.position.z = 5;

  // 4. Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Gentle rotation
    scene.rotation.x += 0.002;
    scene.rotation.y += 0.003;
    
    renderer.render(scene, camera);
  }

  animate();

  // 5. Handle Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  });
});
