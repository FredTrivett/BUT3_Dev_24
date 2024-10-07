import TodoList from '@/components/todo-list'

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-6">
        <TodoList />
      </div>
    </main>
  )
}