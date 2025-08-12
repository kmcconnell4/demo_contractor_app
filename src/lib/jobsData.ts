// src/lib/jobsData.ts
// Example job data for dynamic installation details

export interface InstallationSection {
  title: string;
  products: { name: string; img: string }[];
  instructions: string;
}

export interface JobData {
  id: string;
  name: string;
  installationSections: InstallationSection[];
}

const jobsData: JobData[] = [
  {
    id: "job-1",
    name: "Data Center 1",
    installationSections: [
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
      }
    ]
  },
  {
    id: "job-2",
    name: "Hospital 1",
    installationSections: [
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
      }
    ]
  }
  // Add more jobs as needed
];

export default jobsData;
