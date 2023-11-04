import React, { useEffect, useRef } from "react";
import { SVG } from "@svgdotjs/svg.js";
import { defineHex, Grid, rectangle } from "honeycomb-grid";

export class CustomHex extends defineHex({ dimensions: 20, origin: "topLeft" }) {}

const GameBoard: React.FC = () => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgContainerRef.current) {
      // Initialize the SVG drawing context
      const draw = SVG().addTo(svgContainerRef.current).size("100%", "100%");

      const grid = new Grid(CustomHex, rectangle({ width: 10, height: 10 }));

      // Render the SVG for each hex in the grid
      grid.forEach((hex) => {
        renderSVG(hex, draw);
      });
    }
  }, []);

  const renderSVG = (hex: CustomHex, draw: any) => {
    const polygon = draw
      .polygon(hex.corners.map(({ x, y }) => `${x},${y}`))
      .fill("none")
      .stroke({ width: 1, color: "#999" });
    draw.group().add(polygon);
  };

  return <div ref={svgContainerRef} style={{ width: "100%", height: "100%" }} />;
};

export default GameBoard;
