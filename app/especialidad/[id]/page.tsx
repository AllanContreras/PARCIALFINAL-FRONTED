'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function EspecialidadPage() {
  const params = useParams()
  const [especialidad, setEspecialidad] = useState<any>(null)

  useEffect(() => {
    axios.get(`https://TU_BACKEND.azurewebsites.net/api/especialidades`)
      .then(res => {
        const data = res.data.find((e: any) => e._id === params.id)
        setEspecialidad(data)
      })
  }, [params.id])

  if (!especialidad) return <p>Cargando...</p>

  return (
    <div className="p-4">
      <img src={especialidad.imagenURL} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-xl font-bold">{especialidad.nombre}</h1>
      <p>{especialidad.descripcion}</p>
      <p><b>Doctor:</b> {especialidad.doctor}</p>
      <p><b>Ubicación:</b> {especialidad.ubicacion}</p>
      <Link href={{ pathname: '/agendar', query: { id: especialidad._id } }}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Programar Cita</button>
      </Link>
    </div>
  )
}