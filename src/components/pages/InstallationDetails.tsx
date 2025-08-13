import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import installationDetailsData from '../../lib/installationDetailsData';

// Map product names to image filenames in public/Product images
const productImageMap: Record<string, string> = {
  'CCW 702': '/Product images/CCW 702.png',
  'CAV-GRIP™ III Low-VOC Primer': '/Product images/CAV-GRIP III Low VOC primer.png',
  'CAV-GRIP III Adhesive Primer': '/Product images/CAV-GRIP III Adhesive Primer.png',
  'SureMB 70 SA': '/Product images/SureMB 70 SA.png',
  'InsulBase® Polyisocyanurate': '/Product images/InsulBase Polyiso.png',
  'SecurShield Polyiso Tapered Insulation': '/Product images/SecurShield Polyiso Tapered Insulation.png',
  'Sure Weld TPO Reinforced Membrane': '/Product images/Sure Weld TPO Reinforced Membrane.png',
  'Sure-Flex PVC Pressure-Sensitive Cover Strip': '/Product images/Sure-Flex PVC Pressure-Sensitive Cover Strip.png',
  'Sure-Weld TPO Walkway Rolls': '/Product images/Sure-Weld TPO Walkway Rolls.png',
  'Sure-White Pressure-Sensitive Pre-Molded Pipe Seal': '/Product images/Sure-White Pressure-Sensitive Pre-Molded Pipe Seal.png',
  'VapAir Seal Air and Vapor Barrier Temporary Roof': '/Product images/VapAir Seal Air and Vapor Barrier Temporary Roof.png',
  'Primer Accessories': '/Product images/CAV-GRIP III Hose and splitter.png',
  'DenDeck': '/Product images/DensDeck Prime Roof Board.png',
};

function getProductImage(name: string): string {
  return productImageMap[name] || '/placeholder.jpg';
}
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface InstallationDetailsProps {
  id: string;
  area: string;
  onClose: () => void;
}

// Find job details by id
const getSectionsForJob = (jobId: string) => {
  const job = installationDetailsData.find(j => j.jobId === jobId);
  return job?.sections || [];
};

export function InstallationDetails({ id, area, onClose }: InstallationDetailsProps) {
  const sections = getSectionsForJob(id);
  return (
    <DialogContent className="fixed left-0 right-0 bottom-0 top-[100px] w-full max-w-none !translate-x-0 !translate-y-0 rounded-t-2xl m-0 shadow-lg p-0 overflow-hidden flex flex-col">
      <DialogHeader className="px-6 pt-6 pb-2 flex items-end justify-between">
        <div className="flex w-full gap-2" style={{ alignItems: 'flex-end' }}>
          <button type="button" className="mb-[-4px] mr-2 flex items-center justify-center rounded-full p-2 hover:bg-muted" onClick={onClose} aria-label="Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold leading-none tracking-tight">Installation Details</h1>
        </div>
      </DialogHeader>
      <div className="px-6 pb-6 flex-1 overflow-y-auto">
        {sections.map((section, idx) => (
          <div
            key={section.title}
            className={
              // Reduce spacing specifically between Primer and Base sheet
              section.title === "Base sheet" && idx > 0 && sections[idx - 1].title === "Primer"
                ? "mb-0 mt-0"
                : section.videoUrl
                  ? (idx === 0 ? "mb-20" : "mb-20 mt-0.5")
                  : (idx === 0 ? "mb-10" : "mb-10 mt-0.5")
            }
          >
            {section.videoUrl && (
              <div className="mb-3">
                <div className="w-[100vw] max-w-none h-56 bg-black flex flex-col items-center justify-center border border-[#222] relative overflow-hidden -mx-6">
                  <video controls className="w-full h-full object-cover">
                    <source src={section.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
            <h2 className="font-semibold text-lg mb-1">{section.title}</h2>
            <p className="text-muted-foreground text-sm mb-3">
              {section.instructions}
              {section.attachmentMethodLink && (
                <>
                  {' '}
                  <a href={section.attachmentMethodLink.url} className="text-blue-600 underline ml-1 text-sm font-normal" target="_blank" rel="noopener noreferrer">View attachment method</a>
                </>
              )}
            </p>
            {section.products && section.products.length > 0 && (
              <div className="mb-2">
                <div className="font-medium text-sm mb-1">Products</div>
                <div className="flex gap-3 mb-2 overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {section.products.map((product, i) => (
                    <div 
                      key={i} 
                      className="min-w-[140px] w-36 h-44 bg-white rounded-xl shadow border flex flex-col overflow-hidden p-0 cursor-pointer"
                      onClick={() => window.location.href = `/product/${encodeURIComponent(product.name)}`}
                    >
                      <img
                        src={getProductImage(product.name)}
                        alt={product.name}
                        className="w-full h-28 object-cover rounded-t-xl"
                        style={{ objectFit: 'cover', width: '100%', height: '64%' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
                      />
                      <div className="text-xs text-center font-medium line-clamp-2 h-16 flex items-center justify-center px-2">{product.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
          // ...existing code...
      </div>
    </DialogContent>
  );
}