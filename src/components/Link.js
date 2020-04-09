import React, { memo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./pdfDocument";

const Link = (props) => {
  return (
    <PDFDownloadLink
      className="recipe__okay-button"
      document={
        <PdfDocument
          image={props.photo}
          recipe={props.recipe}
          ingredients={props.ingredients}
          recipeName={props.recipeName}
        />
      }
      fileName="recipe.pdf"
    ></PDFDownloadLink>
  );
};

export const PDFLink = memo(Link, (prevProps, newProps) => {
  if (prevProps.ingredients === newProps.ingredients) return true;

  return false;
  //compare props and if no change, return true, else false
});
