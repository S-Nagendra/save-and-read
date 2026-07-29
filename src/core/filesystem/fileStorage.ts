import { Platform } from "react-native";
import { Directory, File, Paths } from "expo-file-system";

export async function downloadFile(
  url: string,
  filename: string,
): Promise<string> {
  // Web fallback
  if (Platform.OS === "web") {
    console.warn(
      "File download is not supported on Expo Web. Using remote URL instead.",
    );

    return url;
  }

  const articlesDirectory = new Directory(Paths.document, "articles");

  if (!articlesDirectory.exists) {
    articlesDirectory.create({
      intermediates: true,
    });
  }

  const file = new File(articlesDirectory, filename);

  if (file.exists) {
    return file.uri;
  }

  const downloadedFile = await File.downloadFileAsync(url, file);

  return downloadedFile.uri;
}

export function fileExists(path: string): boolean {
  if (Platform.OS === "web") {
    return false;
  }

  return new File(path).exists;
}