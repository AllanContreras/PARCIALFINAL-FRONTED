'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

type Especialidad = {
  _id: string
  nombre: string
  imagenURL: string
}

export default function Home() {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])

  useEffect(() => {
    axios.get('https://TU_BACKEND.azurewebsites.net/api/especialidades')
      .then(res => setEspecialidades(res.data))
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {especialidades.map(e => (
        <Link href={`/especialidad/${e._id}`} key={e._id}>
          <div className="border p-4 shadow hover:scale-105 transition">
            <img src={e.imagenURL} alt={e.nombre} className="h-32 w-full object-cover" />
            <h3 className="text-center font-semibold">{e.nombre}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}