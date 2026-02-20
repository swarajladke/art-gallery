
import ArtworkTable from './components/ArtworkTable';

function App() {
  return (
    <div className="w-full flex flex-column align-items-center justify-content-center p-4">
      <div className="text-center mb-6">
        <h1 className="mb-2 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Art Institute of Chicago</h1>
        <p className="text-xl text-400 m-0 font-light tracking-wide">Curated Collection & Archives</p>
      </div>
      <ArtworkTable />
    </div>
  )
}

export default App
