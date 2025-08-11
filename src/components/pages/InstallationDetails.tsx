import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Play,
  File,
  Package,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface InstallationDetailsProps {
  id: string;
  area: string;
  onClose: () => void;
}

export function InstallationDetails({ id, area, onClose }: InstallationDetailsProps) {
  const sections = [
    {
      title: "Deck",
      products: [
        { name: "SecurShield Polyiso Tapered Insulation", img: "/Product images/SecurShield Polyiso Tapered Insulation.png" },
        { name: "Sure Weld TPO Reinforced Membrane", img: "/Product images/Sure Weld TPO Reinforced Membrane.png" },
        { name: "CAV-GRIP III Adhesive Primer", img: "/Product images/CAV-GRIP III Adhesive Primer.png" }
      ],
      instructions: "Inspect the deck for damage and debris. Ensure the surface is dry and clean. Mark any areas requiring repair."
    },
    {
      title: "Primer",
      products: [
        { name: "CAV-GRIP III Adhesive Primer", img: "/Product images/CAV-GRIP III Adhesive Primer.png" },
        { name: "Sure-Flex PVC Pressure-Sensitive Cover Strip", img: "/Product images/Sure-Flex PVC Pressure-Sensitive Cover Strip.png" },
        { name: "Sure Weld TPO Walkway Rolls", img: "/Product images/Sure-Weld TPO Walkway Rolls.png" }
      ],
      instructions: "Apply primer evenly to the prepared deck. Allow primer to dry per manufacturer’s instructions. Avoid foot traffic until dry."
    },
    {
      title: "Base sheet",
      products: [
        { name: "Sure Weld TPO Reinforced Membrane", img: "/Product images/Sure Weld TPO Reinforced Membrane.png" },
        { name: "VapAir Seal Air and Vapor Barrier Temporary Roof", img: "/Product images/VapAir Seal Air and Vapor Barrier Temporary Roof.png" },
        { name: "Sure-White Pressure-Sensitive Pre-Molded Pipe Seal", img: "/Product images/Sure-White Pressure-Sensitive Pre-Molded Pipe Seal.png" }
      ],
      instructions: "Roll out base sheet and align to layout. Secure sheet per fastening schedule. Overlap seams as specified."
    },
    {
      title: "Bottom insulation",
      products: [
        { name: "SecurShield Polyiso Tapered Insulation", img: "/Product images/SecurShield Polyiso Tapered Insulation.png" },
        { name: "Sure Weld TPO Walkway Rolls", img: "/Product images/Sure-Weld TPO Walkway Rolls.png" },
        { name: "Sure-Flex PVC Pressure-Sensitive Cover Strip", img: "/Product images/Sure-Flex PVC Pressure-Sensitive Cover Strip.png" }
      ],
      instructions: "Place bottom insulation boards tightly together. Stagger joints for stability. Mechanically fasten as required."
    },
    {
      title: "Top insulation",
      products: [
        { name: "SecurShield Polyiso Tapered Insulation", img: "/Product images/SecurShield Polyiso Tapered Insulation.png" },
        { name: "Sure Weld TPO Reinforced Membrane", img: "/Product images/Sure Weld TPO Reinforced Membrane.png" },
        { name: "CAV-GRIP III Adhesive Primer", img: "/Product images/CAV-GRIP III Adhesive Primer.png" }
      ],
      instructions: "Install top insulation over bottom layer. Ensure full coverage and alignment. Fasten per project specifications."
    },
    {
      title: "Cover board",
      products: [
        { name: "SecurShield Polyiso Tapered Insulation", img: "/Product images/SecurShield Polyiso Tapered Insulation.png" },
        { name: "Sure Weld TPO Walkway Rolls", img: "/Product images/Sure-Weld TPO Walkway Rolls.png" },
        { name: "Sure-Flex PVC Pressure-Sensitive Cover Strip", img: "/Product images/Sure-Flex PVC Pressure-Sensitive Cover Strip.png" }
      ],
      instructions: "Lay cover board over insulation. Cut to fit around penetrations. Attach securely to prevent movement."
    }
  ];

  return (
    <DialogContent className="max-w-[480px] p-0 rounded-xl overflow-hidden">
      <DialogHeader className="px-6 pt-6 pb-2">
        <DialogTitle className="text-xl font-bold">Installation Details</DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </DialogClose>
      </DialogHeader>
      <div className="px-6 pb-6">
        {sections.map((section, idx) => (
          <div key={section.title} className={idx === 0 ? "mb-8" : "mb-8 mt-0.5"}>
            <h2 className="font-semibold text-lg mb-1">{section.title}</h2>
            <p className="text-muted-foreground text-sm mb-3">{section.instructions}</p>
            <div className="mb-2">
              <div className="font-medium text-sm mb-1">Products</div>
              <div className="flex gap-3 mb-2 overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                {section.products.map((product, i) => (
                  <div key={i} className="min-w-[140px] w-36 h-44 bg-white rounded-xl shadow border flex flex-col overflow-hidden p-0">
                    <img src={product.img} alt={product.name} className="w-full h-28 object-cover rounded-t-xl" style={{ objectFit: 'cover', width: '100%', height: '64%' }} />
                    <div className="text-xs text-center font-medium line-clamp-2 h-16 flex items-center justify-center px-2">{product.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <div className="mb-10" />
            </div>
            {/* Move video to be grouped with the next section, not the current one */}
            {idx < sections.length - 1 && section.title !== "Membrane" && (
              <div className="mt-3">
                <div className="w-[100vw] max-w-none h-56 bg-black flex flex-col items-center justify-center border border-[#222] relative overflow-hidden -mx-6">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="z-10"><polygon points="9 7 19 12 9 17 9 7"></polygon></svg>
                  <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/80 to-transparent flex items-center px-3">
                    <div className="w-4 h-1 rounded bg-white/70 mr-2" />
                    <div className="flex-1 h-1 rounded bg-white/30" />
                    <div className="w-4 h-4 rounded-full bg-white/80 ml-2" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </DialogContent>
  );
}