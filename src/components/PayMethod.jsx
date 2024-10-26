import useFetchAPI from "../hooks/useAPI"

export const PayMethod = ({fn}) => {

  const API_PAY_METHOD = import.meta.env.VITE_PAY_METHOD_URL
  const { data, isError } = useFetchAPI({ api: API_PAY_METHOD, key: "payMethod" })

  return (
    <section className="payment__type">
      {!isError && <p className="title">Select your method:</p>}
      {data && data.map((el) => {
        const { codMethod, name, active } = el
        if (!active) return null
        return (
          <div className="payment--select" key={codMethod} onClick={() => fn(codMethod)}>
            <h4>{name}</h4>
          </div>
        )
      })}
      {isError && <p className="is--error">There was an error loading the payment methods.</p>}
    </section>
  )
} 