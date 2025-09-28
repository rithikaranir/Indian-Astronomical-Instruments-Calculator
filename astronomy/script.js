// Indian Astronomical Instruments Calculator
class YantraCalculator {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Calculate button
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculateDimensions();
        });

        // Preset location buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lat = parseFloat(e.target.dataset.lat);
                const lon = parseFloat(e.target.dataset.lon);
                document.getElementById('latitude').value = lat;
                document.getElementById('longitude').value = lon;
                this.calculateDimensions();
            });
        });

        // Enter key support
        document.getElementById('latitude').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculateDimensions();
        });
        document.getElementById('longitude').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculateDimensions();
        });
    }

    calculateDimensions() {
        this.latitude = parseFloat(document.getElementById('latitude').value);
        this.longitude = parseFloat(document.getElementById('longitude').value);

        if (isNaN(this.latitude) || isNaN(this.longitude)) {
            alert('Please enter valid latitude and longitude values.');
            return;
        }

        if (this.latitude < -90 || this.latitude > 90) {
            alert('Latitude must be between -90 and 90 degrees.');
            return;
        }

        if (this.longitude < -180 || this.longitude > 180) {
            alert('Longitude must be between -180 and 180 degrees.');
            return;
        }

        this.showLoading();
        setTimeout(() => {
            this.generateResults();
            this.hideLoading();
        }, 1000);
    }

    showLoading() {
        const btn = document.getElementById('calculateBtn');
        btn.innerHTML = '<span class="loading"></span> Calculating...';
        btn.disabled = true;
    }

    hideLoading() {
        const btn = document.getElementById('calculateBtn');
        btn.innerHTML = '<i class="fas fa-calculator"></i> Calculate Dimensions';
        btn.disabled = false;
    }

    generateResults() {
        const resultsSection = document.getElementById('resultsSection');
        const yantraGrid = document.getElementById('yantraGrid');
        
        resultsSection.style.display = 'block';
        resultsSection.classList.add('success-animation');
        
        yantraGrid.innerHTML = '';

        // Generate all yantra calculations
        const yantras = [
            this.calculateSamratYantra(),
            this.calculateRamaYantra(),
            this.calculateDigamsaYantra(),
            this.calculateDhruvaProthaChakraYantra(),
            this.calculateGolayantraChakraYantra(),
            this.calculateBhittiYantra(),
            this.calculateDakshinottaraBhittiYantra(),
            this.calculateRasivalayaYantra(),
            this.calculateNadiValayaYantra(),
            this.calculatePalakaYantra(),
            this.calculateChaapaYantra()
        ];

        yantras.forEach(yantra => {
            yantraGrid.appendChild(this.createYantraCard(yantra));
        });

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    createYantraCard(yantra) {
        const card = document.createElement('div');
        card.className = 'yantra-card';
        
        card.innerHTML = `
            <h3><i class="${yantra.icon}"></i> ${yantra.name}</h3>
            <div class="yantra-visualization">
                ${yantra.visualization}
            </div>
            <div class="dimensions">
                ${yantra.dimensions.map(dim => `
                    <div class="dimension-item">
                        <span class="dimension-label">${dim.label}</span>
                        <span class="dimension-value">${dim.value}</span>
                    </div>
                `).join('')}
            </div>
            <div class="description">
                <p><strong>Purpose:</strong> ${yantra.purpose}</p>
                <p><strong>Key Features:</strong> ${yantra.features}</p>
            </div>
        `;
        
        return card;
    }

    // Visualization helper methods
    createSamratYantraSVG(gnomonHeight, quadrantRadius) {
        const scale = 0.3;
        const centerX = 100;
        const centerY = 100;
        
        return `
            <svg width="200" height="150" viewBox="0 0 200 150" class="yantra-svg">
                <!-- Base quadrant -->
                <path d="M ${centerX} ${centerY} L ${centerX + quadrantRadius * scale} ${centerY} A ${quadrantRadius * scale} ${quadrantRadius * scale} 0 0 0 ${centerX} ${centerY - quadrantRadius * scale} Z" 
                      fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
                
                <!-- Gnomon -->
                <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - gnomonHeight * scale}" 
                      stroke="#667eea" stroke-width="3"/>
                
                <!-- Hour lines -->
                ${Array.from({length: 6}, (_, i) => {
                    const angle = (i + 1) * 15 * Math.PI / 180;
                    const x = centerX + Math.sin(angle) * quadrantRadius * scale;
                    const y = centerY - Math.cos(angle) * quadrantRadius * scale;
                    return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#a0aec0" stroke-width="1"/>`;
                }).join('')}
                
                <!-- Labels -->
                <text x="${centerX}" y="${centerY + 15}" text-anchor="middle" font-size="10" fill="#4a5568">Base</text>
                <text x="${centerX - 5}" y="${centerY - gnomonHeight * scale - 5}" font-size="10" fill="#667eea">Gnomon</text>
            </svg>
        `;
    }

    createRamaYantraSVG(cylinderRadius, cylinderHeight) {
        const scale = 0.4;
        const centerX = 100;
        const centerY = 75;
        
        return `
            <svg width="200" height="150" viewBox="0 0 200 150" class="yantra-svg">
                <!-- Cylinder base -->
                <ellipse cx="${centerX}" cy="${centerY + cylinderHeight * scale}" 
                         rx="${cylinderRadius * scale}" ry="${cylinderRadius * scale * 0.3}" 
                         fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
                
                <!-- Cylinder body -->
                <rect x="${centerX - cylinderRadius * scale}" y="${centerY - cylinderHeight * scale}" 
                      width="${cylinderRadius * scale * 2}" height="${cylinderHeight * scale}" 
                      fill="none" stroke="#4a5568" stroke-width="2"/>
                
                <!-- Scale markings -->
                ${Array.from({length: 8}, (_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const x1 = centerX + Math.cos(angle) * cylinderRadius * scale;
                    const y1 = centerY + Math.sin(angle) * cylinderRadius * scale;
                    const x2 = centerX + Math.cos(angle) * (cylinderRadius * scale + 10);
                    const y2 = centerY + Math.sin(angle) * (cylinderRadius * scale + 10);
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a0aec0" stroke-width="1"/>`;
                }).join('')}
                
                <!-- Labels -->
                <text x="${centerX}" y="${centerY + cylinderHeight * scale + 20}" text-anchor="middle" font-size="10" fill="#4a5568">Rama Yantra</text>
            </svg>
        `;
    }

    createDigamsaYantraSVG(centralPillarHeight, outerRadius) {
        const scale = 0.3;
        const centerX = 100;
        const centerY = 100;
        
        return `
            <svg width="200" height="150" viewBox="0 0 200 150" class="yantra-svg">
                <!-- Central pillar -->
                <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - centralPillarHeight * scale}" 
                      stroke="#667eea" stroke-width="4"/>
                
                <!-- Concentric circles -->
                ${Array.from({length: 3}, (_, i) => {
                    const radius = (i + 1) * outerRadius * scale / 3;
                    return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="#4a5568" stroke-width="1"/>`;
                }).join('')}
                
                <!-- Azimuth markers -->
                ${Array.from({length: 8}, (_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const x = centerX + Math.cos(angle) * outerRadius * scale;
                    const y = centerY - Math.sin(angle) * outerRadius * scale;
                    return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#a0aec0" stroke-width="1"/>`;
                }).join('')}
                
                <!-- Labels -->
                <text x="${centerX}" y="${centerY + 20}" text-anchor="middle" font-size="10" fill="#4a5568">Digamsa Yantra</text>
            </svg>
        `;
    }

    createSimpleYantraSVG(type, height, radius) {
        const scale = 0.3;
        const centerX = 100;
        const centerY = 100;
        
        let svgContent = '';
        
        switch(type) {
            case 'compass':
                svgContent = `
                    <circle cx="${centerX}" cy="${centerY}" r="${radius * scale}" fill="none" stroke="#4a5568" stroke-width="2"/>
                    <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - height * scale}" stroke="#667eea" stroke-width="3"/>
                    ${Array.from({length: 8}, (_, i) => {
                        const angle = (i * 45) * Math.PI / 180;
                        const x = centerX + Math.cos(angle) * radius * scale;
                        const y = centerY - Math.sin(angle) * radius * scale;
                        return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#a0aec0" stroke-width="1"/>`;
                    }).join('')}
                `;
                break;
            case 'sphere':
                svgContent = `
                    <circle cx="${centerX}" cy="${centerY}" r="${radius * scale}" fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
                    <line x1="${centerX - radius * scale}" y1="${centerY}" x2="${centerX + radius * scale}" y2="${centerY}" stroke="#667eea" stroke-width="2"/>
                    <line x1="${centerX}" y1="${centerY - radius * scale}" x2="${centerX}" y2="${centerY + radius * scale}" stroke="#667eea" stroke-width="2"/>
                `;
                break;
            case 'wall':
                svgContent = `
                    <rect x="${centerX - 20}" y="${centerY - height * scale}" width="40" height="${height * scale}" fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
                    <line x1="${centerX}" y1="${centerY}" x2="${centerX + radius * scale}" y2="${centerY}" stroke="#667eea" stroke-width="3"/>
                `;
                break;
            case 'cone':
                svgContent = `
                    <path d="M ${centerX} ${centerY} L ${centerX - radius * scale} ${centerY + height * scale} L ${centerX + radius * scale} ${centerY + height * scale} Z" 
                          fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
                `;
                break;
            case 'ring':
                svgContent = `
                    <circle cx="${centerX}" cy="${centerY}" r="${radius * scale}" fill="none" stroke="#4a5568" stroke-width="4"/>
                    <circle cx="${centerX}" cy="${centerY}" r="${(radius - 5) * scale}" fill="none" stroke="#667eea" stroke-width="2"/>
                `;
                break;
            case 'plate':
                svgContent = `
                    <circle cx="${centerX}" cy="${centerY}" r="${radius * scale}" fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
                    <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - height * scale}" stroke="#667eea" stroke-width="3"/>
                `;
                break;
            case 'arc':
                svgContent = `
                    <path d="M ${centerX - radius * scale} ${centerY} A ${radius * scale} ${radius * scale} 0 0 1 ${centerX + radius * scale} ${centerY}" 
                          fill="none" stroke="#4a5568" stroke-width="3"/>
                    <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - height * scale}" stroke="#667eea" stroke-width="3"/>
                `;
                break;
        }
        
        return `
            <svg width="200" height="150" viewBox="0 0 200 150" class="yantra-svg">
                ${svgContent}
            </svg>
        `;
    }

    // Mathematical calculations for each yantra
    calculateSamratYantra() {
        const phi = this.latitude * Math.PI / 180;
        const gnomonHeight = 100; // Base height in cm
        const gnomonAngle = this.latitude;
        const quadrantRadius = gnomonHeight * Math.tan(phi);
        const hourLineSpacing = gnomonHeight * Math.sin(phi) / 12;
        
        return {
            name: 'Samrat Yantra (Sundial)',
            icon: 'fas fa-sun',
            purpose: 'Time measurement using shadow of gnomon',
            features: 'Equatorial sundial with inclined gnomon',
            visualization: this.createSamratYantraSVG(gnomonHeight, quadrantRadius),
            dimensions: [
                { label: 'Gnomon Height', value: `${gnomonHeight.toFixed(1)} cm` },
                { label: 'Gnomon Angle', value: `${gnomonAngle.toFixed(1)}°` },
                { label: 'Quadrant Radius', value: `${quadrantRadius.toFixed(1)} cm` },
                { label: 'Hour Line Spacing', value: `${hourLineSpacing.toFixed(1)} cm` },
                { label: 'Base Length', value: `${(gnomonHeight * 2).toFixed(1)} cm` }
            ]
        };
    }

    calculateRamaYantra() {
        const phi = this.latitude * Math.PI / 180;
        const cylinderRadius = 50; // Base radius in cm
        const cylinderHeight = cylinderRadius * Math.tan(phi);
        const scaleDivisions = 360; // degrees
        const altitudeScale = Math.sin(phi) * 100;
        
        return {
            name: 'Rama Yantra',
            icon: 'fas fa-circle',
            purpose: 'Measurement of altitude and azimuth of celestial objects',
            features: 'Cylindrical structure with graduated scales',
            visualization: this.createRamaYantraSVG(cylinderRadius, cylinderHeight),
            dimensions: [
                { label: 'Cylinder Radius', value: `${cylinderRadius.toFixed(1)} cm` },
                { label: 'Cylinder Height', value: `${cylinderHeight.toFixed(1)} cm` },
                { label: 'Scale Divisions', value: `${scaleDivisions} divisions` },
                { label: 'Altitude Scale Factor', value: `${altitudeScale.toFixed(1)}` },
                { label: 'Azimuth Range', value: '0° - 360°' }
            ]
        };
    }

    calculateDigamsaYantra() {
        const phi = this.latitude * Math.PI / 180;
        const centralPillarHeight = 60; // cm
        const outerRadius = centralPillarHeight * Math.tan(phi);
        const concentricCircles = Math.floor(outerRadius / 10);
        const azimuthMarkers = 24; // 15-degree intervals
        
        return {
            name: 'Digamsa Yantra',
            icon: 'fas fa-bullseye',
            purpose: 'Measurement of azimuth angles',
            features: 'Central pillar with concentric circles',
            visualization: this.createDigamsaYantraSVG(centralPillarHeight, outerRadius),
            dimensions: [
                { label: 'Central Pillar Height', value: `${centralPillarHeight.toFixed(1)} cm` },
                { label: 'Outer Radius', value: `${outerRadius.toFixed(1)} cm` },
                { label: 'Concentric Circles', value: `${concentricCircles} circles` },
                { label: 'Azimuth Markers', value: `${azimuthMarkers} markers` },
                { label: 'Marker Spacing', value: '15° intervals' }
            ]
        };
    }

    calculateDhruvaProthaChakraYantra() {
        const phi = this.latitude * Math.PI / 180;
        const poleHeight = 80; // cm
        const wheelRadius = poleHeight * Math.tan(phi);
        const degreeMarkings = 360;
        const hourMarkings = 24;
        
        return {
            name: 'Dhruva-Protha-Chakra Yantra',
            icon: 'fas fa-compass',
            purpose: 'Measurement of celestial coordinates and time',
            features: 'Polar axis with graduated wheel',
            visualization: this.createSimpleYantraSVG('compass', poleHeight, wheelRadius),
            dimensions: [
                { label: 'Pole Height', value: `${poleHeight.toFixed(1)} cm` },
                { label: 'Wheel Radius', value: `${wheelRadius.toFixed(1)} cm` },
                { label: 'Degree Markings', value: `${degreeMarkings} divisions` },
                { label: 'Hour Markings', value: `${hourMarkings} divisions` },
                { label: 'Polar Angle', value: `${this.latitude.toFixed(1)}°` }
            ]
        };
    }

    calculateGolayantraChakraYantra() {
        const phi = this.latitude * Math.PI / 180;
        const sphereRadius = 40; // cm
        const meridianHeight = sphereRadius * Math.sin(phi);
        const equatorialRadius = sphereRadius * Math.cos(phi);
        const hourAngleSpacing = 15; // degrees
        
        return {
            name: 'Golayantra Chakra Yantra',
            icon: 'fas fa-globe',
            purpose: 'Spherical astronomical calculations',
            features: 'Spherical model with meridian and equatorial circles',
            visualization: this.createSimpleYantraSVG('sphere', meridianHeight, sphereRadius),
            dimensions: [
                { label: 'Sphere Radius', value: `${sphereRadius.toFixed(1)} cm` },
                { label: 'Meridian Height', value: `${meridianHeight.toFixed(1)} cm` },
                { label: 'Equatorial Radius', value: `${equatorialRadius.toFixed(1)} cm` },
                { label: 'Hour Angle Spacing', value: `${hourAngleSpacing}°` },
                { label: 'Polar Axis Length', value: `${(sphereRadius * 2).toFixed(1)} cm` }
            ]
        };
    }

    calculateBhittiYantra() {
        const phi = this.latitude * Math.PI / 180;
        const wallHeight = 120; // cm
        const gnomonLength = wallHeight * Math.tan(phi);
        const shadowScale = Math.sin(phi);
        const timeMarkers = 12;
        
        return {
            name: 'Bhitti Yantra',
            icon: 'fas fa-wall-brick',
            purpose: 'Wall-mounted sundial for time measurement',
            features: 'Vertical wall with horizontal gnomon',
            visualization: this.createSimpleYantraSVG('wall', wallHeight, gnomonLength),
            dimensions: [
                { label: 'Wall Height', value: `${wallHeight.toFixed(1)} cm` },
                { label: 'Gnomon Length', value: `${gnomonLength.toFixed(1)} cm` },
                { label: 'Shadow Scale Factor', value: `${shadowScale.toFixed(3)}` },
                { label: 'Time Markers', value: `${timeMarkers} markers` },
                { label: 'Gnomon Angle', value: `${this.latitude.toFixed(1)}°` }
            ]
        };
    }

    calculateDakshinottaraBhittiYantra() {
        const phi = this.latitude * Math.PI / 180;
        const wallLength = 100; // cm
        const gnomonHeight = wallLength * Math.tan(phi);
        const meridianLine = wallLength * Math.sin(phi);
        const hourLines = 12;
        
        return {
            name: 'Dakshinottara Bhitti Yantra',
            icon: 'fas fa-arrows-alt-v',
            purpose: 'North-South wall sundial',
            features: 'Meridian line with hour markers',
            visualization: this.createSimpleYantraSVG('wall', gnomonHeight, wallLength),
            dimensions: [
                { label: 'Wall Length', value: `${wallLength.toFixed(1)} cm` },
                { label: 'Gnomon Height', value: `${gnomonHeight.toFixed(1)} cm` },
                { label: 'Meridian Line Length', value: `${meridianLine.toFixed(1)} cm` },
                { label: 'Hour Lines', value: `${hourLines} lines` },
                { label: 'Orientation', value: 'North-South' }
            ]
        };
    }

    calculateRasivalayaYantra() {
        const phi = this.latitude * Math.PI / 180;
        const baseRadius = 30; // cm
        const coneHeight = baseRadius * Math.tan(phi);
        const zodiacMarkers = 12;
        const degreeSpacing = 30; // degrees per zodiac sign
        
        return {
            name: 'Rasivalaya Yantra',
            icon: 'fas fa-mountain',
            purpose: 'Zodiac and constellation measurements',
            features: 'Conical structure with zodiac markings',
            visualization: this.createSimpleYantraSVG('cone', coneHeight, baseRadius),
            dimensions: [
                { label: 'Base Radius', value: `${baseRadius.toFixed(1)} cm` },
                { label: 'Cone Height', value: `${coneHeight.toFixed(1)} cm` },
                { label: 'Zodiac Markers', value: `${zodiacMarkers} markers` },
                { label: 'Degree Spacing', value: `${degreeSpacing}° per sign` },
                { label: 'Cone Angle', value: `${this.latitude.toFixed(1)}°` }
            ]
        };
    }

    calculateNadiValayaYantra() {
        const phi = this.latitude * Math.PI / 180;
        const ringRadius = 25; // cm
        const ringThickness = 5; // cm
        const degreeMarkings = 360;
        const hourMarkings = 24;
        
        return {
            name: 'Nadi Valaya Yantra',
            icon: 'fas fa-ring',
            purpose: 'Ring-based astronomical measurements',
            features: 'Circular ring with graduated markings',
            visualization: this.createSimpleYantraSVG('ring', ringThickness, ringRadius),
            dimensions: [
                { label: 'Ring Radius', value: `${ringRadius.toFixed(1)} cm` },
                { label: 'Ring Thickness', value: `${ringThickness.toFixed(1)} cm` },
                { label: 'Degree Markings', value: `${degreeMarkings} divisions` },
                { label: 'Hour Markings', value: `${hourMarkings} divisions` },
                { label: 'Inclination Angle', value: `${this.latitude.toFixed(1)}°` }
            ]
        };
    }

    calculatePalakaYantra() {
        const phi = this.latitude * Math.PI / 180;
        const plateSize = 60; // cm
        const gnomonHeight = plateSize * Math.tan(phi);
        const shadowLength = gnomonHeight / Math.tan(phi);
        const timeScale = 12;
        
        return {
            name: 'Palaka Yantra',
            icon: 'fas fa-circle-notch',
            purpose: 'Plate-based sundial measurements',
            features: 'Circular plate with central gnomon',
            visualization: this.createSimpleYantraSVG('plate', gnomonHeight, plateSize/2),
            dimensions: [
                { label: 'Plate Diameter', value: `${plateSize.toFixed(1)} cm` },
                { label: 'Gnomon Height', value: `${gnomonHeight.toFixed(1)} cm` },
                { label: 'Shadow Length (Noon)', value: `${shadowLength.toFixed(1)} cm` },
                { label: 'Time Scale', value: `${timeScale} divisions` },
                { label: 'Plate Angle', value: `${this.latitude.toFixed(1)}°` }
            ]
        };
    }

    calculateChaapaYantra() {
        const phi = this.latitude * Math.PI / 180;
        const arcRadius = 40; // cm
        const arcAngle = 90; // degrees
        const degreeMarkings = 90;
        const altitudeScale = Math.sin(phi) * 100;
        
        return {
            name: 'Chaapa Yantra',
            icon: 'fas fa-arc',
            purpose: 'Arc-based altitude measurements',
            features: 'Semicircular arc with altitude markings',
            visualization: this.createSimpleYantraSVG('arc', arcRadius, arcRadius),
            dimensions: [
                { label: 'Arc Radius', value: `${arcRadius.toFixed(1)} cm` },
                { label: 'Arc Angle', value: `${arcAngle}°` },
                { label: 'Degree Markings', value: `${degreeMarkings} divisions` },
                { label: 'Altitude Scale', value: `${altitudeScale.toFixed(1)}` },
                { label: 'Arc Inclination', value: `${this.latitude.toFixed(1)}°` }
            ]
        };
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new YantraCalculator();
});
