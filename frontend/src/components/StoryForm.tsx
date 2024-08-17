function StoryForm() {
  return (
    <div className="section-form">
      <p className="category-title-intro"> Express your narrative </p>
      <form className="story-form">
        <div className="story-title-box">
          <input type="text" placeholder="Note title" />
        </div>
        <div>
          <textarea
            className="story-content-box"
            placeholder="Start writing..."
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
