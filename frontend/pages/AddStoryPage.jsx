import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createStory } from "../src/store/storySlice";
import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";

const AddStoryPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published"); // Default to published

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    handleSubmit(newStatus);
  };

  const handleSubmit = async (currentStatus) => {
    // Prevent form submission if title or content is missing
    if (!title || !content) {
      toast.error("Title and content are required!", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    const newStory = {
      title,
      category,
      content,
      status: currentStatus, // Use the provided status
    };

    dispatch(createStory(newStory));
    toast.success(
      currentStatus === "published"
        ? "Story Published Successfully"
        : "Draft Saved Successfully",
      {
        autoClose: 500,
        position: "top-center",
      }
    );
    navigate("/");
  };

  return (
    <div className="book-container">
      <div className="book-card">
        <form className="book-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="book-title">Add Your Story</h2>

          <div className="form-group">
            <label className="book-label">Category</label>
            <select
              id="category"
              name="category"
              className="book-select"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Adventure">Adventure</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div className="form-group">
            <label className="book-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="book-input"
              placeholder="e.g. An Unexpected Event"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="book-label">Content</label>
            <textarea
              id="content"
              name="content"
              className="book-textarea"
              rows="10"
              placeholder="Start writing your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="button-container">
            <button
              className="button-save-draft"
              type="button"
              onClick={() => handleStatusChange("draft")}
            >
              Save to Draft
            </button>
            <button
              className="button-publish-story"
              type="button"
              onClick={() => handleStatusChange("published")}
            >
              Publish Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoryPage;
