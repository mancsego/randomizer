import AddEntity from './components/AddEntity'
import EntityList from './components/EntityList'
import PickOne from './components/PickOne'
import RandomOrder from './components/RandomOrder'
import { useEntityStore } from './store/entities'

function App() {
  const load = useEntityStore((state) => state.fetch)

  load()
  return (
    <div className="prose max-w-full flex flex-col justify-center mx-32">
      <EntityList />
      <AddEntity />
      <div className="mt-2">
        <div className="flex gap-3">
          <RandomOrder />
          <PickOne />
        </div>
      </div>
    </div>
  )
}

export default App
