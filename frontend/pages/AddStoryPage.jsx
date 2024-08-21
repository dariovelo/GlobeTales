import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createStory } from "../src/store/storySlice";
import "../src/index.css";

const AddStoryPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();

    const newStory = {
      title,
      category,
      content,
    };

    dispatch(createStory(newStory));

    toast.success("Story Added Successfully");

    return navigate("/");
  };

  return (
    <section className="addstory-section">
      <div className="addstory-container">
        <div className="addstory-form-container">
          <form onSubmit={submitForm}>
            <h2 className="addstory-title">Add Story</h2>

            <div className="mb-4">
              <label htmlFor="category" className="addstory-label">
                Story category
              </label>
              <select
                id="category"
                name="category"
                className="addstory-select"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Adventure">Adventure</option>
                <option value="Romance">Romance</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="addstory-label">Story Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="addstory-input"
                placeholder="e.g. An unexpected event"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="addstory-label">
                Content
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                className="addstory-textarea"
                rows="7"
                placeholder="Start writing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button className="addstory-button" type="submit">
                Publish Story
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddStoryPage;
