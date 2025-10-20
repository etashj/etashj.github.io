<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { STLLoader } from 'three/addons/loaders/STLLoader.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
  import type { Scene, PerspectiveCamera, WebGLRenderer, Mesh } from 'three';
  import ModelLabel from './ModelLabel.svelte';

  // Prop to pass the STL file path, making the component reusable.
  //export let stlPath: string = "src/lib/assets/models/mew.stl";
  export let stlPath: string = "/models/mew.stl"; // Public path from the 'static' folder

  // A reference to the container div for our 3D scene.
  let container: HTMLDivElement;

  // Core three.js components
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let effect: AsciiEffect | null = null;
  let model: Mesh;

  // Animation frame ID for cleanup
  let animationFrameId: number;

  onMount(() => {
    if (!container) return;

    // 1. --- Scene Setup ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Light grey background

    // 2. --- Camera Setup ---
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 15);

    // 3. --- Renderer Setup ---
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // 4. --- Controls ---
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    // --- Auto-rotation setup ---
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.85; // Adjust for desired speed. Positive is counter-clockwise.

    // // Disable auto-rotation on first user interaction
    // const stopAutoRotation = () => {
    //     controls.autoRotate = false;
    //     controls.removeEventListener('start', stopAutoRotation);
    // };
    // controls.addEventListener('start', stopAutoRotation);

    // 5. --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x404040, 3); // Increased intensity slightly
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // 6. --- Load STL Model ---
    const loader = new STLLoader();
    loader.load(stlPath, (geometry) => {
        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x111111, shininess: 200 });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);

        // --- Center and scale the model automatically ---
        // 1. Center the geometry's pivot point
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox!.getCenter(center);
        model.position.sub(center);

        // 2. Use a Box3 to get the model's current world-space bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const centerOfBox = new THREE.Vector3();
        box.getCenter(centerOfBox);

        // 3. Scale the model to a consistent size
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 10 / maxDim;
        model.scale.set(scale, scale, scale);

        // 4. Re-center the model after scaling
        // The previous centering was based on the unscaled geometry.
        // We get the new bounding box and re-center.
        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);
        model.position.sub(scaledCenter);

        // 5. Position the camera to frame the scaled model
        const finalSize = new THREE.Vector3();
        scaledBox.getSize(finalSize);
        const fov = camera.fov * (Math.PI / 180);
        const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect);
        const dx = finalSize.z / 2 + Math.abs(finalSize.x / 2 / Math.tan(fovh / 2));
        const dy = finalSize.z / 2 + Math.abs(finalSize.y / 2 / Math.tan(fov / 2));
        const distance = Math.max(dx, dy) * 1.4; // Add 20% padding

        camera.position.set(distance/1.4, 0, -distance/1.4);
        
        // 6. Update controls to target the model's new center (which is now the origin)
        controls.target.set(0, 0, 0);
        controls.update();
    });

    // 7. --- ASCII Effect Setup (Overlay Method) ---
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: false });
    effect.setSize(container.clientWidth, container.clientHeight);
    // effect.domElement.style.color = 'black'; // Color is now set dynamically
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.pointerEvents = 'none'; // Clicks pass through to the canvas
    effect.domElement.style.fontFamily = 'monospace';
    effect.domElement.style.whiteSpace = 'pre';
    effect.domElement.style.zIndex = '1';

    // Hide the WebGL canvas visually but keep it for pointer events
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    
    // Append both to the container
    container.appendChild(renderer.domElement);
    container.appendChild(effect.domElement);

    // --- Dark Mode Color Sync ---
    const updateAsciiColor = () => {
        if (!effect) return;
        const isDarkMode = document.documentElement.classList.contains('dark');
        effect.domElement.style.color = isDarkMode ? 'white' : 'black';
    };

    // Create an observer to watch for class changes on the <html> tag
    const observer = new MutationObserver(updateAsciiColor);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Set the initial color when the component mounts
    updateAsciiColor();

    // 8. --- Animation Loop ---
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update(); // Required for damping
        renderer.render(scene, camera); // Render the scene to the (hidden) canvas
        if (effect) {
            effect.render(scene, camera); // Generate ASCII from the rendered scene
        }
    };
    animate();

    // 9. --- Handle Resizing ---
    const onWindowResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (effect) {
            effect.setSize(w, h);
        }
    };
    window.addEventListener('resize', onWindowResize);

    // 10. --- Cleanup on component destruction ---
    onDestroy(() => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', onWindowResize);
        controls.dispose();
        observer.disconnect(); // Stop observing when component is destroyed
        
        if (effect && effect.domElement.parentElement === container) {
            container.removeChild(effect.domElement);
        }
        if (renderer.domElement.parentElement === container) {
            container.removeChild(renderer.domElement);
        }
        renderer.dispose();

        if (model) {
            model.geometry.dispose();
            if (Array.isArray(model.material)) {
                model.material.forEach(m => m.dispose());
            } else {
                model.material.dispose();
            }
        }
    });
  });
</script>

<!-- The container needs a position style for the absolute positioning of its children to work -->
<div bind:this={container} class="w-full h-full translate-x-20 translate-y-8 bottom-2" style="position: fixed;">
</div>
<ModelLabel path={stlPath} />

