// Terrain generation functions
function generateWalls(seed, terrainMap, MAP_WIDTH, MAP_HEIGHT, TERRAIN) {
    // Generate mountain rock formations
    const mountainCount = 5 + Math.floor(Math.random() * 4); // 5-9 mountain ranges
    const cx = Math.floor(MAP_WIDTH / 2);
    const cy = Math.floor(MAP_HEIGHT / 2);

    for (let m = 0; m < mountainCount; m++) {
        // Mountain center - avoid core
        let centerX, centerY;
        let attempts = 0;
        do {
            centerX = 15 + Math.floor(Math.random() * (MAP_WIDTH - 30));
            centerY = 15 + Math.floor(Math.random() * (MAP_HEIGHT - 30));
            attempts++;
        } while (Math.abs(centerX - cx) < 20 && Math.abs(centerY - cy) < 20 && attempts < 30);

        if (attempts >= 30) continue;

        // Mountain size and shape
        const baseRadius = 8 + Math.floor(Math.random() * 8); // 8-16 tiles radius
        const elongation = 0.5 + Math.random() * 1.5; // Stretch factor
        const rotation = Math.random() * Math.PI;

        // Generate mountain using irregular circle with noise
        for (let dy = -baseRadius * 2; dy <= baseRadius * 2; dy++) {
            for (let dx = -baseRadius * 2; dx <= baseRadius * 2; dx++) {
                const wx = centerX + dx;
                const wy = centerY + dy;

                if (wx < 5 || wx >= MAP_WIDTH - 5 || wy < 5 || wy >= MAP_HEIGHT - 5) continue;
                if (terrainMap[wy][wx] === TERRAIN.WATER) continue;

                // Rotate point
                const rotX = dx * Math.cos(rotation) - dy * Math.sin(rotation);
                const rotY = dx * Math.sin(rotation) + dy * Math.cos(rotation);

                // Apply elongation
                const normX = rotX / baseRadius;
                const normY = rotY / (baseRadius * elongation);
                const dist = Math.sqrt(normX * normX + normY * normY);

                // Add noise for organic edge
                const noiseVal = Math.sin(wx * 0.3 + wy * 0.2) * 0.3 +
                                Math.cos(wx * 0.2 - wy * 0.3) * 0.2;
                const threshold = 1.0 + noiseVal;

                // Place rock based on distance with falloff
                if (dist < threshold) {
                    const density = 1 - (dist / threshold);
                    if (Math.random() < density * 0.85) {
                        terrainMap[wy][wx] = TERRAIN.WALL;
                    }
                }
            }
        }
    }
}
