import { useState } from "react";

export const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    status,
    importance,
    description,
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  const datetime = new Date(createdAt).toLocaleString() + "hs.";

  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(_id)}>
        X
      </div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{userName}</h5>
      <button
        type="button"
        className={status.toLowerCase()}
        onClick={() => editCardStatus(data)}
      >
        {status.toLowerCase()}
      </button>
      <button type="button" className={importance.toLowerCase()}>
        {importance.toLowerCase()}
      </button>
      {!showMore && <p>{limitString(description).string} </p>}
      {showMore && (
        <>
          <p>{description}</p>
          <button type="button" onClick={() => setShowMore(false)}>
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
    </div>
  );
};
