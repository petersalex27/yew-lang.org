import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import ReactSlider from 'react-slider';

const MapWithTimeline: React.FC = () => {
    const [year, setYear] = useState<number>(2000);
    const [worldData, setWorldData] = useState<any>(null);
    const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        d3.json('https://unpkg.com/world-atlas@1/world/110m.json').then((world) => {
            console.log('World Data:', world);
            setWorldData(world);
        }).catch((error) => {
            console.error('Error loading map data:', error);
        });
    }, []);

    useEffect(() => {
        if (worldData) {
            renderMap();
        }
    }, [worldData, year, rotation]); // Added rotation as a dependency

    const renderMap = () => {
        console.log('Rendering map for year:', year);
        const svg = d3.select('#map');
        svg.selectAll('*').remove(); // Clear previous render

        const width = 960;
        const height = 500;
        const projection = d3.geoOrthographic()
            .scale(250)
            .translate([width / 2, height / 2])
            .rotate(rotation); // Use the stored rotation

        const path = d3.geoPath().projection(projection);

        const land = topojson.feature(worldData, worldData.objects.land).features;

        const graticule = d3.geoGraticule();

        svg.append('path')
            .datum(graticule)
            .attr('class', 'graticule')
            .attr('d', path)
            .attr('fill', 'none')
            .attr('stroke', '#ccc');

        svg.append('g')
            .selectAll('path')
            .data(land)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#ccc')
            .attr('stroke', '#fff');

        // Placeholder for major events (example coordinates)
        const markerCoordinates: [number, number] = [-77.0369, 38.9072]; // Washington, D.C.

        const marker = svg.append('circle')
            .attr('cx', (projection(markerCoordinates) as [number, number])[0])
            .attr('cy', (projection(markerCoordinates) as [number, number])[1])
            .attr('r', 5)
            .attr('fill', 'red')
            .attr('stroke', 'black');

        const drag = d3.drag()
            .subject(function() {
                const r = projection.rotate();
                return { x: r[0] / sens, y: -r[1] / sens };
            })
            .on('drag', function(event) {
                const rotate = projection.rotate();
                projection.rotate([event.x * sens, -event.y * sens, rotate[2]]);
                path.projection(projection);
                svg.selectAll('path').attr('d', path);
                svg.selectAll('.graticule').attr('d', path);
                marker
                    .attr('cx', (projection(markerCoordinates) as [number, number])[0])
                    .attr('cy', (projection(markerCoordinates) as [number, number])[1]);
                setRotation(projection.rotate()); // Update the rotation state
            });

        const sens = 0.25;

        svg.call(drag);
    };

    const updateSidebar = () => {
        if (year === 2015) {
            return (
                <>
                    <h2 className="text-xl font-bold">2015</h2>
                    <p>Obergefell v. Hodges: Supreme Court ruling legalizing same-sex marriage nationwide.</p>
                </>
            );
        }
        // Add more conditions for other years/events
        return null;
    };

    return (
        <div className="relative">
            <svg id="map" className="mx-auto w-full h-96"></svg>
            <div className="my-4">
                <ReactSlider
                    className="w-4/5 mx-auto h-6"
                    thumbClassName="bg-black h-6 w-6 cursor-grab"
                    trackClassName="bg-gray-300 h-1"
                    min={2000}
                    max={2024}
                    value={year}
                    onChange={(value) => setYear(value as number)}
                />
            </div>
            <div className="absolute top-4 right-4 w-72 bg-white p-4 border rounded shadow-lg">
                {updateSidebar()}
            </div>
        </div>
    );
};

export default MapWithTimeline;