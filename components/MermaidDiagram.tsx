"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = "" }) => {
  const elementRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={elementRef}
      className={`mermaid-container bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl p-6 overflow-x-auto flex justify-center items-center ${className}`}
      style={{ textAlign: 'center' }}
    />
  );
};

export default MermaidDiagram;
