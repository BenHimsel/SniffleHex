import React, { useEffect, useRef } from "react";
import { SVG } from "@svgdotjs/svg.js";
import { defineHex, Grid, rectangle } from "honeycomb-grid";

export class CustomHex extends defineHex({ dimensions: 20, origin: "topLeft" }) {
  polygon: any;
  child: any;
}

const GameBoard: React.FC = () => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    svgContainerRef.current!.innerHTML = "";

    if (svgContainerRef.current) {
      const draw = SVG().addTo(svgContainerRef.current).size(500, 500);

      const grid = new Grid(CustomHex, rectangle({ width: 10, height: 10 }));

      svgContainerRef.current.addEventListener("click", ({ offsetX, offsetY }) => {
        const clickedHex = grid.pointToHex({ x: offsetX, y: offsetY }, { allowOutside: false });
        if (clickedHex) {
          console.log(clickedHex.q);
        }
      });

      grid.forEach((hex) => {
        renderSVG(hex, draw);
      });
    }
  }, []);

  const handleHexClick = (polygon: any, draw: any) => {
    const currentFill = polygon.attr("fill");
    const newFill = currentFill === "black" ? "#82EEFD" : "black";
    polygon.fill(newFill);
  };

  const renderSVG = (hex: CustomHex, draw: any) => {
    const points = hex.corners.map(({ x, y }) => `${x},${y}`).join(" ");
    const polygon = draw
      .polygon(points)
      .fill("black")
      .stroke({ width: 1, color: "#999" })
      .click(() => handleHexClick(polygon, draw));

    hex.polygon = polygon;
  };

  return (
    <>
      <div ref={svgContainerRef} className="h-full mx-auto justify-center items-center" />
    </>
  );
};

export default GameBoard;
