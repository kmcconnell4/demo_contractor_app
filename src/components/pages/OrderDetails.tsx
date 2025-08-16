import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.tsx';

export function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mock order data - in real app, this would come from API
  const order = {
    id: 'ORD-2024-001',
    orderNumber: 'PO-24-001',
    date: '2024-07-12',
    status: 'delivered', // 'pending', 'shipped', 'delivered'
    supplier: 'Carlisle SynTec',
    totalAmount: '$12,450.00',
    productCount: 5,
    shippingAddress: '450 Market Street, Philadelphia, PA',
    trackingNumber: 'UPS1234567890',
    estimatedDelivery: '2024-07-20',
    products: [
      { 
        name: 'Sure-Seal EPDM Membrane 60 mil', 
        quantity: '2,500 sq ft', 
        unitPrice: '$3.20', 
        total: '$8,000.00',
        image: 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Membranes/EPDM/sure-seal-epdm-membrane.jpg'
      },
      { 
        name: 'SecurShield HD Polyiso Insulation 2"', 
        quantity: '2,500 sq ft', 
        unitPrice: '$1.45', 
        total: '$3,625.00',
        image: 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Insulation/securshield-hd-polyiso.jpg'
      },
      { 
        name: 'Sure-Seal Lap Sealant', 
        quantity: '24 tubes', 
        unitPrice: '$18.50', 
        total: '$444.00',
        image: 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Sealants/sure-seal-lap-sealant.jpg'
      },
      { 
        name: 'Pressure-Sensitive Walkway Pads', 
        quantity: '50 pads', 
        unitPrice: '$4.25', 
        total: '$212.50',
        image: 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Accessories/walkway-pads.jpg'
      },
      { 
        name: 'Heavy-Duty Fasteners', 
        quantity: '200 pieces', 
        unitPrice: '$0.84', 
        total: '$168.50',
        image: 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Accessories/fasteners.jpg'
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={20} className="text-success" />;
      case 'shipped': return <Truck size={20} className="text-warning" />;
      case 'pending': return <Clock size={20} className="text-muted-foreground" />;
      default: return <Package size={20} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top rounded-b-3xl">
        <div className="p-4 pb-6">
          <div className="flex items-start space-x-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white mt-1">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{t('orderDetailsTitle')}</h1>
              <div className="flex items-center space-x-2">
                <p className="text-white/80 text-sm">{order.orderNumber}</p>
                <span className="text-white/60 text-sm">•</span>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(order.status)}
                  <span className="text-white/80 text-sm capitalize">{order.status}</span>
                </div>
              </div>
            </div>
          </div>
          
          {order.status === 'shipped' && (
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-white/80 text-sm">{t('tracking')}: {order.trackingNumber}</p>
              <p className="text-white/80 text-sm">{t('estimatedDelivery')}: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-8 px-4 pb-20 space-y-8">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('orderInformation')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('orderNumber')}</span>
              <span className="font-semibold">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('orderDate')}</span>
              <span className="font-semibold">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('supplier')}</span>
              <span className="font-semibold">{order.supplier}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">{t('shippingAddress')}</span>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="font-semibold text-sm">{order.shippingAddress}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>{t('products')} ({order.productCount} {t('items')})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.products.map((product, index) => (
                <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('quantity')}: {product.quantity}</span>
                        <span className="text-muted-foreground">@ {product.unitPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{t('unitPrice')}: {product.unitPrice}</span>
                        <span className="font-semibold text-primary">{product.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t('orderSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('subtotal')}</span>
                <span className="font-semibold">$12,450.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shipping')}</span>
                <span className="font-semibold">{t('free')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('tax')}</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">{t('total')}</span>
                  <span className="text-lg font-bold text-primary">{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            <Package size={20} className="mr-2" />
            {t('trackPackage')}
          </Button>
          <Button variant="outline" className="flex-1">
            {t('contactSupplier')}
          </Button>
        </div>
      </div>
    </div>
  );
}
