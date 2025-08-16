import * as FileSystem from 'expo-file-system';

const imageDirectory = `${FileSystem.documentDirectory}images/`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imageDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imageDirectory, { intermediates: true });
  }
};

export const saveImage = async (tempUri: string): Promise<string> => {
  await ensureDirExists();
  const fileName = new Date().getTime() + '.jpg';
  const newUri = imageDirectory + fileName;
  try {
    await FileSystem.copyAsync({
      from: tempUri,
      to: newUri,
    });
    return newUri;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

export const deleteImage = async (uri: string): Promise<void> => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (fileInfo.exists) {
            await FileSystem.deleteAsync(uri);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}