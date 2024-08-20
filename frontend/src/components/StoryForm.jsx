import { useState } from "react";
import { createStory, reset } from "../store/storySlice";
import { useDispatch } from "react-redux";

const storyInput = {
  title: "",
  content: "",
};

function StoryForm() {
  const [formData, setFormData] = useState(storyInput);

  const { title, content } = formData;

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createStory(formData));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="section-form">
      <p className="category-title-intro"> Express your narrative </p>
      <form className="story-form" onSubmit={onSubmit}>
        <div className="story-title-box">
          <input
            type="text"
            placeholder="Note title"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <textarea
            className="story-content-box"
            placeholder="Start writing..."
            id="content"
            name="content"
            value={content}
            onChange={onChange}
          />
        </div>
        <div>
          <button className="button button-send-request" type="submit">
            Send Request
          </button>
          <button className="button button-cancel" type="submit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoryForm;
