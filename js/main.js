import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createScene, createCamera, createRenderer } from './scene.js';
import { createSkillCubes, createParticles } from './objects.js';
import { setupInteraction } from './interaction.js';

// 初始化
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

// 控制器（鼠标交互）
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // 惯性阻尼，更顺滑
controls.dampingFactor = 0.05;
controls.autoRotate = true;     // 自动缓慢旋转
controls.autoRotateSpeed = 0.5;

// 创建3D对象
const skillCubes = createSkillCubes(scene);
const particleSystem = createParticles(scene);

// 交互系统
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
setupInteraction(camera, scene, raycaster, mouse, skillCubes, controls);

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 粒子缓慢旋转
    if(particleSystem) {
        particleSystem.rotation.y += 0.0005;
    }
    
    // 技能卡片浮动动画
    skillCubes.forEach((cube, index) => {
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// 窗口自适应
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 隐藏加载提示
document.getElementById('loader').style.opacity = '0';
setTimeout(() => document.getElementById('loader').remove(), 500);

animate();
