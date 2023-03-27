import React from "react";
import { Popover, Whisper, Button } from "rsuite";

function ObjectCard({ artObject, element }) {
  return (
    <li key={element} className="object-card">
      {artObject.primaryImageSmall ? (
        <a href={artObject.primaryImage} target="_blank">
          <img src={artObject.primaryImageSmall} alt={artObject.title} />
        </a>
      ) : (
        <div className="no-image">no image</div>
      )}

      <h4 className="object-title">{artObject.title}</h4>
      <h5 className="object-artist">{artObject.artistDisplayName}</h5>
      <h5 className="object-date">{artObject.objectDate}</h5>

      <Whisper
        followCursor
        speaker={
          <Popover>
              Department: {artObject.department}
          </Popover>
        }
      >
        <Button>More Details</Button>
      </Whisper>

      <div className="object-id-container">
        ID:
        <a href={artObject.objectURL} target="_blank">
          {artObject.objectID}
        </a>
      </div>
    </li>
  );
}

export default ObjectCard;
