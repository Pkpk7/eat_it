import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import fontBold from "../fonts/Montserrat-Bold.ttf";
import font from "../fonts/Montserrat-Regular.ttf";

Font.register({
  family: "Montserrat-Bold",
  src: fontBold,
});

Font.register({
  family: "Montserrat",
  src: font,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 34,
    margin: 10,
    padding: 10,
  },
  list: {
    fontFamily: "Montserrat",
    marginLeft: 10,
    marginTop: 3,
  },
  text: {
    fontFamily: "Montserrat",
    margin: 10,
    padding: 10,
  },
  image: {
    marginBottom: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "Montserrat",
  },
});

export function PdfDocument({ image, recipe, ingredients, recipeName }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {recipeName ? <Text style={styles.header}> {recipeName} </Text> : null}
        {image ? <Image src={image} style={styles.image} /> : null}
        {ingredients
          ? ingredients.map((element, index) => {
              console.log(image);
              return (
                <Text key={index} style={styles.list}>
                  {" "}
                  - {element}{" "}
                </Text>
              );
            })
          : null}
        {recipe ? <Text style={styles.text}> {recipe} </Text> : null}
      </Page>
    </Document>
  );
}

// Create Document Component
export default PdfDocument;
