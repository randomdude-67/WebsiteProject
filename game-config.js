// ============================================
// GAME CONFIGURATION - Centralized Settings
// ============================================
const CONFIG = {
    // Map settings
    TILE_SIZE: 32,
    MAP_WIDTH: 200,
    MAP_HEIGHT: 150,

    // Player settings
    PLAYER: {
        SPEED: 5,
        HEALTH: 100,
        FIRE_COOLDOWN_MAX: 350,
        BULLET_SPEED: 10,
        BULLET_DAMAGE: 8,
        RESPAWN_TIME: 3000,
        INVULNERABLE_TIME: 2000
    },

    // Item/Resource settings
    ITEM_SPEED: 1.5,
    MAX_ITEMS: 800,
    MAX_PARTICLES: 300,

    // Collision/Detection
    GRID_CELL_SIZE: 32 * 4,  // 4 tiles per cell
    MAX_MINERS_PER_NODE: 3,

    // Mining/Production
    DRILL_SPEED_BONUS_PER_ORE: 0.25,
    MINING_DAMAGE_PER_FRAME: 0.1,
    MINER_MINING_COOLDOWN: 800,
    MINER_BASE_SPEED: 2.5,
    MINER_RETURN_SPEED: 3.5,
    MINER_INTERACTION_DISTANCE: 1.5,
    MINER_MINING_DISTANCE: 1.5,
    MINER_COLLISION_RADIUS: 14,
    MINER_AVOIDANCE_RADIUS: 14 * 4,
    MINER_HEALTH: 50,
    MINER_MAX_INVENTORY: 30,

    // Wave/Spawning
    FIRST_WAVE_TIMER: 240,
    WAVE_INTERVAL: 120,

    // Camera/Zoom
    MIN_ZOOM: 0.3,
    MAX_ZOOM: 2.0,
    ZOOM_SPEED: 0.1,

    // Performance
    MAX_BULLETS: 80,
    MAX_PLAYER_BULLETS: 50
};

// Terrain types
const TERRAIN = {
    GRASS: 0,
    SAND: 1,
    WATER: 2,
    STONE: 3,
    DARK_STONE: 4,
    WALL: 5
};

const TILE_SIZE = CONFIG.TILE_SIZE;
const MAP_WIDTH = CONFIG.MAP_WIDTH;
const MAP_HEIGHT = CONFIG.MAP_HEIGHT;
