import { useState } from "react";
import { useAddPostMutation } from "../../../data/api/postApi";


const AddPost: React.FC<{ onPostAdded?: () => void }> = ({ onPostAdded }) => {
  const [text, setText] = useState("");
  const [addPost, { isLoading, error }] = useAddPostMutation(); // RTK Query mutation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
       const  res = await addPost({ text }).unwrap(); // Unwraps the response to handle errors properly
       console.log(res)
      setText(""); // Clear input after success
      if (onPostAdded) onPostAdded(); // Notify parent to refresh posts
    } catch (err) {
      console.error("Failed to add post", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-xl font-bold mb-4 text-gray-800">Add a Post</h2>
  <form onSubmit={handleSubmit}>
    <textarea
      className="w-full p-3 border border-gray-400 text-lg text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 placeholder-gray-600"
      placeholder="What's on your mind?"
      value={text}
      onChange={(e) => setText(e.target.value)}
      required
      rows={5} // Increases the textarea height
    />
    {error && <p className="text-red-600 text-sm mt-2">Error adding post.</p>}
    <button
      type="submit"
      className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
      disabled={isLoading || text.trim() === ""}
    >
      {isLoading ? "Posting..." : "Post"}
    </button>
  </form>
</div>

  );
};

export default AddPost;
