"use client";

import { useRef, useState } from "react";

type DoorModel = {
  id: string;
  name: string;
  description: string;
  svg: (color: string) => React.ReactNode;
};

const DOOR_MODELS: DoorModel[] = [
  {
    id: "classique",
    name: "Classique",
    description: "Panneaux horizontaux unis — intemporel",
    svg: (color: string) => (
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="0" y="0" width="200" height="220" fill={color} stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="6" y={6 + i * 42} width="188" height="38" fill="none" stroke="#00000025" strokeWidth="1.5" rx="2" />
        ))}
      </svg>
    ),
  },
  {
    id: "carriage",
    name: "Carriage House",
    description: "Style écurie champêtre avec fenêtres",
    svg: (color: string) => (
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="0" y="0" width="200" height="220" fill={color} stroke="#3a2a1a" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" y1={44 + i * 44} x2="200" y2={44 + i * 44} stroke="#00000033" strokeWidth="1.5" />
        ))}
        <line x1="100" y1="0" x2="100" y2="220" stroke="#00000033" strokeWidth="1.5" />
        {/* Windows top row */}
        <rect x="20" y="12" width="24" height="24" fill="#b8d8f0" stroke="#3a2a1a" strokeWidth="1" />
        <rect x="52" y="12" width="24" height="24" fill="#b8d8f0" stroke="#3a2a1a" strokeWidth="1" />
        <rect x="124" y="12" width="24" height="24" fill="#b8d8f0" stroke="#3a2a1a" strokeWidth="1" />
        <rect x="156" y="12" width="24" height="24" fill="#b8d8f0" stroke="#3a2a1a" strokeWidth="1" />
        {/* Hinges */}
        <rect x="6" y="60" width="8" height="20" fill="#222" />
        <rect x="186" y="60" width="8" height="20" fill="#222" />
        <rect x="6" y="140" width="8" height="20" fill="#222" />
        <rect x="186" y="140" width="8" height="20" fill="#222" />
      </svg>
    ),
  },
  {
    id: "moderne",
    name: "Moderne",
    description: "Lignes épurées avec hublots horizontaux",
    svg: (color: string) => (
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="0" y="0" width="200" height="220" fill={color} stroke="#222" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="6" y={6 + i * 42} width="188" height="38" fill="none" stroke="#00000030" strokeWidth="1" rx="1" />
        ))}
        {/* Row of small windows near top */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={20 + i * 44} y="18" width="28" height="14" fill="#d0e4f0" stroke="#222" strokeWidth="1" rx="1" />
        ))}
      </svg>
    ),
  },
  {
    id: "contemporain",
    name: "Contemporain",
    description: "Vitrage intégral pour un look premium",
    svg: (color: string) => (
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="0" y="0" width="200" height="220" fill={color} stroke="#1a1a1a" strokeWidth="2" />
        {/* Grid of frosted windows */}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={12 + col * 46}
              y={10 + row * 42}
              width="40"
              height="36"
              fill="#e8f0f5"
              fillOpacity="0.85"
              stroke="#1a1a1a"
              strokeWidth="1"
              rx="1"
            />
          ))
        )}
      </svg>
    ),
  },
];

const DOOR_COLORS = [
  { id: "blanc", label: "Blanc", value: "#f5f5f5" },
  { id: "sable", label: "Sable", value: "#d4c4a8" },
  { id: "brun", label: "Brun", value: "#5a3d28" },
  { id: "noir", label: "Noir", value: "#1a1a1a" },
  { id: "rouge", label: "Rouge", value: "#8b1a1a" },
  { id: "vert", label: "Vert forêt", value: "#2d4a2b" },
];

export default function ImageMaisonVisualizer() {
  const [houseImage, setHouseImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("classique");
  const [selectedColor, setSelectedColor] = useState<string>("#f5f5f5");
  const [doorPos, setDoorPos] = useState({ x: 50, y: 50 });
  const [doorSize, setDoorSize] = useState({ w: 30, h: 35 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setHouseImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setDragOffset({ x: px - doorPos.x, y: py - doorPos.y });
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setDoorPos({
      x: Math.max(0, Math.min(100 - doorSize.w, px - dragOffset.x)),
      y: Math.max(0, Math.min(100 - doorSize.h, py - dragOffset.y)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const reset = () => {
    setHouseImage(null);
    setDoorPos({ x: 50, y: 50 });
    setDoorSize({ w: 30, h: 35 });
  };

  const currentModel = DOOR_MODELS.find((m) => m.id === selectedModel) ?? DOOR_MODELS[0];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Upload area or preview */}
      {!houseImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-brand hover:bg-brand/5 transition-all"
        >
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-lg font-semibold text-gray-700 mb-1">Uploadez une photo de votre maison</p>
          <p className="text-sm text-gray-500">Cliquez ici ou glissez une image</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 select-none touch-none"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={houseImage}
            alt="Votre maison"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Draggable door overlay */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute cursor-move"
            style={{
              left: `${doorPos.x}%`,
              top: `${doorPos.y}%`,
              width: `${doorSize.w}%`,
              height: `${doorSize.h}%`,
              touchAction: "none",
            }}
          >
            <div className="w-full h-full drop-shadow-2xl">
              {currentModel.svg(selectedColor)}
            </div>
            {/* Resize corner */}
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                const startX = e.clientX;
                const startY = e.clientY;
                const startW = doorSize.w;
                const startH = doorSize.h;
                const rect = containerRef.current?.getBoundingClientRect();
                if (!rect) return;

                const onMove = (ev: PointerEvent) => {
                  const dw = ((ev.clientX - startX) / rect.width) * 100;
                  const dh = ((ev.clientY - startY) / rect.height) * 100;
                  setDoorSize({
                    w: Math.max(10, Math.min(80, startW + dw)),
                    h: Math.max(10, Math.min(80, startH + dh)),
                  });
                };
                const onUp = () => {
                  window.removeEventListener("pointermove", onMove);
                  window.removeEventListener("pointerup", onUp);
                };
                window.addEventListener("pointermove", onMove);
                window.addEventListener("pointerup", onUp);
              }}
              className="absolute bottom-0 right-0 w-6 h-6 bg-brand rounded-tl-lg cursor-nwse-resize border-2 border-white shadow-lg"
              style={{ touchAction: "none" }}
            />
          </div>

          {/* Reset button */}
          <button
            onClick={reset}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm"
          >
            Changer de photo
          </button>
        </div>
      )}

      {/* Controls — visible only when an image is uploaded */}
      {houseImage && (
        <div className="mt-8 space-y-6">
          {/* Models */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
              Modèle de porte
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {DOOR_MODELS.map((model) => {
                const selected = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`border-2 rounded-xl p-3 text-left transition-all ${
                      selected
                        ? "border-brand bg-brand/5 shadow-md"
                        : "border-gray-200 hover:border-brand/40"
                    }`}
                  >
                    <div className="aspect-[4/5] mb-2 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1">
                      {model.svg(selectedColor)}
                    </div>
                    <p className={`text-sm font-bold ${selected ? "text-brand" : "text-gray-800"}`}>
                      {model.name}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight mt-0.5">{model.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
              Couleur
            </h3>
            <div className="flex flex-wrap gap-3">
              {DOOR_COLORS.map((color) => {
                const selected = selectedColor === color.value;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.value)}
                    className={`flex items-center gap-2 border-2 rounded-full pl-1.5 pr-4 py-1.5 transition-all ${
                      selected
                        ? "border-brand bg-brand/5"
                        : "border-gray-200 hover:border-brand/40"
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className={`text-sm font-medium ${selected ? "text-brand" : "text-gray-700"}`}>
                      {color.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              <strong>Astuce :</strong> Glissez la porte pour la déplacer, et utilisez le coin rouge en bas à droite pour ajuster sa taille.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
