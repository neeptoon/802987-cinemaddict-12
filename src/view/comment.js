export const createCommentHTML = (elem) => {
  const { text, author, time, emoji } = elem;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji"><img src="${emoji}" width="55" height="55" alt="emoji-sleeping"></span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${time}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
</li>`;
};


