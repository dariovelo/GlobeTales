function StoryForm() {
  return (
    <div className="section-form">
      <p> Please login </p>
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
          <button className="button button-login" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoryForm;
