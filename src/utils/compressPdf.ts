import { PDFDocument } from "pdf-lib";

// Light compression: removes metadata & resaves with object streams
export async function compressPdf(file: File): Promise<File> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      updateMetadata: false,
    });

    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
    });

    return new File([compressedBytes], file.name, {
      type: "application/pdf",
    });
  } catch (err) {
    console.error("Compression failed:", err);
    return file; // fallback
  }
}
