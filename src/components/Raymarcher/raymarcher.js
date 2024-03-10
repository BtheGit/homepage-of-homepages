class re {
  constructor(s) {
    this.keysPressed = {}, this.mousePressed = null, this.lastMouseX = 0, this.lastMouseY = 0, this.mouseDeltaX = 0, this.mouseDeltaY = 0, this.canvasFocused = !1, this.pointerLockEnabled = !1, this.handlePointerLockChange = () => {
      try {
        document.pointerLockElement === this.canvas ? (this.handleCanvasFocus(), this.pointerLockEnabled = !0) : (this.handleCanvasBlur(), this.pointerLockEnabled = !1);
      } catch {
        setTimeout(this.handlePointerLockChange, 2e3);
      }
    }, document.addEventListener("keydown", this.handleKeyDown.bind(this)), document.addEventListener("keyup", this.handleKeyUp.bind(this)), document.addEventListener("mousedown", this.handleMouseDown.bind(this)), document.addEventListener("mouseup", this.handleMouseUp.bind(this)), document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    const t = document.getElementById(s);
    this.canvas = t, t == null || t.addEventListener("click", () => {
      this.pointerLockEnabled || this.canvas.requestPointerLock();
    }), document.addEventListener(
      "pointerlockchange",
      this.handlePointerLockChange.bind(this)
    );
  }
  static getInstance(s) {
    return re.instance || (re.instance = new re(s)), re.instance;
  }
  handleCanvasFocus() {
    this.canvasFocused = !0, this.canvas.style.cursor = "none";
  }
  handleCanvasBlur() {
    this.canvasFocused = !1, this.canvas.style.cursor = "auto";
  }
  handleKeyDown(s) {
    this.pointerLockEnabled && (this.keysPressed[s.key] = !0);
  }
  handleKeyUp(s) {
    this.pointerLockEnabled && (this.keysPressed[s.key] = !1);
  }
  handleMouseDown(s) {
    this.pointerLockEnabled && (this.mousePressed = s);
  }
  handleMouseUp(s) {
    this.pointerLockEnabled && (this.mousePressed = null);
  }
  handleMouseMove(s) {
    if (!this.pointerLockEnabled)
      return;
    const t = s.movementX ?? 0, r = s.movementY ?? 0;
    this.mouseDeltaX += t, this.mouseDeltaY += r;
  }
  // TODO: Support combinations and alternates
  isKeyPressed(s) {
    return this.pointerLockEnabled && this.keysPressed[s] || !1;
  }
  activeMousedownEvent() {
    return this.pointerLockEnabled ? this.mousePressed : null;
  }
  getMouseDelta() {
    if (!this.pointerLockEnabled)
      return { movementX: 0, movementY: 0 };
    const s = this.mouseDeltaX, t = this.mouseDeltaY;
    return this.mouseDeltaX = 0, this.mouseDeltaY = 0, { movementX: s, movementY: t };
  }
}
class se {
  constructor() {
    this.weapons = /* @__PURE__ */ new Map(), this.registerWeaponAssets = (s, t) => {
      this.weapons.set(s, t);
    }, this.getWeaponAssets = (s) => this.weapons.get(s);
  }
  static getInstance() {
    return se.instance || (se.instance = new se()), se.instance;
  }
}
const K = class {
  constructor(d = 0, s = 0) {
    this.length = () => Math.sqrt(this.x * this.x + this.y * this.y), this.distanceTo = (t) => {
      const r = this.x - t.x, n = this.y - t.y;
      return Math.sqrt(r * r + n * n);
    }, this.x = d, this.y = s;
  }
  static normalize(d) {
    const s = Math.sqrt(d.x * d.x + d.y * d.y);
    return s === 0 ? new K(0, 0) : new K(d.x / s, d.y / s);
  }
  static magnitude(d) {
    return Math.sqrt(d.x ** 2 + d.y ** 2);
  }
  static lerp(d, s, t) {
    const r = d.x + t * (s.x - d.x), n = d.y + t * (s.y - d.y);
    return new K(r, n);
  }
  normalize() {
    return K.normalize(this);
  }
  equals(d) {
    return this.x === d.x && this.y === d.y;
  }
  add(d) {
    return new K(this.x + d.x, this.y + d.y);
  }
  subtract(d) {
    return new K(this.x - d.x, this.y - d.y);
  }
  scale(d) {
    return new K(this.x * d, this.y * d);
  }
  cross(d) {
  }
  dot(d) {
    return this.x * d.x + this.y * d.y;
  }
  magnitudeProduct(d) {
    return K.magnitude(this) * K.magnitude(d);
  }
  map(d) {
    return new K(d(this.x), d(this.y));
  }
  angle(d) {
    const s = this.dot(d), t = this.magnitudeProduct(d);
    return Math.acos(s / t);
  }
  rotate(d) {
    const s = oe(d), t = Math.cos(s), r = Math.sin(s), n = this.x * t - this.y * r, l = this.x * r + this.y * t;
    this.x = n, this.y = l;
  }
  clampMagnitude(d, s) {
    const t = K.magnitude(this);
    return t < d ? this.scale(d / t) : t > s ? this.scale(s / t) : this;
  }
};
let k = K;
k.distance = (d, s) => {
  const t = d.x - s.x, r = d.y - s.y;
  return Math.sqrt(t * t + r * r);
};
const oe = (d) => d * (Math.PI / 180), we = (d) => d * 180 / Math.PI, Me = (d) => new k(Math.cos(oe(d)), Math.sin(oe(d))), Fe = (d) => new k(-Math.sin(oe(d)), Math.cos(oe(d))), Se = (d, s, t) => {
  const r = d.subtract(t), n = Math.atan2(r.y, r.x) - Math.atan2(s.y, s.x), l = (we(n) + 360) % 360;
  return l > 180 ? l - 360 : l;
}, Oe = (d, s, t) => d + (s - d) * t;
var X = /* @__PURE__ */ ((d) => (d.None = "None", d.Player = "Player", d.PlayerProjectile = "PlayerProjectile", d.FriendlyNPC = "FriendlyNPC", d.PickupItem = "PickupItem", d))(X || {}), ce = /* @__PURE__ */ ((d) => (d[d.None = 0] = "None", d[d.MagicHands = 1] = "MagicHands", d))(ce || {}), Z = /* @__PURE__ */ ((d) => (d[d.Idle = 0] = "Idle", d[d.Firing = 1] = "Firing", d))(Z || {}), te = /* @__PURE__ */ ((d) => (d[d.Active = 0] = "Active", d[d.Destroying = 1] = "Destroying", d))(te || {}), ee = /* @__PURE__ */ ((d) => (d.Prop = "Prop", d.Coin = "Coin", d.Book = "Book", d.Portal = "Portal", d.NPC = "NPC", d.DogFriendly = "DogFriendly", d))(ee || {}), de = /* @__PURE__ */ ((d) => (d.DogFriendly = "DogFriendly", d.BirdSkittish = "BirdSkittish", d))(de || {}), O = /* @__PURE__ */ ((d) => (d.PlayerActorCollision = "PlayerActorCollision", d.DestroyProjectile = "DestroyProjectile", d.EmitProjectile = "EmitProjectile", d.ProjectileCollision = "ProjectileCollision", d.PlaySound = "PlaySound", d.InteractionDirective = "InteractionDirective", d.RaysUpdated = "RaysUpdated", d.LoadLevel = "LoadLevel", d))(O || {}), me = /* @__PURE__ */ ((d) => (d.ShowMessage = "ShowMessage", d.PlayAudio = "PlayAudio", d.LoadLevel = "LoadLevel", d))(me || {}), be = /* @__PURE__ */ ((d) => (d.GameEvent = "GameEvent", d))(be || {}), Te = /* @__PURE__ */ ((d) => (d.LoadLevel = "LoadLevel", d))(Te || {});
class Be {
  constructor(s, t, r, n, l) {
    this.lastBall = Date.now(), this.ballTimeout = 1e3, this.lastInteractionAttempt = Date.now(), this.interactionTimeout = 500, this.rays = [], this.handleRaysUpdated = (c) => {
      this.rays = c.rays;
    }, this.switchWeapon = (c) => {
      this.player.equippedWeapon.type = c;
      const h = this.weaponAssetManager.getWeaponAssets(c), p = h == null ? void 0 : h[Z.Idle];
      if (!p) {
        console.error("Uh. Missing weapon assets...");
        return;
      }
      const g = {
        name: p.name,
        frames: p.frames,
        events: p.events,
        // TODO: Add this to this type
        frameDuration: 40,
        // TODO: Deprecate this being needed for this type
        looping: !1,
        // Still not used...
        currentFrame: 0,
        timeSinceLastFrame: 0
      }, _ = h.sprite;
      this.player.equippedWeaponAnimation = g, this.player.equippedWeaponSprite = _;
    }, this.switchWeaponState = (c) => {
      if (this.player.equippedWeapon.state === c)
        return;
      const p = this.weaponAssetManager.getWeaponAssets(
        this.player.equippedWeapon.type
      )[c];
      this.player.equippedWeapon.state = c, this.player.equippedWeaponAnimation = {
        name: p.name,
        frames: p.frames,
        events: p.events,
        frameDuration: 40,
        looping: !1,
        currentFrame: 0,
        timeSinceLastFrame: 0
      };
    }, this.updatePlayerMovement = () => {
      const p = this.player.movement.speed, g = 0.03;
      for (const _ of this.playerEntities) {
        if (!_.userControl)
          continue;
        const e = new k(
          _.transform.direction.x,
          _.transform.direction.y
        ), i = new k(_.plane.x, _.plane.y);
        let a = new k(0, 0);
        (this.inputSystem.isKeyPressed("ArrowUp") || this.inputSystem.isKeyPressed("w")) && (a = a.add(e.scale(p))), (this.inputSystem.isKeyPressed("ArrowDown") || this.inputSystem.isKeyPressed("s")) && (a = a.subtract(e.scale(p))), (this.inputSystem.isKeyPressed("ArrowLeft") || this.inputSystem.isKeyPressed("a")) && (a = a.subtract(i.scale(p * 0.5))), (this.inputSystem.isKeyPressed("ArrowRight") || this.inputSystem.isKeyPressed("d")) && (a = a.add(i.scale(p * 0.5)));
        const { movementX: o, movementY: f } = this.inputSystem.getMouseDelta(), m = o * 0.05;
        e.x = _.transform.direction.x * Math.cos(g * m * 1) - _.transform.direction.y * Math.sin(g * m * 1), e.y = _.transform.direction.x * Math.sin(g * m * 1) + _.transform.direction.y * Math.cos(g * m * 1), i.x = _.plane.x * Math.cos(g * m * 1) - _.plane.y * Math.sin(g * m * 1), i.y = _.plane.x * Math.sin(g * m * 1) + _.plane.y * Math.cos(g * m * 1), e.equals(_.transform.direction) || this.ecs.entityManager.updateEntity(_, {
          transform: { ..._.transform, direction: e }
        }), i.equals(_.plane) || this.ecs.entityManager.updateEntity(_, { plane: i }), a.equals(_.velocity) || this.ecs.entityManager.updateEntity(_, { velocity: a });
      }
    }, this.handlePlayerActions = () => {
      const c = this.inputSystem.activeMousedownEvent(), h = Date.now();
      h - this.lastBall < this.ballTimeout || (c == null ? void 0 : c.button) === 0 && (this.switchWeaponState(Z.Firing), this.lastBall = h, this.broker.emit(O.EmitProjectile, {
        name: O.EmitProjectile,
        projectileType: "magic_shot",
        emitterEntity: this.player,
        emitter: "player",
        // Probably shouldn't pass the whole entity. So going to break out all the relevant stuff. I do want to know who emitted it for collision resolutions. But can probably just use an enum value like player | npc.
        origin: this.player.transform.position,
        // Do we need this with velocity?
        direction: this.player.transform.direction,
        // We should probably determine velocity? Would it be conditional on the player or just the projectile type (well, press and hold to throw, definitely player).
        velocity: this.player.transform.direction,
        speed: 4e-3,
        collider: {
          type: "aabb",
          height: 0.1,
          width: 0.1,
          solid: !1
        }
      }));
    }, this.handlePlayerInteractionButton = () => {
      const c = Date.now();
      if (!(c - this.lastInteractionAttempt < this.interactionTimeout) && this.inputSystem.isKeyPressed(" ")) {
        this.lastInteractionAttempt = c;
        const p = this.rays[Math.floor(this.rays.length / 2)];
        console.log(p);
      }
    }, this.animateEquippedWeapon = () => {
      var f;
      if (this.player.equippedWeapon.state === Z.Idle)
        return;
      const h = this.player.equippedWeaponAnimation;
      if (!h)
        return;
      const { currentFrame: p, frames: g, events: _, timeSinceLastFrame: e } = h, i = Date.now();
      if (i - e < 1e3 / 15)
        return;
      const o = p + 1;
      o >= g.length ? this.switchWeaponState(Z.Idle) : (h.currentFrame = o, h.timeSinceLastFrame = i, (f = h.events) != null && f.length && h.events.map((m) => {
        m.frameId === g[h.currentFrame].frameId && this.broker.emit(m.eventType, {
          ...m.eventPayload,
          entityEmitter: this.player
        });
      }));
    }, this.handleCollisions = () => {
      var p;
      const c = this.player.collisions;
      if (!c.length)
        return;
      const h = c.shift();
      if (this.player.collisions = [], (p = h.collidedWith) != null && p.actor)
        switch (h.collidedWith.actor) {
          case ee.Book:
          case ee.Coin:
          case ee.Portal:
            this.broker.emit(O.PlayerActorCollision, {
              name: O.PlayerActorCollision,
              actor: h.collidedWith.actor,
              collidedWithEntity: h.collidedWith,
              emitterEntity: this.player
            });
        }
    }, this.ecs = s, this.broker = t, this.inputSystem = r, this.weaponAssetManager = l, this.playerEntities = this.ecs.entityManager.with([
      "userControl"
    ]), this.player = n, this.switchWeapon(this.player.equippedWeapon.type), this.broker.subscribe(O.RaysUpdated, this.handleRaysUpdated);
  }
  update(s) {
    this.handleCollisions(), this.updatePlayerMovement(), this.handlePlayerActions(), this.handlePlayerInteractionButton(), this.animateEquippedWeapon();
  }
}
const ke = 256, De = {
  width: 768,
  height: 512,
  canvasId: "raymarcher-display"
}, je = 20, Ee = Math.PI * 2, Ge = 1.3, ye = 50 / 256, We = 1.2 ** 2;
class Re {
  constructor(s, t, r, n) {
    this.rays = [], this.resetInteractiveTarget = () => {
      this.interactiveTarget = null, this.interactiveTargetDistance = 1 / 0;
    }, this.addIntersectedObjects = (l, c, h) => {
      const p = this.gridManager.getObjectEntitiesByGridLocation(l, c);
      for (const g of p)
        if (this.intersectedObjects.add(g), h && g.hasOwnProperty("playerInteractions")) {
          const _ = this.camera.transform.position.distanceTo(
            g.transform.position
          );
          _ < this.interactiveTargetDistance && _ < We && this.rayToRectIntersection(g) && (this.interactiveTarget = g, this.interactiveTargetDistance = _);
        }
    }, this.gridManager = s, this.broker = t, this.camera = r, this.width = n, this.intersectedObjects = /* @__PURE__ */ new Set(), this.resetInteractiveTarget();
  }
  rayToRectIntersection(s) {
    const t = ye / 2, r = (s.transform.position.x - t - this.camera.transform.position.x) / this.camera.transform.direction.x, n = (s.transform.position.x + ye - this.camera.transform.position.x) / this.camera.transform.direction.x, l = (s.transform.position.y - t - this.camera.transform.position.y) / this.camera.transform.direction.y, c = (s.transform.position.y + ye - this.camera.transform.position.y) / this.camera.transform.direction.y, h = Math.max(Math.min(r, n), Math.min(l, c)), p = Math.min(Math.max(r, n), Math.max(l, c));
    return h > p ? !1 : h >= 0 && p >= 0;
  }
  // TODO: add in an early return for maximum cast distance
  castRay(s, t, r = 1 / 0) {
    const n = this.camera.plane.scale(s).add(this.camera.transform.direction), l = this.camera.transform.position.map(Math.floor);
    this.addIntersectedObjects(
      l.x,
      l.y,
      t
    );
    const c = n.map((y) => Math.abs(1 / y)), h = n.x < 0 ? -1 : 1, p = n.y < 0 ? -1 : 1;
    let g = (n.x < 0 ? this.camera.transform.position.x - l.x : 1 + l.x - this.camera.transform.position.x) * c.x, _ = (n.y < 0 ? this.camera.transform.position.y - l.y : 1 + l.y - this.camera.transform.position.y) * c.y, e = null, i, a;
    for (; !e; ) {
      g < _ ? (g += c.x, l.x += h, i = "vertical", a = h > 0 ? "west" : "east") : (_ += c.y, l.y += p, i = "horizontal", a = p > 0 ? "north" : "south");
      const y = this.gridManager.getGridTile(
        l.x,
        l.y
      );
      if (y == null)
        break;
      y.type === "wall" && (e = y), this.addIntersectedObjects(
        y.gridLocation.x,
        y.gridLocation.y,
        t
      );
    }
    const o = i === "vertical" ? (l.x - this.camera.transform.position.x + (1 - h) / 2) / n.x : (l.y - this.camera.transform.position.y + (1 - p) / 2) / n.y, f = i === "vertical" ? this.camera.transform.position.y + o * n.y : this.camera.transform.position.x + o * n.x, m = f - Math.floor(f);
    return {
      normalizedDistance: o,
      wall: e,
      wallOrientation: i,
      wallIntersection: m,
      rayDirection: n,
      activeCell: l,
      // DO WE NEED THIS? It's the grid location of the wall (only an issue if we never find a wall)
      wallFace: a
    };
  }
  // TODO: probably should only run this on a framerate tick. The game can do what it wants, but the render stuff should be less frequent.
  update(s) {
    const t = [];
    this.intersectedObjects = /* @__PURE__ */ new Set(), this.resetInteractiveTarget();
    for (let r = 0; r < this.width; r++) {
      const n = 2 * r / this.width - 1, l = r === Math.floor(this.width / 2), c = this.castRay(n, l);
      t.push(c);
    }
    this.rays = t, this.broker.emit(O.RaysUpdated, {
      name: O.RaysUpdated,
      rays: t,
      timestamp: Date.now(),
      intersectedObjects: [...this.intersectedObjects],
      playerInteractionsTarget: this.interactiveTarget
    });
  }
}
function He(d, s) {
  const t = document.createElement("canvas"), r = t.getContext("2d");
  t.width = d.width, t.height = d.height;
  const n = d.getContext("2d").getImageData(0, 0, d.width, d.height), l = n.data;
  for (let c = 0; c < l.length; c += 4)
    l[c] *= s, l[c + 1] *= s, l[c + 2] *= s, l[c] = Math.min(255, l[c]), l[c + 1] = Math.min(255, l[c + 1]), l[c + 2] = Math.min(255, l[c + 2]);
  return r.putImageData(n, 0, 0), t;
}
const Ae = (d) => d >= 22.5 && d < 67.5 ? 4 : d >= 67.5 && d < 112.5 ? 3 : d >= 112.5 && d < 157.5 ? 2 : d >= 157.5 || d < -157.5 ? 1 : d >= -157.5 && d < -112.5 ? 8 : d >= -112.5 && d < -67.5 ? 7 : d >= -67.5 && d < -22.5 ? 6 : 5;
class Xe {
  // Grid tile units are not equivalent to screen pixel height, so we need to scale accordingly
  constructor(s, t, r, n, l, c, h, p, g, _) {
    this.currentRayFrame = -1 / 0, this.offscreenCanvas = document.createElement("canvas"), this.offscreenCtx = this.offscreenCanvas.getContext("2d"), this.worldCanvas = document.createElement("canvas"), this.worldCtx = this.worldCanvas.getContext("2d", {
      willReadFrequently: !0
    }), this.spriteCanvas = document.createElement("canvas"), this.spriteCtx = this.spriteCanvas.getContext("2d"), this.textCanvas = document.createElement("canvas"), this.textCtx = this.textCanvas.getContext("2d"), this.skyCanvas = document.createElement("canvas"), this.skyCtx = this.skyCanvas.getContext("2d"), this.floorCeilingCanvas = document.createElement("canvas"), this.floorCeilingCtx = this.floorCeilingCanvas.getContext("2d"), this.renderEquippedWeapon = () => {
      if (this.camera.equippedWeapon.type === ce.None)
        return;
      const o = this.camera.equippedWeaponAnimation;
      if (!o)
        return;
      const f = o.frames[o.currentFrame], m = this.spriteManager.getSpriteTexture(f.frameId);
      if (!m)
        return;
      const u = this.camera.equippedWeaponSprite;
      if (!u)
        return;
      const y = 0.8, x = u.width, w = y * this.canvas.width / x, S = m.width, A = m.height, j = this.canvas.width * y, G = S * w, v = A * w, L = j - G, M = Math.floor(this.canvas.width / 2), F = Math.floor(M - j / 2) + L, b = this.canvas.height - v, P = !this.camera.velocity.equals(new k(0, 0)), C = Date.now(), T = P ? F + Math.sin(5 * C / 1e3) * 15 : F, E = P ? Math.max(b + Math.sin(10 * C / 1e3) * 10, b) : b;
      this.offscreenCtx.drawImage(
        m == null ? void 0 : m.canvas,
        T,
        E,
        G,
        v
      );
    }, this.handleRaysUpdated = (a) => {
      a.timestamp !== this.currentRayFrame && (this.currentRayFrame = a.timestamp, this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.offscreenCtx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.renderSkybox(), this.renderWorld(a.rays), this.renderObjects(
        a.rays,
        a.intersectedObjects,
        a.playerInteractionsTarget
      ), this.renderEquippedWeapon(), this.draw());
    }, this.ecs = r, this.gameSettings = n.gameSettings, this.textureManager = l, this.spriteManager = c, this.gridManager = h, this.broker = p, this.camera = g, this.skyboxEntity = _, this.canvas = s, this.ctx = t, this.spriteCtx.imageSmoothingEnabled = !1, this.offscreenCtx.imageSmoothingEnabled = !1, this.worldCtx.imageSmoothingEnabled = !1, this.offscreenCanvas.width = this.skyCanvas.width = this.floorCeilingCanvas.width = this.worldCanvas.width = this.canvas.width, this.offscreenCanvas.height = this.skyCanvas.height = this.floorCeilingCanvas.height = this.worldCanvas.height = this.canvas.height;
    const e = this.gameSettings.height / 2;
    this.projectionPlane = e;
    const i = e / Math.cos(this.camera.camera.fov / 2);
    this.maxRenderDistance = i, this.scaledToScreen = this.gameSettings.height / this.gameSettings.tileSize, this.generateCurrentDistLookupTable(), this.generateFloorBrightnessModifierLookupTable(), this.generateWallBrightnessModifierLookupTable(), this.generateDistanceOffsetLookupTable(), this.worldPixelData = this.worldCtx.createImageData(
      this.gameSettings.width,
      this.gameSettings.height
    ), this.floorCeilingPixelData = this.floorCeilingCtx.createImageData(
      this.gameSettings.width,
      this.gameSettings.height
    ), this.objects = r.entityManager.with(["objectType"]), this.broker.subscribe(O.RaysUpdated, this.handleRaysUpdated);
  }
  // TODO: Memoize and make sure its rerun on screen size chagnes.
  generateCurrentDistLookupTable() {
    const s = {};
    for (let t = this.projectionPlane; t < this.gameSettings.height; t++)
      s[t] = this.gameSettings.height / (2 * t - this.gameSettings.height);
    return this.lookupCurrentDist = s, s;
  }
  generateDistanceOffsetLookupTable() {
    const s = [];
    this.lookupDistanceOffset = s;
  }
  generateWallBrightnessModifierLookupTable() {
    const s = [];
    for (let t = 0; t < this.maxRenderDistance; t++) {
      const n = 1 - t / this.maxRenderDistance * 15;
      s.push(n);
    }
    this.lookupWallBrightnessModifier = s;
  }
  generateFloorBrightnessModifierLookupTable() {
    const s = [], t = Math.floor(this.projectionPlane);
    for (let r = t; r < this.gameSettings.height; r++) {
      const l = (r - t) / (this.gameSettings.height - t), h = Math.min(l * 4, 1);
      s.push(h);
    }
    return this.lookupFloorBrightnessModifier = s, s;
  }
  // NOTE: Someday, If I have wall height or no outer walls, I'll regret only rendering half a skybox. :)
  renderSkybox() {
    const { skybox: s } = this.skyboxEntity;
    switch (s.surface) {
      case "color":
        const t = s.color;
        this.skyCtx.fillStyle = `#${t}`, this.skyCtx.fillRect(
          0,
          0,
          this.gameSettings.width,
          this.projectionPlane
        );
        break;
      case "texture":
        const r = s.texture.name, n = this.textureManager.getTexture(
          r,
          s.surface
        ), { x: l, y: c } = this.camera.transform.direction, h = Math.atan2(l, c);
        let p = h > 0 ? we(h) : 360 + we(h);
        const g = n.width / 6, _ = (360 - p) / 360 * n.width;
        if (n.width - _ < g) {
          const i = _ + g - n.width, a = g - i, f = a / g * this.gameSettings.width;
          this.skyCtx.drawImage(
            n.canvas,
            _,
            0,
            a,
            n.height,
            0,
            0,
            f,
            this.projectionPlane
          ), this.skyCtx.drawImage(
            n.canvas,
            0,
            0,
            i,
            n.height,
            f,
            0,
            this.gameSettings.width - f,
            this.projectionPlane
          );
        } else
          this.skyCtx.drawImage(
            n.canvas,
            _,
            0,
            g,
            n.height,
            0,
            0,
            this.gameSettings.width,
            this.projectionPlane
          );
        break;
    }
    this.offscreenCtx.drawImage(this.skyCanvas, 0, 0);
  }
  renderWorld(s) {
    var t, r;
    for (let n = 0; n < s.length; n++) {
      const l = s[n], {
        normalizedDistance: c,
        wall: h,
        wallOrientation: p,
        wallIntersection: g,
        rayDirection: _,
        activeCell: e,
        wallFace: i
      } = l, a = Math.round(
        this.gameSettings.height / c - 0.1
      ), o = this.projectionPlane - a / 2, f = c / this.maxRenderDistance * this.projectionPlane, m = Math.floor(f), u = f - m, y = this.lookupWallBrightnessModifier[m], x = this.lookupWallBrightnessModifier[m + 1], w = Oe(y, x, u);
      try {
        const v = (r = (t = h.wallTile) == null ? void 0 : t.wallFaces) == null ? void 0 : r.find(
          (P) => P.wallFace === i
        ), L = v || h.wallTile, { surface: M, color: F, texture: b } = L;
        switch (M) {
          case "color":
            if (w < 0) {
              const T = "rgb(0,0,0)";
              this.worldCtx.fillStyle = T, this.worldCtx.beginPath(), this.worldCtx.fillRect(n, o, 1, a), this.worldCtx.closePath();
            } else
              this.worldCtx.fillStyle = `rgb(${F.r},${F.g},${F.b})`, this.worldCtx.beginPath(), this.worldCtx.fillRect(n, o, 1, a), this.worldCtx.closePath();
            break;
          case "spriteTexture":
          case "animatedTexture":
          case "texture":
            const P = 4 * this.gameSettings.width, C = 4 * n;
            if (w < 0)
              for (let T = 0; T < a; T++) {
                const I = P * Math.floor(o + T) + C;
                I < 0 || I > this.worldPixelData.data.length || (this.worldPixelData.data[I] = 0, this.worldPixelData.data[I + 1] = 0, this.worldPixelData.data[I + 2] = 0, this.worldPixelData.data[I + 3] = 255);
              }
            else {
              const T = this.textureManager.getTexture(
                b.name,
                M
              ), E = T.transposedBitmap, I = T.width, W = T.height;
              let H;
              p === "horizontal" ? this.camera.transform.direction.y > 0 ? H = g - Math.floor(g) : H = 1 - (g - Math.floor(g)) : this.camera.transform.direction.x < 0 ? H = g - Math.floor(g) : H = 1 - (g - Math.floor(g));
              let $ = Math.floor(
                H * I
              );
              const N = a / T.height, R = T.height / a, ne = a > W ? R : N;
              for (let B = 0; B < a; B++) {
                const Y = Math.floor(B / a * W), U = Math.min(
                  4 * ($ * W + Y),
                  E.length - 4
                ), ae = E[U], D = E[U + 1], z = E[U + 2], Q = E[U + 3] || 255, q = P * Math.floor(o + B) + C;
                q < 0 || q > this.worldPixelData.data.length || (this.worldPixelData.data[q] = w * ae, this.worldPixelData.data[q + 1] = w * D, this.worldPixelData.data[q + 2] = w * z, this.worldPixelData.data[q + 3] = Q);
              }
            }
            break;
        }
      } catch (v) {
        console.warn(v), console.warn("Error loading wall texture, using fallback");
        const M = "hsl(0, 100%, 50%)";
        this.worldCtx.fillStyle = M, this.worldCtx.beginPath(), this.worldCtx.fillRect(n, o, 1, a), this.worldCtx.closePath();
      }
      let S, A;
      p === "vertical" && _.x > 0 ? (S = e.x, A = e.y + g) : p === "vertical" && _.x < 0 ? (S = e.x + 1, A = e.y + g) : p === "horizontal" && _.y > 0 ? (S = e.x + g, A = e.y) : (S = e.x + g, A = e.y + 1);
      const j = Math.floor(o + a) >= 0 ? Math.floor(o + a) : this.gameSettings.height;
      if (this.gameSettings.height - j > 0)
        for (let v = j; v < this.gameSettings.height; v++) {
          const M = this.lookupCurrentDist[v] / c, F = M * S + (1 - M) * this.camera.transform.position.x, b = M * A + (1 - M) * this.camera.transform.position.y, P = this.gridManager.getGridTile(
            Math.floor(F),
            Math.floor(b)
          );
          if (P == null || P.floorTile == null)
            continue;
          const C = this.lookupFloorBrightnessModifier[v - this.projectionPlane], { surface: T } = P.floorTile;
          switch (T) {
            case "color":
              const { r: H, g: $, b: N } = P.floorTile.color, R = (v * this.gameSettings.width + n) * 4;
              this.floorCeilingPixelData.data[R] = H * C, this.floorCeilingPixelData.data[R + 1] = $ * C, this.floorCeilingPixelData.data[R + 2] = N * C, this.floorCeilingPixelData.data[R + 3] = 255;
              break;
            case "spriteTexture":
            case "animatedTexture":
            case "texture":
              const ne = P.floorTile.texture.name, B = this.textureManager.getTexture(
                ne,
                T
              );
              if (B != null) {
                const Y = B.getImageData(), U = Math.floor(F * B.width) % B.width, D = (Math.floor(b * B.height) % B.height * B.width + U) * 4, z = Y.data[D] * C, Q = Y.data[D + 1] * C, J = Y.data[D + 2] * C, q = Y.data[D + 3], V = (v * this.gameSettings.width + n) * 4;
                this.floorCeilingPixelData.data[V] = z, this.floorCeilingPixelData.data[V + 1] = Q, this.floorCeilingPixelData.data[V + 2] = J, this.floorCeilingPixelData.data[V + 3] = q;
              }
              break;
          }
          const E = P.floorTile.ceiling;
          if (!E)
            continue;
          const I = Math.max(
            C - 0.2,
            0
          ), W = E.surface;
          switch (W) {
            case "color":
              const { r: H, g: $, b: N } = E.color, R = ((this.gameSettings.height - v) * this.gameSettings.width + n) * 4;
              this.floorCeilingPixelData.data[R] = H * I, this.floorCeilingPixelData.data[R + 1] = $ * I, this.floorCeilingPixelData.data[R + 2] = N * I, this.floorCeilingPixelData.data[R + 3] = 255;
              break;
            case "spriteTexture":
            case "animatedTexture":
            case "texture":
              const ne = E.texture.name;
              let B = this.textureManager.getTexture(
                ne,
                W
              );
              if (B != null) {
                const Y = B.getImageData(), U = Math.floor(F * B.width) % B.width, D = (Math.floor(
                  (this.gameSettings.height - b) * B.height
                ) % B.height * B.width + U) * 4, z = Y.data[D] * I, Q = Y.data[D + 1] * I, J = Y.data[D + 2] * I, q = Y.data[D + 3], V = ((this.gameSettings.height - v) * this.gameSettings.width + n) * 4;
                this.floorCeilingPixelData.data[V] = z, this.floorCeilingPixelData.data[V + 1] = Q, this.floorCeilingPixelData.data[V + 2] = J, this.floorCeilingPixelData.data[V + 3] = q;
              }
              break;
          }
        }
    }
    this.worldCtx.putImageData(this.worldPixelData, 0, 0), this.offscreenCtx.drawImage(this.worldCanvas, 0, 0), this.worldPixelData = this.worldCtx.createImageData(
      this.gameSettings.width,
      this.gameSettings.height
    ), this.floorCeilingCtx.putImageData(this.floorCeilingPixelData, 0, 0), this.offscreenCtx.drawImage(this.floorCeilingCanvas, 0, 0), this.floorCeilingPixelData = this.floorCeilingCtx.createImageData(
      this.gameSettings.width,
      this.gameSettings.height
    );
  }
  renderObjects(s, t, r) {
    const n = t.sort((c, h) => {
      const p = Math.pow(this.camera.transform.position.x - c.transform.position.x, 2) + Math.pow(this.camera.transform.position.y - c.transform.position.y, 2);
      return Math.pow(this.camera.transform.position.x - h.transform.position.x, 2) + Math.pow(this.camera.transform.position.y - h.transform.position.y, 2) - p;
    });
    if (!n.length)
      return;
    const l = s.map((c) => c.normalizedDistance);
    for (const c of n)
      if (c.transform) {
        const h = c.transform.position.x - this.camera.transform.position.x, p = c.transform.position.y - this.camera.transform.position.y, g = this.camera.camera.inverseDeterminate * (this.camera.transform.direction.y * h - this.camera.transform.direction.x * p), _ = Math.max(
          this.camera.camera.inverseDeterminate * (-this.camera.plane.y * h + this.camera.plane.x * p),
          0
        ), e = Math.floor(
          this.gameSettings.width / 2 * (1 + g / _)
        );
        if (e < -200 || e > this.gameSettings.width + 200)
          continue;
        let i;
        if (c.objectType === "object__static") {
          let M;
          if (c.sprite.directions === 0)
            M = `${c.sprite.name}0`;
          else {
            const F = Se(
              c.transform.position,
              c.transform.direction,
              this.camera.transform.position
            ), b = Ae(F);
            M = `${c.sprite.name}${b}`;
          }
          i = this.spriteManager.getSpriteTexture(M);
        } else {
          const { currentState: M, states: F } = c.state, { animation: b } = F[M], { frames: P, currentFrame: C } = b, T = P[C], E = T.frameId, { directions: I } = T;
          let W;
          if (I === 0)
            W = `${E}0`;
          else {
            const H = Se(
              c.transform.position,
              c.transform.direction,
              this.camera.transform.position
            ), $ = Ae(H);
            W = `${E}${$}`;
          }
          i = this.spriteManager.getSpriteTexture(W);
        }
        const o = Math.sqrt(
          (c.transform.position.x - this.camera.transform.position.x) ** 2 + (c.transform.position.y - this.camera.transform.position.y) ** 2
        ), f = Math.ceil(
          this.gameSettings.height / o
        ), m = c.transform.elevation * this.scaledToScreen / o, u = this.projectionPlane - m + f / 2, y = ~~(c.transform.height / this.gameSettings.tileSize * f), x = u, w = u - y, S = i.width / i.height, A = Math.abs(Math.floor(y * S)), j = Math.floor(-A / 2 + e), G = A / 2 + e;
        let v = this.lookupWallBrightnessModifier[Math.floor(_)];
        r === c && (v *= Ge);
        const L = He(i.canvas, v);
        for (let M = j; M < G; M++) {
          const F = Math.floor(
            256 * (M - j) * i.width / A
          ) >> 8;
          _ > 0 && M > 0 && M < this.gameSettings.width && _ < l[M] && this.offscreenCtx.drawImage(
            L,
            F,
            0,
            1,
            i.height,
            M,
            w,
            1,
            x - w
          );
        }
      }
  }
  draw() {
    this.ctx.drawImage(this.offscreenCanvas, 0, 0);
  }
  // TODO: Framerate limit this.
  update(s) {
  }
}
class qe {
  constructor(s, t, r, n) {
    this.handlePlaySoundEvent = (l) => {
      this.audioManager.playSound(l.name);
    }, this.ecs = s, this.audioManager = t, this.broker = r, this.audioListenerEntity = n, this.broker.subscribe(
      O.PlaySound,
      this.handlePlaySoundEvent
    );
  }
  update(s) {
    var n;
    const t = this.ecs.entityManager.with([
      "audioSource",
      "transform"
    ]), r = this.audioListenerEntity.transform.position;
    for (const l of t) {
      const c = l.transform.position, { audioSource: h } = l, {
        name: p,
        fullVolumeRadius: g,
        anyVolumeRadius: _,
        volume: e,
        looping: i,
        isPlaying: a,
        spriteId: o
      } = h, f = c.distanceTo(r);
      if (f > _) {
        a && o && this.audioManager.updateSoundVolume(o, 0);
        continue;
      }
      if (!a && !o) {
        const m = this.audioManager.playSound(p);
        l.audioSource.isPlaying = !0, m && (l.audioSource.spriteId = m, i && this.audioManager.updateSoundLoopValue(m, !0));
      }
      if (o && !this.audioManager.isPlaying(o) && this.audioManager.playSound(o) === null && ((n = l.audioSource) == null || delete n.spriteId), o && this.audioManager.isPlaying(o)) {
        let m = e;
        f > g && (m = Math.max(1 - f / _, 0)), this.audioManager.updateSoundVolume(o, m);
      }
    }
  }
}
class Ye {
  constructor(s, t, r) {
    this.deceleration = 10, this.ecs = s, this.broker = t, this.gridManager = r, this.player = s.entityManager.with(["camera"])[0];
  }
  update(s) {
    var n, l, c, h, p, g, _, e, i, a;
    const t = [
      this.player,
      ...this.ecs.entityManager.with(["velocity", "transform", "movement"]).filter((o) => !o.hasOwnProperty("camera"))
    ], r = this.deceleration * s;
    for (const o of t) {
      const { velocity: f } = o, { position: m } = o.transform, { speed: u } = o.movement;
      if (f.x === 0 && f.y === 0)
        continue;
      let y = f.clampMagnitude(0, u);
      const x = y.scale(s);
      if (x.equals({ x: 0, y: 0 }))
        continue;
      const w = (n = o.collider) != null && n.radius ? (l = o.collider) == null ? void 0 : l.radius : 0, S = m.add(x), A = y.x < 0 ? -1 : 1, j = y.y < 0 ? -1 : 1, G = S.add(
        new k(A, j).scale(w)
      );
      if (k.magnitude(y) > 0) {
        const P = Math.max(
          0,
          k.magnitude(y) - r
        );
        y = y.clampMagnitude(
          P,
          P
        );
      }
      const v = this.gridManager.getGridTileFromCoord(
        G.x,
        m.y
      ), L = this.gridManager.getGridTileFromCoord(
        m.x,
        G.y
      );
      if (o.collisions && v && !v.accessible && (o.collisions.push({
        entity: o,
        collidedWith: v,
        axis: "x",
        overlap: 0,
        timestamp: Date.now()
      }), ((c = o == null ? void 0 : o.collisionLayer) == null ? void 0 : c.layer) === X.PlayerProjectile) || o.collisions && L && !L.accessible && (o.collisions.push({
        entity: o,
        collidedWith: L,
        axis: "y",
        overlap: 0,
        timestamp: Date.now()
      }), ((h = o == null ? void 0 : o.collisionLayer) == null ? void 0 : h.layer) === X.PlayerProjectile))
        continue;
      const M = v != null && v.accessible ? S.x : m.x, F = L != null && L.accessible ? S.y : m.y, b = new k(M, F);
      if (o.collider) {
        const P = ((p = o.collisionLayer) == null ? void 0 : p.layer) ?? X.None, C = this.ecs.entityManager.with(["collider"]).filter((T) => T !== o);
        for (const T of C) {
          const E = ((g = T.collisionLayer) == null ? void 0 : g.layer) ?? X.None;
          if (P === X.PlayerProjectile && E === X.Player || P === X.Player && E === X.PlayerProjectile || P === X.PlayerProjectile && E === X.PickupItem)
            continue;
          const I = T.transform.position, W = T.collider;
          if (W.type !== "aabb" || o.collider.type !== "aabb")
            continue;
          const H = o.transform.elevation > T.transform.elevation + T.transform.height, $ = o.transform.elevation + o.transform.height < T.transform.elevation;
          if (!(H || $) && b.x < I.x + W.width && b.x + o.collider.width > I.x && b.y < I.y + W.height && b.y + o.collider.height > I.y) {
            const N = Math.min(
              b.x + o.collider.width - I.x,
              I.x + W.width - b.x
            ), R = Math.min(
              b.y + o.collider.height - I.y,
              I.y + W.height - b.y
            );
            if (N < R) {
              if (o.collisions && o.collisions.push({
                entity: o,
                collidedWith: T,
                axis: "x",
                overlap: N,
                timestamp: Date.now()
              }), ((_ = o == null ? void 0 : o.collisionLayer) == null ? void 0 : _.layer) === X.PlayerProjectile || !o.collider.solid || !((e = T.collider) != null && e.solid))
                continue;
              b.x += b.x < I.x ? -N : N;
            } else {
              if (o.collisions && o.collisions.push({
                entity: o,
                collidedWith: T,
                axis: "y",
                overlap: R,
                timestamp: Date.now()
              }), ((i = o == null ? void 0 : o.collisionLayer) == null ? void 0 : i.layer) === X.PlayerProjectile || !o.collider.solid || !((a = T.collider) != null && a.solid))
                continue;
              b.y += b.y < I.y ? -R : R;
            }
          }
        }
      }
      this.ecs.entityManager.updateEntity(o, {
        transform: {
          ...o.transform,
          position: new k(b.x, b.y)
        }
      }), o !== this.player && this.gridManager.updateObjectEntityGridTracking(o);
    }
  }
}
class Ne {
  constructor(s, t, r, n) {
    this.handleProjectileCollision = (l) => {
      var c, h;
      ((h = (c = l.collidedWith) == null ? void 0 : c.ai) == null ? void 0 : h.aiType) === de.DogFriendly && (this.updateState(l.collidedWith, "state__hit"), l.collidedWith.ai.seekTarget.target = null, l.collidedWith.ai.seekPath.path = null, l.collidedWith.velocity = new k(0, 0));
    }, this.setSwarmState = (l) => {
      var h;
      const c = k.normalize(
        // TODO: This is madness. When I have time clean up all this type transformation
        new k(
          this.player.transform.position.x,
          this.player.transform.position.y
        ).subtract(l.transform.position)
      );
      l.movement.speed = ((h = l.movement.settings) == null ? void 0 : h.runSpeed) ?? 2e-3, l.velocity = c.scale(l.movement.speed), l.transform.direction = c, this.updateState(l, "state__swarm");
    }, this.unsetSwarmState = (l) => {
      this.ecs.entityManager.removeComponentFromEntity(l, "flowingMovement");
    }, this.setWanderState = (l) => {
      var c;
      l.state.currentState === "state__swarm" && this.unsetSwarmState(l), l.ai.seekPath.path = null, l.ai.seekPath.currentIndex = 0, l.ai.seekTarget.target = null, l.movement.speed = ((c = l.movement.settings) == null ? void 0 : c.walkSpeed) ?? 1e-3, this.updateState(l, "state__wander");
    }, this.setIdleState = (l) => {
      l.state.currentState === "state__swarm" && this.unsetSwarmState(l), l.velocity = new k(0, 0), l.movement.speed = 0, this.updateState(l, "state__idle");
    }, this.updateState = (l, c) => {
      const h = l.state, { currentState: p, states: g } = h;
      if (c === p)
        return;
      const _ = g[c];
      l.transform.height = _.height, l.state.previousState = p, l.state.currentState = c, l.state.lastStateChange = Date.now(), _.sound && this.broker.emit(O.PlaySound, {
        ..._.sound,
        entityEmitter: l
      });
    }, this.update = (l, c) => {
      var f;
      const h = c.state, { currentState: p, previousState: g, lastStateChange: _ } = h;
      let e = c.ai.seekTarget.target;
      const i = c.ai.seekPath.path, a = c.ai.seekPath.currentIndex;
      if ((f = c.collisions) != null && f.length && (c.collisions = [], c.ai.seekTarget.target = null, c.ai.seekPath.path = null), ve(
        this.player.transform.position,
        c.transform.position
      ) <= 1.5 && p !== "state__hit") {
        c.ai.seekPath.path = null, c.ai.seekTarget.target = null;
        const m = k.normalize(
          new k(
            this.player.transform.position.x,
            this.player.transform.position.y
          ).subtract(c.transform.position)
        );
        c.transform.direction = m, this.setIdleState(c);
        return;
      }
      if (p === "state__swarm") {
        const m = {
          target: this.player.transform.position.map(Math.floor),
          weight: 1,
          speed: c.movement.speed * 10
        };
        this.ecs.entityManager.updateEntity(c, {
          flowingMovement: m
        });
      }
      if (p === "state__hit") {
        const m = Date.now() - _;
        if (c.transform.direction.rotate(l), m < 2e3)
          return;
        this.updateState(c, "state__idle");
      }
      if (p === "state__idle" && this.setWanderState(c), p === "state__wander") {
        if (!e) {
          const u = this.gridManager.getRandomAccessibleGridLocation();
          if (!u)
            throw new Error("Ahhh, map has no accessible locations!");
          e = c.ai.seekTarget.target = new k(
            u.gridLocation.x,
            u.gridLocation.y
          );
        }
        if (!i) {
          const u = this.gridManager.getPathAtoB(
            c.transform.position,
            e
          );
          c.ai.seekPath.path = u, c.ai.seekPath.currentIndex = 0;
        }
        if (ve(
          c.transform.position,
          e
        ) < 1 && (c.ai.seekPath.path = null, c.ai.seekPath.currentIndex = 0, c.ai.seekTarget.target = null), e && i && a < i.length) {
          const u = i[a];
          ve(
            c.transform.position,
            u
          ) <= 1 && c.ai.seekPath.currentIndex++;
          const x = k.normalize(
            // TODO: This is madness. When I have time clean up all this type transformation
            new k(u.x, u.y).subtract(
              c.transform.position
            )
          );
          c.velocity = x.scale(c.movement.speed), c.transform.direction = x;
        }
      }
    }, this.ecs = s, this.broker = t, this.gridManager = r, this.player = n, this.broker.subscribe(
      O.ProjectileCollision,
      this.handleProjectileCollision
    );
  }
}
function ve(d, s) {
  const t = s.x - d.x, r = s.y - d.y;
  return Math.sqrt(t * t + r * r);
}
class Ve {
  constructor(s, t, r, n) {
    this.handleProjectileCollision = (l) => {
      var c, h;
      ((h = (c = l.collidedWith) == null ? void 0 : c.ai) == null ? void 0 : h.aiType) === de.BirdSkittish && (this.updateState(l.collidedWith, "state__hit"), l.collidedWith.ai.seekTarget.target = null, l.collidedWith.ai.seekPath.path = null, l.collidedWith.velocity = new k(0, 0));
    }, this.updateState = (l, c) => {
      const h = l.state, { currentState: p, states: g } = h;
      if (c === p)
        return;
      const _ = g[c];
      l.transform.height = _.height, l.state.previousState = p, l.state.currentState = c, l.state.lastStateChange = Date.now(), _.bobbingMovement ? l.bobbingMovement = {
        initialElevation: l.transform.elevation,
        amplitude: _.bobbingMovement.amplitude,
        frequency: _.bobbingMovement.frequency,
        startTime: Date.now()
      } : this.ecs.entityManager.removeComponentFromEntity(
        l,
        "bobbingMovement"
      );
    }, this.setIdleState = (l) => {
      this.updateState(l, "state__idle"), l.velocity = new k(0, 0);
    }, this.setFleeState = (l) => {
      var p;
      this.updateState(l, "state__flee"), l.movement.speed = ((p = l.movement.settings) == null ? void 0 : p.runSpeed) || 0;
      const c = this.getFleeTarget(l);
      if (!c)
        return;
      const h = this.gridManager.getPathAtoB(
        l.transform.position,
        c
      );
      l.ai.seekTarget.target = c, l.ai.seekPath.path = h, l.ai.seekPath.currentIndex = 0, l.velocity = l.transform.direction.scale(
        0.5 * l.movement.speed
      );
    }, this.getFleeTarget = (l) => {
      const _ = k.normalize(
        this.player.transform.position.add(this.player.velocity.scale(2)).subtract(l.transform.position)
      );
      let e = l.transform.position.add(
        _.scale(5)
      );
      if (!this.gridManager.isTileAccessible(e.x, e.y)) {
        for (let i = 0; i < 20; i++) {
          for (let a = 0; a < 10; a++) {
            const o = (i + 1) * 10 / 20, f = Math.random() * Math.PI * 2, m = new k(
              Math.cos(f),
              Math.sin(f)
            ).scale(o);
            if (e = l.transform.position.add(_.scale(5)).add(m), this.gridManager.isTileAccessible(
              Math.floor(e.x),
              Math.floor(e.y)
            ))
              return e.map(Math.floor);
          }
          l.transform.position.subtract(e).length() > 10 && _.scale(-1);
        }
        return null;
      }
      return e;
    }, this.update = (l, c) => {
      var f;
      const h = c.state, { currentState: p, previousState: g, lastStateChange: _ } = h;
      let e = c.ai.seekTarget.target;
      const i = c.ai.seekPath.path, a = c.ai.seekPath.currentIndex;
      if (p === "state__hit") {
        const m = Date.now() - _;
        if (c.transform.direction.rotate(l), m < 2e3)
          return;
        this.setIdleState(c);
      }
      const o = xe(
        this.player.transform.position,
        c.transform.position
      );
      if ((f = c.collisions) != null && f.length && (c.collisions = []), p === "state__flee" && o > 4 && Math.random() > 0.95 && this.setIdleState(c), p === "state__flee") {
        if (!c.ai.seekTarget.target)
          this.setIdleState(c);
        else if (xe(
          c.transform.position,
          c.ai.seekTarget.target
        ) < 1 && (c.ai.seekPath.path = null, c.ai.seekPath.currentIndex = 0, c.ai.seekTarget.target = null), e && i && a < i.length) {
          const u = i[a];
          xe(
            c.transform.position,
            u
          ) <= 1 && c.ai.seekPath.currentIndex++;
          const x = k.normalize(
            // TODO: This is madness. When I have time clean up all this type transformation
            new k(u.x, u.y).subtract(
              c.transform.position
            )
          );
          c.velocity = x.scale(c.movement.speed), c.transform.direction = x;
        }
      }
      if (p !== "state__flee" && o <= 2) {
        this.setFleeState(c);
        return;
      }
    }, this.ecs = s, this.broker = t, this.gridManager = r, this.player = n, this.broker.subscribe(
      O.ProjectileCollision,
      this.handleProjectileCollision
    );
  }
}
function xe(d, s) {
  const t = s.x - d.x, r = s.y - d.y;
  return Math.sqrt(t * t + r * r);
}
class $e {
  constructor(s, t, r) {
    this.aiSystems = /* @__PURE__ */ new Map(), this.ecs = s, this.broker = t, this.gridManager = r, this.intelligentEntities = this.ecs.entityManager.with(["ai"]), this.playerEntity = this.ecs.entityManager.with([
      "camera"
    ])[0], this.aiSystems.set(
      de.DogFriendly,
      new Ne(
        this.ecs,
        this.broker,
        this.gridManager,
        this.playerEntity
      )
    ), this.aiSystems.set(
      de.BirdSkittish,
      new Ve(
        this.ecs,
        this.broker,
        this.gridManager,
        this.playerEntity
      )
    );
  }
  update(s) {
    for (const t of this.intelligentEntities) {
      const { aiType: r } = t.ai, n = this.aiSystems.get(r);
      n && n.update(s, t);
    }
  }
}
class Ke {
  constructor(s, t, r) {
    this.handleEmitProjectile = (n) => {
      const { projectileType: l } = n;
      switch (l) {
        case "magic_shot":
          this.newMagicShot(n);
          break;
      }
    }, this.handleDestroyProjectile = (n) => {
      this.removeProjectile(n.projectile);
    }, this.removeProjectile = (n) => {
      this.gridManager.removeObjectEntityGridTracking(n), this.ecs.entityManager.remove(n);
    }, this.emitCollisionEvent = (n, l) => {
      this.broker.emit(O.ProjectileCollision, {
        name: O.ProjectileCollision,
        projectileType: "magic_shot",
        emitter: "player",
        entityEmitter: n,
        timestamp: Date.now(),
        // Since this isn't the same exact event as the initial collision, probabl ya  new timestamp?
        collidedWith: l.collidedWith,
        // This reference shoudl still be there, but the ball won't be, so we need to include pertinent information. If there were physics we'd include that kind of stuff, but not right now.
        collisionLayer: X.PlayerProjectile
        // TODO: Support NPC projectiles?
      });
    }, this.updateProjectileState = (n, l) => {
      n.state.currentState !== l && (n.state.previousState = n.state.currentState, n.state.lastStateChange = Date.now(), n.state.currentState = l);
    }, this.newMagicShot = (n) => {
      const l = this.ecs.entityManager.add({
        objectType: "object__animated",
        projectileType: "magic_shot",
        transform: {
          position: n.origin,
          direction: n.direction,
          // I think this is unnecessary with projectiles, they should always have a velocity
          height: 32,
          elevation: 96
        },
        velocity: n.velocity,
        state: {
          currentState: te.Active,
          previousState: null,
          initialState: te.Active,
          lastStateChange: Date.now(),
          states: {
            [te.Active]: {
              name: "ms_state_active",
              // TODO: Names for what?
              animation: {
                name: "ms_anim_active",
                // TODO: Names for what?
                frames: [
                  {
                    frameId: "D2FXA",
                    directions: 8
                  },
                  {
                    frameId: "D2FXB",
                    directions: 8
                  },
                  {
                    frameId: "D2FXC",
                    directions: 8
                  },
                  {
                    frameId: "D2FXD",
                    directions: 8
                  },
                  {
                    frameId: "D2FXE",
                    directions: 8
                  }
                ],
                frameDuration: 100,
                looping: !0,
                events: [],
                currentFrame: 0,
                timeSinceLastFrame: 0
              }
            },
            [te.Destroying]: {
              name: "ms_state_destroying",
              animation: {
                name: "ms_anim_destroying",
                frames: [
                  {
                    frameId: "D2FXG",
                    directions: 0
                  },
                  {
                    frameId: "D2FXH",
                    directions: 0
                  },
                  {
                    frameId: "D2FXI",
                    directions: 0
                  },
                  {
                    frameId: "D2FXJ",
                    directions: 0
                  },
                  {
                    frameId: "D2FXK",
                    directions: 0
                  },
                  {
                    frameId: "D2FXL",
                    directions: 0
                  }
                ],
                frameDuration: 50,
                looping: !1,
                events: [],
                currentFrame: 0,
                timeSinceLastFrame: 0
              }
            }
          }
        },
        lifetime: 2e3,
        movement: {
          speed: n.speed
        },
        collider: n.collider,
        collisions: [],
        collisionLayer: {
          layer: X.PlayerProjectile
        },
        spatialPartitioningSettings: {
          // These are fudge values since figuring out the width is annoying. 30 should be plenty.
          width: 30,
          gridLocations: /* @__PURE__ */ new Set()
        }
      });
      l.state.states[te.Destroying].animation.events.push({
        frameId: "D2FXL",
        eventType: O.DestroyProjectile,
        eventPayload: {
          projectile: l
        }
      }), this.gridManager.updateObjectEntityGridTracking(l);
    }, this.ecs = s, this.broker = t, this.gridManager = r, this.broker.subscribe(
      O.EmitProjectile,
      this.handleEmitProjectile
    ), this.broker.subscribe(
      O.DestroyProjectile,
      this.handleDestroyProjectile
    );
  }
  update(s) {
    var r;
    const t = this.ecs.entityManager.with(["projectileType"]);
    for (const n of t) {
      if ((r = n.collisions) != null && r.length) {
        for (const p of n.collisions)
          this.emitCollisionEvent(n, p);
        const c = n.collisions[0].overlap - 0.2;
        n.transform.direction = n.transform.direction.scale(-1);
        const h = n.transform.direction.scale(c);
        n.transform.position = n.transform.position.subtract(h), n.lifetime = 1 / 0, n.movement.speed = 0, delete n.collider, delete n.collisions, this.updateProjectileState(n, te.Destroying);
        continue;
      }
      if (n.projectileType === "magic_shot") {
        if (n.lifetime < 0) {
          this.removeProjectile(n);
          continue;
        }
        n.lifetime -= s;
        const l = new k(0, 0).add(
          n.transform.direction.scale(n.movement.speed)
        );
        l.equals(n.velocity) || this.ecs.entityManager.updateEntity(n, { velocity: l });
      }
    }
  }
}
class Ue {
  constructor(s, t, r) {
    this.handlePlayerActorCollision = (n) => {
      switch (n.actor) {
        case ee.Portal:
        case ee.Book:
        case ee.Coin:
          this.gridManager.removeObjectEntityGridTracking(
            n.collidedWithEntity
          ), this.ecs.entityManager.remove(n.collidedWithEntity);
      }
    }, this.ecs = s, this.broker = t, this.gridManager = r, this.broker.subscribe(
      O.PlayerActorCollision,
      this.handlePlayerActorCollision
    );
  }
  update(s) {
    var r;
    const t = this.ecs.entityManager.queryEntities(
      (n) => (n == null ? void 0 : n.actor) === ee.Portal
    );
    for (const n of t)
      (r = n.collisions) != null && r.length;
  }
}
class Qe {
  constructor(s) {
    this.ecs = s;
  }
  update(s) {
    const t = this.ecs.entityManager.with(["bobbingMovement"]);
    for (const r of t) {
      const n = (Date.now() - r.bobbingMovement.startTime) / 1e3, l = Math.max(
        r.bobbingMovement.initialElevation + r.bobbingMovement.amplitude * Math.sin(Ee * r.bobbingMovement.frequency * n),
        0
      );
      r.transform.elevation = l;
    }
  }
}
function Ze(d, s, t, r, n, l) {
  d.beginPath(), d.moveTo(s + l, t), d.arcTo(s + r, t, s + r, t + l, l), d.arcTo(
    s + r,
    t + n,
    s + r - l,
    t + n,
    l
  ), d.arcTo(s, t + n, s, t + n - l, l), d.arcTo(s, t, s + l, t, l), d.closePath(), d.fill();
}
class ze {
  // TODO FLASH BUFFER
  constructor(s, t, r, n, l, c, h, p, g, _) {
    this.messageQueue = [], this.messageTimeout = null, this.activeMessage = null, this.flashEffect = null, this.offscreenCanvas = document.createElement("canvas"), this.offscreenCtx = this.offscreenCanvas.getContext("2d"), this.minimapLayer0Canvas = document.createElement("canvas"), this.minimapLayer0Ctx = this.minimapLayer0Canvas.getContext("2d"), this.minimapLayer1Canvas = document.createElement("canvas"), this.minimapLayer1Ctx = this.minimapLayer1Canvas.getContext("2d"), this.textMessageCanvas = document.createElement("canvas"), this.textMessageCtx = this.textMessageCanvas.getContext("2d"), this.handleInteractionDirectiveEvent = (e) => {
      this.handleInteractionDirective(e);
    }, this.handleInteractionDirective = (e) => {
      switch (e.type) {
        case me.ShowMessage: {
          this.queueTextMessage(e.body, e.priority);
          break;
        }
        case me.PlayAudio:
          this.broker.emit(O.PlaySound, {
            name: e.name
            // volume: directive.volume, // Not being used right now (Nor is priority with this mechanism that is just passing it on.)
          });
        case me.LoadLevel:
          document.dispatchEvent(
            new CustomEvent(be.GameEvent, {
              detail: {
                type: Te.LoadLevel,
                // TODO: Support specifying data later.
                data: {
                  level: e.level
                }
              }
            })
          );
      }
    }, this.handlePlayerActorCollision = (e) => {
      var i, a;
      if ((a = (i = e.collidedWithEntity) == null ? void 0 : i.interactionDirectives) != null && a.length)
        for (const o of e.collidedWithEntity.interactionDirectives)
          this.handleInteractionDirective(o);
    }, this.queueTextMessage = (e, i = 5) => {
      const a = {
        body: e,
        priority: i,
        timestamp: Date.now()
        // For later doing cleanup of stale or stuck messages.
      };
      this.messageQueue.push(a), this.activeMessage || this.bufferTextMessage();
    }, this.clearTextMessage = () => {
      this.textMessageCtx.clearRect(
        0,
        0,
        this.textMessageCanvas.width,
        this.textMessageCanvas.height
      ), this.activeMessage = null;
    }, this.bufferTextMessage = () => {
      if (this.clearTextMessage(), !this.messageQueue.length)
        return;
      const e = this.messageQueue.shift();
      this.activeMessage = e.body, this.messageTimeout = setTimeout(() => {
        this.bufferTextMessage();
      }, 2e3);
    }, this.renderTextMessages = () => {
      if (!this.activeMessage)
        return;
      this.textMessageCtx.font = "24px serif", this.textMessageCtx.textAlign = "center", this.textMessageCtx.textBaseline = "middle";
      const e = this.activeMessage.split(`
`);
      let i = "";
      for (const v of e)
        i = i.length > v.length ? i : v;
      const a = 20, o = 45, f = this.textMessageCanvas.width / 2, m = this.textMessageCanvas.height / 2, u = this.textMessageCtx.measureText(i), y = u.actualBoundingBoxLeft + u.actualBoundingBoxRight, x = e.length * o, w = f - u.actualBoundingBoxLeft - a, S = m - x / 2 - a, A = y + a * 2, j = x + a * 2;
      this.textMessageCtx.clearRect(
        0,
        0,
        this.textMessageCanvas.width,
        this.textMessageCanvas.height
      ), this.textMessageCtx.globalAlpha = 0.5, this.textMessageCtx.fillStyle = "black", Ze(
        this.textMessageCtx,
        w,
        S,
        A,
        j,
        5
      ), this.textMessageCtx.globalAlpha = 1, this.textMessageCtx.fillStyle = "white";
      let G = S + a + o / 2;
      for (const v in e) {
        const L = e[v];
        this.textMessageCtx.fillText(L, f, G), G += o;
      }
      this.offscreenCtx.drawImage(this.textMessageCanvas, 0, 0);
    }, this.bufferMiniMap = () => {
      const e = "rgba(5,5,5,0.7)", i = this.gridManager.width, a = this.gridManager.height, o = this.minimapLayer0Canvas.width, f = this.minimapLayer0Canvas.height, m = o / i, u = f / a, y = 1, x = Math.floor(m * y), w = Math.floor(u * y);
      for (let S = 0; S < i; S++)
        for (let A = 0; A < a; A++) {
          const j = this.gridManager.getGridTileFromCoord(
            S,
            A
          ), G = S * x, v = A * w, { type: L } = j, M = L === "wall" ? j.wallTile : j.floorTile;
          if (M.surface === "color") {
            const b = M.color;
            this.minimapLayer0Ctx.beginPath(), this.minimapLayer0Ctx.fillStyle = b ? `rgb(${b.r}, ${b.g}, ${b.b})` : e, this.minimapLayer0Ctx.fillRect(
              G,
              v,
              x,
              w
            ), this.minimapLayer0Ctx.closePath();
          } else {
            const b = this.textureManager.getTexture(
              M.texture.name,
              M.surface
            );
            this.minimapLayer0Ctx.drawImage(
              b.canvas,
              0,
              0,
              b.width,
              b.height,
              G,
              v,
              x,
              w
            );
          }
        }
    }, this.bufferMiniMapObjects = () => {
      const i = this.gridManager.width, a = this.gridManager.height, o = this.minimapLayer1Canvas.width, f = this.minimapLayer1Canvas.height, m = o / i, u = f / a, y = this.camera.transform.position.x * m, x = this.camera.transform.position.y * u, w = (this.camera.transform.position.x + this.camera.transform.direction.x) * m, S = (this.camera.transform.position.y + this.camera.transform.direction.y) * u;
      this.minimapLayer1Ctx.clearRect(0, 0, o, f), this.minimapLayer1Ctx.beginPath(), this.minimapLayer1Ctx.fillStyle = "white", this.minimapLayer1Ctx.arc(
        y,
        x,
        3,
        0,
        Ee
      ), this.minimapLayer1Ctx.fill(), this.minimapLayer1Ctx.closePath(), this.minimapLayer1Ctx.beginPath(), this.minimapLayer1Ctx.moveTo(y, x), this.minimapLayer1Ctx.strokeStyle = "white", this.minimapLayer1Ctx.lineTo(w, S), this.minimapLayer1Ctx.closePath(), this.minimapLayer1Ctx.stroke();
    }, this.renderMiniMap = () => {
      this.bufferMiniMapObjects(), this.offscreenCtx.drawImage(this.minimapLayer0Canvas, 0, 0), this.offscreenCtx.drawImage(this.minimapLayer1Canvas, 0, 0);
    }, this.ecs = r, this.gameSettings = n.gameSettings, this.textureManager = l, this.spriteManager = c, this.gridManager = h, this.camera = p, this.inputSystem = g, this.broker = _, this.canvas = s, this.ctx = t, this.textMessageCanvas.width = this.offscreenCanvas.width = this.canvas.width, this.textMessageCanvas.height = this.offscreenCanvas.height = this.canvas.height, this.minimapLayer0Canvas.width = this.minimapLayer1Canvas.width = 200, this.minimapLayer0Canvas.height = this.minimapLayer1Canvas.height = 200, this.bufferMiniMap(), this.broker.subscribe(
      O.PlayerActorCollision,
      this.handlePlayerActorCollision
    ), this.broker.subscribe(
      O.InteractionDirective,
      this.handleInteractionDirectiveEvent
    );
  }
  draw() {
    this.ctx.drawImage(this.offscreenCanvas, 0, 0);
  }
  update(s) {
    this.offscreenCtx.clearRect(
      0,
      0,
      this.offscreenCanvas.width,
      this.offscreenCanvas.height
    ), this.renderTextMessages(), this.inputSystem.isKeyPressed("`") && this.renderMiniMap(), this.draw();
  }
}
class Je {
  constructor(s = []) {
    this.bucket = [], this.memberMap = /* @__PURE__ */ new Map(), this.has = (t) => this.memberMap.has(t), this.add = (t) => {
      if (!t)
        throw new Error("Member cannot be null");
      return this.memberMap.has(t) || (this.bucket.push(t), this.memberMap.set(t, this.bucket.length - 1)), t;
    }, this.remove = (t) => {
      if (!t)
        throw new Error("Member cannot be null");
      if (!this.memberMap.has(t))
        return;
      const r = this.memberMap.get(t), n = this.bucket[this.bucket.length - 1];
      return this.memberMap.set(n, r), this.bucket[r] = n, this.bucket.pop(), this.memberMap.delete(t), t;
    };
    for (let t = 0; t < s.length; t++)
      this.add(s[t]);
  }
  [Symbol.iterator]() {
    return this.bucket[Symbol.iterator]();
  }
  get size() {
    return this.bucket.length;
  }
}
class et extends Je {
  constructor(s = []) {
    super(s), this.updateEntity = (t, r) => {
      for (const n of Object.entries(r)) {
        const [l, c] = n;
        t[l] = c;
      }
      return t;
    }, this.addComponentToEntity = (t, r, n) => {
      if (t[r] !== void 0)
        throw new Error("Component already exists on entity");
      t[r] = n;
    }, this.removeComponentFromEntity = (t, r) => {
      t[r] !== void 0 && delete t[r];
    }, this.with = (t) => this.bucket.filter((n) => t.every((l) => n[l] !== void 0)), this.without = (t) => this.bucket.filter((n) => t.every((l) => n[l] === void 0)), this.queryEntities = (t) => this.bucket.filter(t);
  }
}
class tt {
  constructor(s = []) {
    this.add = (t) => {
      this.systemBucket.push(t);
    }, this.remove = (t) => {
      const r = this.systemBucket.indexOf(t);
      r !== -1 && this.systemBucket.splice(r, 1);
    }, this.systemBucket = s;
  }
  [Symbol.iterator]() {
    return this.systemBucket[Symbol.iterator]();
  }
  get size() {
    return this.systemBucket.length;
  }
}
class it {
  // TODO: Support passing in existing values or config
  constructor() {
    this._entityManager = new et(), this.systemPool = new tt();
  }
  get entityManager() {
    return this._entityManager;
  }
  get systems() {
    return this.systemPool;
  }
  update(s) {
    for (const t of this.systems)
      t.update(s);
  }
}
const nt = () => {
  const d = [];
  for (let s = 0; s < 629; s++)
    d.push(Math.sin(s * 0.01) * 16);
  return d;
}, Ce = nt(), Pe = (d) => {
  const s = Math.floor(Math.abs(d) % Ce.length);
  return Ce[s];
};
class at {
  // TODO: Image Data Array of pixels should always be on hand
  // TODO: A cache of previously rendered frame based on frame count - so eventually we don't have to recalculate (but only if the frame count stays low, otherwise memory leak)
  // TODO: Enum for animation types
  constructor(s, t, r, n) {
    this.currentFrame = 0, this.frameCount = 0, this.animationType = "", this.name = "", this.flatWarp = () => {
      let _ = ~~((/* @__PURE__ */ new Date()).getTime() * 1), e = 1 * 1 * 2, i, a, o, f, m;
      for (let u = 0; u < this.height; u++) {
        o = u * this.width;
        for (let y = 0; y < this.width; y++)
          f = 4 * (o + y), a = ~~((u / e + 1 * Pe(_ / 16 + y / e * 2)) * 1) % this.height, a = a >= 0 ? a : this.height + a, i = ~~((y / e + 1 * Pe(_ / 16 + u / e * 2)) * 1) % this.width, i = i >= 0 ? i : this.width + i, m = 4 * (a * this.width + i), this.imageData.data[f] = this.baseData[m], this.imageData.data[f + 1] = this.baseData[m + 1], this.imageData.data[f + 2] = this.baseData[m + 2], this.imageData.data[f + 3] = this.baseData[m + 3];
      }
      this.tileBuffer.putImageData(this.imageData, 0, 0);
    }, this.advanceFrame = () => {
      this.frameCount && (this.currentFrame = (this.currentFrame + 1) % this.frameCount, this.flatWarp());
    }, this.baseTexture = s, this.tileBufferCanvas = document.createElement("canvas"), this.tileBufferCanvas.width = this.baseTexture.width, this.tileBufferCanvas.height = this.baseTexture.height, this.tileBuffer = this.tileBufferCanvas.getContext(
      "2d"
    ), this.tileBuffer.drawImage(this.baseTexture.canvas, 0, 0), this.imageData = this.tileBuffer.getImageData(
      0,
      0,
      this.tileBufferCanvas.width,
      this.tileBufferCanvas.height
    ), this.baseData = Array.from(this.imageData.data), this.name = r, this.frameCount = n;
  }
  getImageData() {
    return this.imageData;
  }
  get width() {
    return this.tileBufferCanvas.width;
  }
  get height() {
    return this.tileBufferCanvas.height;
  }
  get canvas() {
    return this.tileBufferCanvas;
  }
}
class rt {
  constructor(s, t, r) {
    if (this.currentFrameIndex = 0, this.advanceFrame = () => {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length, this.currentFrame = this.spriteManager.getSpriteTexture(
        this.frames[this.currentFrameIndex]
      );
    }, !r.length)
      throw new Error("Cannot load a sprite texture with no frames");
    this.spriteManager = s, this.frames = r, this.currentFrame = this.spriteManager.getSpriteTexture(
      this.frames[this.currentFrameIndex]
    );
  }
  getImageData() {
    return this.currentFrame.getImageData();
  }
  get width() {
    return this.currentFrame.width;
  }
  get height() {
    return this.currentFrame.height;
  }
  get canvas() {
    return this.currentFrame.canvas;
  }
}
const st = (d) => new Promise((s, t) => {
  const r = document.createElement("img");
  r.addEventListener("load", () => {
    s(r);
  }), r.src = d;
});
class ie {
  constructor(s) {
    this._canvas = document.createElement("canvas"), this._width = this._canvas.width = s.width, this._height = this._canvas.height = s.height, this.context = this._canvas.getContext("2d", { willReadFrequently: !0 }), this.context.imageSmoothingEnabled = !1, this.context.drawImage(s, 0, 0), this._imageData = this.context.getImageData(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    ), this._transposedBitmap = ie.transposeBitmap(
      this._imageData.data,
      this._canvas.width,
      this._canvas.height
    );
  }
  static async fromPath(s) {
    const t = await st(s);
    return new ie(t);
  }
  static fromImage(s) {
    return new ie(s);
  }
  static transposeBitmap(s, t, r) {
    const n = new Uint8ClampedArray(s.length);
    for (let l = 0; l < t; l += 1)
      for (let c = 0; c < r; c += 1) {
        const h = 4 * (t * c + l), p = 4 * (r * l + c);
        n[p] = s[h], n[p + 1] = s[h + 1], n[p + 2] = s[h + 2], n[p + 3] = s[h + 3];
      }
    return n;
  }
  getImageData() {
    return this._imageData;
  }
  getCanvas() {
    return this._canvas;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get canvas() {
    return this._canvas;
  }
  get transposedBitmap() {
    return this._transposedBitmap;
  }
}
class ot {
  // TODO: Support adding textures after. For now, we need them on load and that's it.
  /// TODO:  Support lazy loading textures. Right now we want it blocking just in case. And we want it to load
  // everything up front. (though maybe we can tell it which ones to load immediately.)
  // constructor(
  //   textureMap: Record<string, string> = {},
  //   preloadList: string[] = []
  // ) {
  //   this.textureMap = textureMap;
  //   for (const textureName of preloadList) {
  //     this.loadTexture(textureName, textureMap[textureName]);
  //   }
  // }
  // loadTextures()
  constructor() {
    this.textureBuffers = {}, this.textureMap = {}, this.animatedTextures = /* @__PURE__ */ new Map(), this.lastFrameTime = Date.now(), this.generateDefaultTexture = () => {
      const s = document.createElement("canvas");
      s.width = 64, s.height = 64;
      const t = s.getContext("2d");
      for (let r = 0; r < s.width; r += 8)
        t.fillStyle = `hsl(${r * 5}, 100%, 80%)`, t.fillRect(r, 0, 8, 64);
      return ie.fromImage(s);
    }, this.getStandardTexture = (s) => {
      let t = this.textureBuffers[s];
      if (!t) {
        const r = this.textureMap[s];
        r && this.loadTexture(s, r);
      }
      return t || null;
    }, this.getAnimatedTexture = (s) => this.animatedTextures.get(s), this.loadFlatWarpTexture = (s) => {
      const { frameCount: t, name: r, texture: n, animationType: l } = s, c = this.getTexture(n);
      if (!c)
        throw new Error("Texture buffer does not exist");
      const h = new at(
        c,
        "flat_warp",
        r,
        t
      );
      this.animatedTextures.set(r, h);
    }, this.loadSpriteTexture = (s, t) => {
      const { name: r, frames: n } = t, l = new rt(s, r, n);
      this.animatedTextures.set(r, l);
    }, this.loadSpriteTextures = (s, t) => {
      for (const r of t)
        this.loadSpriteTexture(s, r);
    }, this.loadTextureAnimation = (s) => {
      const { animationType: t } = s;
      if (t === "flat_warp") {
        this.loadFlatWarpTexture(s);
        return;
      }
    }, this.loadTextureAnimations = (s) => {
      for (const t of s)
        this.loadTextureAnimation(t);
    }, this.defaultTexture = this.generateDefaultTexture();
  }
  async loadTexture(s, t) {
    try {
      const r = await ie.fromPath(t);
      this.textureMap[s] = t, this.textureBuffers[s] = r;
    } catch {
      console.log("Error loading texture, " + s);
    }
  }
  getTexture(s, t = "texture") {
    if (s === "default")
      return this.defaultTexture;
    let r;
    switch (t) {
      case "spriteTexture":
      case "animatedTexture":
        r = this.getAnimatedTexture(s);
        break;
      case "texture":
        r = this.getStandardTexture(s);
        break;
    }
    return r;
  }
  getTextureDimensions(s) {
    const t = this.getTexture(s);
    if (t)
      return { width: t.width, height: t.height };
  }
  // Going to try this for sprite frames. But might want to simply create Imagebuffers for each frame instead. Not sure.
  getCroppedTexture(s, t, r, n, l, c = !1) {
    const h = this.getTexture(s);
    if (!h)
      return null;
    const p = document.createElement("canvas");
    p.width = n, p.height = l;
    const g = p.getContext("2d");
    return g ? (g.save(), c && g.scale(-1, 1), g.drawImage(
      h.getCanvas(),
      t,
      r,
      n,
      l,
      c ? -n : 0,
      0,
      n,
      l
    ), g.restore(), ie.fromImage(p)) : null;
  }
  getCroppedTexturePixels(s, t, r, n, l, c = !1) {
    const h = this.textureBuffers[s];
    if (!h)
      return null;
    const p = h.getImageData(), g = new Uint8ClampedArray(n * l * 4), _ = c ? n - 1 : 0;
    for (let e = 0; e < l; e++) {
      const i = ((r + e) * h.canvas.width + t + _) * 4, a = e * n * 4;
      for (let o = 0; o < n; o++) {
        const f = i + (c ? -o : o) * 4, m = a + o * 4;
        g[m] = p.data[f], g[m + 1] = p.data[f + 1], g[m + 2] = p.data[f + 2], g[m + 3] = p.data[f + 3];
      }
    }
    return g;
  }
  update(s) {
    const t = Date.now();
    if (t - this.lastFrameTime >= 1e3 / 12)
      this.lastFrameTime = t;
    else
      return;
    for (const n of this.animatedTextures)
      n[1].advanceFrame();
  }
  // public setDefaultTexturePath(path: string): void {
  //   this.defaultTexturePath = path;
  // }
  // public unloadTexture(key: string): void {
  //   delete this.textureBuffers[key];
  //   delete this.textureMap[key];
  // }
  // public clearTextures(): void {
  //   this.textureBuffers = {};
  //   this.textureMap = {};
  //   // this.defaultTexturePath = null;
  // }
}
const lt = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 }
], ct = (d, s, t) => {
  const r = d.rows, n = d.columns, l = [], c = Array.from(
    Array(r),
    () => Array(n).fill(!1)
  );
  for (l.push({ ...s, parent: null }), c[Math.floor(s.y)][Math.floor(s.x)] = !0; l.length; ) {
    let h = l.shift();
    if (Math.floor(h.x) === t.x && Math.floor(h.y) === t.y) {
      const p = [];
      for (; h; )
        p.unshift({
          ...h,
          x: h.x + 0.5,
          y: h.y + 0.5
        }), h = h.parent;
      return p;
    }
    for (const p of lt) {
      const g = Math.floor(h.x + p.x), _ = Math.floor(h.y + p.y);
      c[_][g] === !0 || !d.isTileAccessible(g, _) || (l.push({
        x: g,
        y: _,
        parent: h
      }), c[_][g] = !0);
    }
  }
  return null;
};
class dt {
  constructor(s) {
    this.updateCacheOrder = (t) => {
      const r = this.cacheOrder.indexOf(t);
      r !== -1 && this.cacheOrder.splice(r, 1), this.cacheOrder.unshift(t);
    }, this.get = (t) => {
      if (this.cache.has(t))
        return this.updateCacheOrder(t), this.cache.get(t);
    }, this.set = (t, r) => {
      if (this.cache.size >= this.maxSize) {
        const n = this.cacheOrder.pop();
        n && this.cache.delete(n);
      }
      this.cache.set(t, r), this.updateCacheOrder(t);
    }, this.clear = () => {
      this.cache.clear(), this.cacheOrder = [];
    }, this.size = () => this.cache.size, this.getMaxSize = () => this.maxSize, this.cache = /* @__PURE__ */ new Map(), this.cacheOrder = [], this.maxSize = s;
  }
}
class ht {
  // TODO: Determine memory usage and valid size limit. Probably pretty high.
  constructor(s) {
    this.grid = /* @__PURE__ */ new Map(), this._rows = 0, this._columns = 0, this.objectEntityGridMap = /* @__PURE__ */ new Map(), this.flowFields = new dt(
      je
    ), this.getObjectEntitiesByGridLocation = (t, r) => {
      const n = this.getGridIndexKey(t, r);
      return this.objectEntityGridMap.get(n) ?? /* @__PURE__ */ new Set();
    }, this.updateObjectEntityGridTracking = (t) => {
      const r = t.transform.position, l = Math.ceil(t.spatialPartitioningSettings.width / 2) / ke, c = Math.floor(r.x - l), h = Math.ceil(r.x + l), p = Math.floor(r.y - l), g = Math.ceil(r.y + l), _ = t.spatialPartitioningSettings.gridLocations ?? /* @__PURE__ */ new Set(), e = /* @__PURE__ */ new Set(), i = [];
      for (let a = c; a <= h; a++)
        for (let o = p; o <= g; o++) {
          const f = this.getGridIndexKey(a, o);
          e.add(f), _.has(f) ? _.delete(f) : i.push(f);
        }
      for (const a of _) {
        const o = this.objectEntityGridMap.get(a);
        o && o.delete(t);
      }
      for (const a of i) {
        const o = this.objectEntityGridMap.get(a) ?? /* @__PURE__ */ new Set();
        o.add(t), this.objectEntityGridMap.set(a, o);
      }
      t.spatialPartitioningSettings.gridLocations = e;
    }, this.removeObjectEntityGridTracking = (t) => {
      const r = t.spatialPartitioningSettings.gridLocations;
      for (const n of r) {
        const l = this.objectEntityGridMap.get(n);
        l && l.delete(t);
      }
    }, this.generateFlowField = (t) => {
      if (!this.isTileAccessible(t.x, t.y))
        return;
      const r = `${t.x}-${t.y}`, n = this.flowFields.get(r);
      if (n)
        return n;
      const l = new Array(this.height).fill([]).map(() => new Array(this.width).fill([0, 0])), c = new Array(this.height).fill([]).map(() => new Array(this.width).fill(!1)), h = [[t.x, t.y]];
      for (l[t.y][t.x] = [0, 0]; h.length > 0; ) {
        const [p, g] = h.shift(), _ = [
          [p - 1, g],
          [p + 1, g],
          [p, g - 1],
          [p, g + 1]
        ];
        for (const [e, i] of _)
          if (e >= 0 && e < this.width && i >= 0 && i < this.height && this.isTileAccessible(e, i) && !c[i][e]) {
            const a = p - e, o = g - i, f = [a, o];
            (f[0] !== l[i][e][0] || f[1] !== l[i][e][1]) && (l[i][e] = f, c[i][e] = !0, h.push([e, i]));
          }
      }
      return this.flowFields.set(r, l), l;
    }, this.ecs = s;
  }
  getGridIndexKeyFromEntity(s) {
    const { x: t, y: r } = s.gridLocation;
    return `${t}:${r}`;
  }
  getGridIndexKey(s, t) {
    return `${s}:${t}`;
  }
  loadGrid(s) {
    this.grid = /* @__PURE__ */ new Map(), this._rows = s.length, this._columns = s[0].length;
    for (let t = 0; t < s.length; t++)
      for (let r = 0; r < s[0].length; r++) {
        const n = s[t][r], { type: l, accessible: c, texture: h, ceiling: p, wallFaces: g } = n, _ = {
          type: l,
          gridLocation: { x: r, y: t },
          accessible: c
        };
        l === "floor" ? (h.type === "color" ? _.floorTile = {
          surface: h.type,
          color: h.color
        } : _.floorTile = {
          surface: h.type,
          texture: { name: h.textureName }
        }, p && (p.type === "color" ? _.floorTile.ceiling = {
          surface: p.type,
          color: p.color
        } : _.floorTile.ceiling = {
          surface: p.type,
          texture: { name: p.textureName }
        })) : l === "wall" && (h.type === "color" ? _.wallTile = {
          surface: h.type,
          color: h.color
        } : _.wallTile = {
          surface: h.type,
          texture: { name: h.textureName }
        }, g && g.length && (_.wallTile.wallFaces = g)), this.addGridTileEntity(_);
      }
  }
  get rows() {
    return this._rows;
  }
  get columns() {
    return this._columns;
  }
  get height() {
    return this._rows;
  }
  get width() {
    return this._columns;
  }
  isTileAccessible(s, t) {
    var r;
    return (r = this.getGridTile(s, t)) == null ? void 0 : r.accessible;
  }
  addGridTileEntity(s) {
    const t = this.getGridIndexKeyFromEntity(s);
    this.grid.set(t, s);
  }
  getGridTile(s, t) {
    const r = this.getGridIndexKey(s, t);
    return this.grid.get(r);
  }
  getGridTileFromCoord(s, t) {
    return this.getGridTile(Math.floor(s), Math.floor(t));
  }
  getRandomAccessibleGridLocation() {
    const s = this._columns * this._rows, t = [];
    for (let r = 0; r < this._columns; r++)
      for (let n = 0; n < this._rows; n++) {
        const l = this.getGridTile(r, n);
        l != null && l.accessible && t.push(l);
      }
    for (let r = s - 1; r > 0 && t.length !== 0; r--) {
      const n = Math.floor(Math.random() * t.length), l = t[n];
      if (t.splice(n, 1), l != null && l.accessible)
        return l;
    }
    return null;
  }
  getPathAtoB(s, t) {
    return ct(this, s, t);
  }
  // removeEntity() // TODO: Maybe later. But for now, since it's just grid tiles, we never remove anything. When we add in other things with grid location, maybe (like lights or effects or...I dunno.)
}
class ut {
  constructor(s, t, r) {
    this.ecs = s, this.textureManager = t, this.broker = r;
  }
  update(s) {
    var r;
    const t = this.ecs.entityManager.with(["state"]).filter((n) => n.objectType === "object__animated");
    for (const n of t) {
      const l = n.state.currentState, c = n.state.states[l], h = c == null ? void 0 : c.animation;
      if (!h)
        continue;
      const { frameDuration: p, currentFrame: g } = h, _ = h.frames[g];
      h.timeSinceLastFrame += s;
      const e = _.duration ? _.duration : p;
      if (e && h.timeSinceLastFrame >= e) {
        const i = h.currentFrame >= h.frames.length - 1;
        if (i && !h.looping)
          continue;
        if (i && h.looping ? h.currentFrame = 0 : h.currentFrame = h.currentFrame + 1, h.timeSinceLastFrame = 0, (r = h.events) != null && r.length) {
          const a = h.frames[h.currentFrame];
          for (const o of h.events)
            o.frameId === a.frameId && this.broker.emit(o.eventType, {
              ...o.eventPayload,
              emitterEntity: n
            });
        }
      }
    }
    this.textureManager.update(s);
  }
}
class ft {
  constructor(s) {
    this.sprites = {}, this.spritesheets = /* @__PURE__ */ new Map(), this.loadSprites = (t) => {
      const { frames: r, meta: n } = t;
      for (const l in r) {
        const c = {
          ...r[l],
          mirrored: !1,
          texture: n.image,
          textureId: n.id,
          textureName: n.name
        };
        this.sprites[l] = c;
        let h;
        const p = l.slice(-1);
        p === "2" ? h = l.slice(0, -1) + "8" : p === "3" ? h = l.slice(0, -1) + "7" : p === "4" && (h = l.slice(0, -1) + "6"), h && (this.sprites[h] = { ...c, mirrored: !0 });
      }
    }, this.textureManager = s;
  }
  getSpriteTexture(s) {
    const t = this.getSpriteFrame(s);
    if (!t)
      return null;
    const { textureName: r, frame: n, mirrored: l } = t;
    return this.textureManager.getCroppedTexture(
      r,
      n.x,
      n.y,
      n.w,
      n.h,
      l
    );
  }
  // public getSpriteTexture(
  //   frameId: string,
  //   brightnessLookupTable: number[]
  // ): Uint8ClampedArray | null {
  //   const spriteFrame = this.getSpriteFrame(frameId);
  //   if (!spriteFrame) return null;
  //   const { textureName, frame, mirrored } = spriteFrame;
  //   const pixelStrip = this.textureManager.getCroppedTexturePixels(
  //     textureName,
  //     frame.x,
  //     frame.y,
  //     frame.w,
  //     frame.h,
  //     mirrored
  //   );
  //   if (!pixelStrip) return null;
  //   // const adjustedPixelStrip = pixelStrip.map((value) => {
  //   //   // Perform brightness adjustment calculation using the lookup table.
  //   //   return brightnessLookupTable[value];
  //   // });
  //   return pixelStrip; // new Uint8ClampedArray(adjustedPixelStrip);
  // }
  getSpriteFrame(s) {
    return this.sprites[s] || null;
  }
}
class mt {
  constructor() {
    this.animations = /* @__PURE__ */ new Map();
  }
  loadAnimations(s) {
    for (const t of s)
      this.loadAnimation(t);
  }
  loadAnimation(s) {
    this.animations.set(s.name, s);
  }
  getAnimation(s) {
    return this.animations.get(s);
  }
}
var le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, pe = {};
/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function(d) {
  (function() {
    var s = function() {
      this.init();
    };
    s.prototype = {
      /**
       * Initialize the global Howler object.
       * @return {Howler}
       */
      init: function() {
        var e = this || t;
        return e._counter = 1e3, e._html5AudioPool = [], e.html5PoolSize = 10, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = typeof window < "u" && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.autoUnlock = !0, e._setup(), e;
      },
      /**
       * Get/set the global volume for all sounds.
       * @param  {Float} vol Volume from 0.0 to 1.0.
       * @return {Howler/Float}     Returns self or current volume.
       */
      volume: function(e) {
        var i = this || t;
        if (e = parseFloat(e), i.ctx || _(), typeof e < "u" && e >= 0 && e <= 1) {
          if (i._volume = e, i._muted)
            return i;
          i.usingWebAudio && i.masterGain.gain.setValueAtTime(e, t.ctx.currentTime);
          for (var a = 0; a < i._howls.length; a++)
            if (!i._howls[a]._webAudio)
              for (var o = i._howls[a]._getSoundIds(), f = 0; f < o.length; f++) {
                var m = i._howls[a]._soundById(o[f]);
                m && m._node && (m._node.volume = m._volume * e);
              }
          return i;
        }
        return i._volume;
      },
      /**
       * Handle muting and unmuting globally.
       * @param  {Boolean} muted Is muted or not.
       */
      mute: function(e) {
        var i = this || t;
        i.ctx || _(), i._muted = e, i.usingWebAudio && i.masterGain.gain.setValueAtTime(e ? 0 : i._volume, t.ctx.currentTime);
        for (var a = 0; a < i._howls.length; a++)
          if (!i._howls[a]._webAudio)
            for (var o = i._howls[a]._getSoundIds(), f = 0; f < o.length; f++) {
              var m = i._howls[a]._soundById(o[f]);
              m && m._node && (m._node.muted = e ? !0 : m._muted);
            }
        return i;
      },
      /**
       * Handle stopping all sounds globally.
       */
      stop: function() {
        for (var e = this || t, i = 0; i < e._howls.length; i++)
          e._howls[i].stop();
        return e;
      },
      /**
       * Unload and destroy all currently loaded Howl objects.
       * @return {Howler}
       */
      unload: function() {
        for (var e = this || t, i = e._howls.length - 1; i >= 0; i--)
          e._howls[i].unload();
        return e.usingWebAudio && e.ctx && typeof e.ctx.close < "u" && (e.ctx.close(), e.ctx = null, _()), e;
      },
      /**
       * Check for codec support of specific extension.
       * @param  {String} ext Audio file extention.
       * @return {Boolean}
       */
      codecs: function(e) {
        return (this || t)._codecs[e.replace(/^x-/, "")];
      },
      /**
       * Setup various state values for global tracking.
       * @return {Howler}
       */
      _setup: function() {
        var e = this || t;
        if (e.state = e.ctx && e.ctx.state || "suspended", e._autoSuspend(), !e.usingWebAudio)
          if (typeof Audio < "u")
            try {
              var i = new Audio();
              typeof i.oncanplaythrough > "u" && (e._canPlayEvent = "canplay");
            } catch {
              e.noAudio = !0;
            }
          else
            e.noAudio = !0;
        try {
          var i = new Audio();
          i.muted && (e.noAudio = !0);
        } catch {
        }
        return e.noAudio || e._setupCodecs(), e;
      },
      /**
       * Check for browser support for various codecs and cache the results.
       * @return {Howler}
       */
      _setupCodecs: function() {
        var e = this || t, i = null;
        try {
          i = typeof Audio < "u" ? new Audio() : null;
        } catch {
          return e;
        }
        if (!i || typeof i.canPlayType != "function")
          return e;
        var a = i.canPlayType("audio/mpeg;").replace(/^no$/, ""), o = e._navigator ? e._navigator.userAgent : "", f = o.match(/OPR\/([0-6].)/g), m = f && parseInt(f[0].split("/")[1], 10) < 33, u = o.indexOf("Safari") !== -1 && o.indexOf("Chrome") === -1, y = o.match(/Version\/(.*?) /), x = u && y && parseInt(y[1], 10) < 15;
        return e._codecs = {
          mp3: !!(!m && (a || i.canPlayType("audio/mp3;").replace(/^no$/, ""))),
          mpeg: !!a,
          opus: !!i.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
          ogg: !!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
          oga: !!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
          wav: !!(i.canPlayType('audio/wav; codecs="1"') || i.canPlayType("audio/wav")).replace(/^no$/, ""),
          aac: !!i.canPlayType("audio/aac;").replace(/^no$/, ""),
          caf: !!i.canPlayType("audio/x-caf;").replace(/^no$/, ""),
          m4a: !!(i.canPlayType("audio/x-m4a;") || i.canPlayType("audio/m4a;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
          m4b: !!(i.canPlayType("audio/x-m4b;") || i.canPlayType("audio/m4b;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
          mp4: !!(i.canPlayType("audio/x-mp4;") || i.canPlayType("audio/mp4;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
          weba: !!(!x && i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
          webm: !!(!x && i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
          dolby: !!i.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
          flac: !!(i.canPlayType("audio/x-flac;") || i.canPlayType("audio/flac;")).replace(/^no$/, "")
        }, e;
      },
      /**
       * Some browsers/devices will only allow audio to be played after a user interaction.
       * Attempt to automatically unlock audio on the first user interaction.
       * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
       * @return {Howler}
       */
      _unlockAudio: function() {
        var e = this || t;
        if (!(e._audioUnlocked || !e.ctx)) {
          e._audioUnlocked = !1, e.autoUnlock = !1, !e._mobileUnloaded && e.ctx.sampleRate !== 44100 && (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
          var i = function(a) {
            for (; e._html5AudioPool.length < e.html5PoolSize; )
              try {
                var o = new Audio();
                o._unlocked = !0, e._releaseHtml5Audio(o);
              } catch {
                e.noAudio = !0;
                break;
              }
            for (var f = 0; f < e._howls.length; f++)
              if (!e._howls[f]._webAudio)
                for (var m = e._howls[f]._getSoundIds(), u = 0; u < m.length; u++) {
                  var y = e._howls[f]._soundById(m[u]);
                  y && y._node && !y._node._unlocked && (y._node._unlocked = !0, y._node.load());
                }
            e._autoResume();
            var x = e.ctx.createBufferSource();
            x.buffer = e._scratchBuffer, x.connect(e.ctx.destination), typeof x.start > "u" ? x.noteOn(0) : x.start(0), typeof e.ctx.resume == "function" && e.ctx.resume(), x.onended = function() {
              x.disconnect(0), e._audioUnlocked = !0, document.removeEventListener("touchstart", i, !0), document.removeEventListener("touchend", i, !0), document.removeEventListener("click", i, !0), document.removeEventListener("keydown", i, !0);
              for (var w = 0; w < e._howls.length; w++)
                e._howls[w]._emit("unlock");
            };
          };
          return document.addEventListener("touchstart", i, !0), document.addEventListener("touchend", i, !0), document.addEventListener("click", i, !0), document.addEventListener("keydown", i, !0), e;
        }
      },
      /**
       * Get an unlocked HTML5 Audio object from the pool. If none are left,
       * return a new Audio object and throw a warning.
       * @return {Audio} HTML5 Audio object.
       */
      _obtainHtml5Audio: function() {
        var e = this || t;
        if (e._html5AudioPool.length)
          return e._html5AudioPool.pop();
        var i = new Audio().play();
        return i && typeof Promise < "u" && (i instanceof Promise || typeof i.then == "function") && i.catch(function() {
          console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
        }), new Audio();
      },
      /**
       * Return an activated HTML5 Audio object to the pool.
       * @return {Howler}
       */
      _releaseHtml5Audio: function(e) {
        var i = this || t;
        return e._unlocked && i._html5AudioPool.push(e), i;
      },
      /**
       * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
       * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
       * @return {Howler}
       */
      _autoSuspend: function() {
        var e = this;
        if (!(!e.autoSuspend || !e.ctx || typeof e.ctx.suspend > "u" || !t.usingWebAudio)) {
          for (var i = 0; i < e._howls.length; i++)
            if (e._howls[i]._webAudio) {
              for (var a = 0; a < e._howls[i]._sounds.length; a++)
                if (!e._howls[i]._sounds[a]._paused)
                  return e;
            }
          return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function() {
            if (e.autoSuspend) {
              e._suspendTimer = null, e.state = "suspending";
              var o = function() {
                e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
              };
              e.ctx.suspend().then(o, o);
            }
          }, 3e4), e;
        }
      },
      /**
       * Automatically resume the Web Audio AudioContext when a new sound is played.
       * @return {Howler}
       */
      _autoResume: function() {
        var e = this;
        if (!(!e.ctx || typeof e.ctx.resume > "u" || !t.usingWebAudio))
          return e.state === "running" && e.ctx.state !== "interrupted" && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : e.state === "suspended" || e.state === "running" && e.ctx.state === "interrupted" ? (e.ctx.resume().then(function() {
            e.state = "running";
            for (var i = 0; i < e._howls.length; i++)
              e._howls[i]._emit("resume");
          }), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : e.state === "suspending" && (e._resumeAfterSuspend = !0), e;
      }
    };
    var t = new s(), r = function(e) {
      var i = this;
      if (!e.src || e.src.length === 0) {
        console.error("An array of source files must be passed with any new Howl.");
        return;
      }
      i.init(e);
    };
    r.prototype = {
      /**
       * Initialize a new Howl group object.
       * @param  {Object} o Passed in properties for this group.
       * @return {Howl}
       */
      init: function(e) {
        var i = this;
        return t.ctx || _(), i._autoplay = e.autoplay || !1, i._format = typeof e.format != "string" ? e.format : [e.format], i._html5 = e.html5 || !1, i._muted = e.mute || !1, i._loop = e.loop || !1, i._pool = e.pool || 5, i._preload = typeof e.preload == "boolean" || e.preload === "metadata" ? e.preload : !0, i._rate = e.rate || 1, i._sprite = e.sprite || {}, i._src = typeof e.src != "string" ? e.src : [e.src], i._volume = e.volume !== void 0 ? e.volume : 1, i._xhr = {
          method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
          headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
          withCredentials: e.xhr && e.xhr.withCredentials ? e.xhr.withCredentials : !1
        }, i._duration = 0, i._state = "unloaded", i._sounds = [], i._endTimers = {}, i._queue = [], i._playLock = !1, i._onend = e.onend ? [{ fn: e.onend }] : [], i._onfade = e.onfade ? [{ fn: e.onfade }] : [], i._onload = e.onload ? [{ fn: e.onload }] : [], i._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : [], i._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : [], i._onpause = e.onpause ? [{ fn: e.onpause }] : [], i._onplay = e.onplay ? [{ fn: e.onplay }] : [], i._onstop = e.onstop ? [{ fn: e.onstop }] : [], i._onmute = e.onmute ? [{ fn: e.onmute }] : [], i._onvolume = e.onvolume ? [{ fn: e.onvolume }] : [], i._onrate = e.onrate ? [{ fn: e.onrate }] : [], i._onseek = e.onseek ? [{ fn: e.onseek }] : [], i._onunlock = e.onunlock ? [{ fn: e.onunlock }] : [], i._onresume = [], i._webAudio = t.usingWebAudio && !i._html5, typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(), t._howls.push(i), i._autoplay && i._queue.push({
          event: "play",
          action: function() {
            i.play();
          }
        }), i._preload && i._preload !== "none" && i.load(), i;
      },
      /**
       * Load the audio file.
       * @return {Howler}
       */
      load: function() {
        var e = this, i = null;
        if (t.noAudio) {
          e._emit("loaderror", null, "No audio support.");
          return;
        }
        typeof e._src == "string" && (e._src = [e._src]);
        for (var a = 0; a < e._src.length; a++) {
          var o, f;
          if (e._format && e._format[a])
            o = e._format[a];
          else {
            if (f = e._src[a], typeof f != "string") {
              e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
              continue;
            }
            o = /^data:audio\/([^;,]+);/i.exec(f), o || (o = /\.([^.]+)$/.exec(f.split("?", 1)[0])), o && (o = o[1].toLowerCase());
          }
          if (o || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), o && t.codecs(o)) {
            i = e._src[a];
            break;
          }
        }
        if (!i) {
          e._emit("loaderror", null, "No codec support for selected audio sources.");
          return;
        }
        return e._src = i, e._state = "loading", window.location.protocol === "https:" && i.slice(0, 5) === "http:" && (e._html5 = !0, e._webAudio = !1), new n(e), e._webAudio && c(e), e;
      },
      /**
       * Play a sound or resume previous playback.
       * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
       * @param  {Boolean} internal Internal Use: true prevents event firing.
       * @return {Number}          Sound ID.
       */
      play: function(e, i) {
        var a = this, o = null;
        if (typeof e == "number")
          o = e, e = null;
        else {
          if (typeof e == "string" && a._state === "loaded" && !a._sprite[e])
            return null;
          if (typeof e > "u" && (e = "__default", !a._playLock)) {
            for (var f = 0, m = 0; m < a._sounds.length; m++)
              a._sounds[m]._paused && !a._sounds[m]._ended && (f++, o = a._sounds[m]._id);
            f === 1 ? e = null : o = null;
          }
        }
        var u = o ? a._soundById(o) : a._inactiveSound();
        if (!u)
          return null;
        if (o && !e && (e = u._sprite || "__default"), a._state !== "loaded") {
          u._sprite = e, u._ended = !1;
          var y = u._id;
          return a._queue.push({
            event: "play",
            action: function() {
              a.play(y);
            }
          }), y;
        }
        if (o && !u._paused)
          return i || a._loadQueue("play"), u._id;
        a._webAudio && t._autoResume();
        var x = Math.max(0, u._seek > 0 ? u._seek : a._sprite[e][0] / 1e3), w = Math.max(0, (a._sprite[e][0] + a._sprite[e][1]) / 1e3 - x), S = w * 1e3 / Math.abs(u._rate), A = a._sprite[e][0] / 1e3, j = (a._sprite[e][0] + a._sprite[e][1]) / 1e3;
        u._sprite = e, u._ended = !1;
        var G = function() {
          u._paused = !1, u._seek = x, u._start = A, u._stop = j, u._loop = !!(u._loop || a._sprite[e][2]);
        };
        if (x >= j) {
          a._ended(u);
          return;
        }
        var v = u._node;
        if (a._webAudio) {
          var L = function() {
            a._playLock = !1, G(), a._refreshBuffer(u);
            var P = u._muted || a._muted ? 0 : u._volume;
            v.gain.setValueAtTime(P, t.ctx.currentTime), u._playStart = t.ctx.currentTime, typeof v.bufferSource.start > "u" ? u._loop ? v.bufferSource.noteGrainOn(0, x, 86400) : v.bufferSource.noteGrainOn(0, x, w) : u._loop ? v.bufferSource.start(0, x, 86400) : v.bufferSource.start(0, x, w), S !== 1 / 0 && (a._endTimers[u._id] = setTimeout(a._ended.bind(a, u), S)), i || setTimeout(function() {
              a._emit("play", u._id), a._loadQueue();
            }, 0);
          };
          t.state === "running" && t.ctx.state !== "interrupted" ? L() : (a._playLock = !0, a.once("resume", L), a._clearTimer(u._id));
        } else {
          var M = function() {
            v.currentTime = x, v.muted = u._muted || a._muted || t._muted || v.muted, v.volume = u._volume * t.volume(), v.playbackRate = u._rate;
            try {
              var P = v.play();
              if (P && typeof Promise < "u" && (P instanceof Promise || typeof P.then == "function") ? (a._playLock = !0, G(), P.then(function() {
                a._playLock = !1, v._unlocked = !0, i ? a._loadQueue() : a._emit("play", u._id);
              }).catch(function() {
                a._playLock = !1, a._emit("playerror", u._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), u._ended = !0, u._paused = !0;
              })) : i || (a._playLock = !1, G(), a._emit("play", u._id)), v.playbackRate = u._rate, v.paused) {
                a._emit("playerror", u._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                return;
              }
              e !== "__default" || u._loop ? a._endTimers[u._id] = setTimeout(a._ended.bind(a, u), S) : (a._endTimers[u._id] = function() {
                a._ended(u), v.removeEventListener("ended", a._endTimers[u._id], !1);
              }, v.addEventListener("ended", a._endTimers[u._id], !1));
            } catch (C) {
              a._emit("playerror", u._id, C);
            }
          };
          v.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (v.src = a._src, v.load());
          var F = window && window.ejecta || !v.readyState && t._navigator.isCocoonJS;
          if (v.readyState >= 3 || F)
            M();
          else {
            a._playLock = !0, a._state = "loading";
            var b = function() {
              a._state = "loaded", M(), v.removeEventListener(t._canPlayEvent, b, !1);
            };
            v.addEventListener(t._canPlayEvent, b, !1), a._clearTimer(u._id);
          }
        }
        return u._id;
      },
      /**
       * Pause playback and save current position.
       * @param  {Number} id The sound ID (empty to pause all in group).
       * @return {Howl}
       */
      pause: function(e) {
        var i = this;
        if (i._state !== "loaded" || i._playLock)
          return i._queue.push({
            event: "pause",
            action: function() {
              i.pause(e);
            }
          }), i;
        for (var a = i._getSoundIds(e), o = 0; o < a.length; o++) {
          i._clearTimer(a[o]);
          var f = i._soundById(a[o]);
          if (f && !f._paused && (f._seek = i.seek(a[o]), f._rateSeek = 0, f._paused = !0, i._stopFade(a[o]), f._node))
            if (i._webAudio) {
              if (!f._node.bufferSource)
                continue;
              typeof f._node.bufferSource.stop > "u" ? f._node.bufferSource.noteOff(0) : f._node.bufferSource.stop(0), i._cleanBuffer(f._node);
            } else
              (!isNaN(f._node.duration) || f._node.duration === 1 / 0) && f._node.pause();
          arguments[1] || i._emit("pause", f ? f._id : null);
        }
        return i;
      },
      /**
       * Stop playback and reset to start.
       * @param  {Number} id The sound ID (empty to stop all in group).
       * @param  {Boolean} internal Internal Use: true prevents event firing.
       * @return {Howl}
       */
      stop: function(e, i) {
        var a = this;
        if (a._state !== "loaded" || a._playLock)
          return a._queue.push({
            event: "stop",
            action: function() {
              a.stop(e);
            }
          }), a;
        for (var o = a._getSoundIds(e), f = 0; f < o.length; f++) {
          a._clearTimer(o[f]);
          var m = a._soundById(o[f]);
          m && (m._seek = m._start || 0, m._rateSeek = 0, m._paused = !0, m._ended = !0, a._stopFade(o[f]), m._node && (a._webAudio ? m._node.bufferSource && (typeof m._node.bufferSource.stop > "u" ? m._node.bufferSource.noteOff(0) : m._node.bufferSource.stop(0), a._cleanBuffer(m._node)) : (!isNaN(m._node.duration) || m._node.duration === 1 / 0) && (m._node.currentTime = m._start || 0, m._node.pause(), m._node.duration === 1 / 0 && a._clearSound(m._node))), i || a._emit("stop", m._id));
        }
        return a;
      },
      /**
       * Mute/unmute a single sound or all sounds in this Howl group.
       * @param  {Boolean} muted Set to true to mute and false to unmute.
       * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
       * @return {Howl}
       */
      mute: function(e, i) {
        var a = this;
        if (a._state !== "loaded" || a._playLock)
          return a._queue.push({
            event: "mute",
            action: function() {
              a.mute(e, i);
            }
          }), a;
        if (typeof i > "u")
          if (typeof e == "boolean")
            a._muted = e;
          else
            return a._muted;
        for (var o = a._getSoundIds(i), f = 0; f < o.length; f++) {
          var m = a._soundById(o[f]);
          m && (m._muted = e, m._interval && a._stopFade(m._id), a._webAudio && m._node ? m._node.gain.setValueAtTime(e ? 0 : m._volume, t.ctx.currentTime) : m._node && (m._node.muted = t._muted ? !0 : e), a._emit("mute", m._id));
        }
        return a;
      },
      /**
       * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
       *   volume() -> Returns the group's volume value.
       *   volume(id) -> Returns the sound id's current volume.
       *   volume(vol) -> Sets the volume of all sounds in this Howl group.
       *   volume(vol, id) -> Sets the volume of passed sound id.
       * @return {Howl/Number} Returns self or current volume.
       */
      volume: function() {
        var e = this, i = arguments, a, o;
        if (i.length === 0)
          return e._volume;
        if (i.length === 1 || i.length === 2 && typeof i[1] > "u") {
          var f = e._getSoundIds(), m = f.indexOf(i[0]);
          m >= 0 ? o = parseInt(i[0], 10) : a = parseFloat(i[0]);
        } else
          i.length >= 2 && (a = parseFloat(i[0]), o = parseInt(i[1], 10));
        var u;
        if (typeof a < "u" && a >= 0 && a <= 1) {
          if (e._state !== "loaded" || e._playLock)
            return e._queue.push({
              event: "volume",
              action: function() {
                e.volume.apply(e, i);
              }
            }), e;
          typeof o > "u" && (e._volume = a), o = e._getSoundIds(o);
          for (var y = 0; y < o.length; y++)
            u = e._soundById(o[y]), u && (u._volume = a, i[2] || e._stopFade(o[y]), e._webAudio && u._node && !u._muted ? u._node.gain.setValueAtTime(a, t.ctx.currentTime) : u._node && !u._muted && (u._node.volume = a * t.volume()), e._emit("volume", u._id));
        } else
          return u = o ? e._soundById(o) : e._sounds[0], u ? u._volume : 0;
        return e;
      },
      /**
       * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
       * @param  {Number} from The value to fade from (0.0 to 1.0).
       * @param  {Number} to   The volume to fade to (0.0 to 1.0).
       * @param  {Number} len  Time in milliseconds to fade.
       * @param  {Number} id   The sound id (omit to fade all sounds).
       * @return {Howl}
       */
      fade: function(e, i, a, o) {
        var f = this;
        if (f._state !== "loaded" || f._playLock)
          return f._queue.push({
            event: "fade",
            action: function() {
              f.fade(e, i, a, o);
            }
          }), f;
        e = Math.min(Math.max(0, parseFloat(e)), 1), i = Math.min(Math.max(0, parseFloat(i)), 1), a = parseFloat(a), f.volume(e, o);
        for (var m = f._getSoundIds(o), u = 0; u < m.length; u++) {
          var y = f._soundById(m[u]);
          if (y) {
            if (o || f._stopFade(m[u]), f._webAudio && !y._muted) {
              var x = t.ctx.currentTime, w = x + a / 1e3;
              y._volume = e, y._node.gain.setValueAtTime(e, x), y._node.gain.linearRampToValueAtTime(i, w);
            }
            f._startFadeInterval(y, e, i, a, m[u], typeof o > "u");
          }
        }
        return f;
      },
      /**
       * Starts the internal interval to fade a sound.
       * @param  {Object} sound Reference to sound to fade.
       * @param  {Number} from The value to fade from (0.0 to 1.0).
       * @param  {Number} to   The volume to fade to (0.0 to 1.0).
       * @param  {Number} len  Time in milliseconds to fade.
       * @param  {Number} id   The sound id to fade.
       * @param  {Boolean} isGroup   If true, set the volume on the group.
       */
      _startFadeInterval: function(e, i, a, o, f, m) {
        var u = this, y = i, x = a - i, w = Math.abs(x / 0.01), S = Math.max(4, w > 0 ? o / w : o), A = Date.now();
        e._fadeTo = a, e._interval = setInterval(function() {
          var j = (Date.now() - A) / o;
          A = Date.now(), y += x * j, y = Math.round(y * 100) / 100, x < 0 ? y = Math.max(a, y) : y = Math.min(a, y), u._webAudio ? e._volume = y : u.volume(y, e._id, !0), m && (u._volume = y), (a < i && y <= a || a > i && y >= a) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, u.volume(a, e._id), u._emit("fade", e._id));
        }, S);
      },
      /**
       * Internal method that stops the currently playing fade when
       * a new fade starts, volume is changed or the sound is stopped.
       * @param  {Number} id The sound id.
       * @return {Howl}
       */
      _stopFade: function(e) {
        var i = this, a = i._soundById(e);
        return a && a._interval && (i._webAudio && a._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(a._interval), a._interval = null, i.volume(a._fadeTo, e), a._fadeTo = null, i._emit("fade", e)), i;
      },
      /**
       * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
       *   loop() -> Returns the group's loop value.
       *   loop(id) -> Returns the sound id's loop value.
       *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
       *   loop(loop, id) -> Sets the loop value of passed sound id.
       * @return {Howl/Boolean} Returns self or current loop value.
       */
      loop: function() {
        var e = this, i = arguments, a, o, f;
        if (i.length === 0)
          return e._loop;
        if (i.length === 1)
          if (typeof i[0] == "boolean")
            a = i[0], e._loop = a;
          else
            return f = e._soundById(parseInt(i[0], 10)), f ? f._loop : !1;
        else
          i.length === 2 && (a = i[0], o = parseInt(i[1], 10));
        for (var m = e._getSoundIds(o), u = 0; u < m.length; u++)
          f = e._soundById(m[u]), f && (f._loop = a, e._webAudio && f._node && f._node.bufferSource && (f._node.bufferSource.loop = a, a && (f._node.bufferSource.loopStart = f._start || 0, f._node.bufferSource.loopEnd = f._stop, e.playing(m[u]) && (e.pause(m[u], !0), e.play(m[u], !0)))));
        return e;
      },
      /**
       * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
       *   rate() -> Returns the first sound node's current playback rate.
       *   rate(id) -> Returns the sound id's current playback rate.
       *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
       *   rate(rate, id) -> Sets the playback rate of passed sound id.
       * @return {Howl/Number} Returns self or the current playback rate.
       */
      rate: function() {
        var e = this, i = arguments, a, o;
        if (i.length === 0)
          o = e._sounds[0]._id;
        else if (i.length === 1) {
          var f = e._getSoundIds(), m = f.indexOf(i[0]);
          m >= 0 ? o = parseInt(i[0], 10) : a = parseFloat(i[0]);
        } else
          i.length === 2 && (a = parseFloat(i[0]), o = parseInt(i[1], 10));
        var u;
        if (typeof a == "number") {
          if (e._state !== "loaded" || e._playLock)
            return e._queue.push({
              event: "rate",
              action: function() {
                e.rate.apply(e, i);
              }
            }), e;
          typeof o > "u" && (e._rate = a), o = e._getSoundIds(o);
          for (var y = 0; y < o.length; y++)
            if (u = e._soundById(o[y]), u) {
              e.playing(o[y]) && (u._rateSeek = e.seek(o[y]), u._playStart = e._webAudio ? t.ctx.currentTime : u._playStart), u._rate = a, e._webAudio && u._node && u._node.bufferSource ? u._node.bufferSource.playbackRate.setValueAtTime(a, t.ctx.currentTime) : u._node && (u._node.playbackRate = a);
              var x = e.seek(o[y]), w = (e._sprite[u._sprite][0] + e._sprite[u._sprite][1]) / 1e3 - x, S = w * 1e3 / Math.abs(u._rate);
              (e._endTimers[o[y]] || !u._paused) && (e._clearTimer(o[y]), e._endTimers[o[y]] = setTimeout(e._ended.bind(e, u), S)), e._emit("rate", u._id);
            }
        } else
          return u = e._soundById(o), u ? u._rate : e._rate;
        return e;
      },
      /**
       * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
       *   seek() -> Returns the first sound node's current seek position.
       *   seek(id) -> Returns the sound id's current seek position.
       *   seek(seek) -> Sets the seek position of the first sound node.
       *   seek(seek, id) -> Sets the seek position of passed sound id.
       * @return {Howl/Number} Returns self or the current seek position.
       */
      seek: function() {
        var e = this, i = arguments, a, o;
        if (i.length === 0)
          e._sounds.length && (o = e._sounds[0]._id);
        else if (i.length === 1) {
          var f = e._getSoundIds(), m = f.indexOf(i[0]);
          m >= 0 ? o = parseInt(i[0], 10) : e._sounds.length && (o = e._sounds[0]._id, a = parseFloat(i[0]));
        } else
          i.length === 2 && (a = parseFloat(i[0]), o = parseInt(i[1], 10));
        if (typeof o > "u")
          return 0;
        if (typeof a == "number" && (e._state !== "loaded" || e._playLock))
          return e._queue.push({
            event: "seek",
            action: function() {
              e.seek.apply(e, i);
            }
          }), e;
        var u = e._soundById(o);
        if (u)
          if (typeof a == "number" && a >= 0) {
            var y = e.playing(o);
            y && e.pause(o, !0), u._seek = a, u._ended = !1, e._clearTimer(o), !e._webAudio && u._node && !isNaN(u._node.duration) && (u._node.currentTime = a);
            var x = function() {
              y && e.play(o, !0), e._emit("seek", o);
            };
            if (y && !e._webAudio) {
              var w = function() {
                e._playLock ? setTimeout(w, 0) : x();
              };
              setTimeout(w, 0);
            } else
              x();
          } else if (e._webAudio) {
            var S = e.playing(o) ? t.ctx.currentTime - u._playStart : 0, A = u._rateSeek ? u._rateSeek - u._seek : 0;
            return u._seek + (A + S * Math.abs(u._rate));
          } else
            return u._node.currentTime;
        return e;
      },
      /**
       * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
       * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
       * @return {Boolean} True if playing and false if not.
       */
      playing: function(e) {
        var i = this;
        if (typeof e == "number") {
          var a = i._soundById(e);
          return a ? !a._paused : !1;
        }
        for (var o = 0; o < i._sounds.length; o++)
          if (!i._sounds[o]._paused)
            return !0;
        return !1;
      },
      /**
       * Get the duration of this sound. Passing a sound id will return the sprite duration.
       * @param  {Number} id The sound id to check. If none is passed, return full source duration.
       * @return {Number} Audio duration in seconds.
       */
      duration: function(e) {
        var i = this, a = i._duration, o = i._soundById(e);
        return o && (a = i._sprite[o._sprite][1] / 1e3), a;
      },
      /**
       * Returns the current loaded state of this Howl.
       * @return {String} 'unloaded', 'loading', 'loaded'
       */
      state: function() {
        return this._state;
      },
      /**
       * Unload and destroy the current Howl object.
       * This will immediately stop all sound instances attached to this group.
       */
      unload: function() {
        for (var e = this, i = e._sounds, a = 0; a < i.length; a++)
          i[a]._paused || e.stop(i[a]._id), e._webAudio || (e._clearSound(i[a]._node), i[a]._node.removeEventListener("error", i[a]._errorFn, !1), i[a]._node.removeEventListener(t._canPlayEvent, i[a]._loadFn, !1), i[a]._node.removeEventListener("ended", i[a]._endFn, !1), t._releaseHtml5Audio(i[a]._node)), delete i[a]._node, e._clearTimer(i[a]._id);
        var o = t._howls.indexOf(e);
        o >= 0 && t._howls.splice(o, 1);
        var f = !0;
        for (a = 0; a < t._howls.length; a++)
          if (t._howls[a]._src === e._src || e._src.indexOf(t._howls[a]._src) >= 0) {
            f = !1;
            break;
          }
        return l && f && delete l[e._src], t.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null;
      },
      /**
       * Listen to a custom event.
       * @param  {String}   event Event name.
       * @param  {Function} fn    Listener to call.
       * @param  {Number}   id    (optional) Only listen to events for this sound.
       * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
       * @return {Howl}
       */
      on: function(e, i, a, o) {
        var f = this, m = f["_on" + e];
        return typeof i == "function" && m.push(o ? { id: a, fn: i, once: o } : { id: a, fn: i }), f;
      },
      /**
       * Remove a custom event. Call without parameters to remove all events.
       * @param  {String}   event Event name.
       * @param  {Function} fn    Listener to remove. Leave empty to remove all.
       * @param  {Number}   id    (optional) Only remove events for this sound.
       * @return {Howl}
       */
      off: function(e, i, a) {
        var o = this, f = o["_on" + e], m = 0;
        if (typeof i == "number" && (a = i, i = null), i || a)
          for (m = 0; m < f.length; m++) {
            var u = a === f[m].id;
            if (i === f[m].fn && u || !i && u) {
              f.splice(m, 1);
              break;
            }
          }
        else if (e)
          o["_on" + e] = [];
        else {
          var y = Object.keys(o);
          for (m = 0; m < y.length; m++)
            y[m].indexOf("_on") === 0 && Array.isArray(o[y[m]]) && (o[y[m]] = []);
        }
        return o;
      },
      /**
       * Listen to a custom event and remove it once fired.
       * @param  {String}   event Event name.
       * @param  {Function} fn    Listener to call.
       * @param  {Number}   id    (optional) Only listen to events for this sound.
       * @return {Howl}
       */
      once: function(e, i, a) {
        var o = this;
        return o.on(e, i, a, 1), o;
      },
      /**
       * Emit all events of a specific type and pass the sound id.
       * @param  {String} event Event name.
       * @param  {Number} id    Sound ID.
       * @param  {Number} msg   Message to go with event.
       * @return {Howl}
       */
      _emit: function(e, i, a) {
        for (var o = this, f = o["_on" + e], m = f.length - 1; m >= 0; m--)
          (!f[m].id || f[m].id === i || e === "load") && (setTimeout(function(u) {
            u.call(this, i, a);
          }.bind(o, f[m].fn), 0), f[m].once && o.off(e, f[m].fn, f[m].id));
        return o._loadQueue(e), o;
      },
      /**
       * Queue of actions initiated before the sound has loaded.
       * These will be called in sequence, with the next only firing
       * after the previous has finished executing (even if async like play).
       * @return {Howl}
       */
      _loadQueue: function(e) {
        var i = this;
        if (i._queue.length > 0) {
          var a = i._queue[0];
          a.event === e && (i._queue.shift(), i._loadQueue()), e || a.action();
        }
        return i;
      },
      /**
       * Fired when playback ends at the end of the duration.
       * @param  {Sound} sound The sound object to work with.
       * @return {Howl}
       */
      _ended: function(e) {
        var i = this, a = e._sprite;
        if (!i._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop)
          return setTimeout(i._ended.bind(i, e), 100), i;
        var o = !!(e._loop || i._sprite[a][2]);
        if (i._emit("end", e._id), !i._webAudio && o && i.stop(e._id, !0).play(e._id), i._webAudio && o) {
          i._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = t.ctx.currentTime;
          var f = (e._stop - e._start) * 1e3 / Math.abs(e._rate);
          i._endTimers[e._id] = setTimeout(i._ended.bind(i, e), f);
        }
        return i._webAudio && !o && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, i._clearTimer(e._id), i._cleanBuffer(e._node), t._autoSuspend()), !i._webAudio && !o && i.stop(e._id, !0), i;
      },
      /**
       * Clear the end timer for a sound playback.
       * @param  {Number} id The sound ID.
       * @return {Howl}
       */
      _clearTimer: function(e) {
        var i = this;
        if (i._endTimers[e]) {
          if (typeof i._endTimers[e] != "function")
            clearTimeout(i._endTimers[e]);
          else {
            var a = i._soundById(e);
            a && a._node && a._node.removeEventListener("ended", i._endTimers[e], !1);
          }
          delete i._endTimers[e];
        }
        return i;
      },
      /**
       * Return the sound identified by this ID, or return null.
       * @param  {Number} id Sound ID
       * @return {Object}    Sound object or null.
       */
      _soundById: function(e) {
        for (var i = this, a = 0; a < i._sounds.length; a++)
          if (e === i._sounds[a]._id)
            return i._sounds[a];
        return null;
      },
      /**
       * Return an inactive sound from the pool or create a new one.
       * @return {Sound} Sound playback object.
       */
      _inactiveSound: function() {
        var e = this;
        e._drain();
        for (var i = 0; i < e._sounds.length; i++)
          if (e._sounds[i]._ended)
            return e._sounds[i].reset();
        return new n(e);
      },
      /**
       * Drain excess inactive sounds from the pool.
       */
      _drain: function() {
        var e = this, i = e._pool, a = 0, o = 0;
        if (!(e._sounds.length < i)) {
          for (o = 0; o < e._sounds.length; o++)
            e._sounds[o]._ended && a++;
          for (o = e._sounds.length - 1; o >= 0; o--) {
            if (a <= i)
              return;
            e._sounds[o]._ended && (e._webAudio && e._sounds[o]._node && e._sounds[o]._node.disconnect(0), e._sounds.splice(o, 1), a--);
          }
        }
      },
      /**
       * Get all ID's from the sounds pool.
       * @param  {Number} id Only return one ID if one is passed.
       * @return {Array}    Array of IDs.
       */
      _getSoundIds: function(e) {
        var i = this;
        if (typeof e > "u") {
          for (var a = [], o = 0; o < i._sounds.length; o++)
            a.push(i._sounds[o]._id);
          return a;
        } else
          return [e];
      },
      /**
       * Load the sound back into the buffer source.
       * @param  {Sound} sound The sound object to work with.
       * @return {Howl}
       */
      _refreshBuffer: function(e) {
        var i = this;
        return e._node.bufferSource = t.ctx.createBufferSource(), e._node.bufferSource.buffer = l[i._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, t.ctx.currentTime), i;
      },
      /**
       * Prevent memory leaks by cleaning up the buffer source after playback.
       * @param  {Object} node Sound's audio node containing the buffer source.
       * @return {Howl}
       */
      _cleanBuffer: function(e) {
        var i = this, a = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
        if (t._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null, e.bufferSource.disconnect(0), a))
          try {
            e.bufferSource.buffer = t._scratchBuffer;
          } catch {
          }
        return e.bufferSource = null, i;
      },
      /**
       * Set the source to a 0-second silence to stop any downloading (except in IE).
       * @param  {Object} node Audio node to clear.
       */
      _clearSound: function(e) {
        var i = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
        i || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
      }
    };
    var n = function(e) {
      this._parent = e, this.init();
    };
    n.prototype = {
      /**
       * Initialize a new Sound object.
       * @return {Sound}
       */
      init: function() {
        var e = this, i = e._parent;
        return e._muted = i._muted, e._loop = i._loop, e._volume = i._volume, e._rate = i._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++t._counter, i._sounds.push(e), e.create(), e;
      },
      /**
       * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
       * @return {Sound}
       */
      create: function() {
        var e = this, i = e._parent, a = t._muted || e._muted || e._parent._muted ? 0 : e._volume;
        return i._webAudio ? (e._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), e._node.gain.setValueAtTime(a, t.ctx.currentTime), e._node.paused = !0, e._node.connect(t.masterGain)) : t.noAudio || (e._node = t._obtainHtml5Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(t._canPlayEvent, e._loadFn, !1), e._endFn = e._endListener.bind(e), e._node.addEventListener("ended", e._endFn, !1), e._node.src = i._src, e._node.preload = i._preload === !0 ? "auto" : i._preload, e._node.volume = a * t.volume(), e._node.load()), e;
      },
      /**
       * Reset the parameters of this sound to the original state (for recycle).
       * @return {Sound}
       */
      reset: function() {
        var e = this, i = e._parent;
        return e._muted = i._muted, e._loop = i._loop, e._volume = i._volume, e._rate = i._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++t._counter, e;
      },
      /**
       * HTML5 Audio error listener callback.
       */
      _errorListener: function() {
        var e = this;
        e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorFn, !1);
      },
      /**
       * HTML5 Audio canplaythrough listener callback.
       */
      _loadListener: function() {
        var e = this, i = e._parent;
        i._duration = Math.ceil(e._node.duration * 10) / 10, Object.keys(i._sprite).length === 0 && (i._sprite = { __default: [0, i._duration * 1e3] }), i._state !== "loaded" && (i._state = "loaded", i._emit("load"), i._loadQueue()), e._node.removeEventListener(t._canPlayEvent, e._loadFn, !1);
      },
      /**
       * HTML5 Audio ended listener callback.
       */
      _endListener: function() {
        var e = this, i = e._parent;
        i._duration === 1 / 0 && (i._duration = Math.ceil(e._node.duration * 10) / 10, i._sprite.__default[1] === 1 / 0 && (i._sprite.__default[1] = i._duration * 1e3), i._ended(e)), e._node.removeEventListener("ended", e._endFn, !1);
      }
    };
    var l = {}, c = function(e) {
      var i = e._src;
      if (l[i]) {
        e._duration = l[i].duration, g(e);
        return;
      }
      if (/^data:[^;]+;base64,/.test(i)) {
        for (var a = atob(i.split(",")[1]), o = new Uint8Array(a.length), f = 0; f < a.length; ++f)
          o[f] = a.charCodeAt(f);
        p(o.buffer, e);
      } else {
        var m = new XMLHttpRequest();
        m.open(e._xhr.method, i, !0), m.withCredentials = e._xhr.withCredentials, m.responseType = "arraybuffer", e._xhr.headers && Object.keys(e._xhr.headers).forEach(function(u) {
          m.setRequestHeader(u, e._xhr.headers[u]);
        }), m.onload = function() {
          var u = (m.status + "")[0];
          if (u !== "0" && u !== "2" && u !== "3") {
            e._emit("loaderror", null, "Failed loading audio file with status: " + m.status + ".");
            return;
          }
          p(m.response, e);
        }, m.onerror = function() {
          e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete l[i], e.load());
        }, h(m);
      }
    }, h = function(e) {
      try {
        e.send();
      } catch {
        e.onerror();
      }
    }, p = function(e, i) {
      var a = function() {
        i._emit("loaderror", null, "Decoding audio data failed.");
      }, o = function(f) {
        f && i._sounds.length > 0 ? (l[i._src] = f, g(i, f)) : a();
      };
      typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(e).then(o).catch(a) : t.ctx.decodeAudioData(e, o, a);
    }, g = function(e, i) {
      i && !e._duration && (e._duration = i.duration), Object.keys(e._sprite).length === 0 && (e._sprite = { __default: [0, e._duration * 1e3] }), e._state !== "loaded" && (e._state = "loaded", e._emit("load"), e._loadQueue());
    }, _ = function() {
      if (t.usingWebAudio) {
        try {
          typeof AudioContext < "u" ? t.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext() : t.usingWebAudio = !1;
        } catch {
          t.usingWebAudio = !1;
        }
        t.ctx || (t.usingWebAudio = !1);
        var e = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform), i = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), a = i ? parseInt(i[1], 10) : null;
        if (e && a && a < 9) {
          var o = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
          t._navigator && !o && (t.usingWebAudio = !1);
        }
        t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)), t._setup();
      }
    };
    d.Howler = t, d.Howl = r, typeof le < "u" ? (le.HowlerGlobal = s, le.Howler = t, le.Howl = r, le.Sound = n) : typeof window < "u" && (window.HowlerGlobal = s, window.Howler = t, window.Howl = r, window.Sound = n);
  })();
  /*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   */
  (function() {
    HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(t) {
      var r = this;
      if (!r.ctx || !r.ctx.listener)
        return r;
      for (var n = r._howls.length - 1; n >= 0; n--)
        r._howls[n].stereo(t);
      return r;
    }, HowlerGlobal.prototype.pos = function(t, r, n) {
      var l = this;
      if (!l.ctx || !l.ctx.listener)
        return l;
      if (r = typeof r != "number" ? l._pos[1] : r, n = typeof n != "number" ? l._pos[2] : n, typeof t == "number")
        l._pos = [t, r, n], typeof l.ctx.listener.positionX < "u" ? (l.ctx.listener.positionX.setTargetAtTime(l._pos[0], Howler.ctx.currentTime, 0.1), l.ctx.listener.positionY.setTargetAtTime(l._pos[1], Howler.ctx.currentTime, 0.1), l.ctx.listener.positionZ.setTargetAtTime(l._pos[2], Howler.ctx.currentTime, 0.1)) : l.ctx.listener.setPosition(l._pos[0], l._pos[1], l._pos[2]);
      else
        return l._pos;
      return l;
    }, HowlerGlobal.prototype.orientation = function(t, r, n, l, c, h) {
      var p = this;
      if (!p.ctx || !p.ctx.listener)
        return p;
      var g = p._orientation;
      if (r = typeof r != "number" ? g[1] : r, n = typeof n != "number" ? g[2] : n, l = typeof l != "number" ? g[3] : l, c = typeof c != "number" ? g[4] : c, h = typeof h != "number" ? g[5] : h, typeof t == "number")
        p._orientation = [t, r, n, l, c, h], typeof p.ctx.listener.forwardX < "u" ? (p.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, 0.1), p.ctx.listener.forwardY.setTargetAtTime(r, Howler.ctx.currentTime, 0.1), p.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, 0.1), p.ctx.listener.upX.setTargetAtTime(l, Howler.ctx.currentTime, 0.1), p.ctx.listener.upY.setTargetAtTime(c, Howler.ctx.currentTime, 0.1), p.ctx.listener.upZ.setTargetAtTime(h, Howler.ctx.currentTime, 0.1)) : p.ctx.listener.setOrientation(t, r, n, l, c, h);
      else
        return g;
      return p;
    }, Howl.prototype.init = function(t) {
      return function(r) {
        var n = this;
        return n._orientation = r.orientation || [1, 0, 0], n._stereo = r.stereo || null, n._pos = r.pos || null, n._pannerAttr = {
          coneInnerAngle: typeof r.coneInnerAngle < "u" ? r.coneInnerAngle : 360,
          coneOuterAngle: typeof r.coneOuterAngle < "u" ? r.coneOuterAngle : 360,
          coneOuterGain: typeof r.coneOuterGain < "u" ? r.coneOuterGain : 0,
          distanceModel: typeof r.distanceModel < "u" ? r.distanceModel : "inverse",
          maxDistance: typeof r.maxDistance < "u" ? r.maxDistance : 1e4,
          panningModel: typeof r.panningModel < "u" ? r.panningModel : "HRTF",
          refDistance: typeof r.refDistance < "u" ? r.refDistance : 1,
          rolloffFactor: typeof r.rolloffFactor < "u" ? r.rolloffFactor : 1
        }, n._onstereo = r.onstereo ? [{ fn: r.onstereo }] : [], n._onpos = r.onpos ? [{ fn: r.onpos }] : [], n._onorientation = r.onorientation ? [{ fn: r.onorientation }] : [], t.call(this, r);
      };
    }(Howl.prototype.init), Howl.prototype.stereo = function(t, r) {
      var n = this;
      if (!n._webAudio)
        return n;
      if (n._state !== "loaded")
        return n._queue.push({
          event: "stereo",
          action: function() {
            n.stereo(t, r);
          }
        }), n;
      var l = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
      if (typeof r > "u")
        if (typeof t == "number")
          n._stereo = t, n._pos = [t, 0, 0];
        else
          return n._stereo;
      for (var c = n._getSoundIds(r), h = 0; h < c.length; h++) {
        var p = n._soundById(c[h]);
        if (p)
          if (typeof t == "number")
            p._stereo = t, p._pos = [t, 0, 0], p._node && (p._pannerAttr.panningModel = "equalpower", (!p._panner || !p._panner.pan) && s(p, l), l === "spatial" ? typeof p._panner.positionX < "u" ? (p._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), p._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), p._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : p._panner.setPosition(t, 0, 0) : p._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), n._emit("stereo", p._id);
          else
            return p._stereo;
      }
      return n;
    }, Howl.prototype.pos = function(t, r, n, l) {
      var c = this;
      if (!c._webAudio)
        return c;
      if (c._state !== "loaded")
        return c._queue.push({
          event: "pos",
          action: function() {
            c.pos(t, r, n, l);
          }
        }), c;
      if (r = typeof r != "number" ? 0 : r, n = typeof n != "number" ? -0.5 : n, typeof l > "u")
        if (typeof t == "number")
          c._pos = [t, r, n];
        else
          return c._pos;
      for (var h = c._getSoundIds(l), p = 0; p < h.length; p++) {
        var g = c._soundById(h[p]);
        if (g)
          if (typeof t == "number")
            g._pos = [t, r, n], g._node && ((!g._panner || g._panner.pan) && s(g, "spatial"), typeof g._panner.positionX < "u" ? (g._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), g._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime), g._panner.positionZ.setValueAtTime(n, Howler.ctx.currentTime)) : g._panner.setPosition(t, r, n)), c._emit("pos", g._id);
          else
            return g._pos;
      }
      return c;
    }, Howl.prototype.orientation = function(t, r, n, l) {
      var c = this;
      if (!c._webAudio)
        return c;
      if (c._state !== "loaded")
        return c._queue.push({
          event: "orientation",
          action: function() {
            c.orientation(t, r, n, l);
          }
        }), c;
      if (r = typeof r != "number" ? c._orientation[1] : r, n = typeof n != "number" ? c._orientation[2] : n, typeof l > "u")
        if (typeof t == "number")
          c._orientation = [t, r, n];
        else
          return c._orientation;
      for (var h = c._getSoundIds(l), p = 0; p < h.length; p++) {
        var g = c._soundById(h[p]);
        if (g)
          if (typeof t == "number")
            g._orientation = [t, r, n], g._node && (g._panner || (g._pos || (g._pos = c._pos || [0, 0, -0.5]), s(g, "spatial")), typeof g._panner.orientationX < "u" ? (g._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), g._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime), g._panner.orientationZ.setValueAtTime(n, Howler.ctx.currentTime)) : g._panner.setOrientation(t, r, n)), c._emit("orientation", g._id);
          else
            return g._orientation;
      }
      return c;
    }, Howl.prototype.pannerAttr = function() {
      var t = this, r = arguments, n, l, c;
      if (!t._webAudio)
        return t;
      if (r.length === 0)
        return t._pannerAttr;
      if (r.length === 1)
        if (typeof r[0] == "object")
          n = r[0], typeof l > "u" && (n.pannerAttr || (n.pannerAttr = {
            coneInnerAngle: n.coneInnerAngle,
            coneOuterAngle: n.coneOuterAngle,
            coneOuterGain: n.coneOuterGain,
            distanceModel: n.distanceModel,
            maxDistance: n.maxDistance,
            refDistance: n.refDistance,
            rolloffFactor: n.rolloffFactor,
            panningModel: n.panningModel
          }), t._pannerAttr = {
            coneInnerAngle: typeof n.pannerAttr.coneInnerAngle < "u" ? n.pannerAttr.coneInnerAngle : t._coneInnerAngle,
            coneOuterAngle: typeof n.pannerAttr.coneOuterAngle < "u" ? n.pannerAttr.coneOuterAngle : t._coneOuterAngle,
            coneOuterGain: typeof n.pannerAttr.coneOuterGain < "u" ? n.pannerAttr.coneOuterGain : t._coneOuterGain,
            distanceModel: typeof n.pannerAttr.distanceModel < "u" ? n.pannerAttr.distanceModel : t._distanceModel,
            maxDistance: typeof n.pannerAttr.maxDistance < "u" ? n.pannerAttr.maxDistance : t._maxDistance,
            refDistance: typeof n.pannerAttr.refDistance < "u" ? n.pannerAttr.refDistance : t._refDistance,
            rolloffFactor: typeof n.pannerAttr.rolloffFactor < "u" ? n.pannerAttr.rolloffFactor : t._rolloffFactor,
            panningModel: typeof n.pannerAttr.panningModel < "u" ? n.pannerAttr.panningModel : t._panningModel
          });
        else
          return c = t._soundById(parseInt(r[0], 10)), c ? c._pannerAttr : t._pannerAttr;
      else
        r.length === 2 && (n = r[0], l = parseInt(r[1], 10));
      for (var h = t._getSoundIds(l), p = 0; p < h.length; p++)
        if (c = t._soundById(h[p]), c) {
          var g = c._pannerAttr;
          g = {
            coneInnerAngle: typeof n.coneInnerAngle < "u" ? n.coneInnerAngle : g.coneInnerAngle,
            coneOuterAngle: typeof n.coneOuterAngle < "u" ? n.coneOuterAngle : g.coneOuterAngle,
            coneOuterGain: typeof n.coneOuterGain < "u" ? n.coneOuterGain : g.coneOuterGain,
            distanceModel: typeof n.distanceModel < "u" ? n.distanceModel : g.distanceModel,
            maxDistance: typeof n.maxDistance < "u" ? n.maxDistance : g.maxDistance,
            refDistance: typeof n.refDistance < "u" ? n.refDistance : g.refDistance,
            rolloffFactor: typeof n.rolloffFactor < "u" ? n.rolloffFactor : g.rolloffFactor,
            panningModel: typeof n.panningModel < "u" ? n.panningModel : g.panningModel
          };
          var _ = c._panner;
          _ ? (_.coneInnerAngle = g.coneInnerAngle, _.coneOuterAngle = g.coneOuterAngle, _.coneOuterGain = g.coneOuterGain, _.distanceModel = g.distanceModel, _.maxDistance = g.maxDistance, _.refDistance = g.refDistance, _.rolloffFactor = g.rolloffFactor, _.panningModel = g.panningModel) : (c._pos || (c._pos = t._pos || [0, 0, -0.5]), s(c, "spatial"));
        }
      return t;
    }, Sound.prototype.init = function(t) {
      return function() {
        var r = this, n = r._parent;
        r._orientation = n._orientation, r._stereo = n._stereo, r._pos = n._pos, r._pannerAttr = n._pannerAttr, t.call(this), r._stereo ? n.stereo(r._stereo) : r._pos && n.pos(r._pos[0], r._pos[1], r._pos[2], r._id);
      };
    }(Sound.prototype.init), Sound.prototype.reset = function(t) {
      return function() {
        var r = this, n = r._parent;
        return r._orientation = n._orientation, r._stereo = n._stereo, r._pos = n._pos, r._pannerAttr = n._pannerAttr, r._stereo ? n.stereo(r._stereo) : r._pos ? n.pos(r._pos[0], r._pos[1], r._pos[2], r._id) : r._panner && (r._panner.disconnect(0), r._panner = void 0, n._refreshBuffer(r)), t.call(this);
      };
    }(Sound.prototype.reset);
    var s = function(t, r) {
      r = r || "spatial", r === "spatial" ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.panningModel = t._pannerAttr.panningModel, typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, !0).play(t._id, !0);
    };
  })();
})(pe);
class pt {
  constructor() {
    this.sounds = /* @__PURE__ */ new Map(), this.loadSpritemap = (s) => {
      s != null && (this.audioSprite = new pe.Howl({
        ...s,
        preload: !0
      }));
    }, this.isPlaying = (s) => this.audioSprite.playing(s), this.updateSoundLoopValue = (s, t) => {
      !this.audioSprite || !s || this.audioSprite.loop(t, s);
    }, this.updateSoundVolume = (s, t) => {
      !this.audioSprite || !s || this.audioSprite.volume(t, s);
    }, this.playSound = (s) => {
      if (this.audioSprite)
        return this.audioSprite.play(s);
    }, this.pauseSound = (s) => {
      this.audioSprite && this.audioSprite.pause(s);
    }, this.stopSound = (s) => {
      this.audioSprite && this.audioSprite.stop(s);
    }, pe.Howler.volume(1);
  }
  // getSound = (name: string) => {
  //   return this.sounds.get(name);
  // };
  // playSound = (name: string, spriteId?: number) => {
  //   const sound = this.sounds.get(name);
  //   if (!sound) {
  //     return;
  //   }
  //   // @ts-expect-error
  //   return sound.play(spriteId);
  // };
  // pauseSound = (name: string, spriteId?: number) => {
  //   const sound = this.sounds.get(name);
  //   if (!sound) {
  //     return;
  //   }
  //   // @ts-expect-error
  //   sound.pause(spriteId);
  // };
  // stopSound = (name: string, spriteId?: number) => {
  //   const sound = this.sounds.get(name);
  //   if (!sound) {
  //     return;
  //   }
  //   // @ts-expect-error
  //   sound.stop(spriteId);
  // };
  // TODO: Set Volume
}
class gt {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  subscribe(s, t) {
    this.listeners.has(s) || this.listeners.set(s, []), this.listeners.get(s).push(t);
  }
  unsubscribe(s, t) {
    if (!this.listeners.has(s))
      return;
    const r = this.listeners.get(s), n = r.indexOf(t);
    n !== -1 && r.splice(n, 1);
  }
  emit(s, t) {
    if (!this.listeners.has(s))
      return;
    this.listeners.get(s).forEach((n) => n(t));
  }
}
class _t {
  constructor(s, t) {
    this.ecs = s, this.gridManager = t;
  }
  update(s) {
    const t = this.ecs.entityManager.with([
      "flowingMovement"
    ]);
    for (const r of t) {
      const { flowingMovement: n } = r;
      if (!n)
        return;
      const { target: l, weight: c, speed: h } = n, p = this.gridManager.generateFlowField(l);
      if (!p)
        return;
      const g = r.transform.position.map(Math.floor), _ = p[g.y][g.x];
      r.velocity = r.velocity.scale(h).add({
        x: _[0],
        y: _[1]
      }), r.transform.direction = r.velocity;
    }
  }
}
const Ie = async (d, s = De, t) => {
  var b, P;
  const r = d.maps[t], n = document.getElementById(
    s.canvasId
  );
  n.width = s.width, n.height = s.height;
  const l = n.getContext("2d", {
    willReadFrequently: !0
  }), c = new it(), h = new gt(), p = new ot(), g = new ft(p), _ = new pt(), e = new mt(), i = new ht(c), a = se.getInstance(), o = {
    gameSettings: {
      width: s.width,
      height: s.height,
      canvasId: s.canvasId,
      tileSize: ke
    }
  };
  c.entityManager.add(o);
  const f = d.textures ?? [];
  await Promise.allSettled(
    Object.entries(f).map(([C, T]) => p.loadTexture(C, T))
  ), p.loadTextureAnimations(
    d.textureAnimations.filter((C) => C.animationType !== "sprite")
  ), d.sprites.forEach((C) => g.loadSprites(C)), p.loadSpriteTextures(
    g,
    d.textureAnimations.filter(
      (C) => C.animationType === "sprite"
    )
  ), e.loadAnimations(d.animations), _.loadSpritemap(d.audioSpritemap);
  const m = r.grid;
  i.loadGrid(m), a.registerWeaponAssets(ce.None, {
    [Z.Idle]: {
      name: "default",
      // TODO: Defined separately again like other animations?
      frames: [],
      events: []
    },
    [Z.Firing]: {
      name: "firing",
      frames: [],
      events: []
    },
    sprite: {
      width: 0
    }
  }), a.registerWeaponAssets(ce.MagicHands, {
    [Z.Idle]: {
      name: "magic_hands__default",
      frames: [
        {
          frameId: "CONEA0",
          duration: 1 / 0,
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        }
      ],
      events: []
    },
    [Z.Firing]: {
      name: "firing",
      frames: [
        {
          frameId: "CONEB0",
          duration: 40,
          // TODO: Fixed duration for weapon animations?
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        },
        {
          frameId: "CONEC0",
          duration: 40,
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        },
        {
          frameId: "CONED0",
          duration: 40,
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        },
        {
          frameId: "CONEE0",
          duration: 40,
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        },
        {
          frameId: "CONEF0",
          duration: 40,
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        },
        {
          frameId: "CONEG0",
          duration: 40,
          directions: 0
          // I want to make this optional so I don't need it for hud animations ideally.
        }
      ],
      events: [
        {
          frameId: "CONEC0",
          eventType: O.PlaySound,
          eventPayload: {
            name: "swoosh1"
          }
        }
      ]
    },
    sprite: {
      width: 228
      // TODO: Scale?
    }
  });
  const u = r.start, y = oe(u.fov), x = Math.abs(Math.atan(y)), w = Me(
    u.rotation
  ).scale(x), S = Fe(u.rotation), A = {
    equippedWeapon: {
      type: ce.MagicHands,
      state: Z.Idle
    },
    // TODO: We want this to be set up in the player controller on start, so we keep referential integrity with the component in the weaponAssetManager when possible. Typescript will complain for a bit until I sort that out.
    // equippedWeaponAnimation: {
    //   name: "default",
    //   frames: [],
    //   frameDuration: Infinity,
    //   looping: false,
    //   currentFrame: 0,
    //   timeSinceLastFrame: Date.now(),
    // },
    camera: {
      inverseDeterminate: 1 / (S.x * w.y - w.x * S.y),
      fov: x
    },
    userControl: {
      isControlled: !0
    },
    transform: {
      position: new k(
        u.position.x,
        u.position.y
      ),
      elevation: u.elevation,
      direction: w,
      height: 192
      // I hope this isnt being used right now
      // scale: new Vector(1, 1),
    },
    plane: S,
    collider: {
      type: "aabb",
      radius: 0.2,
      width: 0.8,
      height: 0.8,
      solid: !0
    },
    collisions: [],
    collisionLayer: {
      layer: X.Player
    },
    velocity: new k(0, 0),
    // TODO: Use movement speed to port old code.
    // FUTURE: Just change velocity with keys and let collision detection reconcile movement?
    // TODO: Not using right now. Main player settings should really be a base setting.
    movement: {
      speed: u.walkSpeed
      // walkSpeed: 0.15,
      // rotationSpeed: 0.12,
    },
    state: {
      // TODO: For the main player, we'll have to worry about this later. I'm more concerned with NPCs
      currentState: "todo"
    }
  };
  c.entityManager.add(A), (r.objects ?? []).forEach((C) => {
    const {
      transform: T,
      sprite: E,
      states: I,
      initialState: W,
      collider: H,
      collisionLayer: $,
      ai: N,
      movementSettings: R,
      actor: ne,
      interactionDirectives: B,
      bobbingMovement: Y,
      audioSource: U,
      playerInteractions: ae
    } = C;
    let D = {
      actor: ne,
      transform: {
        position: new k(T.position.x, T.position.y),
        // TODO: Deprecate roation if the math is more work
        direction: Me(T.rotation),
        height: T.height,
        elevation: T.elevation
      },
      velocity: new k(0, 0),
      spatialPartitioningSettings: {
        width: 0,
        gridLocations: /* @__PURE__ */ new Set()
      }
    };
    if (R && (D.movement = {
      speed: 0,
      settings: { ...R }
    }), H && (D.collider = { ...H }, D.collisions = []), $ && (D.collisionLayer = { ...$ }), N && (D.ai = { ...N }), U && (D.audioSource = { ...U }), Y && (D.bobbingMovement = {
      ...Y,
      startTime: Date.now()
    }), B && (D.interactionDirectives = [
      ...B
    ]), ae && (D.playerInteractions = {
      ...ae
    }), E) {
      D = {
        ...D,
        objectType: "object__static",
        sprite: { ...E }
      };
      const z = `${E.name}${E.directions === 0 ? "0" : "1"}`;
      D.spatialPartitioningSettings.width = g.getSpriteFrame(z).spriteSourceSize.w;
    } else {
      if (!I || !I.length || !W)
        throw new Error(
          "Animated Object is missing required state properties. Can not load"
        );
      const z = I.reduce((Q, J) => {
        const {
          name: q,
          animation: V,
          sound: he,
          height: ge,
          bobbingMovement: ue
        } = J, Le = {
          ...e.getAnimation(V),
          currentFrame: 0,
          timeSinceLastFrame: 0
        }, fe = {
          name: q,
          animation: {
            ...Le
          }
        };
        return he && (fe.sound = { ...he }), ue && (fe.bobbingMovement = { ...ue }), fe.height = ge ?? D.transform.height, Q[q] = fe, Q;
      }, {});
      D = {
        ...D,
        objectType: "object__animated",
        state: {
          currentState: W,
          previousState: null,
          initialState: W,
          lastStateChange: Date.now(),
          states: z
        }
      };
      for (const Q of I) {
        const J = e.getAnimation(Q.animation);
        if (J) {
          const { frames: q } = J;
          for (const V of q) {
            const { frameId: he, directions: ge } = V, ue = `${he}${ge === 0 ? "0" : "1"}`, _e = g.getSpriteFrame(ue);
            _e && (D.spatialPartitioningSettings.width = Math.max(
              D.spatialPartitioningSettings.width,
              _e.spriteSourceSize.w
            ));
          }
        }
      }
    }
    c.entityManager.add(D), i.updateObjectEntityGridTracking(D);
  });
  const G = {
    skybox: {
      surface: r.sky.type,
      texture: r.sky.texture
    }
  };
  c.entityManager.add(G);
  const v = re.getInstance(s.canvasId);
  if (c.systems.add(
    new Be(
      c,
      h,
      v,
      A,
      a
    )
  ), c.systems.add(new $e(c, h, i)), c.systems.add(new Qe(c)), c.systems.add(new _t(c, i)), c.systems.add(new Ke(c, h, i)), c.systems.add(new Ye(c, h, i)), c.systems.add(new Ue(c, h, i)), c.systems.add(
    new Re(i, h, A, s.width)
  ), c.systems.add(new ut(c, p, h)), c.systems.add(new qe(c, _, h, A)), c.systems.add(
    new Xe(
      n,
      l,
      c,
      o,
      p,
      g,
      i,
      h,
      A,
      G
    )
  ), c.systems.add(
    new ze(
      n,
      l,
      c,
      o,
      p,
      g,
      i,
      A,
      v,
      h
    )
  ), (P = (b = r.settings) == null ? void 0 : b.onLoad) != null && P.length)
    for (const C of r.settings.onLoad)
      h.emit(O.InteractionDirective, C);
  let L, M = Date.now();
  const F = () => {
    L = requestAnimationFrame(F);
    const C = Date.now(), T = C - M;
    T >= 1e3 / 60 && (M = C, c.update(T));
  };
  return F(), {
    levelName: t,
    unload: () => {
      cancelAnimationFrame(L), pe.Howler.stop();
    }
  };
}, yt = async (d, s = De) => {
  document.getElementById(
    s.canvasId
  ).getContext("2d", {
    willReadFrequently: !0
  });
  const r = d.wadSettings;
  let n = await Ie(d, s, r.firstMap);
  const l = async (c) => {
    const h = c.detail, { type: p } = h;
    if (p === Te.LoadLevel) {
      const _ = Object.keys(d.maps).filter((i) => i !== n.levelName), e = _[Math.floor(Math.random() * _.length)];
      n.unload(), n = await Ie(d, s, e);
    }
  };
  document.addEventListener(be.GameEvent, l);
};
export {
  yt as default
};
//# sourceMappingURL=raymarcher.mjs.map
