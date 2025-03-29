"use client";


import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
 import {  useState } from "react";


interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  category :string ; 
  hint: string;
}

const initialChallenges: Challenge[] = [
  { id: 1, title: "Challenge 1", description: "Pointy pointers.", points: 50,category:"  "    ,  hint: "Is the source code in C?" },
  { id: 2, title: "Challenge 2", description: "Disk Diving.", points: 100,category:" "  ,   hint: "Dive deep to find the best gems." },
  { id: 3, title: "Challenge 3", description: "Easy search.", points: 150,category:" "  ,    hint: "Its not that easy. LOL." },
  { id: 4, title: "Challenge 4", description: "Secret hunting.", points: 50,category:" "  , hint: "The file is not as innocent as it looks." },
  { id: 5, title: "Challenge 5", description: "Reverse Engineering 101.", points: 100,category: " " , hint: "Don't overthink it." },
  { id: 6, title: "Challenge 6", description: "Eye catcher.", points: 100,category:" "  , hint: "Don't believe your eyes." },
  { id: 7, title: "Challenge 7", description: "Julius encrypted his password using a simple encryption algorithm. Can you decode it?", points: 50,category: " " , hint: "USA!!USA!!USA!!" },
  { id: 8, title: "Challenge 8", description: "A mysterious post was found on reddit. Can you uncover its truth?", points: 50,category: " " , hint: "ETUTITSBUS" },
  { id: 9, title: "Challenge 9", description: "Numbers and Deception: Sometimes, the greatest value isn’t what it seems.",category:" "  , points: 100, hint: "Read the code." },
  { id: 10, title: "Challenge 10", description: "Rainb0lt who?", points: 100,category:  , hint: "Try searching on planet Earth." },
  { id: 11, title: "Challenge 11", description: "Find the photographer's home location.", points: 100,category:" "  , hint: "Sometimes, we share more online than we realize." },
  { id: 12, title: "Challenge 12", description: "Just Copy n Paste", points: 100,category: " " , hint: "tired of using chatgpt" },
  { id: 13, title: "Challenge 13", description: "Just look inside", points: 50,category: " " , hint: "do you really need it?" },
  { id: 14, title: "Challenge 14", description: "I love Marie", points: 100,category: " " , hint: "Is Marie really a person or a thing :> ?" },
  { id: 15, title: "Challenge 15", description: "Authentication Unlock",category: " " , points: 100, hint: " " },
  { id: 16, title: "Challenge 16", description: "Terah", points: 50,category:" "  , hint: "flag format iiitl{flag}" }
];

export default function AdminPanel() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [form, setForm] = useState<Partial<Challenge>>({});
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = () => {
    if (isEditing) {
      setChallenges(prev => prev.map(c => (c.id === form.id ? { ...c, ...form } : c)));
    } else {
      setChallenges([...challenges, { ...form, id: Date.now() } as Challenge]);
    }
    setForm({});
    setIsEditing(false);
  };

  const handleEdit = (challenge: Challenge) => {
    setForm(challenge);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setChallenges(challenges.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 bg-black text-green-400 font-mono">
      <Navbar />
      <h1 className="text-2xl border-b border-green-600 mb-4">Admin Panel</h1>
      
      {/* Challenge Form */}
      <div className="mb-4">
        <input placeholder="Title" value={form.title || ""} onChange={(e) => setForm({...form, title: e.target.value})} className="bg-black border border-green-600 p-2 m-2" />
        <input placeholder="Description" value={form.description || ""} onChange={(e) => setForm({...form, description: e.target.value})} className="bg-black border border-green-600 p-2 m-2" />
        <input type="number" placeholder="Points" value={form.points || ""} onChange={(e) => setForm({...form, points: Number(e.target.value)})} className="bg-black border border-green-600 p-2 m-2" />
        <input placeholder="Category" value={form.category || ""} onChange={(e) => setForm({...form, category: e.target.value})} className="bg-black border border-green-600 p-2 m-2" />
        <input placeholder="Hint" value={form.hint || ""} onChange={(e) => setForm({...form, hint: e.target.value})} className="bg-black border border-green-600 p-2 m-2" />
        <button onClick={handleSubmit} className="bg-green-700 px-4 py-2 m-2 rounded">{isEditing ? "Update" : "Add"} Challenge</button>
      </div>
      
      {/* Challenge List */}
      <table className="w-full border-collapse border border-green-600">
        <thead>
          <tr>
            <th className="border border-green-600 p-2">Title</th>
            <th className="border border-green-600 p-2">Description</th>
            <th className="border border-green-600 p-2">Points</th>
            <th className="border border-green-600 p-2">Hint</th>
            <th className="border border-green-600 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map(challenge => (
            <tr key={challenge.id}>
              <td className="border border-green-600 p-2">{challenge.title}</td>
              <td className="border border-green-600 p-2">{challenge.description}</td>
              <td className="border border-green-600 p-2">{challenge.points}</td>
              <td className="border border-green-600 p-2">{challenge.hint}</td>
              <td className="border border-green-600 p-2">
                <button onClick={() => handleEdit(challenge)} className="bg-blue-600 px-2 py-1 m-1">Edit</button>
                <button onClick={() => handleDelete(challenge.id)} className="bg-red-600 px-2 py-1 m-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}
