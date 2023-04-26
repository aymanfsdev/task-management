import AddTask from "./AddTask"
import TasksList from "./TasksList"
type Props = {}

export function Task({}: Props) {
  return (
    <section>
        <AddTask/>
        <TasksList/>
    </section>
  )
}
