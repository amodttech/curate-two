import React, { useState } from "react"; 
import uuid from 'react-uuid'
import { Popover } from "react-tiny-popover";

function ObjectCard({ artObject}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <li key={uuid()} className="object-card">
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

      <Popover
        isOpen={isPopoverOpen}
        positions={["bottom", "left"]} // if you'd like, you can limit the positions
        padding={5} // adjust padding here!
        reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
        content={() => (
          <div className="popover-container">
            <h5 className="object-detail">
              <span style={{ fontWeight: "bold" }}>Medium: </span>
              {artObject.medium}
            </h5>
            <h5 className="object-detail">
              <span style={{ fontWeight: "bold" }}>Dimensions: </span>
              {artObject.dimensions}
            </h5>
            <h5 className="object-detail">
              <span style={{ fontWeight: "bold" }}>Department: </span>
              {artObject.department}
            </h5>
            <h5 className="object-detail">
              <span style={{ fontWeight: "bold" }}>Artist Nationality: </span>
              {artObject.artistNationality}
            </h5>
          </div>
        )}
      >
        <div
          className="popover-button"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          More details
        </div>
      </Popover>

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
