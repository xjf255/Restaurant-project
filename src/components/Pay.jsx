import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import getDay from '../services/getDay';

export const Pay = ({ method, coupon, pay }) => {
  const [loading, setLoading] = useState(false);
  const day = getDay();
  const URL = import.meta.env.VITE_PAY_URL;

  useEffect(() => {
    const generatedBill = async () => {
      setLoading(true);
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idPedido: 20,
            pay: {
              amount: pay,
              coupon: coupon ? { 
                expiration_date: '2024-12-25',
                id_coupon: coupon,
              } : null,
              date_pay: day,
              id_pay: 0,
              payMethod: { codMethod: method },
              status: { cod_status: 2 },
              tax: { codTax: 1 },
              total_amount: pay,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Error en la creación de la factura');
        }

        toast.success('Pago generado exitosamente');
        localStorage.setItem('cart', '');

      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    generatedBill();
  }, [URL, method, coupon, pay, day]);

  return (
    <div className="pay--info">
      {loading ? <p>Generando factura...</p> : <h2>Pago Generado Exitosamente</h2>}
    </div>
  );
};
