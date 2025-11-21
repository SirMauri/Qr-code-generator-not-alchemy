'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type QRStyle = 'square' | 'rounded' | 'dots';
type QRFormat = 'png' | 'svg' | 'jpg';

export const QRGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#284023');
  const [bgColor, setBgColor] = useState('#F7F7F0');
  const [style, setStyle] = useState<QRStyle>('square');
  const [formats, setFormats] = useState<QRFormat[]>(['png']);
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [qrSVG, setQrSVG] = useState<string>('');
  const [qrJPG, setQrJPG] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const generateQR = async () => {
    if (!url.trim()) return;

    setIsGenerating(true);
    setShowScrollIndicator(false);

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

      // Generate JPG
      if (formats.includes('jpg')) {
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, url, options);

          // Convert to JPG
          canvas.toBlob((blob) => {
            if (blob) {
              const jpgURL = URL.createObjectURL(blob);
              setQrJPG(jpgURL);
            }
          }, 'image/jpeg', 0.95);
        }
      }

      // Show scroll indicator on mobile after generation
      if (window.innerWidth < 768) {
        setShowScrollIndicator(true);
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
    } else if (format === 'jpg' && qrJPG) {
      const link = document.createElement('a');
      link.href = qrJPG;
      link.download = `${fileName}.jpg`;
      link.click();
    }
  };

  const toggleFormat = (format: QRFormat) => {
    setFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const hasGeneratedQR = qrDataURL || qrSVG || qrJPG;

  // Hide scroll indicator when user scrolls to preview
  useEffect(() => {
    const handleScroll = () => {
      if (previewRef.current && showScrollIndicator) {
        const rect = previewRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
          setShowScrollIndicator(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollIndicator]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 2-Column Layout on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column - Form Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[hsl(var(--border))]">
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label htmlFor="url" className="block text-base font-semibold text-[hsl(var(--foreground))]">
                Enter URL
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 text-base rounded-xl border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
              />
            </div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fgColor" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                  Foreground
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fgColor"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[hsl(var(--border))]"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bgColor" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[hsl(var(--border))]"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
                  />
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Output Formats
              </label>
              <div className="flex flex-wrap gap-2">
                {(['png', 'svg', 'jpg'] as QRFormat[]).map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => toggleFormat(format)}
                    className={cn(
                      'px-5 py-1.5 rounded-lg font-medium transition-all text-sm uppercase tracking-wide',
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
                'w-full py-3 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2',
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

          {/* Mobile Scroll Indicator */}
          {showScrollIndicator && (
            <div className="md:hidden mt-6 flex flex-col items-center animate-bounce">
              <p className="text-sm text-[hsl(var(--foreground))] opacity-60 mb-2">
                Scroll down to see your QR code
              </p>
              <ChevronDown className="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
          )}
        </div>

        {/* Right Column - Preview Section */}
        <div
          ref={previewRef}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[hsl(var(--border))]"
        >
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
            Preview
          </h3>

          {/* QR Code Preview */}
          <div className="flex justify-center items-center p-8 bg-[hsl(var(--background))] rounded-xl min-h-[300px]">
            {hasGeneratedQR ? (
              <div className="space-y-4">
                {qrDataURL && (
                  <img
                    src={qrDataURL}
                    alt="Generated QR Code"
                    className="max-w-full h-auto mx-auto"
                    style={{ maxWidth: '300px' }}
                  />
                )}
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-48 h-48 mx-auto border-2 border-dashed border-[hsl(var(--border))] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-[hsl(var(--muted))]" />
                </div>
                <p className="text-sm text-[hsl(var(--foreground))] opacity-60">
                  Your QR code will appear here
                </p>
              </div>
            )}
          </div>

          {/* Download Buttons */}
          {hasGeneratedQR && (
            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-[hsl(var(--foreground))] opacity-75">
                Download as:
              </p>
              <div className="flex flex-wrap gap-3">
                {formats.includes('png') && qrDataURL && (
                  <button
                    onClick={() => downloadQR('png')}
                    className="flex-1 min-w-[120px] px-4 py-2.5 bg-[hsl(var(--primary))] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                  >
                    <Download className="w-4 h-4" />
                    PNG
                  </button>
                )}
                {formats.includes('svg') && qrSVG && (
                  <button
                    onClick={() => downloadQR('svg')}
                    className="flex-1 min-w-[120px] px-4 py-2.5 bg-[hsl(var(--primary))] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                  >
                    <Download className="w-4 h-4" />
                    SVG
                  </button>
                )}
                {formats.includes('jpg') && qrJPG && (
                  <button
                    onClick={() => downloadQR('jpg')}
                    className="flex-1 min-w-[120px] px-4 py-2.5 bg-[hsl(var(--primary))] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                  >
                    <Download className="w-4 h-4" />
                    JPG
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
