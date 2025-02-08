import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SearchBoxProps {
  setProperties: (properties: any[]) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ setProperties }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages] = useState([
    "Tell me what kind of property you need...",
    "Looking for a luxury villa or a cozy apartment?",
    "Searching for something specific? Let me help!"
  ]);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (search.trim() !== "") return;

    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setCurrentMessage(messages[(messageIndex + 1) % messages.length]);
    }, 4000);

    return () => clearInterval(interval);
  }, [messageIndex, messages, search]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/property", { query: search });
      localStorage.setItem("searchResults", JSON.stringify(response.data.properties));
      setProperties(response.data.properties.slice(0, 3));

      setTimeout(() => {
        router.push(`/search?q=${search}`);
      }, 1500);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-4 w-full mb-4 md:mb-0">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Bot className="text-blue-600" size={20} />
        </div>

        {search.trim() === "" && (
          <motion.div
            key={currentMessage}
            className="absolute inset-y-0 left-10 hidden md:flex items-center text-gray-500 italic text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {currentMessage}
          </motion.div>
        )}
        
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          value={search}
          className="block w-full p-4 pl-10 pr-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          required
          autoComplete="off"
          inputMode="text"
          style={{ caretColor: 'auto' }}
        />

        <button type="submit" className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2">
          {loading ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
