import QuestCard from "@/components/QuestCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const quests = [
  { title: "Challenge 1", points: 80, description: "Solve this puzzle to unlock the next stage!", hint: "Think like a hacker." },
  { title: "Challenge 2", points: 110, description: "Can you decode this encrypted message?", hint: "Try XOR encryption." },
  { title: "Challenge 3", points: 100, description: "Find the hidden flag in this binary file.", hint: "Use a hex editor." }
];

export default function Challenges() {
  return (
    <>
    <Navbar />
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-green-400 text-center mb-6">QUEST ZONE!</h2>
      <p className="text-lg font-mono text-green-300 text-center mb-8">
        Are you ready to solve the quests?
      </p>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, index) => (
          <QuestCard key={index} {...quest} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
