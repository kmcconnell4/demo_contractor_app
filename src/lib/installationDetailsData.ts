// src/lib/installationDetailsData.ts
// Structured installation details for each job

export interface InstallationSection {
  title: string;
  instructions: string;
  products: { name: string; img?: string }[];
  faqLinks?: { label: string; url: string }[];
  documentLinks?: { label: string; url: string }[];
  attachmentMethodLink?: { label: string; url: string };
  videoUrl?: string;
}

export interface JobInstallationDetails {
  jobId: string;
  sections: InstallationSection[];
}

const installationDetailsData: JobInstallationDetails[] = [
  {
    jobId: "1",
    sections: [
      {
        title: "Deck",
        instructions: "Inspect the deck for damage and debris. Ensure the surface is dry and clean.",
        products: [],
      },
      {
        title: "Primer",
        instructions: "Apply primer evenly to the prepared deck. Allow primer to dry per manufacturer’s instructions.",
        products: [
          { name: "CCW 702" },
          { name: "CAV-GRIP™ III Low-VOC Primer" },
          { name: "Primer Accessories" }
        ],
        faqLinks: [
          { label: "Primer FAQ", url: "/docs/primer-faq.pdf" }
        ],
  videoUrl: "/Video-tutorials/CAV-GRIP_III_video_tutorial.mp4"
      },
      {
        title: "Base sheet",
        instructions: "Roll out base sheet and align to layout. Secure sheet per fastening schedule.",
        products: [
          { name: "SureMB 70 SA" }
        ],
        documentLinks: [
          { label: "Base Sheet Instructions", url: "/docs/base-sheet-instructions.pdf" }
        ]
      },
      {
        title: "Bottom insulation",
        instructions: "Place bottom insulation boards tightly together. Stagger joints for stability.",
        products: [
          { name: "InsulBase® Polyisocyanurate" }
        ],
        attachmentMethodLink: { label: "Attachment Method", url: "/docs/insulation-attachment.pdf" },
        documentLinks: [
          { label: "Bottom Insulation Instructions", url: "/docs/bottom-insulation-instructions.pdf" }
        ]
      },
      {
        title: "Top insulation",
        instructions: "Install top insulation over bottom layer. Ensure full coverage and alignment.",
        products: [
          { name: "Tapered InsulBase® Polyisocyanurate" }
        ],
        attachmentMethodLink: { label: "Attachment Method", url: "/docs/top-insulation-attachment.pdf" },
        documentLinks: [
          { label: "Top Insulation Instructions", url: "/docs/top-insulation-instructions.pdf" }
        ],
        videoUrl: "https://example.com/top-insulation-video.mp4"
      },
      {
        title: "Cover board",
        instructions: "Lay cover board over insulation. Cut to fit around penetrations.",
        products: [
          { name: "DensDeck® Prime" }
        ],
        attachmentMethodLink: { label: "Attachment Method", url: "/docs/cover-board-attachment.pdf" },
        documentLinks: [
          { label: "Cover Board Instructions", url: "/docs/cover-board-instructions.pdf" }
        ],
        videoUrl: "https://example.com/cover-board-video.mp4"
      },
      {
        title: "Membrane",
        instructions: "Install membrane per project specifications. Overlap seams as specified.",
        products: [
          { name: "Sure-Seal® EPDM Membrane" }
        ],
        attachmentMethodLink: { label: "Attachment Method", url: "/docs/membrane-attachment.pdf" },
        documentLinks: [
          { label: "Membrane Instructions", url: "/docs/membrane-instructions.pdf" }
        ],
        videoUrl: "https://example.com/membrane-video.mp4"
      }
    ]
  },
  // Add more jobs as needed, following the same structure
];

export default installationDetailsData;
