import * as THREE from 'three';

// 技能数据
const skills = [
    { name: 'Vulkan', color: 0xff4444, desc: 'GPU渲染管线优化' },
    { name: 'OpenGL', color: 0x44ff44, desc: '实时图形渲染' },
    { name: 'Three.js', color: 0x4444ff, desc: 'Web 3D开发' },
    { name: 'Python', color: 0xffff44, desc: '工具脚本开发' },
    { name: 'C++', color: 0x44ffff, desc: '高性能计算' },
    { name: 'Blender', color: 0xff44ff, desc: '3D建模与可视化' }
];

export function createSkillCubes(scene) {
    const cubes = [];
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    
    // 球形分布
    const radius = 5;
    const count = skills.length;
    
    skills.forEach((skill, i) => {
        // 材质：标准材质（受光照影响）+ 自发光
        const material = new THREE.MeshStandardMaterial({
            color: skill.color,
            metalness: 0.7,
            roughness: 0.2,
            emissive: skill.color,
            emissiveIntensity: 0.2
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // 球坐标计算位置
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        
        cube.position.x = radius * Math.cos(theta) * Math.sin(phi);
        cube.position.y = radius * Math.sin(theta) * Math.sin(phi);
        cube.position.z = radius * Math.cos(phi);
        
        // 存储技能数据到对象
        cube.userData = skill;
        
        // 添加边框发光效果（模拟线框）
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: skill.color, 
            transparent: true, 
            opacity: 0.5 
        });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        cube.add(wireframe);
        
        scene.add(cube);
        cubes.push(cube);
    });
    
    // 添加中心发光球（你的名字）
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
        metalness: 1,
        roughness: 0
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);
    
    // 点光源（照亮场景）
    const light = new THREE.PointLight(0xffffff, 2, 50);
    light.position.set(0, 0, 0);
    scene.add(light);
    
    // 环境光（基础照明）
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    return cubes;
}

export function createParticles(scene) {
    // 星空粒子背景
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for(let i = 0; i < count * 3; i += 3) {
        // 随机位置
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i+1] = (Math.random() - 0.5) * 100;
        positions[i+2] = (Math.random() - 0.5) * 100;
        
        // 颜色（蓝紫色调）
        colors[i] = Math.random() * 0.5;
        colors[i+1] = Math.random() * 0.8;
        colors[i+2] = 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending  // 加法混合（发光效果）
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    return particles;
}
