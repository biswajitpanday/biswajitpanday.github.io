"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { FaSearchPlus, FaSearchMinus, FaUndo } from "react-icons/fa";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = "" }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      themeVariables: {
        primaryColor: "#00BFFF",
        primaryTextColor: "#fff",
        primaryBorderColor: "#00BFFF",
        lineColor: "#00BFFF",
        secondaryColor: "#4CAF50",
        tertiaryColor: "#FF9800",
        background: "#1c1c22",
        mainBkg: "#27272c",
        secondBkg: "#2a2a30",
        mainContrastColor: "#fff",
        darkMode: true,
        fontFamily: "JetBrains Mono, monospace",
      },
      flowchart: {
        nodeSpacing: 30,
        rankSpacing: 40,
        padding: 10,
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis"
      }
    });

    // Render the chart
    if (elementRef.current) {
      // Generate unique ID for this diagram
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      // Clear previous content
      elementRef.current.innerHTML = "";

      // Create a div for the diagram
      const diagramDiv = document.createElement("div");
      diagramDiv.className = "mermaid";
      diagramDiv.innerHTML = chart;
      elementRef.current.appendChild(diagramDiv);

      // Render with mermaid
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className={`relative ${className}`}>
      {/* Zoom Controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm rounded-lg p-1 border border-purple-500/30">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="p-2 rounded-md hover:bg-purple-500/20 text-white/70 hover:text-purple-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-label="Zoom out"
          title={`Zoom out (${Math.round(zoom * 100)}%)`}
        >
          <FaSearchMinus className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        <span className="text-xs text-white/60 min-w-[40px] text-center font-mono">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="p-2 rounded-md hover:bg-purple-500/20 text-white/70 hover:text-purple-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-label="Zoom in"
          title={`Zoom in (${Math.round(zoom * 100)}%)`}
        >
          <FaSearchPlus className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        {zoom !== 1 && (
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-md hover:bg-purple-500/20 text-white/70 hover:text-purple-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 border-l border-purple-500/20 ml-1"
            aria-label="Reset zoom"
            title="Reset zoom to 100%"
          >
            <FaUndo className="w-3 h-3" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Diagram Container */}
      <div
        className="mermaid-container bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl p-6 pt-14 overflow-auto flex justify-center items-center"
        style={{ textAlign: 'center' }}
      >
        <div
          ref={elementRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out'
          }}
        />
      </div>
    </div>
  );
};

export default MermaidDiagram;
