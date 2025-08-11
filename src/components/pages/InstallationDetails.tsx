import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import installationDetailsData from '../../lib/installationDetailsData';
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
        <div className="flex items-end gap-2 w-full">
          <Button variant="ghost" size="icon" className="mr-2 flex items-center justify-center" onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <DialogTitle className="text-xl font-bold -mt-10">Installation Details</DialogTitle>
        </div>
      </DialogHeader>
      <div className="px-6 pb-6 flex-1 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={section.title} className={idx === 0 ? "mb-8" : "mb-8 mt-0.5"}>
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
                    <div key={i} className="min-w-[140px] w-36 h-44 bg-white rounded-xl shadow border flex flex-col overflow-hidden p-0">
                      {product.img ? (
                        <img src={product.img} alt={product.name} className="w-full h-28 object-cover rounded-t-xl" style={{ objectFit: 'cover', width: '100%', height: '64%' }} />
                      ) : (
                        <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-t-xl text-xs text-gray-500">No image</div>
                      )}
                      <div className="text-xs text-center font-medium line-clamp-2 h-16 flex items-center justify-center px-2">{product.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {section.videoUrl && (
              <div className="mt-3">
                <div className="w-[100vw] max-w-none h-56 bg-black flex flex-col items-center justify-center border border-[#222] relative overflow-hidden -mx-6">
                  <video controls className="w-full h-full object-cover">
                    <source src={section.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </DialogContent>
  );
}