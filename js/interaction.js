// 悬停效果
let hoveredObject = null;

export function setupInteraction(camera, scene, raycaster, mouse, cubes, controls) {
    // 鼠标移动监听
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // 点击监听
    window.addEventListener('click', () => {
        if(hoveredObject) {
            console.log('点击了：', hoveredObject.userData);
            // 这里可以弹窗显示详情，现在先在控制台输出
            alert(`${hoveredObject.userData.name}\n${hoveredObject.userData.desc}`);
        }
    });
    
    // 每帧检测悬停
    function checkIntersection() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cubes);
        
        if(intersects.length > 0) {
            const object = intersects[0].object;
            
            if(hoveredObject !== object) {
                // 鼠标进入新对象
                if(hoveredObject) {
                    hoveredObject.scale.set(1, 1, 1);
                    hoveredObject.material.emissiveIntensity = 0.2;
                }
                
                hoveredObject = object;
                // 放大+高亮
                object.scale.set(1.3, 1.3, 1.3);
                object.material.emissiveIntensity = 1.5;
                
                // 停止自动旋转（方便查看）
                controls.autoRotate = false;
                document.body.style.cursor = 'pointer';
            }
        } else {
            if(hoveredObject) {
                // 鼠标离开
                hoveredObject.scale.set(1, 1, 1);
                hoveredObject.material.emissiveIntensity = 0.2;
                hoveredObject = null;
                
                controls.autoRotate = true;
                document.body.style.cursor = 'default';
            }
        }
        
        requestAnimationFrame(checkIntersection);
    }
    
    checkIntersection();
}
