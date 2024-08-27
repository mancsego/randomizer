import AddEntity from '@/components/AddEntity'
import EntityList from '@/components/EntityList'
import GroupsOf from '@/components/scrum/GroupsOf'
import PickOne from '@/components/scrum/PickOne'
import RandomOrder from '@/components/scrum/RandomOrder'
import { useEntityStore } from '@/store/entities'

function App() {
  const load = useEntityStore((state) => state.fetch)

  load()
  return (
    <div className="prose flex flex-col items-center mx-auto">
      <EntityList />
      <AddEntity />
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <RandomOrder />
          <PickOne />
          <GroupsOf />
        </div>
      </div>
    </div>
  )
}

export default App
