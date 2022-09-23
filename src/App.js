import React, { useState, useEffect } from "react"

// prime react
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';


// styles
import "./App.scss"

// utilities
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function() {
  const [commission, setCommission] = useState(null)
  const [commissionBonus, setCommissionBonus] = useState(null)
  const [commissionPenalty, setCommissionPenalty] = useState(null)
  const [date, setDate] = useState()
  const [teamSize, setTeamSize] = useState()

  const [commissionResult, setCommissionResult] = useState()
  
  useEffect(() => {
    try {
      const currentDate = new Date()
      const deliveryDate = date
      
      const diff = (deliveryDate.getTime() -  currentDate.getTime())
      const remainingDays = Math.ceil(diff / (1000 * 3600 * 24));
      console.log("diff days", remainingDays);
      
      if(remainingDays >= 0) {
        console.log(commission + (remainingDays * commissionBonus))
        setCommissionResult(commission + (remainingDays * commissionBonus))

      } else {
        setCommissionResult(commission + (remainingDays * commissionPenalty))
      }
      
    } catch (e) {
      console.log("error", e);
    }
  })
  
  return(
    <main className='main'>
      <div>
        Comisión
        <InputNumber value={commission} onValueChange={(e) => setCommission(e.value)} mode="currency" currency="USD" locale="en-US" />
      </div>

      <div>
        Bono por día adelantado
        <InputNumber value={commissionBonus} onValueChange={(e) => setCommissionBonus(e.value)} mode="currency" currency="USD" locale="en-US" />
      </div>

      <div>
        Penalización por día atrasado
        <InputNumber value={commissionPenalty} onValueChange={(e) => setCommissionPenalty(e.value)} mode="currency" currency="USD" locale="en-US" />
      </div>
      
      <div>
        Fecha de entrega
        <Calendar value={date} onChange={(e) => setDate(e.value)}></Calendar>
      </div>
      
      <div>
        Tamaño del equipo
        <InputNumber value={teamSize} onChange={(e) => setTeamSize(e.value)}></InputNumber>
      </div>

      <h2>Bono total si se entrega hoy:</h2>
      <h1>${commissionResult && numberWithCommas(commissionResult)}</h1>

      <h2>Bono individual si se entrega hoy:</h2>
      <h1>${(commissionResult && teamSize) && numberWithCommas(Math.round(commissionResult / teamSize))}</h1>
    </main>
  )
}