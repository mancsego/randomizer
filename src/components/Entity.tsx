export default function Entity({ name }: { name: string }) {
  return (
    <li>
      <span className="text-gray-700 text-base">{name}</span>
    </li>
  )
}
