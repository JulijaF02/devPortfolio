import * as THREE from 'three';

class AimTrainerEngine {
    constructor(container, options = {}) {
        this.container = container;
        this.isMobile = options.isMobile || false;
        this.setStats = options.setStats || (() => { });
        this.onGameEnd = options.onGameEnd || (() => { });
        this.sensitivity = options.sensitivity || 0.002;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x020617);
        this.scene.fog = new THREE.FogExp2(0x020617, 0.05);

        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(0, 1.6, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.targets = [];
        this.lobbyTargets = [];
        this.particles = [];
        this.tracers = [];
        this.pitch = 0;
        this.yaw = 0;
        this.gameStarted = false;
        this.timeLeft = 30.0;
        this.stats = { hits: 0, headshots: 0, misses: 0, streak: 0, maxStreak: 0 };

        this.initScene();
        this.spawnLobbyUI();
        this.createCrosshair();
        this.animate();

        this.setupEventListeners();
    }

    createCrosshair() {
        if (this.isMobile) return;
        const material = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, opacity: 0.8, transparent: true, depthTest: false });
        const bar1 = new THREE.Mesh(new THREE.PlaneGeometry(0.015, 0.002), material);
        const bar2 = new THREE.Mesh(new THREE.PlaneGeometry(0.015, 0.002), material);
        bar1.rotation.z = Math.PI / 4;
        bar2.rotation.z = -Math.PI / 4;

        const group = new THREE.Group();
        group.add(bar1, bar2);
        group.position.set(0, 0, -1);
        group.renderOrder = 999;
        this.camera.add(group);
        this.scene.add(this.camera);
    }

    initScene() {
        this.scene.add(new THREE.GridHelper(50, 50, 0x2dd4bf, 0x1e293b));
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 5);
        this.scene.add(dirLight);
    }

    // Helper to reduce code duplication
    createLobbyButton(text, color, x, type) {
        const btn = new THREE.Mesh(
            new THREE.BoxGeometry(type === 'START' ? 2 : 0.8, type === 'START' ? 1 : 0.8, 0.2),
            new THREE.MeshStandardMaterial({
                map: this.createTextTexture(text, color),
                emissive: new THREE.Color(color),
                emissiveIntensity: 0.2
            })
        );
        btn.position.set(x, 1.5, -10);
        btn.userData = { type };
        this.scene.add(btn);
        this.lobbyTargets.push(btn);
    }

    spawnLobbyUI() {
        this.createLobbyButton('START', '#2dd4bf', 0, 'START');
        this.createLobbyButton('+', '#22c55e', 2, 'SENS_UP');
        this.createLobbyButton('-', '#ef4444', -2, 'SENS_DOWN');
    }

    spawnTarget() {
        const group = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.35, 0.3, 1.0, 8),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x2dd4bf, emissiveIntensity: 0.1 })
        );
        body.position.y = 0.5;

        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 8, 8),
            new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xf43f5e, emissiveIntensity: 0.5 })
        );
        head.position.y = 1.15;
        head.userData.isHead = true;

        group.add(body, head);

        const angleRange = this.isMobile ? Math.PI * 0.15 : Math.PI * 0.35;
        const angle = (Math.random() - 0.5) * angleRange;
        const dist = this.isMobile ? 10 + Math.random() * 5 : 12 + Math.random() * 8;

        group.position.set(Math.sin(angle) * dist, this.isMobile ? 1.0 : 0, -Math.cos(angle) * dist);
        group.lookAt(0, 0.8, 0);
        group.userData = { spawnTime: Date.now(), lifespan: 1600 };

        this.scene.add(group);
        this.targets.push(group);
    }

    spawnParticles(position, color) {
        const particleCount = 8;
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: color });

        for (let i = 0; i < particleCount; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);
            mesh.position.x += (Math.random() - 0.5) * 0.5;
            mesh.position.y += (Math.random() - 0.5) * 0.5;
            mesh.position.z += (Math.random() - 0.5) * 0.5;

            // Random velocity
            mesh.userData = {
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2),
                life: 1.0
            };
            this.scene.add(mesh);
            this.particles.push(mesh);
        }
    }

    spawnTracer(start, end) {
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const material = new THREE.LineBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true });
        const line = new THREE.Line(geometry, material);
        line.userData = { life: 0.2 }; // Short life for tracer
        this.scene.add(line);
        this.tracers.push(line);
    }

    handleShoot(e) {
        if (!this.isMobile && document.pointerLockElement !== this.container) return;

        // Recoil effect only on desktop
        if (!this.isMobile) {
            this.camera.position.y += 0.02;
            this.camera.rotation.x += 0.002;
            setTimeout(() => { if (this.camera) { this.camera.position.y -= 0.02; this.camera.rotation.x -= 0.002; } }, 50);
        }

        const raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2(0, 0);

        if (this.isMobile && e.touches && e.touches[0]) {
            mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }

        raycaster.setFromCamera(mouse, this.camera);

        // Weapon position (bottom right)
        const weaponPos = new THREE.Vector3(0.3, -0.3, -0.5).applyMatrix4(this.camera.matrixWorld);

        const intersectsLobby = raycaster.intersectObjects(this.lobbyTargets, true);
        if (intersectsLobby.length > 0) {
            const type = intersectsLobby[0].object.userData.type;
            if (type === 'START') {
                this.gameStarted = true;
                this.clock.start();
                this.lobbyTargets.forEach(t => this.scene.remove(t));
                this.lobbyTargets = [];
                this.spawnTarget();
            } else if (type === 'SENS_UP') this.sensitivity = Math.min(0.01, this.sensitivity + 0.0002);
            else if (type === 'SENS_DOWN') this.sensitivity = Math.max(0.0002, this.sensitivity - 0.0002);

            this.spawnParticles(intersectsLobby[0].point, 0xffffff);
            return;
        }

        if (!this.gameStarted) return;

        const intersects = raycaster.intersectObjects(this.targets, true);
        if (intersects.length > 0) {
            const hitPoint = intersects[0].point;
            this.spawnTracer(weaponPos, hitPoint);
            this.spawnParticles(hitPoint, 0x2dd4bf); // Teal sparks

            let hitObject = intersects[0].object;
            let isHeadshot = !!hitObject.userData.isHead;
            let targetGroup = hitObject;
            while (targetGroup.parent !== this.scene) targetGroup = targetGroup.parent;

            this.scene.remove(targetGroup);
            this.targets = this.targets.filter(t => t !== targetGroup);

            this.stats.hits++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.maxStreak) this.stats.maxStreak = this.stats.streak;
            if (isHeadshot) this.stats.headshots++;

            this.spawnTarget();
        } else {
            // Miss - tracer to far distance
            const rayDir = raycaster.ray.direction.clone().multiplyScalar(50);
            const endPos = new THREE.Vector3().copy(raycaster.ray.origin).add(rayDir);
            this.spawnTracer(weaponPos, endPos);

            this.stats.misses++;
            this.stats.streak = 0;
        }
        this.updateStats();
    }

    updateStats() {
        this.setStats({
            ...this.stats,
            time: this.timeLeft,
            sensitivity: this.sensitivity
        });
    }

    animate() {
        this.frameId = requestAnimationFrame(this.animate.bind(this));

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.position.add(p.userData.velocity);
            p.userData.life -= 0.05;
            p.scale.multiplyScalar(0.9); // Shrink
            if (p.userData.life <= 0) {
                this.scene.remove(p);
                this.particles.splice(i, 1);
            }
        }

        // Update tracers
        for (let i = this.tracers.length - 1; i >= 0; i--) {
            const t = this.tracers[i];
            t.userData.life -= 0.05;
            t.material.opacity = t.userData.life * 5;
            if (t.userData.life <= 0) {
                this.scene.remove(t);
                this.tracers.splice(i, 1);
            }
        }

        if (this.gameStarted) {
            const now = Date.now();
            this.targets.forEach((t, i) => {
                if (now - t.userData.spawnTime > t.userData.lifespan) {
                    this.scene.remove(t);
                    this.targets.splice(i, 1);
                    this.spawnTarget();
                }
            });

            const dt = this.clock.getDelta();
            this.timeLeft = Math.max(0, this.timeLeft - dt);
            if (this.timeLeft <= 0) this.onGameEnd();
            this.updateStats();
        }
        this.renderer.render(this.scene, this.camera);
    }

    // ... Event Listeners & Setup ...
    setupEventListeners() {
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleShoot = this.handleShoot.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handlePointerLockChange = this.handlePointerLockChange.bind(this);

        window.addEventListener('resize', this.handleResize);
        if (this.isMobile) {
            window.addEventListener('touchstart', this.handleShoot, { passive: false });
        } else {
            window.addEventListener('mousemove', this.handleMouseMove);
            window.addEventListener('mousedown', this.handleShoot);
            document.addEventListener('pointerlockchange', this.handlePointerLockChange);
        }
    }

    handlePointerLockChange() {
        if (!document.pointerLockElement && this.gameStarted) {
            this.gameStarted = false;
            this.onGameEnd();
        }
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    handleMouseMove(e) {
        if (document.pointerLockElement !== this.container) return;
        this.yaw -= e.movementX * this.sensitivity;
        this.pitch -= e.movementY * this.sensitivity;
        this.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.pitch));
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;
    }

    createTextTexture(text, bgColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 256, 128);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 64);
        return new THREE.CanvasTexture(canvas);
    }

    dispose() {
        cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mousedown', this.handleShoot);
        window.removeEventListener('touchstart', this.handleShoot);
        document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
        if (this.renderer.domElement && this.container && this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
        this.renderer.dispose();
    }
}

export default AimTrainerEngine;
