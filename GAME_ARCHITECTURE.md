# Game Architecture & Refactoring Guide

## Game Overview
This is a **Mindustry-inspired tower defense/base building game** built with Phaser 3.

### Core Gameplay
- **Player Ship**: WASD to move, mines resources, can fire bullets
- **Base (Core)**: 3x3 central structure you must protect
- **Building System**: 
  - Production (drills, graphite press, silicon smelter, alloy factory)
  - Transport (conveyors, routers, junctions, payload conveyors)
  - Units (miner constructor spawns drones)
  - Power (generators, batteries, power nodes)
  - Defense (turrets, walls, repair station)
  - Tools (delete tool)
- **Economy**: Resources = Copper, Lead, Coal, Titanium, Graphite, Alloy, Sand, Silicon
- **Enemies**: Wave-based spawning with different enemy types
- **Items**: Conveyor system transports resources between buildings

## File Structure (Current Issue)

### BEFORE (6673 lines in one file)
```
index.html (ALL code: HTML, CSS, JavaScript)
```

### AFTER (Modular Structure)
```
index.html (HTML structure only)
styles.css (All CSS)
constants.js (Game constants & configs)
utils.js (Utility functions)
buildings.js (Building definitions & placement logic)
player.js (Player ship logic)
enemies.js (Enemy definitions & spawning)
resources.js (Resource & inventory management)
spatial.js (Spatial grid & collision detection)
renderer.js (Drawing/rendering functions)
game.js (Main game controller & update loop)
```

## Performance Issues Found & Fixed

### Issue #1: Spatial Grid Freeze ✅ FIXED
**Problem**: `updateSpatialGrid()` was called EVERY FRAME (60 times/sec)
- Iterates through ALL enemies and buildings
- Rebuilds entire spatial hash grid from scratch
- With 200+ buildings and 50+ enemies, this causes massive lag

**Solution**: Update spatial grid only every 5 frames (12 times/sec instead of 60)
- Changed from: `updateSpatialGrid()` every frame
- Changed to: `updateSpatialGrid()` every 5 frames (counter-based)
- This is safe because enemies don't move that fast

**Code Change** (lines 3088-3090):
```javascript
// BEFORE: Heavy every-frame call
updateSpatialGrid();

// AFTER: Optimized 5-frame interval
if (!window.gridUpdateCounter) window.gridUpdateCounter = 0;
window.gridUpdateCounter++;
if (window.gridUpdateCounter >= 5) {
    updateSpatialGrid();
    window.gridUpdateCounter = 0;
}
```

## Recommended Next Steps

### Phase 1: Modularization (Extract code into separate files)
- [ ] Create constants.js - Game configuration & constants
- [ ] Create utils.js - Utility helper functions
- [ ] Create buildings.js - All building definitions (HUGE file)
- [ ] Create player.js - Player ship movement & logic
- [ ] Create enemies.js - Enemy types & AI
- [ ] Create resources.js - Resource management
- [ ] Create spatial.js - Spatial grid & collision
- [ ] Create renderer.js - All graphics drawing functions
- [ ] Create game.js - Main game controller

### Phase 2: Further Optimizations
- Lazy load building definitions only when needed
- Cache building color calculations
- Use object pooling for enemy/bullet creation
- Limit enemy count per wave
- Compress particle spawning logic
- Cache frequently accessed game state

## Current Game Systems

### Building Definitions (BUILDINGS object - ~2000+ lines)
Contains 28 building types with properties:
- cost, health, icon, description
- Special properties (range, damage, cooldown, powerUse, mineSpeed, etc.)

### Resource System
- 8 resource types tracked
- Conveyor system moves items between buildings
- Items use world coordinates for smooth movement
- Max 800 items on map for performance

### Power Grid System
- Generators produce power
- Batteries store power
- Power nodes distribute power
- Buildings consume power based on distance

### Miner System
- Spawned by miner-constructor building
- Pathfinding with collision avoidance
- Mine ore nodes and return to core
- Intelligent slot-based ore selection

### Enemy System
- Wave-based spawning (240s initial, decreasing)
- Multiple enemy types (basic, fast, shooter, sniper, artillery, tank, swarm, boss)
- Different behaviors and abilities
- Spawn from edges of map

### UI Systems
- Resource bar (top)
- Building selection bar (bottom with categories)
- Minimap
- FPS counter
- Tooltip system for building info
- Debug panel

## Key Metrics
- Map size: 200x150 tiles (6400 tiles)
- Max buildings: ~50-100+
- Max enemies: 50+ per wave
- Max items (resources): 800
- Max particles: 300
- Max miners: Spawned dynamically
