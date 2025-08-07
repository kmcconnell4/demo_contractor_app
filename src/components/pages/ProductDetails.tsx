import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Star, 
  Download, 
  Play,
  Shield,
  Thermometer,
  Droplets,
  Zap
} from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock product data
  const product = {
    id,
    name: 'EPDM Membrane 60 mil',
    description: 'High-performance EPDM roofing membrane designed for superior weather resistance and longevity.',
    image: '/api/placeholder/400/300',
    category: 'Membrane',
    manufacturer: 'RoofPro Materials',
    productCode: 'EPD-60-BLK',
    rating: 4.8,
    features: [
      'UV Resistant',
      'Extreme Weather Protection',
      'Easy Installation', 
      'Long-lasting Durability',
      'Energy Efficient'
    ],
    specifications: {
      thickness: '60 mil (1.52 mm)',
      width: '10 ft (3.05 m)',
      length: '100 ft (30.5 m)',
      weight: '0.7 lbs/sq ft',
      color: 'Black',
      temperatureRange: '-45°F to 300°F',
      warranty: '20 years'
    },
    benefits: [
      'Superior puncture resistance',
      'Excellent UV stability',
      'Outstanding flexibility in cold weather',
      'Resistant to ozone and weathering',
      'Easy to install and repair'
    ],
    installationSteps: [
      'Clean and prepare substrate',
      'Apply primer if required',
      'Roll out membrane avoiding wrinkles',
      'Secure with appropriate fasteners',
      'Seal all seams and penetrations',
      'Perform final inspection'
    ],
    documents: [
      'Installation Guide.pdf',
      'Technical Data Sheet.pdf',
      'Safety Data Sheet.pdf',
      'Warranty Information.pdf'
    ],
    videos: [
      'Installation Overview',
      'Seaming Procedures',
      'Repair Techniques'
    ]
  };

  const SpecRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border safe-top">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Product Details</h1>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Product Header */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Product Image */}
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-muted-foreground">{product.manufacturer}</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    {product.productCode}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.rating})</span>
                </div>

                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="font-semibold">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="specs" className="space-y-0">
              <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Specs</TabsTrigger>
                <TabsTrigger value="benefits" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Benefits</TabsTrigger>
                <TabsTrigger value="install" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Install</TabsTrigger>
                <TabsTrigger value="docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Docs</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Thermometer size={20} className="mr-2" />
                  Technical Specifications
                </h3>
                <div className="space-y-1">
                  <SpecRow label="Thickness" value={product.specifications.thickness} />
                  <SpecRow label="Width" value={product.specifications.width} />
                  <SpecRow label="Length" value={product.specifications.length} />
                  <SpecRow label="Weight" value={product.specifications.weight} />
                  <SpecRow label="Color" value={product.specifications.color} />
                  <SpecRow label="Temperature Range" value={product.specifications.temperatureRange} />
                  <SpecRow label="Warranty" value={product.specifications.warranty} />
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Shield size={20} className="mr-2" />
                  Features & Benefits
                </h3>
                <div className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="install" className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Zap size={20} className="mr-2" />
                  Installation Instructions
                </h3>
                <div className="space-y-3">
                  {product.installationSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm pt-1">{step}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Video Tutorials</h4>
                  {product.videos.map((video, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start">
                      <Play size={16} className="mr-2" />
                      {video}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="docs" className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Download size={20} className="mr-2" />
                  Documentation
                </h3>
                <div className="space-y-3">
                  {product.documents.map((doc, index) => (
                    <Button key={index} variant="outline" className="w-full justify-between">
                      <span>{doc}</span>
                      <Download size={16} />
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">
            <Download size={20} className="mr-2" />
            Download Specs
          </Button>
          <Button>
            <Droplets size={20} className="mr-2" />
            Request Sample
          </Button>
        </div>
      </div>
    </div>
  );
}