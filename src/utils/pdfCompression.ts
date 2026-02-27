import { PDFDocument } from "pdf-lib";

export async function compressPdf(file: File): Promise<File> {
  if (!file) return file;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    let compressedFile = new File(
      [compressedPdfBytes],
      file.name,
      { type: "application/pdf" }
    );

    // If still > 100KB, warn but return compressed version
    if (compressedFile.size > 100 * 1024) {
      console.warn("PDF still larger than 100KB after compression");
    }

    return compressedFile;
  } catch (error) {
    console.error("PDF compression failed", error);
    return file;
  }
}