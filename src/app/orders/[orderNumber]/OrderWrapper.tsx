import { OrderDetails } from '@/components/OrderDetails/OrderDetails';

export default function OrderWrapper({ orderNumber }: { orderNumber: string }) {
  return <OrderDetails orderNumber={orderNumber} />;
}