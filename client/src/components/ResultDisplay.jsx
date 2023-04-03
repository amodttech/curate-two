import React from "react";
import ObjectCard from "./ObjectCard";

const testObject = [
  {
    objectID: 438002,
    isHighlight: false,
    accessionNumber: "1997.391.4",
    accessionYear: "1997",
    isPublicDomain: true,
    primaryImage:
      "https://images.metmuseum.org/CRDImages/ep/original/DT4224.jpg",
    primaryImageSmall:
      "https://images.metmuseum.org/CRDImages/ep/web-large/DT4224.jpg",
    additionalImages: [],
    constituents: [
      {
        constituentID: 162094,
        role: "Artist",
        name: "Edouard Manet",
        constituentULAN_URL: "http://vocab.getty.edu/page/ulan/500010363",
        constituentWikidata_URL: "https://www.wikidata.org/wiki/Q40599",
        gender: "",
      },
    ],
    department: "European Paintings",
    objectName: "Painting",
    title: "Madame Manet (Suzanne Leenhoff, 1829–1906) at Bellevue",
    culture: "",
    period: "",
    dynasty: "",
    reign: "",
    portfolio: "",
    artistRole: "Artist",
    artistPrefix: "",
    artistDisplayName: "Edouard Manet",
    artistDisplayBio: "French, Paris 1832–1883 Paris",
    artistSuffix: "",
    artistAlphaSort: "Manet, Edouard",
    artistNationality: "French",
    artistBeginDate: "1832",
    artistEndDate: "1883",
    artistGender: "",
    artistWikidata_URL: "https://www.wikidata.org/wiki/Q40599",
    artistULAN_URL: "http://vocab.getty.edu/page/ulan/500010363",
    objectDate: "1880",
    objectBeginDate: 1880,
    objectEndDate: 1880,
    medium: "Oil on canvas",
    dimensions: "31 3/4 x 23 3/4 in. (80.6 x 60.3 cm)",
    measurements: [
      {
        elementName: "Overall",
        elementDescription: null,
        elementMeasurements: {
          Height: 80.6,
          Width: 60.3,
        },
      },
      {
        elementName: "Frame",
        elementDescription: null,
        elementMeasurements: {
          Depth: 9.525019,
          Height: 116.20523,
          Width: 100.3302,
        },
      },
    ],
    creditLine:
      "The Walter H. and Leonore Annenberg Collection, Gift of Walter H. and Leonore Annenberg, 1997, Bequest of Walter H. Annenberg, 2002",
    geographyType: "",
    city: "",
    state: "",
    county: "",
    country: "",
    region: "",
    subregion: "",
    locale: "",
    locus: "",
    excavation: "",
    river: "",
    classification: "Paintings",
    rightsAndReproduction: "",
    linkResource: "",
    metadataDate: "2022-11-11T04:46:15.913Z",
    repository: "Metropolitan Museum of Art, New York, NY",
    objectURL: "https://www.metmuseum.org/art/collection/search/438002",
    tags: [
      {
        term: "Profiles",
        AAT_URL: "http://vocab.getty.edu/page/aat/300123319",
        Wikidata_URL: "https://www.wikidata.org/wiki/Q4382010",
      },
      {
        term: "Women",
        AAT_URL: "http://vocab.getty.edu/page/aat/300025943",
        Wikidata_URL: "https://www.wikidata.org/wiki/Q467",
      },
    ],
    objectWikidata_URL: "https://www.wikidata.org/wiki/Q19905267",
    isTimelineWork: true,
    GalleryNumber: "821",
  },
];

function ResultDisplay({ objectsToDisplay }) {
  const objectList = objectsToDisplay.map((artObject, index) => (
    <ObjectCard element={index} artObject={artObject} />
  ));
  return (
    <div className="object-display">
      {objectList}
    </div>
  );
}

export default ResultDisplay;
