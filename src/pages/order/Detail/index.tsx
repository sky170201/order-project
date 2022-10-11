import { useParams } from  'react-router-dom'

export default function Detail() {
  const params = useParams();

  return (
    <div>
      order Detail-- {params.id}
    </div>
  )
}