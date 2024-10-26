import { toast } from "sonner";
import getDay from "../services/getDay";

export const Pay = ({ method, coupon, pay}) => {

  const day = getDay()
  const URL = import.meta.env.VITE_PAY_URL;

  const generatedBill = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "idPedido": 20,
              "pay": {
                "amount": pay,
                "coupon": {
                  "expiration_date": "2024-12-25",
                  "id_coupon": coupon,
                },
                "date_pay": day,
                "id_pay": 0,
                "payMethod": {
                  "codMethod": method,
                },
                "status": {
                  "cod_status": 2,
                },
                "tax": {
                  "codTax": 1,
                },
                "total_amount": pay
              }
            }
          )
        });
        if (!response.ok) {
          throw new Error('Error en la creación del la factura');
        }
        localStorage.setItem("cart", "")
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }

  generatedBill()
  return (
    <div className="pay--info">
      <h2>
        Pago Generado Exitosamente
      </h2>
    </div>
  )
};