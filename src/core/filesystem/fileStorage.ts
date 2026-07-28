import { File, Directory, Paths } from "expo-file-system";

export async function downloadFile(
  url: string,
  filename: string,
): Promise<string> {
  const articlesDirectory = new Directory(Paths.document, "articles");

  if (!articlesDirectory.exists) {
    articlesDirectory.create({
      intermediates: true,
    });
  }

  const file = new File(articlesDirectory, filename);

  const downloadedFile = await File.downloadFileAsync(url, file);

  return downloadedFile.uri;
}
