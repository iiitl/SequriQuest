interface QuestCardProps {
    title: string;
    points: number;
    description: string;
    hint: string;
  }
  
  export default function QuestCard({ title, points, description, hint }: QuestCardProps) {
    return (
      <div className="bg-black text-green-400 border border-green-500 p-6 rounded-md shadow-md">
        
        {/* Title & Points */}
        <div className="flex justify-between items-center border-b border-green-500 pb-2 mb-4">
          <h3 className="text-xl font-mono font-bold">{title}</h3>
          <span className="text-green-300 text-sm">{points} Points</span>
        </div>
  
        {/* Quest Description */}
        <p className="text-green-300 text-sm font-mono mb-4">{description}</p>
  
        {/* Buttons */}
        <div className="flex justify-between space-x-2">
          <button className="bg-green-600 text-black px-4 py-2 font-mono text-sm shadow-md hover:bg-green-500 transition">
            Download Challenge
          </button>
          
          <button className="bg-yellow-600 text-black px-4 py-2 font-mono text-sm shadow-md hover:bg-yellow-500 transition">
            Get Hint
          </button>
        </div>
  
        {/* Hint Section (Expandable) */}
        <details className="mt-4">
          <summary className="cursor-pointer text-green-500">View Hint</summary>
          <p className="text-green-300 text-sm mt-2">{hint}</p>
        </details>
  
        {/* Flag Submission */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Flag"
            className="bg-black text-green-300 border border-green-500 px-4 py-2 w-full font-mono focus:outline-none focus:ring focus:ring-green-500"
          />
          <button className="mt-2 w-full bg-green-600 text-black px-4 py-2 font-mono text-sm shadow-md hover:bg-green-500 transition">
            Submit Flag
          </button>
        </div>
  
      </div>
    );
  }
  