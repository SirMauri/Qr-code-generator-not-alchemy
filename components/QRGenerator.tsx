'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type QRStyle = 'square' | 'rounded' | 'dots';
type QRFormat = 'png' | 'svg';

export const QRGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#284023');
  const [bgColor, setBgColor] = useState('#F7F7F0');
  const [style, setStyle] = useState<QRStyle>('square');
  const [formats, setFormats] = useState<QRFormat[]>(['png']);
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [qrSVG, setQrSVG] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!url.trim()) return;

    setIsGenerating(true);

    try {
      const options = {
        errorCorrectionLevel: 'H' as const,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        width: 400,
      };

      // Generate PNG
      if (formats.includes('png')) {
        const dataURL = await QRCode.toDataURL(url, options);
        setQrDataURL(dataURL);
      }

      // Generate SVG
      if (formats.includes('svg')) {
        const svgString = await QRCode.toString(url, {
          ...options,
          type: 'svg',
        });
        setQrSVG(svgString);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = (format: QRFormat) => {
    const fileName = `qr-code-${Date.now()}`;

    if (format === 'png' && qrDataURL) {
      const link = document.createElement('a');
      link.href = qrDataURL;
      link.download = `${fileName}.png`;
      link.click();
    } else if (format === 'svg' && qrSVG) {
      const blob = new Blob([qrSVG], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.svg`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const toggleFormat = (format: QRFormat) => {
    setFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Form Section */}
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[hsl(var(--border))]">
        <div className="space-y-8">
          {/* URL Input */}
          <div className="space-y-3">
            <label htmlFor="url" className="block text-lg font-semibold text-[hsl(var(--foreground))]">
              Enter URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 text-base rounded-xl border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
            />
          </div>

          {/* Color Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="fgColor" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Foreground Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="fgColor"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-[hsl(var(--border))]"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm rounded-lg border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="bgColor" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="bgColor"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-[hsl(var(--border))]"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm rounded-lg border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
                />
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
              Output Formats
            </label>
            <div className="flex flex-wrap gap-3">
              {(['png', 'svg'] as QRFormat[]).map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => toggleFormat(format)}
                  className={cn(
                    'px-6 py-2 rounded-lg font-medium transition-all text-sm uppercase tracking-wide',
                    formats.includes(format)
                      ? 'bg-[hsl(var(--primary))] text-white shadow-md'
                      : 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]'
                  )}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateQR}
            disabled={!url.trim() || formats.length === 0 || isGenerating}
            className={cn(
              'w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2',
              url.trim() && formats.length > 0 && !isGenerating
                ? 'bg-[hsl(var(--accent))] text-white hover:opacity-90 shadow-lg hover:shadow-xl'
                : 'bg-[hsl(var(--muted))] text-gray-400 cursor-not-allowed'
            )}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate QR Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview and Download Section */}
      {(qrDataURL || qrSVG) && (
        <div className="mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[hsl(var(--border))] space-y-8">
          <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
            Your QR Code
          </h3>

          {/* QR Code Preview */}
          <div className="flex justify-center p-8 bg-[hsl(var(--background))] rounded-xl">
            {qrDataURL && (
              <img
                src={qrDataURL}
                alt="Generated QR Code"
                className="max-w-full h-auto"
                style={{ maxWidth: '400px' }}
              />
            )}
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {formats.includes('png') && qrDataURL && (
              <button
                onClick={() => downloadQR('png')}
                className="px-8 py-3 bg-[hsl(var(--primary))] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>
            )}
            {formats.includes('svg') && qrSVG && (
              <button
                onClick={() => downloadQR('svg')}
                className="px-8 py-3 bg-[hsl(var(--primary))] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download SVG
              </button>
            )}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
