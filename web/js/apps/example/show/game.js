/* global requestAnimationFrame */

define([
    'app',
    'THREE',
    'jquery',
    'keyboardjs'
], function(App, THREE, $, Keyboard) {
    var Game = function() {
        var i;

        this.keyboard = Keyboard;
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setClearColor(0xd5d5d5, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.lastTime = new Date().getTime();
        this.textShown = false;
        this.readyForShapes = false;
        this.shapes = [];
        this.textTexture = THREE.ImageUtils.loadTexture('img/former-people-text.png');
        this.shapeTexturePaths = [
            'Comp-10_Blue.png',   'Comp-1_Green.png',   'Comp-2_Red.png',     'Comp-3_Yellow.png',  'Comp-5_Blue.png',    'Comp-6_Green.png',   'Comp-7_Red.png',     'Comp-8_Yellow.png',
            'Comp-10_Green.png',  'Comp-1_Red.png',     'Comp-2_Yellow.png',  'Comp-4_Blue.png',    'Comp-5_Green.png',   'Comp-6_Red.png',     'Comp-7_Yellow.png',  'Comp-9_Blue.png',
            'Comp-10_Red.png',    'Comp-1_Yellow.png',  'Comp-3_Blue.png',    'Comp-4_Green.png',   'Comp-5_Red.png',     'Comp-6_Yellow.png',  'Comp-8_Blue.png',    'Comp-9_Green.png',
            'Comp-10_Yellow.png', 'Comp-2_Blue.png',    'Comp-3_Green.png',   'Comp-4_Red.png',     'Comp-5_Yellow.png',  'Comp-7_Blue.png',    'Comp-8_Green.png',   'Comp-9_Red.png',
            'Comp-1_Blue.png',    'Comp-2_Green.png',   'Comp-3_Red.png',     'Comp-4_Yellow.png',  'Comp-6_Blue.png',    'Comp-7_Green.png',   'Comp-8_Red.png',     'Comp-9_Yellow.png'
        ];

        this.shapeTextures = [];

        for (i = 0; i<this.shapeTexturePaths.length; i += 1) {
            this.shapeTextures.push(THREE.ImageUtils.loadTexture('/img/shapes/' + this.shapeTexturePaths[i]));
        }

        setTimeout(function() {
            this.readyForShapes = true;
        }.bind(this), 11000);
    };

    Game.prototype.animate = function() {
        var i = 0;
        var self = this;
        requestAnimationFrame(function() {
            self.animate();
        });

        if ($.inArray('right', this.keyboard.activeKeys()) > -1) {
            this.camera.position.x += 2;
        }
        if ($.inArray('left', this.keyboard.activeKeys()) > -1) {
            this.camera.position.x -= 2;
        }
        if ($.inArray('up', this.keyboard.activeKeys()) > -1) {
            this.camera.position.y += 2;
        }
        if ($.inArray('down', this.keyboard.activeKeys()) > -1) {
            this.camera.position.y -= 2;
        }

        if (!this.textShown) {
            this.showText();
        } else {
            this.text.position.z += 1;
        }

        if (this.nextShapeReady() && this.readyForShapes) {
            this.showShape();
        }

        for (i = 0; i<this.shapes.length; i += 1) {
            this.shapes[i].position.z += 10;
        }

        this.renderer.render(this.scene, this.camera);
    };

    Game.prototype.nextShapeReady = function() {
        var elapsed;
        var ready;
        var t;

        t = new Date().getTime();
        elapsed = t - this.lastTime;
        ready = false;

        if (elapsed > 225) {
            this.lastTime = t;
            ready = true;
        }

        return ready;
    };

    Game.prototype.showText = function() {
        var geometry;
        var material;
        var texture;
        
        geometry = new THREE.PlaneGeometry(645, 300);
        texture = this.textTexture;
        material = new THREE.MeshBasicMaterial({map: texture});
        this.text = new THREE.Mesh(geometry, material);
        this.text.receiveShadow = false;
        this.scene.add(this.text);
        this.textShown = true;
    };

    Game.prototype.showShape = function() {
        var geometry;
        var material;
        var mesh;
        var texture;
        
        geometry = new THREE.PlaneGeometry(300, 300);
        texture = this.getShapeTexture();
        material = new THREE.MeshBasicMaterial({map: texture});
        
        mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = false;
        mesh.position.x = Math.floor(Math.random() * 1000) - 500;
        mesh.position.y = Math.floor(Math.random() * 1000) - 500;
        mesh.position.z = -2000;

        mesh.rotation.z = this.getRandomQuadrantAngle();

        this.shapes.push(mesh);
        this.scene.add(mesh);
    };

    Game.prototype.getShapeTexture = function() {
        return this.shapeTextures[Math.floor(Math.random() * this.shapeTextures.length)];
    };

    Game.prototype.getRandomQuadrantAngle = function() {
        var angles = [0, 0.5 * Math.PI, Math.PI, 1.5 * Math.PI];
        return angles[Math.floor(Math.random() * angles.length)];
    };

    return Game;
});
