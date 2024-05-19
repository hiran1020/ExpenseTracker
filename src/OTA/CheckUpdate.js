import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';
import { Alert, NativeModules } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import VersionCheck from 'react-native-version-check'; // To get current app version

const { DevSettings } = NativeModules;

const checkForUpdates = async () => {
    try {
        const latestUpdate = await firestore().collection('updates').doc('latest').get();
        const { version, url } = latestUpdate.data();
        const currentVersion = VersionCheck.getCurrentVersion();

        if (version !== currentVersion) {
            Alert.alert(
                "Update Available",
                "A new update is available. The app will now update.",
                [
                    { text: "OK", onPress: () => downloadUpdate(url) }
                ]
            );
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
};

const downloadUpdate = async (url) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/update.apk`;

    try {
        const downloadResult = await RNFS.downloadFile({ fromUrl: url, toFile: downloadDest }).promise;
        if (downloadResult.statusCode === 200) {
            console.log('Update downloaded successfully');
            promptInstall(downloadDest);
        }
    } catch (error) {
        console.error('Error downloading update:', error);
    }
};

const promptInstall = (filePath) => {
    Alert.alert(
        "Install Update",
        "The update has been downloaded. Install now?",
        [
            { text: "Cancel", onPress: () => console.log("Update canceled"), style: "cancel" },
            { text: "Install", onPress: () => installUpdate(filePath) }
        ]
    );
};

const installUpdate = (filePath) => {
    if (Platform.OS === 'android') {
        RNFS.scanFile(filePath)
            .then(() => {
                const intent = {
                    action: 'android.intent.action.VIEW',
                    data: `file://${filePath}`,
                    type: 'application/vnd.android.package-archive',
                    flags: 'FLAG_ACTIVITY_NEW_TASK|FLAG_GRANT_READ_URI_PERMISSION'
                };
                NativeModules.IntentLauncher.startActivity(intent)
                    .then(() => console.log('APK installation started'))
                    .catch((error) => console.error('Error starting APK installation:', error));
            })
            .catch((error) => console.error('Error scanning file:', error));
    } else {
        // iOS specific installation steps (if applicable)
    }
};

export { checkForUpdates };
